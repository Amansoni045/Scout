import React from "react";
import { APP_CONFIG } from "@/core/config/constants";

export function Navbar() {
  return (
    <header className="w-full border-b border-white/5 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <span className="text-xl">⚽</span>
          <span className="font-black text-sm uppercase tracking-widest text-zinc-100 font-mono">
            {APP_CONFIG.name}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest font-mono text-zinc-500 font-bold">
            Beta v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
