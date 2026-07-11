import React from "react";
import { APP_CONFIG } from "@/core/config/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-zinc-950 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 select-none">
          <span className="text-sm">⚽</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 font-mono">
            {APP_CONFIG.name} © {new Date().getFullYear()}
          </span>
        </div>
        
        <p className="text-xs text-zinc-600 font-medium">
          Not affiliated with LeetCode, EA Sports, or FIFA. Built for developers.
        </p>
      </div>
    </footer>
  );
}
