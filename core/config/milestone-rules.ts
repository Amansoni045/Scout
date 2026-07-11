import { PlayerProfile } from "../../types";

export interface Milestone {
  id: string;
  title: string;
  category: "solved" | "hard" | "streak" | "rating" | "rank";
  value: number;
  trigger: (profile: PlayerProfile) => boolean;
  description: string;
}

export const MILESTONE_RULES: Milestone[] = [
  // Solved Milestones
  {
    id: "solved_1000",
    title: "1000 Problems Solved",
    category: "solved",
    value: 1000,
    trigger: (p) => p.totalSolved >= 1000,
    description: "Solved 1000 or more problems across all difficulty levels.",
  },
  {
    id: "solved_500",
    title: "500 Problems Solved",
    category: "solved",
    value: 500,
    trigger: (p) => p.totalSolved >= 500,
    description: "Solved 500 or more problems across all difficulty levels.",
  },
  {
    id: "solved_250",
    title: "250 Problems Solved",
    category: "solved",
    value: 250,
    trigger: (p) => p.totalSolved >= 250,
    description: "Solved 250 or more problems across all difficulty levels.",
  },
  {
    id: "solved_100",
    title: "100 Problems Solved",
    category: "solved",
    value: 100,
    trigger: (p) => p.totalSolved >= 100,
    description: "Solved 100 or more problems across all difficulty levels.",
  },

  // Hard Solved Milestones
  {
    id: "hard_100",
    title: "100 Hard Problems",
    category: "hard",
    value: 100,
    trigger: (p) => p.hardSolved >= 100,
    description: "Solved 100 or more advanced/hard problems.",
  },
  {
    id: "hard_50",
    title: "50 Hard Problems",
    category: "hard",
    value: 50,
    trigger: (p) => p.hardSolved >= 50,
    description: "Solved 50 or more advanced/hard problems.",
  },

  // Streak Milestones
  {
    id: "streak_365",
    title: "365 Day Streak",
    category: "streak",
    value: 365,
    trigger: (p) => (p.streak ?? 0) >= 365,
    description: "Maintained a continuous coding streak for a full year.",
  },
  {
    id: "streak_100",
    title: "100 Day Streak",
    category: "streak",
    value: 100,
    trigger: (p) => (p.streak ?? 0) >= 100,
    description: "Maintained a continuous coding streak for 100 days.",
  },
  {
    id: "streak_30",
    title: "30 Day Streak",
    category: "streak",
    value: 30,
    trigger: (p) => (p.streak ?? 0) >= 30,
    description: "Maintained a continuous coding streak for 30 days.",
  },

  // Contest Rating Milestones
  {
    id: "rating_2400",
    title: "Legendary Coder",
    category: "rating",
    value: 2400,
    trigger: (p) => (p.contestRating ?? 0) >= 2400,
    description: "Reached a contest rating of 2400+ (Legend level).",
  },
  {
    id: "rating_2000",
    title: "Guardian Status",
    category: "rating",
    value: 2000,
    trigger: (p) => (p.contestRating ?? 0) >= 2000,
    description: "Reached a contest rating of 2000+ (Guardian level).",
  },
  {
    id: "rating_1850",
    title: "Knight Status",
    category: "rating",
    value: 1850,
    trigger: (p) => (p.contestRating ?? 0) >= 1850,
    description: "Reached a contest rating of 1850+ (Knight level).",
  },
];

export function getUnlockedMilestones(profile: PlayerProfile): Milestone[] {
  return MILESTONE_RULES.filter((rule) => rule.trigger(profile));
}
