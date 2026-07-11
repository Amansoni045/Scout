import React, { type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

export function LoadingBoundary({ children, fallback }: Props) {
  // Simple layout fallback wrapper that can be replaced/extended later
  return (
    <React.Suspense
      fallback={
        fallback ?? (
          <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800 animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-t-amber-500 border-zinc-800 animate-spin" />
              <p className="text-zinc-500 text-sm">Loading visual assets...</p>
            </div>
          </div>
        )
      }
    >
      {children}
    </React.Suspense>
  );
}
