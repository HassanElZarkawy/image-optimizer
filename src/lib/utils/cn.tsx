import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names efficiently with proper Tailwind CSS handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
