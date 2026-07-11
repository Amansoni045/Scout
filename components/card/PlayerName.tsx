import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  username: string;
  platform: string;
  theme: ThemeConfig;
}

export function PlayerName({ username, platform, theme }: Props) {
  // Determine standard role/position text based on coding profile characteristics
  const codingRole = "SWE"; // Default Software Engineer designation

  return (
    <div className="flex flex-col text-left">
      <h2 className="text-xl font-black tracking-tight text-white uppercase line-clamp-1 max-w-[180px]">
        {username}
      </h2>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className={`text-[10px] font-black uppercase tracking-wider ${theme.accentColor}`}>
          {codingRole}
        </span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-[10px] text-white/40 uppercase font-mono tracking-normal">
          {platform}
        </span>
      </div>
    </div>
  );
}
