"use client";

import React from "react";
import { Trophy, Target, Sparkles, Cpu, Award, Shield, User } from "lucide-react";
import { DevCard as ScoutCardType, CardType } from "../../types";
import { useCardTilt } from "@/hooks/use-parallax";
import { getUnlockedMilestones } from "@/core/config/milestone-rules";

interface Props {
  card: ScoutCardType;
  cardType?: CardType;
  opponentCard?: ScoutCardType;
}

const STAT_LABELS: Record<string, string> = {
  pac: "SOL",
  sho: "HRD",
  pas: "MED",
  dri: "STK",
  def: "ACC",
  phy: "CNT",
};

export function ScoutCard({ card, cardType, opponentCard }: Props) {
  const activeType = cardType || card.metadata.cardType || "identity";
  const { profile, stats, achievements, theme } = card;
  const topAchievements = achievements.slice(0, 2);
  const { containerRef, rotate, lightX, lightY, isHovered, onMouseMove, onMouseLeave } =
    useCardTilt();

  // Number formatters
  const formatNumber = (val: number | null) => (val != null ? Math.round(val).toLocaleString() : "—");
  const formatPercentage = (val: number | null) => (val != null ? `${val.toFixed(1)}%` : "—");

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
            style={{ "--card-glow-color": theme.glowEffect } as React.CSSProperties}
          >
            <div
              className="w-full h-full"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className={`absolute inset-0 scout-shield-border metallic-${theme.id}`} />
              <div className="absolute scout-shield-border" style={{ inset: "3.5px", background: "#0a0a0c" }} />
              <div className={`absolute scout-shield-border metallic-${theme.id}`} style={{ inset: "5px", opacity: 0.35 }} />

              <div
                className="absolute scout-shield overflow-hidden"
                style={{ inset: "6px", background: theme.bgGradient }}
              >
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse 65% 40% at ${lightX}% ${lightY}%, rgba(255,255,255,0.1) 0%, transparent 75%)`,
                  }}
                />
                <div className="absolute inset-0 pointer-events-none z-10 card-shimmer overflow-hidden" />
                
                {theme.holoOverlay && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 mix-blend-color-dodge opacity-20 animate-holo"
                    style={{
                      backgroundImage:
                        "linear-gradient(125deg, rgba(255,255,255,0.15) 0%, rgba(255,100,180,0.1) 25%, rgba(100,200,255,0.1) 50%, rgba(180,255,100,0.08) 75%, rgba(255,255,255,0.15) 100%)",
                      backgroundSize: "400% 400%",
                    }}
                  />
                )}

                <div className="relative z-30 flex flex-col h-full px-5 pt-5 pb-4">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-mono text-5xl font-black text-white block tracking-tighter leading-none">
                        {stats.ovr}
                      </span>
                      <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-500 font-mono mt-0.5 block">
                        OVR RATING
                      </span>
                    </div>
                    <CountryChip country={profile.country} />
                  </div>

                  <div className="flex flex-col items-center mt-1">
                    <PremiumAvatar avatarUrl={profile.avatar} username={profile.username} theme={theme} />
                  </div>

                  <div className="text-center mt-2.5">
                    <h2 className="text-[19px] font-black uppercase tracking-[0.08em] text-white truncate max-w-[200px] mx-auto">
                      {profile.username}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[7.5px] font-black uppercase text-zinc-500 mt-1 font-mono tracking-widest">
                      {profile.platform.toUpperCase()}
                    </span>
                  </div>

                  <div className="mx-4 my-2.5 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(STAT_LABELS).map(([k, label]) => (
                      <div key={k} className="flex flex-col items-center py-1 bg-black/40 border border-white/5 rounded-lg">
                        <span className="text-[14px] font-black text-white font-mono">{formatNumber(stats[k as keyof typeof stats])}</span>
                        <span className="text-[7px] font-bold text-zinc-500 font-mono mt-0.5">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-auto">
                    <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20 font-mono">
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
      if (unlocked.length === 0) {
        // High fidelity empty state for milestones
        return (
          <div className="relative select-none" style={{ width: 340, height: 420 }}>
            <div className="w-full h-full rounded-[24px] border border-dashed border-white/10 bg-zinc-950/40 p-6 flex flex-col justify-between items-center text-center">
              <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600 font-mono">Scout Archive</span>
              <div className="flex flex-col items-center gap-3 my-auto">
                <Trophy className="w-8 h-8 text-zinc-700" />
                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest font-mono">No Milestones Yet</h3>
                <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                  Milestones are unlocked after passing total solved algorithms or streak thresholds.
                </p>
              </div>
              <span className="text-[7.5px] text-zinc-600 font-mono uppercase tracking-widest">RECORD PENDING</span>
            </div>
          </div>
        );
      }

      const topMilestone = unlocked[0];
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
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(245,158,11,0.15)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-amber-500/10 p-[2px] bg-gradient-to-br from-amber-500/5 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 items-center justify-between text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500/60 font-mono">
                  Milestone Verified
                </span>

                <div className="flex flex-col items-center gap-1.5 my-auto">
                  <div className="w-16 h-16 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center shadow-2xl text-amber-500">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-mono mt-3">
                    {milestoneLabel}
                  </h3>
                  <span className="text-[60px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 leading-none tracking-tight font-mono">
                    {formatNumber(topMilestone.value)}
                  </span>
                  <p className="text-[11px] text-zinc-400 max-w-[200px] mt-1.5 leading-relaxed">
                    {topMilestone.description}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between border-t border-white/5 pt-4 text-left">
                  <div>
                    <span className="text-[10px] font-black text-white block uppercase tracking-wider">{profile.username}</span>
                    <span className="text-[7.5px] text-zinc-500 font-mono">PLAYER ID</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-amber-500 block uppercase tracking-wider">TOP 5%</span>
                    <span className="text-[7.5px] text-zinc-500 font-mono">GLOBAL RANKING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "contest": {
      if (!profile.contestRating) {
        // High fidelity empty state for CP profile
        return (
          <div className="relative select-none" style={{ width: 340, height: 420 }}>
            <div className="w-full h-full rounded-[24px] border border-dashed border-white/10 bg-zinc-950/40 p-6 flex flex-col justify-between items-center text-center">
              <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600 font-mono">CP Scorecard</span>
              <div className="flex flex-col items-center gap-3 my-auto">
                <Target className="w-8 h-8 text-zinc-700" />
                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest font-mono">No Contest History</h3>
                <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                  This user profile does not have any active competitive contest ratings logged.
                </p>
              </div>
              <span className="text-[7.5px] text-zinc-600 font-mono uppercase tracking-widest">UNRATED</span>
            </div>
          </div>
        );
      }

      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(59,130,246,0.12)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-blue-500/10 p-[2px] bg-gradient-to-br from-blue-950/10 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-wider text-blue-400 font-mono">
                    CP Contest Scorecard
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/5 border border-blue-500/15 text-[8px] font-bold text-blue-400 font-mono">
                    Live Sync
                  </span>
                </div>

                <div className="my-auto flex flex-col gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[8px] text-zinc-500 font-mono block">CONTESTANT</span>
                      <h3 className="text-base font-black text-white uppercase tracking-wider leading-none mt-0.5">
                        {profile.username}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                      <span className="text-[8.5px] text-zinc-500 font-mono block">CONTEST RATING</span>
                      <span className="text-2xl font-black text-white font-mono block mt-1">
                        {formatNumber(profile.contestRating)}
                      </span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                      <span className="text-[8.5px] text-zinc-500 font-mono block">GLOBAL RANK</span>
                      <span className="text-2xl font-black text-white font-mono block mt-1">
                        #{formatNumber(profile.ranking)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-500/[0.03] border border-blue-500/10 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-blue-400/70 font-mono block">LEAGUE CLASS</span>
                      <span className="text-xs font-black text-white block mt-0.5 uppercase tracking-wide">
                        {(profile.contestRating ?? 0) >= 2000 ? "Guardian Master" : (profile.contestRating ?? 0) >= 1850 ? "Knight Elite" : "CP Contestant"}
                      </span>
                    </div>
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[7.5px] font-mono text-zinc-500">
                  <span>PLATFORM: {profile.platform.toUpperCase()}</span>
                  <span>SCOUT VERIFIED RECORD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "achievement": {
      if (topAchievements.length === 0) {
        // High fidelity empty state for achievements
        return (
          <div className="relative select-none" style={{ width: 340, height: 420 }}>
            <div className="w-full h-full rounded-[24px] border border-dashed border-white/10 bg-zinc-950/40 p-6 flex flex-col justify-between items-center text-center">
              <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600 font-mono">Scout Traits</span>
              <div className="flex flex-col items-center gap-3 my-auto">
                <Award className="w-8 h-8 text-zinc-700" />
                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest font-mono">No Achievements Yet</h3>
                <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                  Earn unique collectible badges by solving hard problems or sustaining coding streaks.
                </p>
              </div>
              <span className="text-[7.5px] text-zinc-600 font-mono uppercase tracking-widest">LOCKED</span>
            </div>
          </div>
        );
      }

      const primaryAchievement = topAchievements[0];
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(168,85,247,0.12)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-purple-500/10 p-[2px] bg-gradient-to-br from-purple-950/10 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between items-center text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-purple-400 font-mono">
                  Achievement Unlocked
                </span>

                <div className="flex flex-col items-center gap-4 my-auto">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/5 border border-purple-500/15 flex items-center justify-center shadow-2xl relative text-purple-400">
                    <span className="absolute inset-0 rounded-2xl bg-purple-500/[0.02] animate-pulse" />
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[7.5px] font-black px-2.5 py-0.5 rounded-full bg-purple-500/5 border border-purple-500/15 text-purple-400 font-mono uppercase tracking-wider">
                      {primaryAchievement.rarity.toUpperCase()} TRAIT
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-wider leading-none mt-2.5">
                      {primaryAchievement.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-zinc-400 max-w-[210px] leading-relaxed">
                    {primaryAchievement.description}
                  </p>
                </div>

                <div className="w-full flex justify-between items-center border-t border-white/5 pt-4 text-[7.5px] font-mono text-zinc-500">
                  <span>PLAYER: {profile.username.toUpperCase()}</span>
                  <span>RECORD VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "wrapped":
      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(236,72,153,0.12)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-pink-500/10 p-[2px] bg-gradient-to-br from-pink-950/10 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.25em] text-pink-400 font-mono">
                    Year in Review
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 uppercase tracking-tight">
                    {profile.username}
                  </h3>
                </div>

                <div className="my-auto flex flex-col gap-3">
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[7.5px] text-zinc-500 font-mono block">TOTAL COMPLETED</span>
                      <span className="text-sm font-black text-white block mt-0.5">{formatNumber(profile.totalSolved)} Problems</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold font-mono">+{formatNumber(profile.recentActivityCount)} Recent</span>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[7.5px] text-zinc-500 font-mono block">PRIMARY STACK</span>
                      <span className="text-sm font-black text-white block mt-0.5">{profile.languages[0] || "Python"}</span>
                    </div>
                    <span className="text-[8.5px] text-pink-400 font-bold font-mono uppercase tracking-wider">CORE</span>
                  </div>

                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[7.5px] text-zinc-500 font-mono block">BEST CONTEST RANK</span>
                      <span className="text-sm font-black text-white block mt-0.5">#{formatNumber(profile.ranking)}</span>
                    </div>
                    <span className="text-[7.5px] text-zinc-500 font-mono">GLOBAL</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[7.5px] font-mono text-zinc-500 flex justify-between items-center">
                  <span>ANNUAL OVERVIEW</span>
                  <span>SCOUT ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "comparison": {
      if (!opponentCard) {
        // High fidelity empty state: waiting for contestant 2 details
        return (
          <div
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative select-none cursor-pointer"
            style={{ perspective: "1200px", width: 340, height: 420 }}
          >
            <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(244,63,94,0.08)" } as React.CSSProperties}>
              <div
                className="w-full h-full rounded-[24px] border border-rose-500/10 p-[2px] bg-gradient-to-br from-rose-950/5 via-zinc-900 to-zinc-950 overflow-hidden relative"
                style={{
                  transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                  transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.03) 0%, transparent 60%)` }} />

                <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-wider text-rose-400/60 font-mono">
                      Contestant Matchup
                    </span>
                    <span className="text-[8px] font-mono font-bold text-zinc-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      VS
                    </span>
                  </div>

                  <div className="my-auto flex flex-col gap-5 text-center items-center justify-center border border-dashed border-white/5 rounded-2xl py-6 bg-white/[0.01]">
                    <User className="w-8 h-8 text-zinc-700 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest font-mono">Opponent Missing</h4>
                      <p className="text-[9px] text-zinc-500 max-w-[190px] mt-1 leading-normal">
                        Enter a second LeetCode handle in the configurator to unlock stats comparison.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 text-[7.5px] font-mono text-zinc-500 flex justify-between items-center">
                    <span>PLAYER: {profile.username.toUpperCase()}</span>
                    <span>WAITING FOR DATA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative select-none cursor-pointer"
          style={{ perspective: "1200px", width: 340, height: 420 }}
        >
          <div className="scout-card-glow w-full h-full" style={{ "--card-glow-color": "rgba(244,63,94,0.12)" } as React.CSSProperties}>
            <div
              className="w-full h-full rounded-[24px] border border-rose-500/10 p-[2px] bg-gradient-to-br from-rose-950/10 via-zinc-900 to-zinc-950 overflow-hidden relative"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isHovered ? "transform 0.05s linear" : "transform 0.6s ease",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(ellipse 60% 35% at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 60%)` }} />

              <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-wider text-rose-400 font-mono">
                    Contestant Matchup
                  </span>
                  <span className="text-[8px] font-mono font-bold text-white bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded">
                    VS
                  </span>
                </div>

                <div className="my-auto flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-black text-white text-center truncate w-full">{profile.username}</span>
                    </div>

                    <div className="text-center font-mono text-zinc-600 text-[10px]">
                      VS
                    </div>

                    <div className="flex flex-col items-center gap-1.5 w-24">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={opponentCard.profile.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-black text-white text-center truncate w-full">{opponentCard.profile.username}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[11px] px-2 py-1 bg-white/[0.02] border border-white/5 rounded">
                      <span className={`font-mono font-bold ${stats.ovr >= opponentCard.stats.ovr ? "text-emerald-400" : "text-zinc-400"}`}>
                        {stats.ovr}
                      </span>
                      <span className="text-[8px] text-zinc-500 font-mono uppercase">OVR</span>
                      <span className={`font-mono font-bold ${opponentCard.stats.ovr >= stats.ovr ? "text-emerald-400" : "text-zinc-400"}`}>
                        {opponentCard.stats.ovr}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] px-2 py-1 bg-white/[0.02] border border-white/5 rounded">
                      <span className={`font-mono font-bold ${profile.totalSolved >= opponentCard.profile.totalSolved ? "text-emerald-400" : "text-zinc-400"}`}>
                        {formatNumber(profile.totalSolved)}
                      </span>
                      <span className="text-[8px] text-zinc-500 font-mono uppercase">Solved</span>
                      <span className={`font-mono font-bold ${opponentCard.profile.totalSolved >= profile.totalSolved ? "text-emerald-400" : "text-zinc-400"}`}>
                        {formatNumber(opponentCard.profile.totalSolved)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] px-2 py-1 bg-white/[0.02] border border-white/5 rounded">
                      <span className={`font-mono font-bold ${(profile.streak ?? 0) >= (opponentCard.profile.streak ?? 0) ? "text-emerald-400" : "text-zinc-400"}`}>
                        {profile.streak ?? 0}
                      </span>
                      <span className="text-[8px] text-zinc-500 font-mono uppercase">Streak</span>
                      <span className={`font-mono font-bold ${(opponentCard.profile.streak ?? 0) >= (profile.streak ?? 0) ? "text-emerald-400" : "text-zinc-400"}`}>
                        {opponentCard.profile.streak ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-[7.5px] font-mono text-zinc-500 flex justify-between items-center">
                  <span>MATCH COMPARISON</span>
                  <span>SCOUT ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

function PremiumAvatar({ avatarUrl, username, theme }: { avatarUrl: string; username: string; theme: ScoutCardType["theme"] }) {
  return (
    <div className="relative" style={{ width: 90, height: 90 }}>
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${theme.glowEffect} 0%, transparent 70%)`,
          transform: "scale(1.25)",
          filter: "blur(6px)",
        }}
      />
      <div className={`absolute inset-0 rounded-full metallic-${theme.id} p-[2.5px]`} style={{ zIndex: 1 }}>
        <div className="w-full h-full rounded-full bg-[#0a0a0c] p-[2px]">
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

const COUNTRY_MAP: Record<string, { code: string; name: string }> = {
  "india": { code: "IN", name: "INDIA" },
  "united states": { code: "US", name: "UNITED STATES" },
  "united states of america": { code: "US", name: "UNITED STATES" },
  "usa": { code: "US", name: "USA" },
  "japan": { code: "JP", name: "JAPAN" },
  "china": { code: "CN", name: "CHINA" },
  "united kingdom": { code: "GB", name: "UNITED KINGDOM" },
  "uk": { code: "GB", name: "UK" },
  "canada": { code: "CA", name: "CANADA" },
  "germany": { code: "DE", name: "GERMANY" },
  "france": { code: "FR", name: "FRANCE" },
  "south korea": { code: "KR", name: "SOUTH KOREA" },
  "brazil": { code: "BR", name: "BRAZIL" },
  "russia": { code: "RU", name: "RUSSIA" },
};

function getCountryData(country: string | null): { flag: string; name: string } | null {
  if (!country) return null;
  const cleaned = country.trim().toLowerCase();
  
  const matched = COUNTRY_MAP[cleaned];
  if (matched) {
    const flag = matched.code.toUpperCase().replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
    return { flag, name: matched.name };
  }
  
  if (country.length === 2) {
    const flag = country.toUpperCase().replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
    return { flag, name: country.toUpperCase() };
  }
  
  return { flag: "🌐", name: country.toUpperCase() };
}

function CountryChip({ country }: { country: string | null }) {
  const data = getCountryData(country);
  if (!data) return null;
  return (
    <div className="flex flex-col items-center">
      <span className="text-[20px] leading-none" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))" }}>
        {data.flag}
      </span>
      <span className="text-[7.5px] font-black uppercase text-zinc-500 font-mono tracking-wider mt-0.5">
        {data.name}
      </span>
    </div>
  );
}
