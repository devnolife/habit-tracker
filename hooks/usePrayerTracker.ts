/**
 * 🕌 USE PRAYER TRACKER HOOK
 * ============================
 * Manages prayer state for the Home screen dashboard.
 *
 * Responsibilities:
 * - Holds the list of prayers with done/bell state
 * - Provides toggle callbacks (mark done, toggle bell)
 * - Computes derived stats (done count, total, progress %)
 * - Builds the prayer carousel ordering (active first, then upcoming)
 *
 * Usage:
 *   const {
 *     prayers,
 *     stats,
 *     progressPercent,
 *     carouselPrayers,
 *     toggleDone,
 *     toggleBell,
 *   } = usePrayerTracker();
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import type { HomePrayer } from '@/types';
import { INITIAL_PRAYERS } from '@/constants';
import { getPrayers, togglePrayer as togglePrayerService } from '@/services';
import { getTodayString } from '@/lib/utils';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface PrayerStats {
  done: number;
  total: number;
}

export interface CarouselEntry {
  prayer: HomePrayer;
  isActive: boolean;
}

export interface UsePrayerTrackerReturn {
  /** Current prayer list (with latest done/bell state). */
  prayers: HomePrayer[];
  /** Number of completed prayers and total count. */
  stats: PrayerStats;
  /** Progress as an integer percentage (0–100). */
  progressPercent: number;
  /** Whether every prayer has been marked as done. */
  allCompleted: boolean;
  /** Ordered list of prayers for the horizontal carousel. */
  carouselPrayers: CarouselEntry[];
  /** Toggle the "done" flag for a prayer by id. Shows an Alert on completion. */
  toggleDone: (id: string) => void;
  /** Toggle the bell/notification flag for a prayer by id. Shows an Alert. */
  toggleBell: (id: string) => void;
  /** Reset all prayers to their initial state. */
  reset: () => void;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function usePrayerTracker(): UsePrayerTrackerReturn {
  const [prayers, setPrayers] = useState<HomePrayer[]>(INITIAL_PRAYERS);
  const today = getTodayString();

  // Load from service on mount
  useEffect(() => {
    (async () => {
      const servicePrayers = await getPrayers(today);
      // Merge service data into HomePrayer format
      const merged = INITIAL_PRAYERS.map((initial) => {
        const found = servicePrayers.find(
          (sp) => sp.name === initial.name,
        );
        return found
          ? { ...initial, done: found.completed, time: found.time }
          : initial;
      });
      setPrayers(merged);
    })();
  }, [today]);

  // ── Toggle done ──────────────────────────
  const toggleDone = useCallback((id: string) => {
    setPrayers((prev) => {
      const prayer = prev.find((p) => p.id === id);
      if (!prayer) return prev;

      const newDone = !prayer.done;
      if (newDone) {
        Alert.alert('Alhamdulillah! ✅', `${prayer.name} prayer marked as done.`);
      }

      // Persist to service
      const prayerNameMap: Record<string, string> = {
        fajr: 'Subuh',
        dhuhr: 'Dzuhur',
        asr: 'Ashar',
        maghrib: 'Maghrib',
        isya: 'Isya',
      };
      const serviceName = prayerNameMap[id] || prayer.name;
      togglePrayerService(today, serviceName as any);

      return prev.map((p) =>
        p.id === id ? { ...p, done: newDone } : p,
      );
    });
  }, [today]);

  // ── Toggle bell ──────────────────────────
  const toggleBell = useCallback((id: string) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const newBell = !p.bellOn;
        Alert.alert(
          newBell ? 'Notification On 🔔' : 'Notification Off 🔕',
          `${p.name} prayer reminder ${newBell ? 'enabled' : 'disabled'}.`,
        );
        return { ...p, bellOn: newBell };
      }),
    );
  }, []);

  // ── Reset ────────────────────────────────
  const reset = useCallback(() => {
    setPrayers(INITIAL_PRAYERS);
  }, []);

  // ── Derived stats ────────────────────────
  const stats = useMemo<PrayerStats>(() => {
    const done = prayers.filter((p) => p.done).length;
    return { done, total: prayers.length };
  }, [prayers]);

  const progressPercent = useMemo(() => {
    if (stats.total === 0) return 0;
    return Math.round((stats.done / stats.total) * 100);
  }, [stats]);

  const allCompleted = stats.done === stats.total;

  // ── Carousel ordering ────────────────────
  // 1. The first undone prayer is "active" (highlighted card).
  // 2. Remaining undone prayers are shown as "upcoming".
  // 3. If all are done, the last prayer is shown as the active card.
  const carouselPrayers = useMemo<CarouselEntry[]>(() => {
    const activePrayerIndex = prayers.findIndex((p) => !p.done);
    const entries: CarouselEntry[] = [];

    if (activePrayerIndex >= 0) {
      // Active prayer first
      entries.push({ prayer: prayers[activePrayerIndex], isActive: true });

      // Then remaining undone prayers
      prayers.forEach((p, i) => {
        if (i !== activePrayerIndex && !p.done) {
          entries.push({ prayer: p, isActive: false });
        }
      });
    } else if (prayers.length > 0) {
      // All done — show last prayer as active (completed state)
      entries.push({ prayer: prayers[prayers.length - 1], isActive: true });
    }

    return entries;
  }, [prayers]);

  return {
    prayers,
    stats,
    progressPercent,
    allCompleted,
    carouselPrayers,
    toggleDone,
    toggleBell,
    reset,
  };
}
