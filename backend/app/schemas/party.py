from typing import List
from pydantic import BaseModel, Field, ConfigDict


class PartyIdeaRequest(BaseModel):
    """
    Schema for the party generation request payload.
    """
    model_config = ConfigDict(extra='ignore')
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
    model_config = ConfigDict(extra='ignore')

    celebration_title: str = Field(
        ..., 
        description="A catchy, premium name for the celebration"
    )
    theme_idea: str = Field(
        ..., 
        description="Detailed description of the theme and overall concept"
    )
    color_palette: List[str] = Field(
        ..., 
        description="Recommended color scheme for decorations and invites"
    )
    invitation_text: str = Field(
        ..., 
        description="Ready-to-use template text for invitations"
    )
    decoration_ideas: List[str] = Field(
        ..., 
        description="Key visual styling and prop recommendations"
    )
    food_and_drink_ideas: List[str] = Field(
        ..., 
        description="Themed snacks, drinks, and cake suggestions"
    )
    music_vibe: str = Field(
        ..., 
        description="Music suggestions to set the atmosphere"
    )
    party_schedule: List[str] = Field(
        ..., 
        description="Proposed timeline or event flow for the day"
    )
    personal_touch: str = Field(
        ..., 
        description="A unique, custom highlight that makes it extra memorable"
    )
    ai_summary: str = Field(
        ..., 
        description="A concise summary of why this idea fits the profile perfectly"
    )
