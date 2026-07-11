"use client";

import React from "react";
import { DevCard as DevCardType } from "../../types";
import { useParallax } from "@/hooks/use-parallax";
import { BackgroundFrame } from "./BackgroundFrame";
import { GlowLayer } from "./GlowLayer";
import { CardEffects } from "./CardEffects";
import { PlayerImage } from "./PlayerImage";
import { PlayerName } from "./PlayerName";
import { OverallRating } from "./OverallRating";
import { CountryBadge } from "./CountryBadge";
import { LanguageBadge } from "./LanguageBadge";
import { StatGrid } from "./StatGrid";
import { TraitList } from "./TraitList";
import { CardFooter } from "./CardFooter";

interface Props {
  card: DevCardType;
  isFlipped?: boolean;
}

export function DevCard({ card, isFlipped = false }: Props) {
  const { profile, stats, achievements, theme } = card;
  const { containerRef, coords, rotate, handleMouseMove, handleMouseLeave } = useParallax();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[340px] h-[480px] perspective-1000 cursor-pointer select-none group active:scale-[0.98] transition-transform duration-150"
    >
      {/* 3D tilt shell container */}
      <div
        className="w-full h-full preserve-3d transition-transform duration-500 ease-out"
        style={{
          transform: isFlipped
            ? "rotateY(180deg)"
            : `rotateX(${rotate.x}px) rotateY(${rotate.y}px)`,
        }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full">
          <BackgroundFrame theme={theme}>
            {/* Interactive Glow Overlay */}
            <GlowLayer theme={theme} mouseX={coords.x} mouseY={coords.y} />
            <CardEffects theme={theme} />

            {/* Top row: OVR, Country badge, LanguageBadge */}
            <div className="flex items-start justify-between w-full relative z-10">
              <OverallRating ovr={stats.ovr} theme={theme} />
              <div className="flex flex-col items-center gap-2 mt-1">
                <CountryBadge country={profile.country} />
                <span className="w-5 h-0.5 rounded-full bg-white/20" />
                <span className="text-[12px] font-bold text-white/50">LE</span>
              </div>
            </div>

            {/* Profile Avatar Centered */}
            <div className="flex justify-center mt-1 relative z-10">
              <PlayerImage avatarUrl={profile.avatar} username={profile.username} />
            </div>

            {/* Player details row */}
            <div className="mt-4 text-center flex flex-col items-center relative z-10">
              <PlayerName
                username={profile.username}
                platform={profile.platform}
                theme={theme}
              />
              <div className="mt-2">
                <LanguageBadge languages={profile.languages} />
              </div>
            </div>

            {/* Stats Block */}
            <div className="relative z-10">
              <StatGrid stats={stats} theme={theme} />
            </div>

            {/* Achievements row */}
            <div className="relative z-10">
              <TraitList achievements={achievements} theme={theme} />
            </div>

            {/* Card Footer stamp */}
            <div className="relative z-10 mt-auto">
              <CardFooter theme={theme} />
            </div>
          </BackgroundFrame>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full" style={{ transform: "rotateY(180deg)" }}>
          <BackgroundFrame theme={theme}>
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                <span className="text-3xl select-none">⚽</span>
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest text-white/70 mt-4">
                DEVCARD
              </h3>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono mt-1">
                SCOUTING ARCHIVE
              </p>
            </div>
          </BackgroundFrame>
        </div>
      </div>
    </div>
  );
}
