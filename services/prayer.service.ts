/**
 * 🕌 PRAYER SERVICE
 * =================
 * Logic untuk fitur sholat tracker
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Prayer, PrayerName } from "@/types";
import { APP_CONFIG } from "@/config";

const STORAGE_KEY = "@prayers";

// Get prayers for a specific date
export async function getPrayers(date: string): Promise<Prayer[]> {
  try {
    const data = await AsyncStorage.getItem(`${STORAGE_KEY}_${date}`);
    if (data) {
      return JSON.parse(data);
    }
    // Return default prayers if none exist
    return createDefaultPrayers(date);
  } catch (error) {
    console.error("Error getting prayers:", error);
    return createDefaultPrayers(date);
  }
}

// Save prayers for a specific date
export async function savePrayers(date: string, prayers: Prayer[]): Promise<void> {
  try {
    await AsyncStorage.setItem(`${STORAGE_KEY}_${date}`, JSON.stringify(prayers));
  } catch (error) {
    console.error("Error saving prayers:", error);
  }
}

// Toggle prayer completion status
export async function togglePrayer(
  date: string,
  prayerName: PrayerName
): Promise<Prayer[]> {
  const prayers = await getPrayers(date);
  const updatedPrayers = prayers.map((prayer) => {
    if (prayer.name === prayerName) {
      return {
        ...prayer,
        completed: !prayer.completed,
        completedAt: !prayer.completed ? new Date().toISOString() : undefined,
      };
    }
    return prayer;
  });
  await savePrayers(date, updatedPrayers);
  return updatedPrayers;
}

// Get prayer completion stats
export async function getPrayerStats(startDate: string, endDate: string) {
  let completed = 0;
  let total = 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const prayers = await getPrayers(dateStr);
    total += prayers.length;
    completed += prayers.filter((p) => p.completed).length;
  }

  return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

// Create default prayers for a date
function createDefaultPrayers(date: string): Prayer[] {
  return APP_CONFIG.prayer.names.map((name, index) => ({
    id: `${date}_${name}`,
    name: name as PrayerName,
    time: getDefaultPrayerTime(name as PrayerName),
    completed: false,
    date,
  }));
}

// Default prayer times (should be replaced with actual calculation)
function getDefaultPrayerTime(name: PrayerName): string {
  const times: Record<PrayerName, string> = {
    Subuh: "04:30",
    Dzuhur: "12:00",
    Ashar: "15:15",
    Maghrib: "18:00",
    Isya: "19:15",
  };
  return times[name];
}
