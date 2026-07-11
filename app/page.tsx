"use client";

import React, { useTransition, useState } from "react";
import { ScoutForm } from "@/components/generator/ScoutForm";
import { LoadingScreen } from "@/components/generator/LoadingScreen";
import { ErrorScreen } from "@/components/generator/ErrorScreen";
import { ScoutCard } from "@/components/card/ScoutCard";
import { useGenerator } from "@/hooks/use-generator";
import { exportDevCard } from "@/core/export-engine/engine";
import { DevCard as ScoutCardType, CardType } from "@/types";
import { explainRating } from "@/core/rating-engine/engine";
import { getUnlockedMilestones } from "@/core/config/milestone-rules";

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

// ─── Card Options ────────────────────────────────────────────────────────────
interface CardTypeOption {
  id: CardType;
  title: string;
  desc: string;
  emoji: string;
}

const CARD_TYPES: CardTypeOption[] = [
  { id: "identity", title: "Identity Card", desc: "Flagship football-inspired developer token", emoji: "⚡" },
  { id: "milestone", title: "Milestone Card", desc: "Celebrate and display a single record solved count", emoji: "🏆" },
  { id: "contest", title: "Contest Card", desc: "Show off ratings and competitive programming ranks", emoji: "⚔️" },
  { id: "achievement", title: "Achievement Card", desc: "Display a specific verified coding badge", emoji: "🔮" },
  { id: "wrapped", title: "Year in Review", desc: "Infographic story detailing problem distributions", emoji: "📊" },
  { id: "comparison", title: "Comparison Card", desc: "Compare your coding metrics side-by-side", emoji: "🥊" },
];

const PLATFORMS = [
  { name: "LeetCode", active: true },
  { name: "GitHub", active: false },
  { name: "Codeforces", active: false },
  { name: "CodeChef", active: false },
  { name: "AtCoder", active: false },
];

export default function Home() {
  const { phase, error, card, scout, reset, message } = useGenerator();
  const [isPending, startTransition] = useTransition();
  const [selectedType, setSelectedType] = useState<CardType>("identity");
  const [activeShowcase, setActiveShowcase] = useState(1);
  const [showCalculationPanel, setShowCalculationPanel] = useState(false);

  const handleScout = (username: string) => {
    startTransition(async () => {
      await scout(username);
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
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-100 overflow-x-hidden font-sans">
      
      {/* ── Atmospheric backdrop ─────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-purple-600/[0.025] blur-[100px]" />
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="relative z-50 px-6 pt-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
            <span className="text-base leading-none select-none">⚡</span>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white/80 font-mono">
              Scout
            </span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[7px] font-black uppercase tracking-widest text-white/30 font-mono">
              BETA
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow max-w-5xl mx-auto w-full px-6">
        
        {/* ════════════════════════════════════════════════════════════
            SECTION 1 — HERO
            ════════════════════════════════════════════════════════════ */}
        <section className="pt-16 md:pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ── LEFT: Headline + Card Configurator ──────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.03] text-[9px] uppercase font-black tracking-[0.2em] text-white/40 font-mono">
              ◆ The Canva for Developer Achievements
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-[40px] md:text-[50px] font-black leading-[1.05] tracking-[-0.02em] text-white">
                Celebrate Your Coding Journey.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Beautifully.
                </span>
              </h1>
              <p className="text-[14px] text-zinc-400 leading-relaxed max-w-sm">
                Turn your public coding achievements, milestones, and contest performance into beautiful developer shareables.
              </p>
            </div>

            {/* Configurator Form Zone */}
            <div className="flex flex-col gap-6">
              {isIdle && !card && (
                <>
                  {/* Step 1: Card Type Selector */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-mono">
                      Step 1: Choose Shareable Format
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {CARD_TYPES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedType(t.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedType === t.id
                              ? "bg-white/5 border-amber-500/40 shadow-inner"
                              : "bg-zinc-950/20 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <span className="text-xl select-none mt-0.5">{t.emoji}</span>
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

                  {/* Step 2: Username and Generate */}
                  <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-mono">
                      Step 2: Enter Username
                    </span>
                    <ScoutForm onSubmit={handleScout} isLoading={isPending} />
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
                  <div className="flex gap-2">
                    {(["png", "jpg", "svg"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => handleDownload(fmt)}
                        className="flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.97] cursor-pointer"
                        style={
                          fmt === "png"
                            ? { background: "#fff", color: "#09090b" }
                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                        }
                      >
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer bg-zinc-950/20 border border-white/5 text-zinc-500 hover:text-white"
                  >
                    Back to Configurator
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Animated Preview ─────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div id="scout-capture-target" className="animate-float">
              <ScoutCard card={displayCard} cardType={selectedType} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 font-mono mt-5 select-none">
              ★ Previewing: {CARD_TYPES.find(c => c.id === selectedType)?.title} ★
            </span>

            {/* Transparency Explainer Accordion */}
            <div className="w-full max-w-[340px] mt-4 z-20">
              <button
                onClick={() => setShowCalculationPanel(!showCalculationPanel)}
                className="w-full py-2.5 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center justify-between text-[10px] text-zinc-400 hover:text-white font-mono uppercase tracking-wider cursor-pointer"
              >
                <span>🔬 How was this calculated?</span>
                <span>{showCalculationPanel ? "▲" : "▼"}</span>
              </button>

              {showCalculationPanel && (
                <div className="mt-2.5 p-4 rounded-xl border border-white/5 bg-zinc-950/85 backdrop-blur-md text-left flex flex-col gap-4 text-xs max-h-[300px] overflow-y-auto no-scrollbar shadow-2xl animate-reveal">
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[9px]">OVR Weighting Formula</h4>
                    <p className="text-[9px] text-zinc-500 mt-1 font-mono">
                      OVR = SOL(15%) + HRD(20%) + CP(20%) + ACC(15%) + DSA(15%) + PHY(15%)
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {explainRating(displayCard.profile).breakdown.map((b) => (
                      <div key={b.stat} className="border-b border-white/5 pb-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-300 font-mono text-[9.5px]">{b.stat}</span>
                          <span className="font-mono font-bold text-amber-400">{b.score}</span>
                        </div>
                        <p className="text-[9.5px] text-zinc-500 mt-0.5 leading-relaxed">{b.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Milestones Unlocked */}
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[9px] mb-2">Unlocked Milestones</h4>
                    {getUnlockedMilestones(displayCard.profile).length === 0 ? (
                      <p className="text-[9px] text-zinc-500 font-mono">No major milestones unlocked yet.</p>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        {getUnlockedMilestones(displayCard.profile).map((m) => (
                          <div key={m.id} className="flex justify-between items-center p-2 rounded bg-white/5 text-[9.5px]">
                            <span className="font-bold text-zinc-300">{m.title}</span>
                            <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-widest font-mono font-bold">VERIFIED</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2 — CARD SHOWCASE
            ════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="flex flex-col gap-4 mb-14 text-center">
            <h2 className="text-[28px] font-black tracking-[-0.02em] text-white">
              Every Developer Earns Their Rarity
            </h2>
            <p className="text-sm text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Ratings are calculated from real coding data. Higher performance unlocks rarer card designs.
            </p>
          </div>

          <div className="flex items-end justify-center gap-6 md:gap-10">
            {SHOWCASE.map((c, i) => {
              const isCentre = i === activeShowcase;
              return (
                <div
                  key={c.profile.username}
                  className="transition-all duration-500 cursor-pointer"
                  style={{
                    transform: isCentre
                      ? "scale(1) translateY(0px)"
                      : `scale(0.82) translateY(20px)`,
                    opacity: isCentre ? 1 : 0.65,
                    zIndex: isCentre ? 10 : 1,
                  }}
                  onClick={() => setActiveShowcase(i)}
                >
                  <ScoutCard card={c} cardType={selectedType} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-6 mt-10">
            {SHOWCASE.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#f59e0b" : i === 1 ? "#a855f7" : "#71717a",
                    opacity: i === activeShowcase ? 1 : 0.3,
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
            SECTION 3 — WHY SCOUT
            ════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.04]">
          <h2 className="text-[22px] font-black tracking-[-0.02em] text-white mb-12">
            Build your brand.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Generate in Seconds", desc: "Enter your public username. Scout fetches, scores, and renders your card instantly." },
              { icon: "📥", title: "Download in HD", desc: "Export crisp PNG, JPG, or SVG at 3x resolution, ready for any format." },
              { icon: "🌍", title: "Share Anywhere", desc: "LinkedIn, X, Instagram, Discord. Your card is designed to travel." },
              { icon: "🎨", title: "10 Premium Themes", desc: "Bronze, Silver, Gold, Champion, Shadow, Neon, Inferno, Crystal, Legend, Galaxy." },
              { icon: "🚀", title: "Live Coding Data", desc: "Ratings computed directly from your real solved counts, streaks, and contest history." },
              { icon: "🔒", title: "No Login Required", desc: "We only fetch public profile data. Zero accounts, zero passwords, zero friction." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col gap-2.5">
                <span className="text-xl">{f.icon}</span>
                <h3 className="text-sm font-black text-white tracking-tight">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4 — PLATFORMS
            ════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-[22px] font-black tracking-[-0.02em] text-white font-sans">Platforms</h2>
            <p className="text-xs text-zinc-500">More platforms arriving soon.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="relative px-4 py-2 rounded-xl text-xs font-black tracking-wide font-mono border"
                style={
                  p.active
                    ? { background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#ffffff" }
                    : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }
                }
              >
                {p.name}
                {!p.active && (
                  <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-full text-[6px] font-black uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/20 text-[#818cf8]">
                    SOON
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚡</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 font-mono">
              Scout © {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-[10px] text-white/20 text-center">
            Not affiliated with LeetCode, EA Sports, or FIFA. Built for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
