"use client";

import React from "react";
import { DevCard as ScoutCardType, CardType } from "../../types";
import { useCardTilt } from "@/hooks/use-parallax";
import { getUnlockedMilestones } from "@/core/config/milestone-rules";

interface Props {
  card: ScoutCardType;
  cardType?: CardType;
}

// ─── Stat abbreviations for CP/Developer Stats ──────────────────────────────
const STAT_LABELS: Record<string, string> = {
  pac: "SOL",  // Total Solved
  sho: "HRD",  // Hard problems solved
  pas: "MED",  // Medium problems solved
  dri: "STK",  // Coding streak
  def: "ACC",  // Acceptance rate
  phy: "CNT",  // Contest rating
};

export function ScoutCard({ card, cardType }: Props) {
  const activeType = cardType || card.metadata.cardType || "identity";
  const { profile, stats, achievements, theme } = card;
  const topAchievements = achievements.slice(0, 2);
  const { containerRef, rotate, lightX, lightY, isHovered, onMouseMove, onMouseLeave } =
    useCardTilt();

  // Render the matching layout based on CardType selection
  switch (activeType) {
    case "identity":
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div
            className="scout-card-glow w-full h-full"
            style={{ "--card-glow-color": card.theme.glowEffect } as React.CSSProperties}
          >
            <div
              className="w-full h-full"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Outer Metallic Border Ring */}
              <div className={`absolute inset-0 scout-shield-border metallic-${card.theme.id}`} />
              {/* Inner Dark Inset Bevel */}
              <div className="absolute scout-shield-border" style={{ inset: "3px", background: "rgba(0,0,0,0.85)" }} />
              {/* Card Body */}
              <div
                className="absolute scout-shield overflow-hidden"
                style={{ inset: "6px", background: card.theme.bgGradient }}
              >
                {/* Specular highlights */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 pointer-events-none z-10 card-shimmer overflow-hidden" />
                
                {/* Content */}
                <div className="relative z-30 flex flex-col h-full px-5 pt-5 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-mono text-5xl font-black text-white block tracking-tighter">
                        {card.stats.ovr}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                        OVR RATING
                      </span>
                    </div>
                    <CountryChip country={card.profile.country} />
                  </div>

                  <div className="flex flex-col items-center mt-2">
                    <PremiumAvatar avatarUrl={card.profile.avatar} username={card.profile.username} theme={card.theme} />
                  </div>

                  <div className="text-center mt-3">
                    <h2 className="text-[20px] font-black uppercase tracking-wider text-white">
                      {card.profile.username}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-zinc-400 mt-1 font-mono">
                      {card.profile.platform.toUpperCase()}
                    </span>
                  </div>

                  <div className="mx-4 my-2.5 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(STAT_LABELS).map(([k, label]) => (
                      <div key={k} className="flex flex-col items-center py-1 bg-black/35 border border-white/5 rounded-lg">
                        <span className="text-[14px] font-black text-white font-mono">{card.stats[k as keyof typeof card.stats]}</span>
                        <span className="text-[7.5px] font-bold text-zinc-500 font-mono mt-0.5">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-auto">
                    <span className="text-[7.5px] font-bold uppercase tracking-[0.25em] text-white/30 font-mono">
                      SCOUT COLLECTIBLE IDENTITY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "milestone": {
      const unlocked = getUnlockedMilestones(profile);
      const topMilestone = unlocked[0] || {
        id: "solved_baseline",
        title: `${profile.totalSolved} Problems Solved`,
        category: "solved",
        value: profile.totalSolved,
        description: "Beginning the coding journey and logging achievements.",
      };

      const milestoneLabel =
        topMilestone.category === "solved"
          ? "Total Solved"
          : topMilestone.category === "hard"
          ? "Hard Solved"
          : topMilestone.category === "streak"
          ? "Coding Streak"
          : topMilestone.category === "rating"
          ? "Contest Rating"
          : "Global Ranking";

      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(245,158,11,0.2)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-amber-500/20 p-[2px] bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Confetti sparkle background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 items-center justify-between text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 font-mono">
                  ★ MILESTONE ACHIEVED ★
                </span>

                <div className="flex flex-col items-center gap-1.5 my-auto">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-2xl">
                    🏆
                  </div>
                  <h3 className="text-sm font-black text-white/50 uppercase tracking-widest font-mono mt-3">
                    {milestoneLabel}
                  </h3>
                  <span className="text-[64px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 leading-none tracking-tight font-mono">
                    {topMilestone.value}
                  </span>
                  <p className="text-xs text-zinc-400 max-w-[200px] mt-1.5">
                    {topMilestone.description} Verified on your LeetCode platform record.
                  </p>
                </div>

                <div className="w-full flex items-center justify-between border-t border-white/5 pt-4 text-left">
                  <div>
                    <span className="text-[10px] font-black text-white block uppercase tracking-wider">{card.profile.username}</span>
                    <span className="text-[8px] text-zinc-500 font-mono">PLAYER ID</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-amber-500 block uppercase tracking-wider">TOP 5%</span>
                    <span className="text-[8px] text-zinc-500 font-mono">GLOBAL RANKING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "contest":
      // Scorecard layout for Competitive Programmers
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(59,130,246,0.15)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-blue-500/20 p-[2px] bg-gradient-to-br from-blue-950/20 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-blue-400 font-mono">
                    CP CONTEST SCORECARD
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-bold text-blue-400 font-mono">
                    LIVE DATA
                  </span>
                </div>

                <div className="my-auto flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={card.profile.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 font-mono">CONTESTANT</span>
                      <h3 className="text-lg font-black text-white uppercase tracking-wider leading-none mt-0.5">
                        {card.profile.username}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[9px] text-zinc-500 font-mono block">CONTEST RATING</span>
                      <span className="text-3xl font-black text-white font-mono block mt-1">
                        {card.profile.contestRating ?? "1500"}
                      </span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-[9px] text-zinc-500 font-mono block">GLOBAL RANK</span>
                      <span className="text-3xl font-black text-white font-mono block mt-1">
                        #{card.profile.ranking ?? "—"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-blue-400/80 font-mono">LEAGUE CLASS</span>
                      <span className="text-xs font-black text-white block mt-0.5 uppercase tracking-wide">
                        {(card.profile.contestRating ?? 0) >= 2000 ? "Guardian Master" : (card.profile.contestRating ?? 0) >= 1850 ? "Knight Elite" : "Active CP Contestant"}
                      </span>
                    </div>
                    <span className="text-2xl">⚔️</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[8px] font-mono text-zinc-500">
                  <span>PLATFORM: {card.profile.platform.toUpperCase()}</span>
                  <span>SCOUT SECURE ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "achievement":
      // Celebrate single specific badge/achievement
      const primaryAchievement = topAchievements[0] || { title: "Daily Grinder", description: "Maintained active daily coding streak.", rarity: "rare" };
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(168,85,247,0.15)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-purple-500/20 p-[2px] bg-gradient-to-br from-purple-950/20 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between items-center text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-purple-400 font-mono">
                  COLLECTIBLE UNLOCKED
                </span>

                <div className="flex flex-col items-center gap-4 my-auto">
                  <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-4xl shadow-2xl relative">
                    <span className="absolute inset-0 rounded-3xl bg-purple-500/5 animate-pulse" />
                    🔮
                  </div>
                  <div>
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono uppercase">
                      {primaryAchievement.rarity.toUpperCase()} TRAIT
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-wider leading-none mt-2.5">
                      {primaryAchievement.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 max-w-[220px] leading-relaxed">
                    {primaryAchievement.description || "Awarded for exceptional algorithmic and software design achievements."}
                  </p>
                </div>

                <div className="w-full flex justify-between items-center border-t border-white/5 pt-4 text-[8px] font-mono text-zinc-500">
                  <span>PLAYER: {card.profile.username.toUpperCase()}</span>
                  <span>RECORD VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "wrapped":
      // Wrapped Infographic Storytelling Card
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(236,72,153,0.15)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-pink-500/20 p-[2px] bg-gradient-to-br from-pink-950/20 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-pink-400 font-mono">
                    DEVELOPER WRAPPED
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 uppercase tracking-tight">
                    {card.profile.username}
                  </h3>
                </div>

                <div className="my-auto flex flex-col gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-zinc-500 font-mono">TOTAL COMPLETED</span>
                      <span className="text-base font-black text-white block mt-0.5">{card.profile.totalSolved} Problems</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold font-mono">+{card.profile.recentActivityCount} Recent</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-zinc-500 font-mono">FAVORITE LANGUAGE</span>
                      <span className="text-base font-black text-white block mt-0.5">{card.profile.languages[0] || "Python"}</span>
                    </div>
                    <span className="text-xs text-pink-400 font-bold font-mono">PRIMARY</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-zinc-500 font-mono">BEST CONTEST RANK</span>
                      <span className="text-base font-black text-white block mt-0.5">#{card.profile.ranking ?? "—"}</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">GLOBAL</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[8px] font-mono text-zinc-500 flex justify-between items-center">
                  <span>YEAR IN REVIEW</span>
                  <span>SCOUT IDENTITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "comparison":
      // Developer vs Developer / Benchmark Card
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(244,63,94,0.15)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-rose-500/20 p-[2px] bg-gradient-to-br from-rose-950/20 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.06) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 font-mono">
                    DEVELOPER COMPETITION
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white bg-rose-500/25 px-2 py-0.5 rounded">
                    VS
                  </span>
                </div>

                <div className="my-auto flex flex-col gap-4">
                  {/* Two contestants */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.profile.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-black text-white text-center truncate w-full">{card.profile.username}</span>
                    </div>

                    <div className="text-center font-mono text-zinc-600 text-xs">
                      VS
                    </div>

                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center text-lg select-none">
                        🤖
                      </div>
                      <span className="text-xs font-black text-white text-center truncate w-full">SCOUT_AI</span>
                    </div>
                  </div>

                  {/* Comparisons */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs px-2 py-1 bg-white/5 rounded">
                      <span className="font-mono text-emerald-400 font-bold">{card.stats.ovr}</span>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase">OVR Rating</span>
                      <span className="font-mono text-zinc-400">82</span>
                    </div>
                    <div className="flex justify-between items-center text-xs px-2 py-1 bg-white/5 rounded">
                      <span className="font-mono text-emerald-400 font-bold">{card.profile.totalSolved}</span>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase">Total Solved</span>
                      <span className="font-mono text-zinc-400">450</span>
                    </div>
                    <div className="flex justify-between items-center text-xs px-2 py-1 bg-white/5 rounded">
                      <span className="font-mono text-zinc-400">{card.profile.streak ?? 0}</span>
                      <span className="text-[9px] text-zinc-500 font-mono uppercase">Streak</span>
                      <span className="font-mono text-emerald-400 font-bold">14</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[8px] font-mono text-zinc-500 flex justify-between items-center">
                  <span>COMPARE STATS</span>
                  <span>SCOUT PLATFORM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─── Sub-renderers ───────────────────────────────────────────────────────────

function PremiumAvatar({ avatarUrl, username, theme }: { avatarUrl: string; username: string; theme: ScoutCardType["theme"] }) {
  return (
    <div className="relative" style={{ width: 90, height: 90 }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${theme.glowEffect} 0%, transparent 70%)`,
          transform: "scale(1.3)",
          filter: "blur(8px)",
        }}
      />
      <div className={`absolute inset-0 rounded-full metallic-${theme.id} p-[2.5px]`} style={{ zIndex: 1 }}>
        <div className="w-full h-full rounded-full bg-zinc-950 p-[2px]">
          <div className="w-full h-full rounded-full p-[1.5px]" style={{ background: "rgba(255,255,255,0.12)" }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={username}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountryChip({ country }: { country: string | null }) {
  if (!country) return null;
  const flag = country.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  return (
    <div className="flex flex-col items-center">
      <span className="text-[20px] leading-none" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}>
        {flag}
      </span>
      <span className="text-[7px] font-black uppercase text-zinc-500 font-mono tracking-wider mt-0.5">
        {country}
      </span>
    </div>
  );
}
