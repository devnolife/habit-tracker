/**
 * 🕌 PrayerCard Component
 * =======================
 */

import { View, Text, TouchableOpacity } from "react-native";
import { Check, Clock } from "lucide-react-native";
import { PRAYER } from "@/config/colors";
import type { Prayer, PrayerName } from "@/types";

interface PrayerCardProps {
  prayer: Prayer;
  onToggle: () => void;
}

const prayerColors: Record<PrayerName, string> = {
  Subuh: PRAYER.subuh,
  Dzuhur: PRAYER.dzuhur,
  Ashar: PRAYER.ashar,
  Maghrib: PRAYER.maghrib,
  Isya: PRAYER.isya,
};

export function PrayerCard({ prayer, onToggle }: PrayerCardProps) {
  const color = prayerColors[prayer.name as PrayerName] || PRAYER.subuh;

  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`flex-row items-center p-4 rounded-2xl mb-3 ${prayer.completed ? "bg-success-light" : "bg-white"
        }`}
      style={{
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${prayer.completed ? "bg-success" : "bg-gray-100"
          }`}
      >
        {prayer.completed ? (
          <Check size={20} color="white" />
        ) : (
          <Clock size={20} color={color} />
        )}
      </View>

      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${prayer.completed ? "text-success" : "text-foreground"
            }`}
        >
          {prayer.name}
        </Text>
        <Text className="text-sm text-foreground-secondary">
          {prayer.time}
        </Text>
      </View>

      {prayer.completed && (
        <Text className="text-xs text-success font-medium">
          ✓ Selesai
        </Text>
      )}
    </TouchableOpacity>
  );
}
