"use client";

import React, { useTransition, useState } from "react";
import {
  Sparkles,
  Download,
  Share2,
  Palette,
  Activity,
  Lock,
  Shield,
  ArrowRight,
  Target,
  Award,
} from "lucide-react";
import { ScoutForm } from "@/components/generator/ScoutForm";
import { LoadingScreen } from "@/components/generator/LoadingScreen";
import { ErrorScreen } from "@/components/generator/ErrorScreen";
import { ScoutCard } from "@/components/card/ScoutCard";
import { ExportDropdown } from "@/components/generator/ExportDropdown";
import { useGenerator } from "@/hooks/use-generator";
import { exportDevCard } from "@/core/export-engine/engine";
import { DevCard as ScoutCardType, CardType } from "@/types";

// ─── Showcase cards ──────────────────────────────────────────────────────────
const SHOWCASE: ScoutCardType[] = [
  {
    profile: {
      username: "alex_codes",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=alex&backgroundColor=b6e3f4",
      country: "US",
      platform: "leetcode",
      ranking: 4200,
      contestRating: 1940,
      totalSolved: 610,
      easySolved: 210,
      mediumSolved: 330,
      hardSolved: 70,
      acceptanceRate: 61,
      languages: ["Python", "C++"],
      streak: 54,
      recentActivityCount: 22,
      badges: [],
      achievements: [],
    },
    stats: { ovr: 87, pac: 82, sho: 70, pas: 83, dri: 78, def: 86, phy: 88 },
    achievements: [{ id: "hard_hunter", title: "Hard Crusher", description: "", rarity: "epic" }],
    theme: {
      id: "gold",
      name: "Rare Gold",
      bgGradient: "linear-gradient(160deg, #1a0d00 0%, #3d1f00 35%, #78350f 65%, #5b2700 100%)",
      borderColor: "",
      glowEffect: "rgba(234,179,8,0.35)",
      holoOverlay: false,
      textColor: "text-amber-500",
      accentColor: "text-amber-300",
    },
    metadata: { cardType: "identity", ratingVersion: "v1", providerVersion: "v1", themeVersion: "v1", generatedAt: "" },
  },
  {
    profile: {
      username: "n_kode",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=nkode&backgroundColor=c0aede",
      country: "JP",
      platform: "leetcode",
      ranking: 88,
      contestRating: 2960,
      totalSolved: 1480,
      easySolved: 280,
      mediumSolved: 700,
      hardSolved: 500,
      acceptanceRate: 77,
      languages: ["C++", "Rust"],
      streak: 180,
      recentActivityCount: 60,
      badges: [],
      achievements: [],
    },
    stats: { ovr: 98, pac: 97, sho: 99, pas: 98, dri: 96, def: 97, phy: 99 },
    achievements: [
      { id: "legend", title: "Legend", description: "", rarity: "legendary" },
      { id: "crusher", title: "Crusher", description: "", rarity: "epic" },
    ],
    theme: {
      id: "galaxy",
      name: "Galaxy Edition",
      bgGradient: "linear-gradient(160deg, #0a0718 0%, #120b35 35%, #1e0f5c 65%, #0d0825 100%)",
      borderColor: "",
      glowEffect: "rgba(168,85,247,0.5)",
      holoOverlay: true,
      textColor: "text-purple-200",
      accentColor: "text-fuchsia-300",
    },
    metadata: { cardType: "identity", ratingVersion: "v1", providerVersion: "v1", themeVersion: "v1", generatedAt: "" },
  },
  {
    profile: {
      username: "priya_s",
      avatar: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=priya&backgroundColor=ffd5dc",
      country: "IN",
      platform: "leetcode",
      ranking: 22400,
      contestRating: 1540,
      totalSolved: 280,
      easySolved: 120,
      mediumSolved: 140,
      hardSolved: 20,
      acceptanceRate: 49,
      languages: ["Java", "Python"],
      streak: 11,
      recentActivityCount: 9,
      badges: [],
      achievements: [],
    },
    stats: { ovr: 74, pac: 68, sho: 60, pas: 70, dri: 65, def: 77, phy: 74 },
    achievements: [{ id: "consistent", title: "Consistent", description: "", rarity: "common" }],
    theme: {
      id: "silver",
      name: "Rare Silver",
      bgGradient: "linear-gradient(160deg, #111 0%, #1c1c1f 40%, #2a2a2e 70%, #111 100%)",
      borderColor: "",
      glowEffect: "rgba(161,161,170,0.2)",
      holoOverlay: false,
      textColor: "text-zinc-400",
      accentColor: "text-zinc-200",
    },
    metadata: { cardType: "identity", ratingVersion: "v1", providerVersion: "v1", themeVersion: "v1", generatedAt: "" },
  },
];

interface CardTypeOption {
  id: CardType;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const PLATFORMS = [
  { name: "LeetCode", active: true },
  { name: "GitHub", active: false },
  { name: "Codeforces", active: false },
  { name: "CodeChef", active: false },
  { name: "AtCoder", active: false },
];

export default function Home() {
  const { phase, error, card, opponentCard, scout, reset, message } = useGenerator();
  const [isPending, startTransition] = useTransition();
  const [selectedType, setSelectedType] = useState<CardType>("identity");
  const [activeShowcase, setActiveShowcase] = useState(1);

  const CARD_TYPES: CardTypeOption[] = [
    { id: "identity", title: "Identity", desc: "Flagship collectible token.", icon: <Shield className="w-4 h-4" /> },
    { id: "milestone", title: "Milestone", desc: "Celebrate verified milestones.", icon: <Sparkles className="w-4 h-4" /> },
    { id: "contest", title: "Contest", desc: "Show rating and competitive ranks.", icon: <Target className="w-4 h-4" /> },
    { id: "achievement", title: "Achievement", desc: "Display verified traits.", icon: <Award className="w-4 h-4" /> },
    { id: "wrapped", title: "Review", desc: "Wrapped infographic story.", icon: <Activity className="w-4 h-4" /> },
    { id: "comparison", title: "Comparison", desc: "Compare coding metrics.", icon: <Share2 className="w-4 h-4" /> },
  ];

  const handleScout = (username: string, opponentUsername?: string) => {
    startTransition(async () => {
      await scout(username, opponentUsername);
    });
  };

  const handleDownload = async (format: "png" | "jpg" | "svg") => {
    try {
      await exportDevCard("scout-capture-target", {
        format,
        template: "card",
        transparentBg: false,
        scale: 3,
      });
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const displayCard = card ?? SHOWCASE[activeShowcase];
  const isIdle = phase === "IDLE" && !error;
  const isLoading = phase !== "IDLE" && phase !== "READY" && !error;
  const isReady = phase === "READY" && !!card;

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-100 overflow-x-hidden font-sans pb-24">
      
      {/* Ambient visual background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[120px]" />
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="relative z-50 px-6 pt-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl">
            <Shield className="w-3.5 h-3.5 text-white/90" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 font-mono">
              Scout
            </span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[6.5px] font-black uppercase tracking-widest text-white/30 font-mono">
              BETA
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow max-w-5xl mx-auto w-full px-6 pt-16">
        
        {/* ════════════════════════════════════════════════════════════
            SECTION 1 — HERO
            ════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-16 md:py-24">
          
          {/* Headline + Configurator (Left Column) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[44px] md:text-[56px] font-black leading-[1.05] tracking-[-0.03em] text-white">
                Your Coding Profile.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Reimagined.
                </span>
              </h1>
              <p className="text-[14px] text-zinc-400 leading-relaxed max-w-sm">
                Turn your public coding accomplishments into premium collectible developer cards worth sharing.
              </p>
            </div>

            <div className="flex flex-col gap-8 max-w-md">
              {isIdle && !card && (
                <>
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 font-mono">
                      Choose Format
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {CARD_TYPES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedType(t.id)}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedType === t.id
                              ? "bg-white/5 border-amber-500/30"
                              : "bg-zinc-950/20 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <span className={`mt-0.5 ${selectedType === t.id ? "text-amber-400" : "text-zinc-500"}`}>
                            {t.icon}
                          </span>
                          <div>
                            <span className={`text-[11px] font-bold block ${selectedType === t.id ? "text-amber-400" : "text-white"}`}>
                              {t.title}
                            </span>
                            <span className="text-[9px] text-zinc-500 leading-tight block mt-0.5">
                              {t.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 font-mono">
                      Enter Username
                    </span>
                    <ScoutForm
                      onSubmit={handleScout}
                      isLoading={isPending}
                      isComparison={selectedType === "comparison"}
                    />
                  </div>
                </>
              )}

              {isLoading && (
                <LoadingScreen phase={phase} message={message} />
              )}
              {error && (
                <ErrorScreen error={error} onRetry={reset} />
              )}
              {isReady && (
                <div className="flex flex-col gap-3">
                  <p className="text-[9px] uppercase font-black tracking-widest text-white/30 font-mono">
                    Download {CARD_TYPES.find(c => c.id === selectedType)?.title}
                  </p>
                  <ExportDropdown
                    onExport={handleDownload}
                    cardTitle={CARD_TYPES.find((c) => c.id === selectedType)?.title || "Card"}
                  />
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer bg-zinc-950/20 border border-white/5 text-zinc-500 hover:text-white"
                  >
                    Back to Configurator
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Large Interactive Preview (Right Column) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div id="scout-capture-target" className="animate-float scale-[1.08] origin-center my-6">
              <ScoutCard card={displayCard} cardType={selectedType} opponentCard={opponentCard || undefined} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600 font-mono mt-8 select-none">
              ★ Previewing: {CARD_TYPES.find(c => c.id === selectedType)?.title} ★
            </span>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 — CARD SHOWCASE
            ════════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-white/[0.04] text-center">
          <div className="flex flex-col gap-4 mb-20">
            <h2 className="text-[32px] font-black tracking-[-0.02em] text-white">
              Built to Share.
            </h2>
            <p className="text-zinc-500 text-[14px] max-w-sm mx-auto leading-relaxed">
              Ratings and styles are earned directly from your verified algorithms.
            </p>
          </div>

          <div className="flex items-end justify-center gap-10">
            {SHOWCASE.map((c, i) => {
              const isCentre = i === activeShowcase;
              return (
                <div
                  key={c.profile.username}
                  className="transition-all duration-500 cursor-pointer"
                  style={{
                    transform: isCentre ? "scale(1.05) translateY(0px)" : "scale(0.82) translateY(20px)",
                    opacity: isCentre ? 1 : 0.5,
                    zIndex: isCentre ? 10 : 1,
                  }}
                  onClick={() => setActiveShowcase(i)}
                >
                  <ScoutCard card={c} cardType={selectedType} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-6 mt-14">
            {SHOWCASE.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#f59e0b" : i === 1 ? "#a855f7" : "#71717a",
                    opacity: i === activeShowcase ? 1 : 0.2,
                  }}
                />
                <span
                  className="text-[8px] font-black uppercase tracking-widest font-mono text-zinc-500"
                  style={{ color: i === activeShowcase ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}
                >
                  {c.theme.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3 — FEATURES (MAX 6, SIMPLE ICON + TITLE + SENTENCE)
            ════════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-white/[0.04]">
          <h2 className="text-[24px] font-black tracking-[-0.02em] text-white mb-16">
            Designed for Developers.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { icon: <Activity className="w-5 h-5 text-white/80" />, title: "Live Sync", desc: "Instantly fetch and map data from public logs." },
              { icon: <Download className="w-5 h-5 text-white/80" />, title: "HD Downloads", desc: "Export crisp, vector-scaled PNG, JPG, or SVG assets." },
              { icon: <Palette className="w-5 h-5 text-white/80" />, title: "Premium Themes", desc: "Unlock 10 hand-designed metallic rarity styles." },
              { icon: <Shield className="w-5 h-5 text-white/80" />, title: "Verified Stats", desc: "100% reproducible ratings generated directly from stats." },
              { icon: <Share2 className="w-5 h-5 text-white/80" />, title: "Built to Share", desc: "Optimized layouts for LinkedIn, X, and Instagram." },
              { icon: <Lock className="w-5 h-5 text-white/80" />, title: "No Authentication", desc: "Access public profile data without sharing credentials." },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  {f.icon}
                </div>
                <h3 className="text-[13px] font-black text-white uppercase tracking-wider font-mono">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4 — PLATFORMS
            ════════════════════════════════════════════════════════════ */}
        <section className="py-32 border-t border-white/[0.04]">
          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-[24px] font-black tracking-[-0.02em] text-white">Platforms</h2>
            <p className="text-xs text-zinc-500">Supported coding environments.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="relative px-5 py-2.5 rounded-xl text-xs font-black tracking-wide font-mono border"
                style={
                  p.active
                    ? { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "#ffffff" }
                    : { background: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.2)" }
                }
              >
                {p.name}
                {!p.active && (
                  <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-full text-[6px] font-black uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-[#818cf8]">
                    SOON
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-12 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 font-mono">
              Scout © {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-[10px] text-zinc-600 text-center">
            Not affiliated with LeetCode, EA Sports, or FIFA. Built for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
