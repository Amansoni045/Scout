import React from "react";

interface Props {
  languages: string[];
}

export function LanguageBadge({ languages }: Props) {
  // Take top 3 languages
  const topLanguages = languages.slice(0, 3);

  if (topLanguages.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {topLanguages.map((lang) => (
        <span
          key={lang}
          className="px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/10 text-[9px] font-mono text-white/70 tracking-tight"
        >
          {lang}
        </span>
      ))}
    </div>
  );
}
