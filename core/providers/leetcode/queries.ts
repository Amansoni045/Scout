export const LEETCODE_SCOUT_QUERY = `
query getDevCardScoutData($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      userAvatar
      ranking
      countryName
      reputation
    }
    badges {
      name
      icon
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
  }
  userContestRankingHistory(username: $username) {
    attended
    rating
  }
  recentSubmissionList(username: $username, limit: 15) {
    title
    timestamp
    statusDisplay
  }
}
`;
