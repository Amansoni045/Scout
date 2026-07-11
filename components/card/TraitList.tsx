import React from "react";
import { Achievement, ThemeConfig } from "../../types";

interface Props {
  achievements: Achievement[];
  theme: ThemeConfig;
}

export function TraitList({ achievements, theme }: Props) {
  // Map detected achievements to neat icons/tokens
  const topTraits = achievements.slice(0, 2);

  if (topTraits.length === 0) {
    // Return a default trait placeholder if none are achieved
    return (
      <div className="flex items-center gap-1.5 mt-2 justify-center">
        <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
          SCOUTING COMPLETED
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
      {topTraits.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors shadow-sm select-none"
        >
          <span className="text-[9px] leading-none">🏆</span>
          <span className={`text-[9px] font-black uppercase tracking-wider ${theme.textColor}`}>
            {t.title}
          </span>
        </div>
      ))}
    </div>
  );
}
