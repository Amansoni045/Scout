import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  ovr: number;
  theme: ThemeConfig;
}

export function OverallRating({ ovr, theme }: Props) {
  return (
    <div className="flex flex-col items-center select-none">
      <span className="text-5xl font-black tracking-tighter leading-none text-white font-mono">
        {ovr}
      </span>
      <span className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${theme.textColor}`}>
        {theme.name.split(" ").pop()}
      </span>
    </div>
  );
}
