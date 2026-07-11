import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  theme: ThemeConfig;
}

export function CardFooter({ theme }: Props) {
  return (
    <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
      <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">
        SCOUT v1.0
      </span>
      <span className={`text-[10px] font-bold tracking-wider font-mono ${theme.textColor}`}>
        SCOUT REPORT
      </span>
    </div>
  );
}
