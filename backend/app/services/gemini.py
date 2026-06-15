import logging
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


def generate_party_idea(request: PartyIdeaRequest) -> PartyIdeaResponse:
    """
    Generates a structured birthday party plan.
    If GEMINI_API_KEY is configured in the environment, calls the Google Gemini API.
    Otherwise, generates a high-quality, customized mock response based on input parameters.
    
    Args:
        request: PartyIdeaRequest containing the guest profile information.
        
    Returns:
        PartyIdeaResponse structured with party recommendations.
    """
    api_key = settings.gemini_api_key

    if api_key and GENAI_AVAILABLE:
        try:
            logger.info("Generating party idea using Gemini API...")
            client = genai.Client(api_key=api_key)
            
            interests_str = ", ".join(request.interests)
            prompt = (
                f"You are the lead AI birthday designer for DreamParty, a premium, luxury birthday planning platform.\n"
                f"Your design style is warm, personal, sophisticated, elegant, and realistic. You must avoid sci-fi, "
                f"cyberpunk, spaceships, neon themes, futuristic wording, or a childish/overly casual tone.\n\n"
                f"Create a highly tailored, upscale birthday recommendation plan for:\n"
                f"- Name: {request.name}\n"
                f"- Age: {request.age}\n"
                f"- Birthday Date: {request.birthday_date}\n"
                f"- Zodiac Sign: {request.zodiac_sign}\n"
                f"- Party Style: {request.party_style}\n"
                f"- Interests/Hobbies: {interests_str}\n"
                f"- Location (City): {request.city}\n"
                f"- Budget: {request.budget}\n"
                f"- Guest Count: {request.guest_count} guests\n\n"
                f"Ensure the celebration title is elegant and matches a high-end celebration (using words like Soirée, "
                f"Atelier, or Salon instead of childish phrases). The theme description should paint a picture of a boutique "
                f"studio or luxury venue. The color palette must feature 4 sophisticated names (e.g. Blush Rose, Champagne Gold, "
                f"Dusty Pink, Warm Sand). The decoration ideas, music vibe, food/drink ideas, party schedule (which should follow "
                f"a realistic evening flow), and personal touches must be highly curated and luxurious."
            )

            # Generate structured output using Pydantic schema enforcement
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=PartyIdeaResponse,
                    temperature=0.7,
                ),
            )
            
            if response.text:
                logger.info("Successfully received structured response from Gemini API.")
                return PartyIdeaResponse.model_validate_json(response.text)
            else:
                raise ValueError("Received empty response text from Gemini API")
                
        except Exception as e:
            logger.error(f"Gemini API generation failed: {e}. Falling back to mock generator.", exc_info=True)
            # Fall through to mock generator

    # Fallback to High-Quality Mock Response
    logger.info("Generating high-quality mock party idea...")
    return _generate_mock_response(request)


def _generate_mock_response(request: PartyIdeaRequest) -> PartyIdeaResponse:
    """
    Generates a highly custom, structured mock response based on input values.
    Ensures all mock data aligns with a warm, luxury, boutique celebration studio aesthetic.
    """
    interests_str = ", ".join(request.interests)
    main_interest = request.interests[0] if request.interests else "celebration"
    
    # Simple heuristic-based theme picker
    style_lower = request.party_style.lower()
    
    if "creative" in style_lower or "artistic" in style_lower:
        title = f"{request.name}'s Elegant Atelier & Watercolor Salon"
        theme = (
            f"An exquisite and creative studio afternoon in {request.city} celebrating {request.name}'s {request.age}th birthday. "
            f"Guests gather for a private watercolor or styling masterclass led by a local artist, accompanied by champagne and fine pastries."
        )
        colors = ["Champagne Gold", "Dusty Pink", "Blush Rose", "Ivory"]
        decorations = [
            "Elegant table easels with brass fittings and high-end cotton paper",
            "Freshly cut blush peonies and white roses in crystal vases",
            "Fine linen table runners and personalized monogrammed canvas wraps",
            "Soft string lighting and warm, candlelit workspace accents"
        ]
        food = [
            "Macarons infused with rose-water and gold leaf detailing",
            "Artisanal charcuterie boards featuring fine cheeses, figs, and local honeycomb",
            "Chilled rosé champagne and elderflower botanical mocktails",
            "A minimalist pastel watercolor birthday cake adorned with fresh edible flowers"
        ]
        music = "French café jazz, light acoustic strings, and ambient bossa nova"
        schedule = [
            "15:00 - Welcome & Champagne: Guests arrive at the boutique studio",
            "15:30 - Atelier Session: Guided canvas or watercolor styling masterclass",
            "17:00 - Gallery Viewing & Grazing: Fine food, desserts, and social hour",
            "17:45 - Toast & Celebration Cake: Toasting the guest of honor",
            "18:30 - Departure: Guests receive their beautifully packaged artwork"
        ]
        personal_touch = f"Each guest is presented with a custom linen tote containing a premium leather sketchbook and fine paintbrushes with {request.name}'s initials."
        summary_text = (
            f"A sophisticated, boutique creative salon experience that matches {request.name}'s interest in {main_interest}. "
            f"Designed as a low-stress, engaging event in {request.city} for a budget of {request.budget}."
        )

    elif "adventure" in style_lower or "active" in style_lower:
        title = f"{request.name}'s Sunset Garden & Alfresco Soirée"
        theme = (
            f"A luxurious, curated outdoor garden gathering or rooftop celebration in {request.city}. "
            f"Featuring custom-designed lounge spaces, interactive boutique lawn games, and a premium tasting menu under the stars."
        )
        colors = ["Sage Green", "Rose Gold", "Warm Champagne", "Soft Peach"]
        decorations = [
            "Plush floor cushions, low-profile wooden tables, and woven rug lounges",
            "Ethereal canopy drapery woven with delicate fairy lights",
            "Eucalyptus garlands, white roses, and flickering hurricane lanterns",
            "A custom calligraphy welcome board framed in brass and fresh foliage"
        ]
        food = [
            "Wood-fired gourmet flatbreads and seasonal farm-to-table small plates",
            "Deconstructed s'mores and organic dark chocolate truffles",
            "Sparkling elderflower wine and fresh cucumber-mint waters",
            "A naked-style sponge cake decorated with fresh berries and rosemary sprigs"
        ]
        music = "Upbeat folk rock, modern lounge covers, and ambient indie vibes"
        schedule = [
            "16:00 - Garden Arrival: Welcome drinks and custom botanical cocktail mixing",
            "16:30 - Lawn & Lounge: Premium garden activities, boutique games, and social time",
            "18:00 - Alfresco Feast: Curated tasting menu served family-style at twilight",
            "19:15 - Toast & Cake: Gathering around the lantern-lit table",
            "20:00 - Departure: Farewell under the stars with customized organic honey jars"
        ]
        personal_touch = f"A private chef hosting a tasting session explaining the local, seasonal ingredients sourced from the {request.city} region."
        summary_text = (
            f"An elegant outdoor celebration tailored for {request.name}'s {request.age}th birthday, "
            f"perfectly balancing active socializing and luxury dining in {request.city}."
        )

    else:
        # Default Luxury Rose Gold Theme
        title = f"{request.name}'s Rose Gold Birthday Soirée"
        theme = (
            f"A highly sophisticated and chic celebration in {request.city} styled with elegant rose-gold details, "
            f"soft candlelight, and stunning floral designs, creating an intimate boutique studio atmosphere."
        )
        colors = ["Blush Rose", "Champagne Gold", "Soft Dusty Pink", "Warm Sand"]
        decorations = [
            "Lush arrangements of dusty pink roses, white ranunculus, and eucalyptus",
            "Rose-gold rimmed chargers, crystal stemware, and premium linen napkins",
            "Abundant pillar candles in glass cylinder holders creating a warm, soft glow",
            "A luxurious silk-draped backdrop for photography moments"
        ]
        food = [
            "Rose-infused champagne toast and customized botanical gin cocktails",
            "Artisanal canapés, including smoked salmon blinis and fig crostinis",
            "A decadent champagne-flavored cake with elegant rose-gold dusting",
            "A curated dessert bar featuring raspberry macarons and white chocolate truffles"
        ]
        music = "Sophisticated lounge jazz, soft vinyl records, and elegant neo-classical piano covers"
        schedule = [
            "18:00 - The Arrival: Welcome champagne toast and ambient lounge music",
            "18:30 - Cocktails & Canapés: Socializing among candlelight and floral setups",
            "19:30 - Intimate Dinner: Multi-course tasting menu highlighting local delicacies",
            "21:00 - Dessert & Speeches: Cutting the champagne cake and toasting Maja",
            "22:00 - Farewell: Evening concluding with curated memory gifts"
        ]
        personal_touch = f"A customized calligraphed menu card for each guest and a miniature bottle of premium champagne with a rose-gold ribbon."
        summary_text = (
            f"A premium, elegant soirée tailored for {request.name}'s {request.age}th birthday in {request.city}. "
            f"The theme reflects a warm, personal, and luxurious aesthetic perfect for a {request.zodiac_sign} celebration."
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
        music_vibe=music,
        party_schedule=schedule,
        personal_touch=personal_touch,
        ai_summary=summary_text
    )
