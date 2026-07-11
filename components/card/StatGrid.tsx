import React from "react";
import { CardStats, ThemeConfig } from "../../types";

interface Props {
  stats: CardStats;
  theme: ThemeConfig;
}

export function StatGrid({ stats, theme }: Props) {
  const statItems = [
    { label: "PAC", val: stats.pac },
    { label: "SHO", val: stats.sho },
    { label: "PAS", val: stats.pas },
    { label: "DRI", val: stats.dri },
    { label: "DEF", val: stats.def },
    { label: "PHY", val: stats.phy },
  ];

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-3.5 mt-3 select-none">
      {statItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center p-1.5 rounded-lg bg-black/15 border border-white/5">
          <span className="text-[9px] font-bold text-white/40 tracking-wider font-mono">
            {item.label}
          </span>
          <span className={`text-base font-black font-mono tracking-tight mt-0.5 ${theme.accentColor}`}>
            {item.val}
          </span>
        </div>
      ))}
    </div>
  );
}
