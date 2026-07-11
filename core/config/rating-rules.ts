export interface Benchmarks {
  rookie: number;
  average: number;
  advanced: number;
  elite: number;
  top1percent: number;
}

export interface StatConfig {
  weight: number;
  benchmarks: Benchmarks;
}

export const TIERS = [
  { name: "Legend", min: 95, max: 99 },
  { name: "Elite", min: 90, max: 94 },
  { name: "Professional", min: 80, max: 89 },
  { name: "Advanced", min: 70, max: 79 },
  { name: "Intermediate", min: 60, max: 69 },
  { name: "Beginner", min: 40, max: 59 },
  { name: "Rookie", min: 1, max: 39 },
];

export const RATING_CONFIG = {
  // Stat: PACE (Submission Consistency & Recent Momentum)
  pace: {
    streak: {
      weight: 0.6,
      benchmarks: { rookie: 0, average: 5, advanced: 20, elite: 50, top1percent: 150 },
    },
    recentActivity: {
      weight: 0.4,
      benchmarks: { rookie: 0, average: 5, advanced: 15, elite: 30, top1percent: 80 },
    },
  },
  // Stat: SHOOTING (Hard Problems Mastery)
  shooting: {
    hardSolved: {
      weight: 0.7,
      benchmarks: { rookie: 0, average: 10, advanced: 40, elite: 100, top1percent: 250 },
    },
    hardRatio: {
      // hard / total solved
      weight: 0.3,
      benchmarks: { rookie: 0.0, average: 0.05, advanced: 0.12, elite: 0.20, top1percent: 0.35 },
    },
  },
  // Stat: PASSING (Competitive Programming & Contest Rating)
  passing: {
    contestRating: {
      weight: 0.8,
      benchmarks: { rookie: 1000, average: 1450, advanced: 1800, elite: 2150, top1percent: 2600 },
    },
    contestAttendance: {
      // mapped from active submissions & badges as participation index
      weight: 0.2,
      benchmarks: { rookie: 0, average: 2, advanced: 8, elite: 20, top1percent: 50 },
    },
  },
  // Stat: DRIBBLING (Code Accuracy & Acceptance Rate)
  dribbling: {
    acceptanceRate: {
      weight: 1.0,
      benchmarks: { rookie: 10, average: 40, advanced: 50, elite: 65, top1percent: 85 },
    },
  },
  // Stat: DEFENDING (Foundational DSA - Easy & Medium Volume)
  defending: {
    easySolved: {
      weight: 0.3,
      benchmarks: { rookie: 0, average: 50, advanced: 150, elite: 300, top1percent: 600 },
    },
    mediumSolved: {
      weight: 0.7,
      benchmarks: { rookie: 0, average: 30, advanced: 100, elite: 250, top1percent: 500 },
    },
  },
  // Stat: PHYSICAL (Total Code Volume, Versatility & Breadth)
  physical: {
    totalSolved: {
      weight: 0.7,
      benchmarks: { rookie: 0, average: 80, advanced: 250, elite: 550, top1percent: 1200 },
    },
    languages: {
      weight: 0.2,
      benchmarks: { rookie: 1, average: 2, advanced: 4, elite: 6, top1percent: 10 },
    },
    badges: {
      weight: 0.1,
      benchmarks: { rookie: 0, average: 1, advanced: 3, elite: 5, top1percent: 12 },
    },
  },
  // Overall OVR weighting multipliers to ensure fair cross-attribute penalty/bonus mapping
  ovrWeights: {
    pac: 0.15,
    sho: 0.20,
    pas: 0.20,
    dri: 0.15,
    def: 0.15,
    phy: 0.15,
  },
};
