import React from "react";

interface Props {
  country: string | null;
}

export function CountryBadge({ country }: Props) {
  // Simple clean fallback display for country flags using public CDN flags or a globe icon
  const countryCode = country ? country.substring(0, 2).toLowerCase() : null;

  return (
    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-zinc-900/80 shadow-md">
      {countryCode ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://flagcdn.com/w40/${countryCode}.png`}
          alt={country || "Flag"}
          className="object-cover w-full h-full scale-125"
          onError={(e) => {
            // Hide missing flag images using a simple text label
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.innerHTML = "🌐";
          }}
        />
      ) : (
        <span className="text-[12px] leading-none select-none">🌐</span>
      )}
    </div>
  );
}
