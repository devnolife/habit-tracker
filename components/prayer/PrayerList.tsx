/**
 * 🕌 PrayerList Component
 * =======================
 */

import { View, Text } from "react-native";
import { PrayerCard } from "./PrayerCard";
import type { Prayer, PrayerName } from "@/types";

interface PrayerListProps {
  prayers: Prayer[];
  onToggle: (prayerName: PrayerName) => void;
}

export function PrayerList({ prayers, onToggle }: PrayerListProps) {
  const completedCount = prayers.filter((p) => p.completed).length;

  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-foreground">
          Sholat Hari Ini
        </Text>
        <Text className="text-sm text-foreground-secondary">
          {completedCount}/{prayers.length} selesai
        </Text>
      </View>

      {prayers.map((prayer) => (
        <PrayerCard
          key={prayer.id}
          prayer={prayer}
          onToggle={() => onToggle(prayer.name as PrayerName)}
        />
      ))}
    </View>
  );
}
