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
    languages: string[];
    acceptanceRate: number;
  }) => boolean;
}

export const ACHIEVEMENT_RULES: AchievementRule[] = [
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
      id: "consistency_king",
      title: "Consistency King",
      description: "Maintained a continuous daily coding streak of 100+ days.",
      rarity: "legendary",
    },
    trigger: (p) => (p.streak ?? 0) >= 100,
  },
  {
    achievement: {
      id: "algorithm_master",
      title: "Algorithm Master",
      description: "Solved more than 600 algorithms in total.",
      rarity: "epic",
    },
    trigger: (p) => p.totalSolved >= 600,
  },
  {
    achievement: {
      id: "hard_hunter",
      title: "Hard Hunter",
      description: "Successfully solved 50+ hard difficulty problems.",
      rarity: "epic",
    },
    trigger: (p) => p.hardSolved >= 50,
  },
  {
    achievement: {
      id: "daily_grinder",
      title: "Daily Grinder",
      description: "Maintained an active coding streak of 30+ days.",
      rarity: "rare",
    },
    trigger: (p) => (p.streak ?? 0) >= 30,
  },
  {
    achievement: {
      id: "language_explorer",
      title: "Language Explorer",
      description: "Solved algorithms using 5 or more different languages.",
      rarity: "rare",
    },
    trigger: (p) => p.languages.length >= 5,
  },
  {
    achievement: {
      id: "accuracy_expert",
      title: "Accuracy Expert",
      description: "Maintained an overall submission accuracy rate of 65% or above with 100+ solved.",
      rarity: "rare",
    },
    trigger: (p) => p.acceptanceRate >= 65 && p.totalSolved >= 100,
  },
  {
    achievement: {
      id: "problem_crusher",
      title: "Problem Crusher",
      description: "Completed more than 200 coding problems.",
      rarity: "common",
    },
    trigger: (p) => p.totalSolved >= 200,
  },
];
