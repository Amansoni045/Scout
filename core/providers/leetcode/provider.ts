import { CodingProfileProvider } from "../base/provider";
import { PlayerProfile } from "../../../types";
import { PROVIDER_RULES } from "../../config/provider-rules";
import { LEETCODE_SCOUT_QUERY } from "./queries";
import { LeetCodeRawResponse } from "./types";
import { logger } from "../../logger/logger";

export class LeetCodeProvider implements CodingProfileProvider {
  public readonly platform = "leetcode";

  public validateUsername(username: string): boolean {
    return PROVIDER_RULES.leetcode.usernameRegex.test(username);
  }

  public async fetchRawData(username: string): Promise<LeetCodeRawResponse> {
    const { graphqlEndpoint, timeoutMs, retryCount, backoffMs } = PROVIDER_RULES.leetcode;
    
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        logger.info(`Fetching LeetCode raw data for ${username} (attempt ${attempt}/${retryCount})`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const response = await fetch(graphqlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (DevCard Scout Agent)",
          },
          body: JSON.stringify({
            query: LEETCODE_SCOUT_QUERY,
            variables: { username },
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`LeetCode server responded with HTTP status ${response.status}`);
        }

        const payload = await response.json();
        
        if (payload.errors) {
          throw new Error(`LeetCode GraphQL error: ${payload.errors[0]?.message || "Unknown error"}`);
        }

        const data = payload.data as LeetCodeRawResponse;

        // LeetCode returns null for matchedUser if username does not exist
        if (!data.matchedUser) {
          throw new Error("USER_NOT_FOUND");
        }

        return data;
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
        
        // If it's user not found, don't retry
        if (lastError.message === "USER_NOT_FOUND") {
          throw lastError;
        }

        logger.warn(`Attempt ${attempt} failed: ${lastError.message}`);
        
        if (attempt < retryCount) {
          const waitTime = backoffMs * Math.pow(2, attempt - 1);
          logger.info(`Waiting ${waitTime}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    throw lastError || new Error("Failed to fetch LeetCode data after multiple attempts");
  }

  public normalize(rawData: unknown): PlayerProfile {
    const data = rawData as LeetCodeRawResponse;
    const user = data.matchedUser;

    if (!user) {
      throw new Error("Cannot normalize null user profile");
    }

    // Map difficulty solve counts
    const counts = user.submitStats.acSubmissionNum;
    const totalSolved = counts.find((c) => c.difficulty === "All")?.count || 0;
    const easySolved = counts.find((c) => c.difficulty === "Easy")?.count || 0;
    const mediumSolved = counts.find((c) => c.difficulty === "Medium")?.count || 0;
    const hardSolved = counts.find((c) => c.difficulty === "Hard")?.count || 0;

    // Calculate acceptance rate
    const totalSubmissions = counts.find((c) => c.difficulty === "All")?.submissions || 1;
    const acceptanceRate = totalSubmissions > 0 ? (totalSolved / totalSubmissions) * 100 : 0;

    // Normalize languages used
    const languages = user.languageProblemCount
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .map((l) => l.languageName);

    const recentActivity = data.recentSubmissionList || [];
    
    // We map badges with full CDN paths if local icons are relative
    const badges = user.badges.map((b) => ({
      name: b.name,
      iconUrl: b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`,
    }));

    return {
      username: user.username,
      avatar: user.profile.userAvatar.startsWith("http")
        ? user.profile.userAvatar
        : `https://leetcode.com${user.profile.userAvatar}`,
      country: user.profile.countryName,
      platform: "leetcode",
      ranking: user.profile.ranking,
      contestRating: data.userContestRanking?.rating || null,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      languages,
      streak: data.userContestRanking?.attendedContestsCount || 0, // Fallback streak representation using contest counts or activities
      recentActivityCount: recentActivity.length,
      badges,
      achievements: [], // Calculated downstream in card-engine
    };
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(PROVIDER_RULES.leetcode.graphqlEndpoint, {
        method: "HEAD",
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  public supportedFeatures(): Record<string, boolean> {
    return {
      contests: true,
      badges: true,
      languages: true,
      activity: true,
      streak: false, // Streak is calculated heuristically rather than raw
    };
  }
}
