import { PlayerProfile } from "../../types";

export interface AISummary {
  summary: string;
  tags: string[];
}

export async function generateProfileAISummary(profile: PlayerProfile): Promise<AISummary> {
  // Purely structural for future implementation
  return {
    summary: `This developer has strong stats in ${profile.languages.slice(0, 2).join(", ")}.`,
    tags: ["Consistent Solver", "Polyglot"],
  };
}
