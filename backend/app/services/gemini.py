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
                f"You are the lead AI birthday designer for DreamParty, a premium planning platform.\n"
                f"Create a personalized, premium, and unforgettable birthday recommendation plan for:\n"
                f"- Name: {request.name}\n"
                f"- Age: {request.age}\n"
                f"- Birthday Date: {request.birthday_date}\n"
                f"- Zodiac Sign: {request.zodiac_sign}\n"
                f"- Party Style: {request.party_style}\n"
                f"- Interests/Hobbies: {interests_str}\n"
                f"- Location (City): {request.city}\n"
                f"- Budget: {request.budget}\n"
                f"- Guest Count: {request.guest_count} guests\n\n"
                f"Ensure the celebration title is catchy, the theme is highly immersive, the color palette contains "
                f"4 harmonizing color names, and all recommended decorations, music, food, schedule times, and "
                f"personal touches are highly tailored to the age, zodiac, and interests of the person."
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
    """
    interests_str = ", ".join(request.interests)
    main_interest = request.interests[0] if request.interests else "celebration"
    
    # Simple heuristic-based theme picker
    style_lower = request.party_style.lower()
    
    if "creative" in style_lower or "artistic" in style_lower:
        title = f"{request.name}'s Creative {request.age}th Canvas & Crafts Studio"
        theme = (
            f"An immersive, hands-on artistic workshop tailored for {request.name}'s {request.age}th birthday in {request.city}. "
            f"The space is transformed into a chic, open-concept gallery where guests create custom masterworks."
        )
        colors = ["Indigo Splatter", "Marigold Yellow", "Studio White", "Matte Indigo"]
        decorations = [
            "Mini table easels for each guest with personalized blank canvases",
            "Fairy lights and drop-cloth tapestries suspended across the ceiling",
            "Colorful supply bar with custom aprons matching the theme",
            "Art gallery wall displaying polaroids of the guests throughout the night"
        ]
        food = [
            "Palette cookies with frosted colorful paint blobs",
            "Artisanal flatbread pizzas with paint-drizzle balsamic reduction",
            "Sparkling fruit punch served in paint jars",
            "A layered watercolor-drip birthday cake"
        ]
        music = "Indie pop, warm acoustic covers, and chilled loft beats"
        schedule = [
            "14:00 - Gallery Check-in: Guest arrival and custom apron fitting",
            "14:30 - Masterclass Session: Guided canvas or crafting activity",
            "15:30 - Exhibition & Refueling: Food and custom paint-palette desserts",
            "16:15 - Toast & Cake: Celebrating the guest of honor",
            "16:45 - Departure: Guests pack up their masterpiece bags"
        ]
        personal_touch = f"Each guest gets a premium wooden canvas carrier and a customized paintbrush set engraved with their name."
        summary_text = (
            f"A creative, hands-on experience that fits {request.name}'s interest in {main_interest}. "
            f"Designed as a low-stress, engaging event in {request.city} for a budget of {request.budget}."
        )

    elif "adventure" in style_lower or "active" in style_lower:
        title = f"{request.name}'s {request.age}th Birthday Quest & Adventure Camp"
        theme = (
            f"An action-packed day of exploration and adventure celebrating {request.name} in {request.city}. "
            f"Featuring an interactive scavenger hunt customized around {interests_str}."
        )
        colors = ["Explorer Khaki", "Forest Green", "Amber Orange", "Compass Black"]
        decorations = [
            "Vintage map wall murals and hanging canvas flags",
            "Compass-styled table runners and rustic lanterns",
            "Custom street signs showing distances to famous peaks and landmarks",
            "Climbing rope accents and wood slice centerpieces"
        ]
        food = [
            "Gourmet 'trail mix' station with customizable ingredients",
            "Campfire-style sliders and sweet potato fries",
            "S'mores bar with gourmet marshmallows and chocolate flavors",
            "A terrain-styled cake with edible trees and compass topper"
        ]
        music = "Upbeat folk rock, movie soundtracks (Indiana Jones, Jurassic Park), and lively acoustic jams"
        schedule = [
            "14:00 - Camp Check-in: Arrival and distribution of survival packs",
            "14:30 - The Main Quest: Immersive scavenger hunt/adventure course",
            "15:45 - Trail Head Refuel: Campfire sliders, trail mix, and warm drinks",
            "16:15 - Cake Ceremony: Celebrating the pioneer explorer",
            "16:45 - Camp Out: Departure with achievement badges"
        ]
        personal_touch = f"A customized leatherbound adventure journal for every guest to log their quest clues and keep as a souvenir."
        summary_text = (
            f"An energetic outdoor/adventure concept curated for a {request.age}-year-old {request.zodiac_sign}. "
            f"Leverages interests in {interests_str} to construct an engaging activity list within {request.city}."
        )

    else:
        # Tech/Modern/General Theme
        title = f"{request.name}'s Cosmic Galactic {request.age}th Celebration"
        theme = (
            f"A high-concept, futuristic sci-fi celebration in {request.city} centered around {request.name}'s "
            f"interest in {main_interest}. The venue is designed like a spaceship launch deck with interstellar visuals."
        )
        colors = ["Nebula Purple", "Supernova Gold", "Cosmic Navy", "Starlight Silver"]
        decorations = [
            "Projection-mapped starry night sky across the walls",
            "Silver metallic foil balloons and neon glow strip accents",
            "Futuristic centerpiece pods with dry-ice fog bubbles",
            "Hanging planet spheres and custom mission plaques"
        ]
        food = [
            "Interstellar slider bites on charcoal buns",
            "Nebula galaxy donuts with edible glitter",
            "Rocket fuel mocktails in glowing LED cups",
            "A cosmic mirror-glazed galaxy cake"
        ]
        music = "Retro synthwave, upbeat electro-dance, and classic futuristic synth tracks"
        schedule = [
            "14:00 - Launchpad Entry: Arrival and cosmic glow-ring distribution",
            "14:30 - Celestial Flight: Interactive games or VR simulation flight",
            "15:45 - Space Station Fueling: Meal time and cosmic dessert bar",
            "16:15 - Supernova Toast: Cake cutting and birthday wishes",
            "16:45 - Re-entry: Guests land back on Earth with planet gift boxes"
        ]
        personal_touch = f"A custom star map showing the alignment of the night sky over {request.city} on the day {request.name} was born."
        summary_text = (
            f"A premium, celestial-themed birthday designed specifically for {request.name}. "
            f"It aligns beautifully with the style of {request.party_style} and reflects the {request.zodiac_sign} spirit."
        )

    return PartyIdeaResponse(
        celebration_title=title,
        theme_idea=theme,
        color_palette=colors,
        invitation_text=(
            f"Mission Alert! You are cordially invited to celebrate {request.name}'s {request.age}th Birthday! "
            f"Join us at our headquarters in {request.city} on {request.birthday_date} for a '{title}' experience. "
            f"Prepare for an epic journey filled with themed activities, food, and fun. RSVP to join the crew!"
        ),
        decoration_ideas=decorations,
        food_and_drink_ideas=food,
        music_vibe=music,
        party_schedule=schedule,
        personal_touch=personal_touch,
        ai_summary=summary_text
    )
