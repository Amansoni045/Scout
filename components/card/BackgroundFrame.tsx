import React from "react";
import { ThemeConfig } from "../../types";

interface Props {
  theme: ThemeConfig;
  children: React.ReactNode;
}

export function BackgroundFrame({ theme, children }: Props) {
  const borderClass = `metallic-${theme.id}`;

  return (
    // Outer shadow wrapper using SVG filter drop-shadow to preserve clipped edges shadows
    <div className="relative w-[340px] h-[470px] shield-shadow transition-transform duration-500">
      {/* Outer Border Shield */}
      <div className={`w-full h-full p-[2.5px] shield-card ${borderClass}`}>
        {/* Inner Card Content Shield */}
        <div
          className="w-full h-full shield-card relative flex flex-col p-6 overflow-hidden"
          style={{
            background: theme.bgGradient,
          }}
        >
          {/* Subtle top edge metallic gleam highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/25 z-20" />
          
          {/* Main Card Content */}
          <div className="relative z-10 flex flex-col h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
