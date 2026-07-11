import React from "react";

interface Props {
  error: {
    code: string;
    message: string;
  };
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: Props) {
  const isNotFound = error.code === "USER_NOT_FOUND";

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center py-12 px-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-md relative z-10 shadow-2xl">
      {/* Premium Alert Icon */}
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 text-xl select-none">
        ⚠️
      </div>

      <h3 className="text-lg font-black uppercase tracking-wider text-zinc-100">
        {isNotFound ? "Player Not Found" : "Scouting Failed"}
      </h3>
      
      <p className="text-sm text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
        {error.message}
      </p>

      {/* Actionable Guidances */}
      <div className="mt-6 flex flex-col gap-2.5 w-full">
        {isNotFound ? (
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest leading-normal">
            Verify the spelling on LeetCode.
            <br />
            Make sure the profile is public.
          </p>
        ) : (
          <p className="text-[11px] text-zinc-500 uppercase tracking-widest leading-normal">
            LeetCode API may be experiencing downtime.
          </p>
        )}

        <button
          onClick={onRetry}
          className="mt-2 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold rounded-xl transition-all cursor-pointer text-xs uppercase tracking-widest active:scale-[0.99]"
        >
          {isNotFound ? "Go Back" : "Try Again"}
        </button>
      </div>
    </div>
  );
}
