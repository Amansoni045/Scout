import { NextRequest, NextResponse } from "next/server";
import { LeetCodeProvider } from "@/core/providers/leetcode/provider";
import { generateDevCard } from "@/core/card-engine/engine";
import { ApiResponse, DevCard } from "@/types";
import { logger } from "@/core/logger/logger";
import { analytics } from "@/core/analytics/analytics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
): Promise<NextResponse<ApiResponse<DevCard>>> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const provider = new LeetCodeProvider();

  // 1. Syntactic validation
  if (!provider.validateUsername(decodedUsername)) {
    analytics.track({
      name: "generation_failed",
      properties: { code: "INVALID_USERNAME", message: "Invalid characters in username" },
    });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_USERNAME",
          message: "The username contains invalid characters or does not meet length requirements.",
        },
      },
      { status: 400 }
    );
  }

  try {
    // 2. Fetch and Normalize
    const rawData = await provider.fetchRawData(decodedUsername);
    const profile = provider.normalize(rawData);

    // 3. Generate DevCardCompiled Object
    const card = generateDevCard(profile, "identity");

    analytics.track({
      name: "card_generated",
      properties: { platform: "leetcode", rating: card.stats.ovr },
    });

    // 4. Return successful response with caching headers
    return NextResponse.json(
      { success: true, data: card },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(`Error generating devcard for ${decodedUsername}:`, err);

    if (err.message === "USER_NOT_FOUND") {
      analytics.track({
        name: "generation_failed",
        properties: { code: "USER_NOT_FOUND", message: `User ${decodedUsername} not found` },
      });
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: `The player "${decodedUsername}" could not be found on LeetCode.`,
          },
        },
        { status: 404 }
      );
    }

    analytics.track({
      name: "generation_failed",
      properties: { code: "FETCH_FAILED", message: err.message },
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PROVIDER_ERROR",
          message: "LeetCode is currently unresponsive. Please try again in a few minutes.",
          details: err.message,
        },
      },
      { status: 503 }
    );
  }
}
