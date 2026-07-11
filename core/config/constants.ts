export const APP_CONFIG = {
  name: "DevCard",
  tagline: "Generate Your Developer Football Card",
  description: "Transform your public coding profiles into premium football-inspired developer cards.",
  url: "https://devcard.vercel.app", // Fallback production URL
  versions: {
    rating: "v1",
    theme: "v1",
    provider: "v1",
  },
  supportedPlatforms: ["leetcode"] as const,
};
