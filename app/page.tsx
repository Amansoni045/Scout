"use client";

import React, { useTransition } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScoutForm } from "@/components/generator/ScoutForm";
import { LoadingScreen } from "@/components/generator/LoadingScreen";
import { ErrorScreen } from "@/components/generator/ErrorScreen";
import { DevCard } from "@/components/card/DevCard";
import { useGenerator } from "@/hooks/use-generator";
import { exportDevCard } from "@/core/export-engine/engine";
import { DevCard as DevCardType } from "@/types";

const mockCard: DevCardType = {
  profile: {
    username: "DevScout",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DevScout",
    country: "US",
    platform: "leetcode",
    ranking: 10543,
    contestRating: 1850,
    totalSolved: 480,
    easySolved: 150,
    mediumSolved: 250,
    hardSolved: 80,
    acceptanceRate: 62.4,
    languages: ["TypeScript", "Python", "Rust"],
    streak: 45,
    recentActivityCount: 24,
    badges: [],
    achievements: [],
  },
  stats: {
    ovr: 88,
    pac: 84,
    sho: 82,
    pas: 86,
    dri: 85,
    def: 89,
    phy: 90,
  },
  achievements: [
    { id: "hard_hunter", title: "Hard Hunter", description: "Solved 50+ hards", rarity: "epic" },
    { id: "daily_grinder", title: "Daily Grinder", description: "30+ streak", rarity: "rare" },
  ],
  theme: {
    id: "gold",
    name: "Rare Gold",
    bgGradient: "linear-gradient(135deg, #451a03 0%, #78350f 30%, #b45309 70%, #d97706 100%)",
    borderColor: "border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    glowEffect: "rgba(245, 158, 11, 0.25)",
    holoOverlay: false,
    textColor: "text-amber-500",
    accentColor: "text-amber-200",
  },
  metadata: {
    cardType: "developer",
    ratingVersion: "v1",
    providerVersion: "v1",
    themeVersion: "v1",
    generatedAt: new Date().toISOString(),
  },
};

export default function Home() {
  const { phase, error, card, scout, reset, message } = useGenerator();
  const [isPending, startTransition] = useTransition();

  const handleScoutSubmit = (username: string) => {
    startTransition(async () => {
      await scout(username);
    });
  };

  const handleDownload = async (format: "png" | "jpg" | "svg") => {
    const elId = "devcard-capture-target";
    try {
      await exportDevCard(elId, {
        format,
        template: "card",
        transparentBg: false,
        scale: 3, // High quality HD render
      });
    } catch (err) {
      console.error("Download trigger failed:", err);
    }
  };

  const activeCard = card || mockCard;
  const showMock = phase === "IDLE" && !error && !card;
  const isLoading = phase !== "IDLE" && phase !== "READY" && !error;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex-grow w-full">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">
              ⚽ FIFA-Style Coding Stats
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-zinc-100 max-w-2xl">
              Generate Your Developer Football Card
            </h1>
            
            <p className="text-base text-zinc-400 max-w-lg leading-relaxed">
              Transform your public LeetCode stats into a premium EA FC-inspired ultimate card. Ready to share on LinkedIn, Twitter, and Discord.
            </p>

            <div className="mt-4 w-full">
              {phase === "IDLE" && !error && (
                <ScoutForm onSubmit={handleScoutSubmit} isLoading={isPending} />
              )}

              {isLoading && (
                <div className="text-center py-6">
                  <LoadingScreen phase={phase} message={message} />
                </div>
              )}

              {error && (
                <div className="py-4">
                  <ErrorScreen error={error} onRetry={reset} />
                </div>
              )}

              {phase === "READY" && card && (
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleDownload("png")}
                      className="py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98]"
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => handleDownload("jpg")}
                      className="py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98]"
                    >
                      JPG
                    </button>
                    <button
                      onClick={() => handleDownload("svg")}
                      className="py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98]"
                    >
                      SVG
                    </button>
                  </div>
                  <button
                    onClick={reset}
                    className="py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-bold rounded-xl text-xs uppercase tracking-widest cursor-pointer transition-all"
                  >
                    Generate Another
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CARD PREVIEW SECTION */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {(showMock || phase === "READY") && (
              <div id="devcard-capture-target" className="relative p-4">
                <DevCard card={activeCard} />
              </div>
            )}
            
            {showMock && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-mono mt-4">
                Interactive Preview (Hover to tilt)
              </span>
            )}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="mt-28 border-t border-white/5 pt-16">
          <h2 className="text-2xl font-black uppercase tracking-wider font-mono text-zinc-100 mb-8 text-center">
            Scouting Mechanism Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-2 text-left">
              <span className="text-2xl">🔥</span>
              <h3 className="font-bold text-zinc-200">1-99 Normalization</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Raw solved counts, streams, and activity logs are mapped against dynamic global benchmarks to assign FIFA attributes.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-2 text-left">
              <span className="text-2xl">🏆</span>
              <h3 className="font-bold text-zinc-200">Trait System</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Automatically awards coding achievement tags like &quot;Hard Hunter&quot;, &quot;Daily Grinder&quot;, and &quot;Contest Clutcher&quot; based on benchmarks.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-2 text-left">
              <span className="text-2xl">⚡</span>
              <h3 className="font-bold text-zinc-200">Ultra-High Definition</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Generate high-resolution HD exports up to 3x pixel ratio, ready to post on LinkedIn and Twitter.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
