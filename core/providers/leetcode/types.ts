export interface LeetCodeRawResponse {
  matchedUser: {
    username: string;
    profile: {
      realName: string;
      userAvatar: string;
      ranking: number;
      countryName: string | null;
      reputation: number;
    };
    badges: Array<{
      name: string;
      icon: string;
    }>;
    submitStats: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
        submissions: number;
      }>;
    };
    languageProblemCount: Array<{
      languageName: string;
      problemsSolved: number;
    }>;
  } | null;
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
  } | null;
  userContestRankingHistory: Array<{
    attended: boolean;
    rating: number;
  }> | null;
  // Recent activity:
  recentSubmissionList: Array<{
    title: string;
    timestamp: string;
    statusDisplay: string;
  }> | null;
}
