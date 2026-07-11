import { CardStats, PlayerProfile } from "../../types";
import { RATING_THRESHOLDS } from "../config/rating-rules";

function clamp(value: number, min = 1, max = 99): number {
  return Math.min(Math.max(Math.round(value), min), max);
}

export function calculateRatings(profile: PlayerProfile): CardStats {
  const { pace, shooting, passing, dribbling, defending, physical } = RATING_THRESHOLDS;

  // 1. PACE: consistency
  const activeStreak = profile.streak ?? 0;
  const streakPct = Math.min(activeStreak / pace.maxStreak, 1);
  const activityPct = Math.min(profile.recentActivityCount / pace.maxActivity, 1);
  const pac = clamp(
    (streakPct * pace.streakWeight + activityPct * pace.activityWeight) * 99
  );

  // 2. SHOOTING: hard problems
  const hardPct = Math.min(profile.hardSolved / shooting.maxHardSolved, 1);
  const hardRatio = profile.totalSolved > 0 ? profile.hardSolved / profile.totalSolved : 0;
  const sho = clamp(
    (hardPct * shooting.hardCountWeight + Math.min(hardRatio * 5, 1) * shooting.ratioWeight) * 99
  );

  // 3. PASSING: contests
  const ratingPct = profile.contestRating
    ? Math.min(profile.contestRating / passing.maxRating, 1)
    : 0.4; // Fallback median passing skill
  const attendancePct = Math.min((profile.streak ?? 0) / passing.maxAttended, 1); // approximate contest participation
  const pas = clamp(
    (ratingPct * passing.contestRatingWeight + attendancePct * passing.attendanceWeight) * 99
  );

  // 4. DRIBBLING: acceptance rate precision
  const dri = clamp((Math.min(profile.acceptanceRate / dribbling.maxAcceptance, 1)) * 99);

  // 5. DEFENDING: easy & medium solved
  const easyPct = Math.min(profile.easySolved / defending.maxEasySolved, 1);
  const medPct = Math.min(profile.mediumSolved / defending.maxMediumSolved, 1);
  const def = clamp(
    (easyPct * defending.easyWeight + medPct * defending.mediumWeight) * 99
  );

  // 6. PHYSICAL: total volume + language versatility
  const totalPct = Math.min(profile.totalSolved / physical.maxTotalSolved, 1);
  const langPct = Math.min(profile.languages.length / physical.maxLanguages, 1);
  const phy = clamp(
    (totalPct * physical.totalSolvedWeight + langPct * physical.languagesWeight) * 99
  );

  // 7. OVERALL: Weighted average of the attributes
  const ovr = clamp((pac + sho + pas + dri + def + phy) / 6);

  return { ovr, pac, sho, pas, dri, def, phy };
}
