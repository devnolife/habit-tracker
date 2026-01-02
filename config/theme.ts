/**
 * 🎨 THEME CONFIGURATION
 * ======================
 * Konfigurasi tema aplikasi yang menggabungkan semua colors
 */

import {
  PRIMARY,
  SECONDARY,
  ACCENT,
  BACKGROUND,
  TEXT,
  STATUS,
  SOFT,
  GRAY,
  PRAYER,
  NUTRITION,
  WORK,
  EXPENSE,
} from "./colors";

// ============================================
// 🎯 UNIFIED THEME OBJECT
// ============================================
export const theme = {
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    accent: ACCENT,
    background: BACKGROUND,
    text: TEXT,
    status: STATUS,
    soft: SOFT,
    gray: GRAY,
    // Feature-specific colors
    prayer: PRAYER,
    nutrition: NUTRITION,
    work: WORK,
    expense: EXPENSE,
  },

  // Spacing (in pixels)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },

  // Border Radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },

  // Font Weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Shadow presets
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
