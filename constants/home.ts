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
    name: 'Subuh',
    subtitle: 'Sholat Subuh',
    time: '04:45',
    done: true,
    bellOn: true,
  },
  {
    id: 'dhuhr',
    name: 'Dzuhur',
    subtitle: 'Sholat Dzuhur',
    time: '12:05',
    done: true,
    bellOn: true,
  },
  {
    id: 'asr',
    name: 'Ashar',
    subtitle: 'Sholat Ashar',
    time: '15:30',
    done: false,
    bellOn: false,
  },
  {
    id: 'maghrib',
    name: 'Maghrib',
    subtitle: 'Sholat Maghrib',
    time: '18:15',
    done: false,
    bellOn: false,
  },
  {
    id: 'isya',
    name: 'Isya',
    subtitle: 'Sholat Isya',
    time: '19:30',
    done: false,
    bellOn: false,
  },
];

// ─────────────────────────────────────────────
// 📋  Recent activity feed
// ─────────────────────────────────────────────

export const MOCK_ACTIVITIES: HomeActivity[] = [
  {
    title: 'Makan Siang (Ayam Bakar)',
    category: 'Makanan',
    time: '12:30',
    ago: '1 jam lalu',
    color: '#FBBF24',
    tab: 'nutrition',
  },
  {
    title: 'Sholat Dzuhur',
    category: 'Sholat',
    time: '12:15',
    ago: '1 jam lalu',
    color: '#22C55E',
    tab: 'prayer',
  },
  {
    title: 'Sesi Kerja Fokus',
    category: 'Kerja',
    time: '09:00',
    ago: '4 jam lalu',
    color: '#3B82F6',
    tab: 'work',
  },
  {
    title: 'Transportasi (Gojek)',
    category: 'Pengeluaran',
    time: '08:30',
    ago: '5 jam lalu',
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
