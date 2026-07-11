export const RATING_THRESHOLDS = {
  // Pace represents submission consistency and active coding streaks
  pace: {
    streakWeight: 0.6,
    activityWeight: 0.4,
    maxStreak: 100,      // 100 days streak maps to 99 Pace
    maxActivity: 50,     // 50 submissions in last month maps to 99 Pace
  },
  // Shooting represents hard problem solving depth and focus
  shooting: {
    hardCountWeight: 0.7,
    ratioWeight: 0.3,
    maxHardSolved: 120,   // 120 hard solved maps to 99 Shooting
  },
  // Passing represents competitive programming/contests expertise
  passing: {
    contestRatingWeight: 0.8,
    attendanceWeight: 0.2,
    maxRating: 2500,     // 2500 contest rating maps to 99 Passing
    maxAttended: 30,     // 30 contests attended maps to 99 Passing
  },
  // Dribbling represents execution precision (acceptance rates)
  dribbling: {
    maxAcceptance: 80,   // 80%+ acceptance rate maps to 99 Dribbling
  },
  // Defending represents foundational algorithmic skills (easy & medium problems)
  defending: {
    easyWeight: 0.3,
    mediumWeight: 0.7,
    maxEasySolved: 300,  // 300 easy solved maps to 99 Easy attribute
    maxMediumSolved: 250,// 250 medium solved maps to 99 Medium attribute
  },
  // Physical represents sheer volume of total code/problems solved
  physical: {
    totalSolvedWeight: 0.8,
    languagesWeight: 0.2,
    maxTotalSolved: 800, // 800 total solved maps to 99 Physical attribute
    maxLanguages: 8,     // 8 programming languages maps to 99 Physical
  },
};
