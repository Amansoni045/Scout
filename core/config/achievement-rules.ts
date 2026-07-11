import { Achievement } from "../../types";

export interface AchievementRule {
  achievement: Achievement;
  trigger: (profile: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating: number | null;
    streak: number | null;
  }) => boolean;
}

export const ACHIEVEMENT_RULES: AchievementRule[] = [
  {
    achievement: {
      id: "hard_hunter",
      title: "Hard Hunter",
      description: "Solved more than 50 hard LeetCode problems.",
      rarity: "epic",
    },
    trigger: (p) => p.hardSolved >= 50,
  },
  {
    achievement: {
      id: "contest_clutcher",
      title: "Contest Clutcher",
      description: "Attained a contest rating higher than 2000.",
      rarity: "legendary",
    },
    trigger: (p) => (p.contestRating ?? 0) >= 2000,
  },
  {
    achievement: {
      id: "daily_grinder",
      title: "Daily Grinder",
      description: "Maintained a daily coding streak of at least 30 days.",
      rarity: "rare",
    },
    trigger: (p) => (p.streak ?? 0) >= 30,
  },
  {
    achievement: {
      id: "consistent_solver",
      title: "Consistent Solver",
      description: "Solved more than 300 total algorithms.",
      rarity: "common",
    },
    trigger: (p) => p.totalSolved >= 300,
  },
];
