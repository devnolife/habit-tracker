/**
 * 🎨 TAILWIND COLORS EXPORT
 * =========================
 * File ini menghubungkan colors.ts dengan Tailwind
 * Jangan edit langsung! Edit di config/colors.ts
 */

const { PRIMARY, SECONDARY, ACCENT, BACKGROUND, TEXT, STATUS, SOFT, GRAY, PRAYER, NUTRITION, WORK, EXPENSE } = require("./config/colors");

module.exports = {
  // Primary colors
  primary: {
    DEFAULT: PRIMARY.main,
    light: PRIMARY.light,
    dark: PRIMARY.dark,
  },

  // Secondary colors
  secondary: {
    DEFAULT: SECONDARY.main,
    light: SECONDARY.light,
    dark: SECONDARY.dark,
  },

  // Accent colors
  accent: {
    DEFAULT: ACCENT.main,
    light: ACCENT.light,
    dark: ACCENT.dark,
  },

  // Background
  background: {
    DEFAULT: BACKGROUND.primary,
    secondary: BACKGROUND.secondary,
    tertiary: BACKGROUND.tertiary,
  },

  // Text
  foreground: {
    DEFAULT: TEXT.primary,
    secondary: TEXT.secondary,
    muted: TEXT.muted,
  },

  // Status
  success: {
    DEFAULT: STATUS.success,
    light: STATUS.successLight,
  },
  warning: {
    DEFAULT: STATUS.warning,
    light: STATUS.warningLight,
  },
  error: {
    DEFAULT: STATUS.error,
    light: STATUS.errorLight,
  },
  info: {
    DEFAULT: STATUS.info,
    light: STATUS.infoLight,
  },

  // Soft/Pastel colors
  soft: {
    green: SOFT.green,
    blue: SOFT.blue,
    red: SOFT.red,
    yellow: SOFT.yellow,
    purple: SOFT.purple,
    orange: SOFT.orange,
    pink: SOFT.pink,
    cyan: SOFT.cyan,
  },

  // Feature colors
  prayer: PRAYER,
  nutrition: NUTRITION,
  work: WORK,
  expense: EXPENSE,
};
