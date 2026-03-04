/**
 * 📦 TYPE DEFINITIONS
 * ===================
 * Central type definitions for the entire application.
 * Organized by feature domain.
 *
 * ⚠️  Keep this file as the SINGLE SOURCE OF TRUTH for all shared types.
 *     Domain-specific types that are only used inside one service/component
 *     can live next to that file, but anything shared MUST be declared here.
 */

// ─────────────────────────────────────────────
// 🕌  PRAYER TRACKER
// ─────────────────────────────────────────────

/** The five daily prayer names used throughout the app. */
export type PrayerName = 'Subuh' | 'Dzuhur' | 'Ashar' | 'Maghrib' | 'Isya';

export interface Prayer {
  id: string;
  name: PrayerName;
  time: string; // HH:mm
  completed: boolean;
  completedAt?: string; // ISO date string
  date: string; // YYYY-MM-DD
}

export interface DailyPrayer {
  date: string; // YYYY-MM-DD
  prayers: Prayer[];
}

export interface PrayerStats {
  completed: number;
  total: number;
  percentage: number;
}

// ─────────────────────────────────────────────
// 🍎  NUTRITION TRACKER
// ─────────────────────────────────────────────

export type MealType = 'Sarapan' | 'Makan Siang' | 'Makan Malam' | 'Snack';

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  calories: number;
  items: string[];
  time: string; // HH:mm
  date: string; // YYYY-MM-DD
}

export interface DailyNutrition {
  date: string; // YYYY-MM-DD
  meals: Meal[];
  totalCalories: number;
  goal: number;
}

export interface NutritionSummary {
  date: string;
  totalCalories: number;
  targetCalories: number;
  meals: Meal[];
}

// ─────────────────────────────────────────────
// 💼  WORK / POMODORO TRACKER
// ─────────────────────────────────────────────

export type SessionType = 'focus' | 'break' | 'longBreak';

export interface WorkSession {
  id: string;
  type: SessionType;
  duration: number; // minutes
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  completed: boolean;
  task?: string;
  date: string; // YYYY-MM-DD
}

export interface PomodoroState {
  isRunning: boolean;
  currentSession: SessionType;
  timeRemaining: number; // seconds
  sessionsCompleted: number;
  currentTask?: string;
}

export interface WorkSummary {
  date: string;
  totalFocusTime: number; // minutes
  targetFocusTime: number; // minutes
  sessions: WorkSession[];
  pomodorosCompleted: number;
}

// ─────────────────────────────────────────────
// 💰  EXPENSE TRACKER
// ─────────────────────────────────────────────

export type ExpenseCategory =
  | 'Makanan'
  | 'Transport'
  | 'Belanja'
  | 'Tagihan'
  | 'Hiburan'
  | 'Kesehatan'
  | 'Lainnya';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  category: ExpenseCategory;
  amount: number;
  type: TransactionType;
  time: string; // HH:mm
  date: string; // YYYY-MM-DD
  notes?: string;
}

export interface Budget {
  category: ExpenseCategory;
  limit: number;
  spent: number;
}

export interface MonthlyFinance {
  month: string; // YYYY-MM
  income: number;
  expense: number;
  transactions: Transaction[];
  budgets: Budget[];
}

export interface ExpenseSummary {
  month: string;
  totalIncome: number;
  totalExpense: number;
  budget: number;
  transactions: Transaction[];
  categoryBreakdown: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
}

// ─────────────────────────────────────────────
// 👤  USER & SETTINGS
// ─────────────────────────────────────────────

export interface UserProfile {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface UserSettings {
  name: string;
  prayerNotifications: boolean;
  calorieTarget: number;
  focusTarget: number; // hours per day
  monthlyBudget: number;
  onboardingCompleted: boolean;
}

// ─────────────────────────────────────────────
// 🏠  HOME / DASHBOARD
// ─────────────────────────────────────────────

/** Tab route names used for navigation from the home screen. */
export type TabRoute = 'prayer' | 'nutrition' | 'work' | 'expense';

export interface HomePrayer {
  id: string;
  name: string;
  subtitle: string;
  time: string;
  done: boolean;
  bellOn: boolean;
}

export interface HomeActivity {
  title: string;
  category: string;
  time: string;
  ago: string;
  color: string;
  tab: TabRoute;
}

export interface HomeStats {
  prayer: { done: number; total: number };
  work: { hours: number };
  expense: { amount: string };
  food: { calories: number };
}

// ─────────────────────────────────────────────
// 🔔  NOTIFICATIONS
// ─────────────────────────────────────────────

export interface NotificationPreference {
  prayer: boolean;
  work: boolean;
  expense: boolean;
  food: boolean;
}

// ─────────────────────────────────────────────
// 🎨  THEME
// ─────────────────────────────────────────────

export interface AppTheme {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gradient: [string, string, string];
  accent: string;
  icon: string;
}

export type ThemeKey =
  | 'clean'
  | 'sunset'
  | 'ocean'
  | 'forest'
  | 'lavender'
  | 'rose'
  | 'midnight'
  | 'emerald'
  | 'coral';
