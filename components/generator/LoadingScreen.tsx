import React from "react";
import { LoadingPhase } from "../../hooks/use-generator";

interface Props {
  phase: LoadingPhase;
  message: string;
}

export function LoadingScreen({ phase, message }: Props) {
  // Determine progression percentage
  const phases: LoadingPhase[] = [
    "SCOUTING",
    "LEAGUE_RECORD",
    "ANALYZING",
    "CALCULATING",
    "FORGING",
  ];
  const idx = phases.indexOf(phase);
  const progressPct = idx >= 0 ? ((idx + 1) / phases.length) * 100 : 0;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 py-12 relative z-10 select-none">
      {/* Premium Skeleton Card Frame */}
      <div className="w-[320px] h-[450px] rounded-[24px] bg-zinc-900/40 border border-white/5 backdrop-blur-md p-6 flex flex-col relative overflow-hidden animate-pulse shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
        
        {/* Skeleton Top Row */}
        <div className="flex justify-between items-start w-full">
          <div className="w-12 h-14 bg-white/5 rounded-lg" />
          <div className="w-8 h-8 rounded-full bg-white/5" />
        </div>

        {/* Skeleton Avatar */}
        <div className="w-24 h-24 rounded-full bg-white/5 mx-auto mt-6" />

        {/* Skeleton Details */}
        <div className="w-32 h-5 bg-white/5 rounded-md mx-auto mt-6" />
        <div className="w-20 h-3 bg-white/5 rounded-md mx-auto mt-2" />

        {/* Skeleton Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg" />
          ))}
        </div>

        {/* Skeleton Footer */}
        <div className="h-4 bg-white/5 rounded-sm mt-auto" />
      </div>

      {/* Cinematic Phase Tracker */}
      <div className="w-full flex flex-col items-center gap-2">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-100 font-mono animate-pulse">
          {message}
        </p>
        
        {/* Clean progress bar */}
        <div className="w-48 h-1 rounded-full bg-zinc-800 overflow-hidden mt-1">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
