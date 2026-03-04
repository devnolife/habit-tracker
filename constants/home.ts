/**
 * 🏠 HOME SCREEN CONSTANTS
 * =========================
 * Mock data & initial values used by the Home dashboard.
 *
 * When real persistence is wired up, these will serve as
 * fallback / default values.
 */

import type { HomePrayer, HomeActivity, HomeStats } from '@/types';

// ─────────────────────────────────────────────
// 🕌  Initial prayer list shown in the carousel
// ─────────────────────────────────────────────

export const INITIAL_PRAYERS: HomePrayer[] = [
  {
    id: 'fajr',
    name: 'Fajr',
    subtitle: 'Dawn Prayer',
    time: '04:45 AM',
    done: true,
    bellOn: true,
  },
  {
    id: 'dhuhr',
    name: 'Dhuhr',
    subtitle: 'Noon Prayer',
    time: '12:05 PM',
    done: true,
    bellOn: true,
  },
  {
    id: 'asr',
    name: 'Asr',
    subtitle: 'Afternoon Prayer',
    time: '03:30 PM',
    done: false,
    bellOn: false,
  },
  {
    id: 'maghrib',
    name: 'Maghrib',
    subtitle: 'Sunset Prayer',
    time: '06:15 PM',
    done: false,
    bellOn: false,
  },
  {
    id: 'isya',
    name: 'Isya',
    subtitle: 'Night Prayer',
    time: '07:30 PM',
    done: false,
    bellOn: false,
  },
];

// ─────────────────────────────────────────────
// 📋  Recent activity feed
// ─────────────────────────────────────────────

export const MOCK_ACTIVITIES: HomeActivity[] = [
  {
    title: 'Lunch (Ayam Bakar)',
    category: 'Makanan',
    time: '12:30 PM',
    ago: '1h ago',
    color: '#FBBF24',
    tab: 'nutrition',
  },
  {
    title: 'Dhuhr Prayer',
    category: 'Sholat',
    time: '12:15 PM',
    ago: '1h ago',
    color: '#22C55E',
    tab: 'prayer',
  },
  {
    title: 'Deep Work Session',
    category: 'Work',
    time: '09:00 AM',
    ago: '4h ago',
    color: '#3B82F6',
    tab: 'work',
  },
  {
    title: 'Transport (Gojek)',
    category: 'Pengeluaran',
    time: '08:30 AM',
    ago: '5h ago',
    color: '#EF4444',
    tab: 'expense',
  },
];

// ─────────────────────────────────────────────
// 📊  Default quick-stat values (non-prayer)
// ─────────────────────────────────────────────

export const DEFAULT_WORK_HOURS = 6.5;
export const DEFAULT_EXPENSE_AMOUNT = '150K';
export const DEFAULT_FOOD_CALORIES = 1450;

/**
 * Build a `HomeStats` object.
 * Prayer stats are computed dynamically from prayer state,
 * so this helper accepts them as parameters.
 */
export function buildHomeStats(
  prayerDone: number,
  prayerTotal: number,
): HomeStats {
  return {
    prayer: { done: prayerDone, total: prayerTotal },
    work: { hours: DEFAULT_WORK_HOURS },
    expense: { amount: DEFAULT_EXPENSE_AMOUNT },
    food: { calories: DEFAULT_FOOD_CALORIES },
  };
}
