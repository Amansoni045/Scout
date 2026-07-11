import { ThemeConfig } from "../../types";

export const THEME_RULES: Record<string, ThemeConfig> = {
  galaxy: {
    id: "galaxy",
    name: "Galaxy Edition",
    bgGradient: "linear-gradient(135deg, #0f0c1b 0%, #1a103c 30%, #2d126b 70%, #4c1d95 100%)",
    borderColor: "border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.4)]",
    glowEffect: "rgba(168, 85, 247, 0.5)",
    holoOverlay: true,
    textColor: "text-purple-200",
    accentColor: "text-fuchsia-300",
  },
  legend: {
    id: "legend",
    name: "Legendary Gold",
    bgGradient: "linear-gradient(135deg, #1e1e1f 0%, #2c2c2e 40%, #1e1e1f 70%, #121214 100%)",
    borderColor: "border-amber-400/70 shadow-[0_0_30px_rgba(245,158,11,0.45)]",
    glowEffect: "rgba(245, 158, 11, 0.4)",
    holoOverlay: true,
    textColor: "text-amber-100",
    accentColor: "text-amber-300",
  },
  gold: {
    id: "gold",
    name: "Rare Gold",
    bgGradient: "linear-gradient(135deg, #3f2001 0%, #78350f 30%, #b45309 70%, #d97706 100%)",
    borderColor: "border-amber-500/40 shadow-[0_0_20px_rgba(234,179,8,0.25)]",
    glowEffect: "rgba(234, 179, 8, 0.3)",
    holoOverlay: false,
    textColor: "text-amber-500",
    accentColor: "text-amber-300",
  },
  champion: {
    id: "champion",
    name: "Champion Emerald",
    bgGradient: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #047857 80%, #059669 100%)",
    borderColor: "border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    glowEffect: "rgba(16, 185, 129, 0.35)",
    holoOverlay: false,
    textColor: "text-emerald-200",
    accentColor: "text-emerald-400",
  },
  shadow: {
    id: "shadow",
    name: "Shadow Stealth",
    bgGradient: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
    borderColor: "border-zinc-800/80 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    glowEffect: "rgba(255, 255, 255, 0.08)",
    holoOverlay: false,
    textColor: "text-zinc-400",
    accentColor: "text-zinc-100",
  },
  silver: {
    id: "silver",
    name: "Rare Silver",
    bgGradient: "linear-gradient(135deg, #1c1917 0%, #292524 40%, #44403c 80%, #57534e 100%)",
    borderColor: "border-zinc-500/30",
    glowEffect: "rgba(120, 113, 108, 0.15)",
    holoOverlay: false,
    textColor: "text-zinc-400",
    accentColor: "text-zinc-200",
  },
  neon: {
    id: "neon",
    name: "Neon Cyber",
    bgGradient: "linear-gradient(135deg, #050b07 0%, #0c1a10 40%, #15331e 80%, #166534 100%)",
    borderColor: "border-green-400/60 shadow-[0_0_25px_rgba(34,197,94,0.4)]",
    glowEffect: "rgba(34, 197, 94, 0.4)",
    holoOverlay: true,
    textColor: "text-green-300",
    accentColor: "text-green-400",
  },
  inferno: {
    id: "inferno",
    name: "Inferno Edition",
    bgGradient: "linear-gradient(135deg, #1c0a00 0%, #451a03 40%, #7c2d12 80%, #9a3412 100%)",
    borderColor: "border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    glowEffect: "rgba(249, 115, 22, 0.4)",
    holoOverlay: false,
    textColor: "text-orange-300",
    accentColor: "text-orange-400",
  },
  crystal: {
    id: "crystal",
    name: "Crystal Quartz",
    bgGradient: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)",
    borderColor: "border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    glowEffect: "rgba(255, 255, 255, 0.15)",
    holoOverlay: true,
    textColor: "text-white/60",
    accentColor: "text-white/90",
  },
  bronze: {
    id: "bronze",
    name: "Rare Bronze",
    bgGradient: "linear-gradient(135deg, #1c1917 0%, #2d1d15 50%, #452a1a 100%)",
    borderColor: "border-amber-800/30",
    glowEffect: "rgba(139, 92, 26, 0.1)",
    holoOverlay: false,
    textColor: "text-stone-500",
    accentColor: "text-amber-800",
  },
};

export const getThemeConfigByOvr = (ovr: number): ThemeConfig => {
  if (ovr >= 95) return THEME_RULES.galaxy;
  if (ovr >= 90) return THEME_RULES.legend;
  if (ovr >= 85) return THEME_RULES.gold;
  if (ovr >= 80) return THEME_RULES.champion;
  if (ovr >= 75) return THEME_RULES.shadow;
  if (ovr >= 70) return THEME_RULES.silver;
  if (ovr >= 65) return THEME_RULES.neon;
  if (ovr >= 60) return THEME_RULES.inferno;
  if (ovr >= 50) return THEME_RULES.crystal;
  return THEME_RULES.bronze;
};
