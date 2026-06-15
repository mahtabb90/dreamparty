// TypeScript interfaces for request and response schemas

export interface PartyIdeaRequest {
  name: string;
  age: number;
  birthday_date: string;
  zodiac_sign: string;
  party_style: string;
  interests: string[];
  city: string;
  budget: string;
  guest_count: number;
}

export interface PartyIdeaResponse {
  celebration_title: string;
  theme_idea: string;
  color_palette: string[];
  invitation_text: string;
  decoration_ideas: string[];
  food_and_drink_ideas: string[];
  music_vibe: string;
  party_schedule: string[];
  personal_touch: string;
  ai_summary: string;
}

// Read API URL from environment variable, with a safe fallback to port 8001
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';

/**
 * Sends a request to the backend server to generate an AI birthday party proposal.
 * 
 * @param request PartyIdeaRequest parameters containing guest profile details.
 * @returns Promise<PartyIdeaResponse> parsed response containing detailed recommendations.
 */
export async function generatePartyIdea(request: PartyIdeaRequest): Promise<PartyIdeaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate-party-idea`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Server returned status: ${response.status}. Make sure the backend service is running.`);
  }

  const data = await response.json();
  return data as PartyIdeaResponse;
}
