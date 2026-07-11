export const PROVIDER_RULES = {
  leetcode: {
    graphqlEndpoint: "https://leetcode.com/graphql",
    usernameRegex: /^[a-zA-Z0-9_\-]{3,30}$/,
    timeoutMs: 8000,
    retryCount: 3,
    backoffMs: 1000,
  },
};
