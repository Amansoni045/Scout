import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  theme: ThemeConfig;
}

export function CardEffects({ theme }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]">
      {/* Dynamic diagonal shine overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0.08)_55%,transparent_60%)] bg-[length:200%_100%] animate-shine opacity-60" />

      {/* Holographic overlay for high tier cards (e.g. TOTY) */}
      {theme.holoOverlay && (
        <div
          className="absolute inset-0 mix-blend-color-dodge opacity-25 animate-holo"
          style={{
            backgroundImage:
              "linear-gradient(125deg, rgba(255,255,255,0.2) 0%, rgba(255,0,128,0.15) 30%, rgba(0,255,255,0.15) 70%, rgba(255,255,255,0.2) 100%)",
            backgroundSize: "400% 400%",
          }}
        />
      )}
    </div>
  );
}
