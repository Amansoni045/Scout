import React from "react";
import { Shield } from "lucide-react";
import { APP_CONFIG } from "@/core/config/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.04] bg-[#030303] py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 select-none">
          <Shield className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 font-mono">
            {APP_CONFIG.name} © {new Date().getFullYear()}
          </span>
        </div>
        
        <p className="text-[10px] text-zinc-600">
          Not affiliated with LeetCode, EA Sports, or FIFA. Built for developers.
        </p>
      </div>
    </footer>
  );
}
