import { ThemeConfig } from "../../types";
import { getThemeConfigByOvr } from "../config/theme-rules";

export function getThemeForRating(ovr: number): ThemeConfig {
  return getThemeConfigByOvr(ovr);
}
