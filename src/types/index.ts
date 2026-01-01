// Prayer Types
export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isya';
export type PrayerStatus = 'completed' | 'current' | 'missed' | 'upcoming';

export interface Prayer {
  id: string;
  name: PrayerName;
  arabicName: string;
  time: string;
  adhanTime: string;
  iqamahTime: string;
  status: PrayerStatus;
  jamaah: boolean;
  date: string;
}

export interface PrayerSettings {
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  calculationMethod: string;
  notifications: boolean;
  reminderMinutesBefore: number;
}

// Expense Types
export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'zakat'
  | 'sadaqah'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
  isIncome: boolean;
}

export interface ExpenseSettings {
  monthlyBudget: number;
  currency: string;
  enabledCategories: ExpenseCategory[];
}

// Nutrition Types
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'sahur' | 'iftar';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  servingSize: string;
  isHalal: boolean;
}

export interface Meal {
  id: string;
  type: MealType;
  items: FoodItem[];
  time: string;
  date: string;
  totalCalories: number;
}

export interface NutritionSettings {
  dailyCalorieGoal: number;
  carbsPercentage: number;
  proteinPercentage: number;
  fatPercentage: number;
  waterGoalGlasses: number;
}

// Work/Productivity Types
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'personal' | 'deep-work' | 'meetings' | 'admin' | 'learning';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  completed: boolean;
  date: string;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  duration: number; // in minutes
  type: 'focus' | 'break';
  startTime: string;
  endTime?: string;
  completed: boolean;
}

export interface WorkSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  dailyFocusGoal: number; // in minutes
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  timezone: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

// Stats Types
export interface DailyStats {
  date: string;
  prayersCompleted: number;
  prayersTotal: number;
  expenseTotal: number;
  incomeTotal: number;
  caloriesConsumed: number;
  caloriesGoal: number;
  focusMinutes: number;
  tasksCompleted: number;
  tasksTotal: number;
}

export interface WeeklyStats {
  startDate: string;
  endDate: string;
  dailyStats: DailyStats[];
  prayerStreak: number;
  averageFocusScore: number;
}
