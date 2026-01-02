// App Colors
export const COLORS = {
  // Primary
  primary: "#f48c25",
  primaryDark: "#ea580c",

  // Background
  background: "#FFFFFF",
  surface: "#F9FAFB",

  // Soft Colors (for cards)
  softGreen: "#E6F4EA",
  softBlue: "#E3F2FD",
  softRed: "#FCE8E6",
  softYellow: "#FFF7E0",
  softPurple: "#F3E8FF",

  // Text
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",

  // Status
  success: "#16A34A",
  warning: "#CA8A04",
  error: "#DC2626",
  info: "#2563EB",

  // Gray Scale
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
} as const;

// App Typography
export const FONTS = {
  regular: "System",
  medium: "System",
  semibold: "System",
  bold: "System",
} as const;

// App Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border Radius
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
