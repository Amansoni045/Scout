import { CardStats, PlayerProfile } from "../../types";
import { RATING_CONFIG, TIERS, Benchmarks } from "../config/rating-rules";

// Piecewise linear interpolation to normalize raw metrics to a 10-99 score based on realistic benchmarks
export function normalizeMetric(val: number, benchmarks: Benchmarks): number {
  const { rookie, average, advanced, elite, top1percent } = benchmarks;
  
  if (val <= rookie) return 10;
  
  if (val <= average) {
    // rookie (10) -> average (50)
    return 10 + ((val - rookie) / (average - rookie)) * 40;
  }
  if (val <= advanced) {
    // average (50) -> advanced (75)
    return 50 + ((val - average) / (advanced - average)) * 25;
  }
  if (val <= elite) {
    // advanced (75) -> elite (90)
    return 75 + ((val - advanced) / (elite - advanced)) * 15;
  }
  if (val <= top1percent) {
    // elite (90) -> top 1% (99)
    return 90 + ((val - elite) / (top1percent - elite)) * 9;
  }
  
  return 99; // maximum attainable rating attribute
}

export function getTierName(ovr: number): string {
  const matched = TIERS.find((t) => ovr >= t.min && ovr <= t.max);
  return matched ? matched.name : "Rookie";
}

export function calculateRatings(profile: PlayerProfile): CardStats {
  const cfg = RATING_CONFIG;

  // 1. PAC (Consistency & Active Coding Streak)
  const streakScore = normalizeMetric(profile.streak ?? 0, cfg.pace.streak.benchmarks);
  const activityScore = normalizeMetric(profile.recentActivityCount, cfg.pace.recentActivity.benchmarks);
  const pac = Math.round(streakScore * cfg.pace.streak.weight + activityScore * cfg.pace.recentActivity.weight);

  // 2. SHO (Hard Problems Mastery)
  const hardScore = normalizeMetric(profile.hardSolved, cfg.shooting.hardSolved.benchmarks);
  const ratio = profile.totalSolved > 0 ? profile.hardSolved / profile.totalSolved : 0;
  const ratioScore = normalizeMetric(ratio, cfg.shooting.hardRatio.benchmarks);
  const sho = Math.round(hardScore * cfg.shooting.hardSolved.weight + ratioScore * cfg.shooting.hardRatio.weight);

  // 3. PAS (Competitive Programming & Contest Rating)
  const cRating = profile.contestRating ?? 1000; // default base LeetCode contest rating
  const contestRatingScore = normalizeMetric(cRating, cfg.passing.contestRating.benchmarks);
  // contest attendance or badges count acts as experience
  const attendanceScore = normalizeMetric(profile.badges.length, cfg.passing.contestAttendance.benchmarks);
  const pas = Math.round(contestRatingScore * cfg.passing.contestRating.weight + attendanceScore * cfg.passing.contestAttendance.weight);

  // 4. DRI (Acceptance Rate Precision)
  const dri = Math.round(normalizeMetric(profile.acceptanceRate, cfg.dribbling.acceptanceRate.benchmarks));

  // 5. DEF (DSA Fundamentals - Easy & Medium solved counts)
  const easyScore = normalizeMetric(profile.easySolved, cfg.defending.easySolved.benchmarks);
  const mediumScore = normalizeMetric(profile.mediumSolved, cfg.defending.mediumSolved.benchmarks);
  const def = Math.round(easyScore * cfg.defending.easySolved.weight + mediumScore * cfg.defending.mediumSolved.weight);

  // 6. PHY (Physical - Total Solved Volume, Multi-language Versatility & Badges count)
  const totalScore = normalizeMetric(profile.totalSolved, cfg.physical.totalSolved.benchmarks);
  const langScore = normalizeMetric(profile.languages.length, cfg.physical.languages.benchmarks);
  const badgesScore = normalizeMetric(profile.badges.length, cfg.physical.badges.benchmarks);
  const phy = Math.round(
    totalScore * cfg.physical.totalSolved.weight +
    langScore * cfg.physical.languages.weight +
    badgesScore * cfg.physical.badges.weight
  );

  // 7. OVERALL OVR (Weighted rating mapped to ensure contest performance & raw DSA volume balance each other out)
  const rawOvr =
    pac * cfg.ovrWeights.pac +
    sho * cfg.ovrWeights.sho +
    pas * cfg.ovrWeights.pas +
    dri * cfg.ovrWeights.dri +
    def * cfg.ovrWeights.def +
    phy * cfg.ovrWeights.phy;

  const ovr = Math.min(Math.max(Math.round(rawOvr), 10), 99);

  return { ovr, pac, sho, pas, dri, def, phy };
}

export interface RatingExplanation {
  ovr: number;
  tier: string;
  breakdown: Array<{
    stat: string;
    score: number;
    description: string;
  }>;
}

export function explainRating(profile: PlayerProfile): RatingExplanation {
  const stats = calculateRatings(profile);
  const tier = getTierName(stats.ovr);
  
  return {
    ovr: stats.ovr,
    tier,
    breakdown: [
      {
        stat: "OVERALL",
        score: stats.ovr,
        description: `Your general rank is categorized as "${tier}". Calculated using a weighted formula balancing contest proficiency, streak consistency, and DSA problem completion depth.`,
      },
      {
        stat: "PACE (Consistency)",
        score: stats.pac,
        description: `Derived from streak length (${profile.streak ?? 0} days) and active submissions in the last month (${profile.recentActivityCount} active days).`,
      },
      {
        stat: "SHOOTING (Hard Problems)",
        score: stats.sho,
        description: `Measures advanced capabilities. Based on ${profile.hardSolved} hard algorithms solved, which is ${profile.totalSolved > 0 ? Math.round((profile.hardSolved / profile.totalSolved) * 100) : 0}% of your total solved set.`,
      },
      {
        stat: "PASSING (Contests)",
        score: stats.pas,
        description: `Reflects competitive coding competence. Mapped using your official LeetCode Contest Rating (${profile.contestRating ?? "Unrated"}) and contest performance badges.`,
      },
      {
        stat: "DRIBBLING (Accuracy)",
        score: stats.dri,
        description: `Tracks precision. Directly correlates to your overall submission acceptance rate (${profile.acceptanceRate}%).`,
      },
      {
        stat: "DEFENDING ( DSA Volume)",
        score: stats.def,
        description: `Evaluates fundamental algorithmic knowledge. Based on ${profile.easySolved} easy and ${profile.mediumSolved} medium difficulty problem completions.`,
      },
      {
        stat: "PHYSICAL (Breadth)",
        score: stats.phy,
        description: `Shows experience and versatility. Determined by your total solved volume (${profile.totalSolved} problems), language variety (${profile.languages.join(", ") || "none"}), and earned profile badges.`,
      },
    ],
  };
}
