import React from "react";

interface Props {
  avatarUrl: string;
  username: string;
}

export function PlayerImage({ avatarUrl, username }: Props) {
  return (
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-lg bg-zinc-900/60 flex-shrink-0 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt={`${username}'s avatar`}
        className="object-cover w-full h-full"
        loading="lazy"
        onError={(e) => {
          // Fallback image using dynamic UI Initials avatar endpoint or custom SVG
          (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;
        }}
      />
    </div>
  );
}
