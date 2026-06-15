from typing import List
from pydantic import BaseModel, Field


class PartyIdeaRequest(BaseModel):
    """
    Schema for the party generation request payload.
    """
    name: str = Field(
        ..., 
        description="Name of the birthday person",
        examples=["Liam"]
    )
    age: int = Field(
        ..., 
        description="Age the person is turning", 
        ge=0,
        examples=[10]
    )
    birthday_date: str = Field(
        ..., 
        description="Date of the birthday (YYYY-MM-DD or readable format)",
        examples=["2026-06-25"]
    )
    zodiac_sign: str = Field(
        ..., 
        description="Zodiac sign of the birthday person",
        examples=["Cancer"]
    )
    party_style: str = Field(
        ..., 
        description="Preferred style of the celebration (e.g., Adventure, Creative, Relaxed)",
        examples=["Adventure/Active"]
    )
    interests: List[str] = Field(
        ..., 
        description="List of hobbies, interests, or favorite themes",
        examples=[["space", "dinosaurs", "lasertag"]]
    )
    city: str = Field(
        ..., 
        description="City where the party is taking place",
        examples=["Seattle"]
    )
    budget: str = Field(
        ..., 
        description="Budget description or tier (e.g., $500, Custom)",
        examples=["$500"]
    )
    guest_count: int = Field(
        ..., 
        description="Expected number of attendees", 
        gt=0,
        examples=[15]
    )


class PartyIdeaResponse(BaseModel):
    """
    Schema for the structured party recommendation response.
    """
    celebration_title: str = Field(
        ..., 
        description="A catchy, premium name for the celebration",
        examples=["Liam's Cosmic 10th Birthday Blast"]
    )
    theme_idea: str = Field(
        ..., 
        description="Detailed description of the theme and overall concept",
        examples=["A retro space exploration and astronaut training academy experience."]
    )
    color_palette: List[str] = Field(
        ..., 
        description="Recommended color scheme for decorations and invites",
        examples=[["Deep Navy", "Metallic Silver", "Neon Lime", "Cosmic Black"]]
    )
    invitation_text: str = Field(
        ..., 
        description="Ready-to-use template text for invitations",
        examples=["Calling all space cadets! Join Liam for a mission to celebrate his 10th birthday..."]
    )
    decoration_ideas: List[str] = Field(
        ..., 
        description="Key visual styling and prop recommendations",
        examples=[
            "Hanging glow-in-the-dark stars",
            "Life-sized cardboard rocket ship cutout",
            "Silver foil balloons shaped like planets"
        ]
    )
    food_and_drink_ideas: List[str] = Field(
        ..., 
        description="Themed snacks, drinks, and cake suggestions",
        examples=[
            "Astronaut freeze-dried ice cream",
            "Galaxy punch with dry ice smoky effect",
            "Rocket-shaped mini pizzas"
        ]
    )
    music_vibe: str = Field(
        ..., 
        description="Music suggestions to set the atmosphere",
        examples=["Synthwave beats, space movie soundtracks, and upbeat retro pop"]
    )
    party_schedule: List[str] = Field(
        ..., 
        description="Proposed timeline or event flow for the day",
        examples=[
            "14:00 - Launch Control Check-in (Guest Arrival)",
            "14:30 - Astronaut Academy (Scavenger Hunt)",
            "16:00 - Refueling Station (Cake & Food)"
        ]
    )
    personal_touch: str = Field(
        ..., 
        description="A unique, custom highlight that makes it extra memorable",
        examples=["Custom mission patches with each guest's name on arrival"]
    )
    ai_summary: str = Field(
        ..., 
        description="A concise summary of why this idea fits the profile perfectly",
        examples=["A thrilling outer space adventure tailored for a curious 10-year-old Gemini in Seattle who loves science fiction."]
    )
