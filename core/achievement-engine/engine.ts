import { Achievement, PlayerProfile } from "../../types";
import { ACHIEVEMENT_RULES } from "../config/achievement-rules";

export function detectAchievements(profile: PlayerProfile): Achievement[] {
  const achievements: Achievement[] = [];

  for (const rule of ACHIEVEMENT_RULES) {
    const isTriggered = rule.trigger({
      totalSolved: profile.totalSolved,
      easySolved: profile.easySolved,
      mediumSolved: profile.mediumSolved,
      hardSolved: profile.hardSolved,
      contestRating: profile.contestRating,
      streak: profile.streak,
      languages: profile.languages,
      acceptanceRate: profile.acceptanceRate,
    });

    if (isTriggered) {
      achievements.push(rule.achievement);
    }
  }

  return achievements;
}
