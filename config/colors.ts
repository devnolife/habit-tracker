/**
 * 🎨 COLOR CONFIGURATION
 * =====================
 * Ganti warna di sini untuk mengubah theme seluruh aplikasi!
 *
 * Tips: Gunakan website seperti:
 * - https://coolors.co
 * - https://colorhunt.co
 * - https://paletton.com
 */

// ============================================
// 🎯 PRIMARY COLORS - Warna utama aplikasi
// ============================================
export const PRIMARY = {
  main: '#2563EB', // Warna utama (tombol, link, dll) - Blue 600
  light: '#60A5FA', // Versi lebih terang - Blue 400
  dark: '#1D4ED8', // Versi lebih gelap (pressed state) - Blue 700
  contrast: '#FFFFFF', // Warna text di atas primary
} as const;

// ============================================
// 🎯 SECONDARY COLORS - Warna pendukung
// ============================================
export const SECONDARY = {
  main: '#6366F1', // Warna secondary (Indigo)
  light: '#A5B4FC', // Versi lebih terang
  dark: '#4338CA', // Versi lebih gelap
  contrast: '#FFFFFF', // Warna text di atas secondary
} as const;

// ============================================
// 🎯 ACCENT COLORS - Warna aksen/highlight
// ============================================
export const ACCENT = {
  main: '#10B981', // Warna aksen (Emerald)
  light: '#6EE7B7',
  dark: '#059669',
  contrast: '#FFFFFF',
} as const;

// ============================================
// 📱 BACKGROUND & SURFACE
// ============================================
export const BACKGROUND = {
  primary: '#FFFFFF', // Background utama
  secondary: '#F9FAFB', // Background secondary (cards, dll)
  tertiary: '#F3F4F6', // Background tertiary
} as const;

// ============================================
// ✍️ TEXT COLORS
// ============================================
export const TEXT = {
  primary: '#111827', // Text utama (heading, body)
  secondary: '#6B7280', // Text secondary (subtitle, caption)
  muted: '#9CA3AF', // Text muted (placeholder, disabled)
  inverse: '#FFFFFF', // Text di atas background gelap
} as const;

// ============================================
// 🔔 STATUS COLORS
// ============================================
export const STATUS = {
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#CA8A04',
  warningLight: '#FEF9C3',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  info: '#2563EB',
  infoLight: '#DBEAFE',
} as const;

// ============================================
// 🎨 SOFT/PASTEL COLORS (untuk cards)
// ============================================
export const SOFT = {
  green: '#E6F4EA',
  blue: '#E3F2FD',
  red: '#FCE8E6',
  yellow: '#FFF7E0',
  purple: '#F3E8FF',
  orange: '#FFF3E0',
  pink: '#FCE4EC',
  cyan: '#E0F7FA',
} as const;

// ============================================
// 🌙 GRAYSCALE
// ============================================
export const GRAY = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
} as const;

// ============================================
// 🕌 PRAYER TRACKER COLORS
// ============================================
export const PRAYER = {
  subuh: '#60A5FA', // Blue
  dzuhur: '#FBBF24', // Yellow
  ashar: '#F97316', // Orange
  maghrib: '#A855F7', // Purple
  isya: '#1E3A8A', // Dark Blue
} as const;

// ============================================
// 🍎 NUTRITION TRACKER COLORS
// ============================================
export const NUTRITION = {
  breakfast: '#FCD34D', // Yellow
  lunch: '#FB923C', // Orange
  dinner: '#F87171', // Red
  snack: '#A78BFA', // Purple
} as const;

// ============================================
// 💼 WORK TRACKER COLORS
// ============================================
export const WORK = {
  focus: '#3B82F6', // Blue
  break: '#10B981', // Green
  meeting: '#8B5CF6', // Purple
} as const;

// ============================================
// 💰 EXPENSE TRACKER COLORS
// ============================================
export const EXPENSE = {
  income: '#16A34A', // Green
  expense: '#DC2626', // Red
  food: '#F97316', // Orange
  transport: '#3B82F6', // Blue
  shopping: '#EC4899', // Pink
  bills: '#8B5CF6', // Purple
  entertainment: '#F59E0B', // Amber
  other: '#6B7280', // Gray
} as const;
