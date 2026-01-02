/**
 * 📱 APP CONFIGURATION
 * ====================
 * Konfigurasi aplikasi secara umum
 */

export const APP_CONFIG = {
  name: "Habit Tracker",
  version: "1.0.0",

  // API Configuration (if needed)
  api: {
    baseUrl: "",
    timeout: 10000,
  },

  // Feature Flags
  features: {
    prayerTracker: true,
    nutritionTracker: true,
    workTracker: true,
    expenseTracker: true,
    darkMode: false, // Coming soon
    notifications: true,
  },

  // Prayer times configuration
  prayer: {
    names: ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"] as const,
    defaultMethod: "Kemenag", // Calculation method
  },

  // Nutrition configuration
  nutrition: {
    mealTypes: ["Sarapan", "Makan Siang", "Makan Malam", "Snack"] as const,
    defaultCalorieGoal: 2000,
  },

  // Work/Pomodoro configuration
  work: {
    defaultFocusDuration: 25, // minutes
    defaultBreakDuration: 5,  // minutes
    longBreakDuration: 15,    // minutes
    sessionsBeforeLongBreak: 4,
  },

  // Expense configuration
  expense: {
    defaultCurrency: "IDR",
    currencySymbol: "Rp",
    categories: [
      "Makanan",
      "Transport",
      "Belanja",
      "Tagihan",
      "Hiburan",
      "Kesehatan",
      "Lainnya",
    ] as const,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
