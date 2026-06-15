import json
import logging
import time
from typing import Optional
from app.config import settings
from app.schemas.party import PartyIdeaRequest, PartyIdeaResponse

# Configure logging
logger = logging.getLogger("dreamparty")

# Try importing the new Google GenAI SDK
try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False
    logger.warning("google-genai library not installed. Falling back to mock generator.")


def is_temporary_error(e: Exception) -> bool:
    """
    Checks if a caught exception represents a temporary failure
    (e.g., 503 Service Unavailable, 500 Server Error, timeout, rate limits, network issues).
    """
    # Check for google-genai SDK specific APIError
    if GENAI_AVAILABLE:
        try:
            from google.genai.errors import APIError
            if isinstance(e, APIError):
                # 500+ server errors or 429 rate limit errors are temporary
                if e.code >= 500 or e.code == 429:
                    return True
                
                # Check status text/message
                err_str = str(e).upper()
                if any(phrase in err_str for phrase in ["UNAVAILABLE", "RESOURCE_EXHAUSTED", "503", "500", "429"]):
                    return True
                if e.status and e.status.upper() in ["UNAVAILABLE", "RESOURCE_EXHAUSTED"]:
                    return True
                if e.message and any(phrase in e.message.lower() for phrase in ["rate limit", "high demand", "too many requests", "temporarily unavailable"]):
                    return True
        except ImportError:
            pass

    # Check class names for network/timeout errors
    class_name = e.__class__.__name__
    network_classes = {
        "HTTPError", "TimeoutException", "NetworkError", "ConnectError", "ConnectTimeout",
        "ReadTimeout", "WriteTimeout", "PoolTimeout", "ProxyError", "RequestError",
        "RequestException", "ConnectionError", "Timeout", "MaxRetryError", "SSLError"
    }
    if class_name in network_classes:
        return True
        
    # Standard Python network/timeout errors
    if isinstance(e, (TimeoutError, ConnectionError, OSError)):
        return True
        
    # Check string patterns of the exception message
    err_str = str(e).lower()
    temporary_phrases = [
        "timeout", "timed out", "connection refused", "connection reset", 
        "503 unavailable", "500 server error", "service unavailable", 
        "temporary", "high demand", "rate limit", "quota exceeded", "resource exhausted", "429"
    ]
    if any(phrase in err_str for phrase in temporary_phrases):
        return True
        
    return False


def generate_party_idea(request: PartyIdeaRequest) -> PartyIdeaResponse:
    """
    Generates a structured birthday party plan.
    The mock fallback is only a safety fallback and real Gemini is used when GEMINI_API_KEY is configured.
    
    Args:
        request: PartyIdeaRequest containing the guest profile information.
        
    Returns:
        PartyIdeaResponse structured with party recommendations.
    """
    api_key = settings.gemini_api_key

    # Enforce allowed JSON output fields in Python
    allowed_fields = {
        "celebration_title",
        "theme_idea",
        "color_palette",
        "invitation_text",
        "decoration_ideas",
        "food_and_drink_ideas",
        "music_vibe",
        "party_schedule",
        "personal_touch",
        "ai_summary"
    }

    if api_key and GENAI_AVAILABLE:
        try:
            client = genai.Client(api_key=api_key)
            
            interests_str = ", ".join(request.interests)
            
            # The prompt explicitly prioritizes the user's specific inputs (name, style, zodiac, interests, city, etc.)
            # Brand guidelines should guide the premium, elegant tone only, without overwriting custom styles.
            prompt = (
                f"You are the lead AI birthday designer for DreamParty, a premium, luxury birthday planning platform.\n"
                f"Your design style is warm, personal, sophisticated, elegant, and realistic. You must avoid sci-fi, "
                f"cyberpunk, spaceships, neon themes, futuristic wording, or a childish/overly casual tone.\n\n"
                f"Create a highly tailored, upscale birthday recommendation plan matching these parameters as the highest priority:\n"
                f"- Name: {request.name}\n"
                f"- Age: {request.age}\n"
                f"- Birthday Date: {request.birthday_date}\n"
                f"- Zodiac Sign: {request.zodiac_sign}\n"
                f"- Party Style: {request.party_style}\n"
                f"- Interests/Hobbies: {interests_str}\n"
                f"- Location (City): {request.city}\n"
                f"- Budget: {request.budget}\n"
                f"- Guest Count: {request.guest_count} guests\n\n"
                f"Strict Quality Requirements:\n"
                f"1. DO NOT use any brackets or placeholders (e.g., do NOT output '[Private Venue]', '[Date]', '[Contact Information]', '[RSVP]', '[Insert Name]', '[Venue Name]'). Every single string must be fully realized, concrete, and complete.\n"
                f"2. Utilize the actual user inputs supplied above (like the name '{request.name}', the city '{request.city}', the birthday date '{request.birthday_date}', the zodiac sign '{request.zodiac_sign}') to personalize the entire copy.\n"
                f"3. If venue, contact, or RSVP details are needed in the invitation_text, generate realistic and elegant luxury examples matching the city '{request.city}' (for example, 'The Grand Atelier, {request.city}' or 'RSVP to Aurelia').\n"
                f"4. The invitation_text must be written as a finished, production-ready, beautiful and grammatically correct invitation card copy.\n"
                f"5. Maintain a luxury, romantic, elegant, magical, and premium brand voice. Avoid cyberpunk, sci-fi, childish, generic SaaS, or neon-tech language.\n\n"
                f"Strict JSON output requirements:\n"
                f"1. Return valid JSON only. Do not include markdown code block syntax (like ```json ... ```) in your output.\n"
                f"2. Do not return any extra explanation, prelude, or postscript outside the JSON.\n"
                f"3. Return ONLY the allowed fields: celebration_title, theme_idea, color_palette, invitation_text, "
                f"decoration_ideas, food_and_drink_ideas, music_vibe, party_schedule, personal_touch, ai_summary.\n"
                f"4. Do not return any extra keys or properties.\n\n"
                f"The celebration title, color scheme, invitation text, decorations, food, music, and schedule MUST "
                f"specifically align with the requested Party Style ({request.party_style}) and Interests ({interests_str})."
            )

            # Generate structured output using Pydantic schema enforcement (without examples to prevent extra_forbidden errors)
            max_attempts = 3
            last_exception = None
            response = None
            
            for attempt in range(1, max_attempts + 1):
                try:
                    if attempt == 1:
                        logger.info("Using Gemini API for party generation")
                    
                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            response_mime_type="application/json",
                            response_schema=PartyIdeaResponse,
                            temperature=0.7,
                        ),
                    )
                    # Success
                    break
                except Exception as e:
                    last_exception = e
                    is_temp = is_temporary_error(e)
                    
                    if not is_temp:
                        logger.error(f"Gemini API generation failed with non-temporary error: {e}")
                        break
                    
                    if attempt < max_attempts:
                        logger.warning(f"Gemini attempt {attempt} failed, retrying...")
                        time.sleep(attempt)
                    else:
                        logger.error(f"Gemini attempt {attempt} failed (final attempt): {e}")

            if response is None:
                logger.info("Gemini unavailable after retries, using mock fallback party generation")
                return _generate_mock_response(request)

            try:
                if response.text:
                    # Remove markdown wraps if Gemini returned them despite strict prompt guidelines
                    clean_text = response.text.strip()
                    if clean_text.startswith("```"):
                        first_line_end = clean_text.find("\n")
                        if first_line_end != -1:
                            clean_text = clean_text[first_line_end:].strip()
                        if clean_text.endswith("```"):
                            clean_text = clean_text[:-3].strip()

                    raw_data = json.loads(clean_text)
                    
                    # Filter to allowed fields to prevent any client-side or parsing conflicts
                    filtered_data = {k: v for k, v in raw_data.items() if k in allowed_fields}
                    
                    # Verify and fill in missing fields from the mock backup to guarantee parsing validation succeeds
                    mock_data = None
                    for field in allowed_fields:
                        if field not in filtered_data or filtered_data[field] is None:
                            if mock_data is None:
                                mock_data = _generate_mock_response(request)
                            filtered_data[field] = getattr(mock_data, field)

                    logger.info("Gemini party generation completed successfully")
                    return PartyIdeaResponse.model_validate(filtered_data)
                else:
                    raise ValueError("Received empty response text from Gemini API")
            except Exception as parse_err:
                logger.error(f"Error parsing Gemini response: {parse_err}")
                logger.info("Gemini unavailable after retries, using mock fallback party generation")
                return _generate_mock_response(request)
                
        except Exception as e:
            logger.error(f"Gemini API generation failed: {e}. Falling back to mock generator.", exc_info=True)
            logger.info("Gemini unavailable after retries, using mock fallback party generation")
            return _generate_mock_response(request)

    # Fallback to High-Quality Mock Response
    logger.info("Using mock fallback party generation")
    return _generate_mock_response(request)


def _generate_mock_response(request: PartyIdeaRequest) -> PartyIdeaResponse:
    """
    Generates a highly custom, structured mock response based on input values.
    Ensures all mock data aligns with a warm, luxury, boutique celebration studio aesthetic.
    Generates a deterministic fallback based on party_style, interests, and zodiac_sign.
    """
    interests_str = ", ".join(request.interests)
    style = request.party_style
    style_lower = style.lower()
    interests_lower = [i.lower() for i in request.interests]
    
    # Custom, dynamic title matching the requested style exactly
    # E.g. Lavia's Ocean Pearl Dinner Soirée
    if any(suffix in style_lower for suffix in ["soirée", "soiree", "dinner", "salon", "celebration", "gala"]):
        title = f"{request.name}'s {style}"
    else:
        title = f"{request.name}'s {style} Soirée"

    # Dynamic theme text based on inputs
    theme = (
        f"A highly sophisticated and chic celebration in {request.city} styled around the theme of '{style}' for {request.name}'s {request.age}th birthday. "
        f"The layout and events are curated specifically to reflect interests like {interests_str} and capture a warm, boutique salon atmosphere."
    )

    # Dynamic color palette matching the style
    if "ocean" in style_lower or "sea" in style_lower or "pearl" in style_lower or "water" in style_lower:
        colors = ["Ocean Pearl", "Moonlit Silver", "Soft Seafoam", "Warm Ivory"]
    elif "garden" in style_lower or "botanical" in style_lower or "green" in style_lower or "floral" in style_lower:
        colors = ["Sage Green", "Warm Champagne", "Soft Blush", "Ivory Pearl"]
    elif "creative" in style_lower or "artistic" in style_lower or "atelier" in style_lower:
        colors = ["Champagne Gold", "Dusty Pink", "Blush Rose", "Ivory"]
    else:
        # Default luxury rose gold colors
        colors = ["Blush Rose", "Champagne Gold", "Soft Dusty Pink", "Warm Sand"]

    # Dynamic decorations incorporating interests
    decorations = []
    
    # Render sea-inspired details if requested
    if any(k in interests_lower or k in style_lower for k in ["sea", "ocean", "pearl", "water", "aquatic"]):
        decorations.append("Ethereal sea-inspired floral arrangements, shimmering pearl accents, and soft flowing silk drapery")
    else:
        decorations.append("Lush seasonal floral arrangements featuring dusty roses, ranunculus, and fresh eucalyptus")

    # Render candlelight if requested
    if any(k in interests_lower for k in ["candle", "candles", "light", "candlelight"]):
        decorations.append("Abundant warm pillar candles in glass cylinder holders creating an intimate, soft glow")
    else:
        decorations.append("Soft ambient fairy lights and warm accent spotlights to set an elegant backdrop")

    decorations.extend([
        f"Custom tablescapes featuring premium chargers, crystal stemware, and textured linen napkins in {colors[0]} and {colors[1]} tones",
        f"Personalized calligraphed entry welcome board framed in brass and coordinating greenery"
    ])

    # Dynamic food and drinks incorporating interests
    food = []
    if "champagne" in interests_lower:
        food.append("Rose-infused champagne toast and customized botanical gin cocktails")
    else:
        food.append(f"Welcome signature cocktail or elderflower botanical mocktail served in vintage glasses")

    food.extend([
        "Artisanal canapés, including smoked salmon blinis, fig crostinis, and gourmet pairings",
        f"A custom multi-tiered birthday cake beautifully decorated with coordinating {colors[0]} accents",
        "A boutique dessert cart featuring raspberry macarons and white chocolate truffles"
    ])

    # Dynamic music vibe
    music_items = []
    if "piano" in interests_lower:
        music_items.append("elegant live piano covers")
    if "jazz" in interests_lower:
        music_items.append("sophisticated lounge jazz")
    if "acoustic" in interests_lower:
        music_items.append("light acoustic strings")
        
    if not music_items:
        music_vibe = "Sophisticated lounge jazz, soft vinyl records, and elegant neo-classical piano covers"
    else:
        music_vibe = f"{', '.join(music_items).capitalize()} and curated ambient background tracks"

    # Dynamic schedule without hardcoded names like Maja
    schedule = [
        f"18:00 - The Arrival: Welcome champagne toast and ambient {music_vibe.lower().split(' and ')[0]} music",
        f"18:30 - Cocktails & Canapés: Socializing among candlelight and bespoke {style} design setups",
        f"19:30 - Intimate Dinner: Multi-course tasting menu highlighting local {request.city} culinary delicacies",
        f"21:00 - Dessert & Speeches: Cutting the cake and toasting {request.name} on their {request.age}th milestone",
        "22:00 - Farewell: Evening concluding with curated memory gifts for all guests"
    ]

    # Dynamic personal touch
    personal_touch = ""
    if "poetry" in interests_lower:
        personal_touch = "A custom calligraphed typewriter poem composed live for each guest on textured cotton paper as a keepsake."
    elif "flowers" in interests_lower or "flower" in interests_lower:
        personal_touch = "A boutique flower bar where guests curate their own personalized mini-bouquet to take home."
    else:
        personal_touch = f"A calligraphed personal menu card for each guest and a miniature keepsake gift bottle tied with a {colors[0].lower()} ribbon."

    # Dynamic summary highlighting the zodiac sign
    summary_text = (
        f"A premium, elegant celebration tailored specifically for {request.name}'s {request.age}th birthday in {request.city}. "
        f"The theme design captures the spirit of a {request.zodiac_sign} through details like {interests_str}."
    )

    return PartyIdeaResponse(
        celebration_title=title,
        theme_idea=theme,
        color_palette=colors,
        invitation_text=(
            f"You are cordially invited to celebrate {request.name}'s {request.age}th Birthday Soirée. "
            f"Join us for an elegant evening of champagne and conversation in the heart of {request.city} "
            f"on {request.birthday_date}. RSVP to secure your place at the table."
        ),
        decoration_ideas=decorations,
        food_and_drink_ideas=food,
        music_vibe=music_vibe,
        party_schedule=schedule,
        personal_touch=personal_touch,
        ai_summary=summary_text
    )
