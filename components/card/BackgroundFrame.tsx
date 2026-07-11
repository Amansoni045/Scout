import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  theme: ThemeConfig;
  children: React.ReactNode;
}

export function BackgroundFrame({ theme, children }: Props) {
  const borderClass =
    theme.id === "toty"
      ? "metallic-toty"
      : theme.id === "gold"
      ? "metallic-gold"
      : theme.id === "silver"
      ? "metallic-silver"
      : "metallic-bronze";

  return (
    <div
      className={`relative w-[340px] h-[480px] rounded-[24px] p-[2px] transition-all duration-500 overflow-hidden ${borderClass}`}
      style={{
        boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px ${theme.glowEffect}`,
      }}
    >
      {/* Inner card container */}
      <div
        className="w-full h-full rounded-[22px] overflow-hidden relative flex flex-col p-5"
        style={{
          background: theme.bgGradient,
        }}
      >
        {children}
      </div>
    </div>
  );
}
