import { clsx, type ClassValue } from "clsx";
// we only need tailwind-merge and clsx
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
