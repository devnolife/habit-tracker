// App Colors
export const COLORS = {
  // Primary Brand Colors
  primary: '#f48c25',
  primaryDark: '#d67615',
  primaryLight: '#ffa94d',

  // Module-specific Colors
  prayer: '#22c55e',
  prayerDark: '#15803d',
  expense: '#f48c25',
  expenseDark: '#ea580c',
  nutrition: '#84cc16',
  nutritionDark: '#65a30d',
  work: '#3b82f6',
  workDark: '#2563eb',

  // Status Colors
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
  info: '#3b82f6',

  // Neutral Colors
  white: '#ffffff',
  black: '#000000',
  background: '#f8f7f5',
  backgroundDark: '#221910',
  surface: '#ffffff',
  surfaceDark: '#2d241b',
  foreground: '#181411',
  foregroundDark: '#ffffff',
  muted: '#8a7560',
  mutedDark: '#a39585',

  // Macronutrient Colors
  carbs: '#facc15',
  protein: '#22c55e',
  fat: '#fb923c',
} as const;

// Prayer Names & Arabic
export const PRAYERS = [
  { id: 'fajr', name: 'Fajr', arabic: 'الفجر', icon: 'sunny' },
  { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر', icon: 'sunny' },
  { id: 'asr', name: 'Asr', arabic: 'العصر', icon: 'partly-sunny' },
  { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب', icon: 'moon' },
  { id: 'isya', name: 'Isya', arabic: 'العشاء', icon: 'moon' },
] as const;

// Calculation Methods for Prayer Times
export const CALCULATION_METHODS = [
  { id: 'kemenag', name: 'Kemenag RI', description: 'Kementerian Agama Indonesia' },
  { id: 'mwl', name: 'Muslim World League', description: 'International standard' },
  { id: 'isna', name: 'ISNA', description: 'Islamic Society of North America' },
  { id: 'egypt', name: 'Egyptian General Authority', description: 'Egypt' },
  { id: 'makkah', name: 'Umm Al-Qura', description: 'Makkah, Saudi Arabia' },
  { id: 'karachi', name: 'University of Islamic Sciences', description: 'Karachi, Pakistan' },
] as const;

// Expense Categories
export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Drinks', icon: 'restaurant', color: '#f97316' },
  { id: 'transport', name: 'Transportation', icon: 'car', color: '#3b82f6' },
  { id: 'shopping', name: 'Shopping', icon: 'cart', color: '#a855f7' },
  { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: '#22c55e' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', color: '#ec4899' },
  { id: 'health', name: 'Health', icon: 'fitness', color: '#14b8a6' },
  { id: 'education', name: 'Education', icon: 'school', color: '#6366f1' },
  { id: 'zakat', name: 'Zakat', icon: 'heart', color: '#10b981' },
  { id: 'sadaqah', name: 'Sadaqah', icon: 'gift', color: '#f59e0b' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal', color: '#6b7280' },
] as const;

// Meal Types
export const MEAL_TYPES = [
  { id: 'breakfast', name: 'Breakfast', icon: 'sunny', color: '#facc15' },
  { id: 'lunch', name: 'Lunch', icon: 'restaurant', color: '#f97316' },
  { id: 'dinner', name: 'Dinner', icon: 'moon', color: '#6366f1' },
  { id: 'snack', name: 'Snack', icon: 'cafe', color: '#ec4899' },
  { id: 'sahur', name: 'Sahur', icon: 'moon', color: '#8b5cf6' },
  { id: 'iftar', name: 'Iftar', icon: 'star', color: '#f48c25' },
] as const;

// Task Categories
export const TASK_CATEGORIES = [
  { id: 'personal', name: 'Personal', color: '#a855f7' },
  { id: 'deep-work', name: 'Deep Work', color: '#3b82f6' },
  { id: 'meetings', name: 'Meetings', color: '#f97316' },
  { id: 'admin', name: 'Admin', color: '#6b7280' },
  { id: 'learning', name: 'Learning', color: '#22c55e' },
] as const;

// Pomodoro Presets
export const POMODORO_PRESETS = [
  { id: 'short', label: '25m', focusMinutes: 25, breakMinutes: 5 },
  { id: 'medium', label: '50m', focusMinutes: 50, breakMinutes: 10 },
  { id: 'long', label: '90m', focusMinutes: 90, breakMinutes: 15 },
] as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  prayer: {
    calculationMethod: 'kemenag',
    notifications: true,
    reminderMinutesBefore: 10,
  },
  expense: {
    monthlyBudget: 5000000,
    currency: 'IDR',
    enabledCategories: ['food', 'transport', 'shopping', 'bills'],
  },
  nutrition: {
    dailyCalorieGoal: 2000,
    carbsPercentage: 50,
    proteinPercentage: 25,
    fatPercentage: 25,
    waterGoalGlasses: 8,
  },
  work: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    dailyFocusGoal: 240, // 4 hours
  },
} as const;

// Islamic Months
export const ISLAMIC_MONTHS = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhul Qadah',
  'Dhul Hijjah',
] as const;

// Days of Week
export const DAYS_OF_WEEK = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' },
] as const;
