export type CardType = "developer" | "github" | "resume" | "career" | "team";

export interface PlayerProfile {
  username: string;
  avatar: string;
  country: string | null;
  platform: "leetcode" | "github" | "codeforces" | "atcoder" | string;
  ranking: number | null;
  contestRating: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  languages: string[];
  streak: number | null;
  recentActivityCount: number;
  badges: Array<{ name: string; iconUrl: string }>;
  achievements: string[];
}

export interface CardStats {
  ovr: number;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgGradient: string;
  borderColor: string;
  glowEffect: string;
  holoOverlay: boolean;
  textColor: string;
  accentColor: string;
}

export interface CardMetadata {
  cardType: CardType;
  ratingVersion: string;
  providerVersion: string;
  themeVersion: string;
  generatedAt: string;
}

export interface DevCard {
  profile: PlayerProfile;
  stats: CardStats;
  achievements: Achievement[];
  theme: ThemeConfig;
  metadata: CardMetadata;
  aiSummary?: string;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string; details?: unknown } };

export type ExportFormat = "png" | "jpg" | "svg" | "pdf";
export type ExportTemplate = "card" | "linkedin_banner" | "instagram_story" | "twitter_card" | "wallpaper";

export interface ExportOptions {
  format: ExportFormat;
  template: ExportTemplate;
  transparentBg?: boolean;
  scale?: number;
}
