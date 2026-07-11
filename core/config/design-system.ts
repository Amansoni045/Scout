export const DESIGN_TOKENS = {
  colors: {
    dark: {
      950: "#030303",
      900: "#09090b",
      800: "#18181b",
      700: "#27272a",
      400: "#a1a1aa",
      100: "#f4f4f5",
    },
    accent: {
      gold: {
        glow: "rgba(234, 179, 8, 0.15)",
        border: "rgba(234, 179, 8, 0.4)",
        solid: "#eab308",
      },
      toty: {
        glow: "rgba(99, 102, 241, 0.3)",
        border: "rgba(99, 102, 241, 0.5)",
        solid: "#6366f1",
      },
      silver: {
        glow: "rgba(161, 161, 170, 0.15)",
        border: "rgba(161, 161, 170, 0.35)",
        solid: "#a1a1aa",
      },
      bronze: {
        glow: "rgba(180, 83, 9, 0.15)",
        border: "rgba(180, 83, 9, 0.35)",
        solid: "#b45309",
      },
    },
  },
  gradients: {
    gold: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #78350f 100%)",
    toty: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #1e1b4b 100%)",
    silver: "linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 50%, #52525b 100%)",
    bronze: "linear-gradient(135deg, #f97316 0%, #b45309 50%, #451a03 100%)",
    darkGlass: "linear-gradient(135deg, rgba(24, 24, 27, 0.6) 0%, rgba(9, 9, 11, 0.8) 100%)",
    metallicShine: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
  },
  shadows: {
    premium: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    goldGlow: "0 0 40px rgba(234, 179, 8, 0.25)",
    totyGlow: "0 0 50px rgba(99, 102, 241, 0.4)",
    glassGlow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  animations: {
    shine: "shine 3s ease-in-out infinite",
    holo: "holo 6s linear infinite",
    pulseGlow: "pulseGlow 2s ease-in-out infinite",
  },
  radii: {
    card: "1.5rem",
    badge: "0.5rem",
    button: "0.75rem",
  },
} as const;
