// Prayer Types
export interface Prayer {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  completedAt?: Date;
}

export interface DailyPrayer {
  date: string;
  prayers: Prayer[];
}

// Nutrition Types
export interface Meal {
  id: string;
  name: string;
  type: "Sarapan" | "Makan Siang" | "Makan Malam" | "Snack";
  calories: number;
  items: string[];
  time: string;
  date: string;
}

export interface NutritionSummary {
  date: string;
  totalCalories: number;
  targetCalories: number;
  meals: Meal[];
}

// Work/Pomodoro Types
export interface PomodoroSession {
  id: string;
  type: "focus" | "short_break" | "long_break";
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  label?: string;
}

export interface WorkSession {
  id: string;
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  date: string;
}

export interface WorkSummary {
  date: string;
  totalFocusTime: number; // in minutes
  targetFocusTime: number; // in minutes
  sessions: WorkSession[];
  pomodorosCompleted: number;
}

// Expense Types
export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number; // negative for expense, positive for income
  type: "income" | "expense";
  time: string;
  date: string;
  notes?: string;
}

export interface ExpenseSummary {
  month: string;
  totalIncome: number;
  totalExpense: number;
  budget: number;
  transactions: Transaction[];
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

// User Types
export interface UserSettings {
  name: string;
  prayerNotifications: boolean;
  calorieTarget: number;
  focusTarget: number; // in hours
  monthlyBudget: number;
  onboardingCompleted: boolean;
}
