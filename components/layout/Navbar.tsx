import React from "react";
import { APP_CONFIG } from "@/core/config/constants";

export function Navbar() {
  return (
    <header className="w-full sticky top-6 z-50 px-6">
      <div className="max-w-4xl mx-auto h-14 rounded-full border border-white/5 bg-[#09090b]/40 backdrop-blur-md px-6 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 select-none">
          <span className="text-lg">⚽</span>
          <span className="font-black text-[11px] uppercase tracking-widest text-zinc-100 font-mono">
            {APP_CONFIG.name}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] uppercase tracking-widest font-mono text-zinc-400 font-black">
            Beta v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
