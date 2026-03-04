/**
 * 🧭 USE TAB NAVIGATOR HOOK
 * ===========================
 * Provides a type-safe `navigateToTab` callback for routing
 * from the Home screen (or any screen) to specific tab routes.
 *
 * This keeps navigation logic out of the component body
 * and ensures tab route strings are validated at the type level.
 *
 * Usage:
 *   const { navigateToTab, navigateTo } = useTabNavigator();
 *
 *   navigateToTab('prayer');   // → /(tabs)/prayer
 *   navigateToTab('nutrition'); // → /(tabs)/nutrition
 *   navigateTo('/settings');   // → /settings
 *   navigateTo('/progress');   // → /progress
 */

import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import type { TabRoute } from '@/types';

// ─────────────────────────────────────────────
// Route mapping
// ─────────────────────────────────────────────

const TAB_ROUTES: Record<TabRoute, string> = {
  prayer: '/(tabs)/prayer',
  work: '/(tabs)/work',
  expense: '/(tabs)/expense',
  nutrition: '/(tabs)/nutrition',
};

/**
 * Some components reference "food" instead of "nutrition".
 * This alias map normalises those before lookup.
 */
const ALIASES: Record<string, TabRoute> = {
  food: 'nutrition',
  sholat: 'prayer',
  makanan: 'nutrition',
  pengeluaran: 'expense',
  kerja: 'work',
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface UseTabNavigatorReturn {
  /** Navigate to a specific tab screen by its route key. */
  navigateToTab: (tab: TabRoute | string) => void;
  /** Navigate to an arbitrary route path (e.g. '/settings', '/progress'). */
  navigateTo: (path: string) => void;
  /** Go back to the previous screen. */
  goBack: () => void;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useTabNavigator(): UseTabNavigatorReturn {
  const router = useRouter();

  const navigateToTab = useCallback(
    (tab: TabRoute | string) => {
      // Normalise aliases (e.g. "food" → "nutrition")
      const normalised = ALIASES[tab.toLowerCase()] ?? tab;
      const route = TAB_ROUTES[normalised as TabRoute];

      if (route) {
        router.push(route as any);
      } else {
        console.warn(
          `[useTabNavigator] Unknown tab route: "${tab}". ` +
            `Valid routes: ${Object.keys(TAB_ROUTES).join(', ')}`,
        );
      }
    },
    [router],
  );

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path as any);
    },
    [router],
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    navigateToTab,
    navigateTo,
    goBack,
  };
}
