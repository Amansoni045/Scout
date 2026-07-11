import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  theme: ThemeConfig;
  mouseX: number;
  mouseY: number;
}

export function GlowLayer({ theme, mouseX, mouseY }: Props) {
  // Renders a radial glow tracking the cursor coordinates relative to the card container
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen transition-opacity duration-300 group-hover:opacity-60"
      style={{
        background: `radial-gradient(circle 180px at ${mouseX}px ${mouseY}px, ${theme.glowEffect} 0%, transparent 100%)`,
      }}
    />
  );
}
