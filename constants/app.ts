// Prayer Constants
export const PRAYER_NAMES = [
  "Subuh",
  "Dzuhur",
  "Ashar",
  "Maghrib",
  "Isya",
] as const;

export type PrayerName = (typeof PRAYER_NAMES)[number];

// Nutrition Constants
export const MEAL_TYPES = [
  "Sarapan",
  "Makan Siang",
  "Makan Malam",
  "Snack",
] as const;

export type MealType = (typeof MEAL_TYPES)[number];

export const DEFAULT_CALORIE_TARGET = 2000;

// Work/Pomodoro Constants
export const POMODORO_DURATION = 25; // minutes
export const SHORT_BREAK_DURATION = 5; // minutes
export const LONG_BREAK_DURATION = 15; // minutes
export const POMODOROS_BEFORE_LONG_BREAK = 4;

export const DEFAULT_FOCUS_TARGET = 6; // hours per day

// Expense Constants
export const EXPENSE_CATEGORIES = [
  "Makanan",
  "Transport",
  "Belanja",
  "Hiburan",
  "Tagihan",
  "Kesehatan",
  "Pendidikan",
  "Lainnya",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const INCOME_CATEGORIES = [
  "Gaji",
  "Freelance",
  "Investasi",
  "Hadiah",
  "Lainnya",
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
