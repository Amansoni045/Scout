import { CardType, DevCard, PlayerProfile } from "../../types";
import { calculateRatings } from "../rating-engine/engine";
import { detectAchievements } from "../achievement-engine/engine";
import { getThemeForRating } from "../theme-engine/engine";
import { APP_CONFIG } from "../config/constants";

export function generateDevCard(profile: PlayerProfile, cardType: CardType = "developer"): DevCard {
  const stats = calculateRatings(profile);
  const achievements = detectAchievements(profile);
  const theme = getThemeForRating(stats.ovr);

  return {
    profile,
    stats,
    achievements,
    theme,
    metadata: {
      cardType,
      ratingVersion: APP_CONFIG.versions.rating,
      providerVersion: APP_CONFIG.versions.provider,
      themeVersion: APP_CONFIG.versions.theme,
      generatedAt: new Date().toISOString(),
    },
  };
}
