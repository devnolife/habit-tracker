/**
 * 🪝 useTheme Hook
 * ================
 * Hook untuk mengakses theme dengan mudah
 */

import { theme } from "@/config";

export function useTheme() {
  return theme;
}

export function useColors() {
  return theme.colors;
}

export function usePrimaryColor() {
  return theme.colors.primary.main;
}
