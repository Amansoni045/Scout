import { logger } from "../logger/logger";

export type AnalyticsEvent =
  | { name: "card_generated"; properties: { platform: string; rating: number } }
  | { name: "card_downloaded"; properties: { format: string; theme: string } }
  | { name: "card_shared"; properties: { network: string } }
  | { name: "generation_failed"; properties: { code: string; message: string } };

export const analytics = {
  track: (event: AnalyticsEvent) => {
    logger.info(`[Analytics Event] ${event.name}`, event.properties);
    // Integration endpoint hook (e.g. Vercel Speed Insights, PostHog, or custom metrics DB in future)
  },
};
