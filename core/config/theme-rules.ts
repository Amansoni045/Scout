import { ThemeConfig } from "../../types";

export const THEME_RULES: Record<string, ThemeConfig> = {
  toty: {
    id: "toty",
    name: "Team of the Year",
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 70%, #5850ec 100%)",
    borderColor: "border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    glowEffect: "rgba(99, 102, 241, 0.45)",
    holoOverlay: true,
    textColor: "text-indigo-100",
    accentColor: "text-cyan-300",
  },
  gold: {
    id: "gold",
    name: "Rare Gold",
    bgGradient: "linear-gradient(135deg, #451a03 0%, #78350f 30%, #b45309 70%, #d97706 100%)",
    borderColor: "border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    glowEffect: "rgba(245, 158, 11, 0.25)",
    holoOverlay: false,
    textColor: "text-amber-500",
    accentColor: "text-amber-200",
  },
  silver: {
    id: "silver",
    name: "Rare Silver",
    bgGradient: "linear-gradient(135deg, #18181b 0%, #27272a 40%, #52525b 80%, #71717a 100%)",
    borderColor: "border-zinc-500/40",
    glowEffect: "rgba(161, 161, 170, 0.15)",
    holoOverlay: false,
    textColor: "text-zinc-400",
    accentColor: "text-zinc-200",
  },
  bronze: {
    id: "bronze",
    name: "Rare Bronze",
    bgGradient: "linear-gradient(135deg, #09090b 0%, #1c1917 40%, #44403c 80%, #78716c 100%)",
    borderColor: "border-stone-600/30",
    glowEffect: "rgba(120, 113, 108, 0.1)",
    holoOverlay: false,
    textColor: "text-stone-500",
    accentColor: "text-stone-300",
  },
};
export const getThemeConfigByOvr = (ovr: number): ThemeConfig => {
  if (ovr >= 90) return THEME_RULES.toty;
  if (ovr >= 80) return THEME_RULES.gold;
  if (ovr >= 70) return THEME_RULES.silver;
  return THEME_RULES.bronze;
};
