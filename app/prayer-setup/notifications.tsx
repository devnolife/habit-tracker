import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import Slider from "@react-native-community/slider";

// Gen Z Emerald Green (matching prayer tab)
const PRIMARY = "#10b981";

// Prayer notification data
const PRAYERS_NOTIFICATION = [
  { id: "fajr", name: "Subuh", icon: "weather-sunset-up", enabled: true, expanded: true },
  { id: "dhuhr", name: "Dzuhur", icon: "white-balance-sunny", enabled: true, expanded: false },
  { id: "asr", name: "Ashar", icon: "weather-sunny", enabled: true, expanded: false },
  { id: "maghrib", name: "Maghrib", icon: "weather-sunset", enabled: true, expanded: false },
  { id: "isha", name: "Isya", icon: "weather-night", enabled: false, expanded: false },
];

// Sound options
const SOUND_OPTIONS = ["Makkah (Al-Afasy)", "Madinah (Al-Surayhi)", "Al-Aqsa", "Nada Lembut"];

// Vibration options  
const VIBRATION_OPTIONS = ["Halus", "Standar", "Tidak Ada"];

// Prayer Card Component
const PrayerNotificationCard = ({
  prayer,
  isExpanded,
  onToggle,
  onExpandToggle
}: {
  prayer: typeof PRAYERS_NOTIFICATION[0];
  isExpanded: boolean;
  onToggle: (enabled: boolean) => void;
  onExpandToggle: () => void;
}) => {
  const [selectedVibration, setSelectedVibration] = useState("Halus");
  const [reminderMinutes, setReminderMinutes] = useState(15);

  return (
    <View
      className={`bg-white rounded-2xl border overflow-hidden ${!prayer.enabled ? "opacity-80" : ""
        }`}
      style={styles.card}
    >
      {/* Header Row */}
      <TouchableOpacity
        className="flex-row items-center justify-between p-4"
        onPress={onExpandToggle}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center gap-4">
          <View
            className={`w-12 h-12 rounded-2xl items-center justify-center ${prayer.enabled ? "bg-emerald-100" : "bg-slate-100"
              }`}
          >
            <MaterialCommunityIcons
              name={prayer.icon as any}
              size={24}
              color={prayer.enabled ? PRIMARY : "#64748b"}
            />
          </View>
          <View>
            <Text className="text-lg font-bold text-slate-900">{prayer.name}</Text>
            <Text className={`text-sm ${prayer.enabled ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
              {prayer.enabled ? "Adzan Aktif" : "Notifikasi Mati"}
            </Text>
          </View>
        </View>

        <Switch
          value={prayer.enabled}
          onValueChange={onToggle}
          trackColor={{ false: "#e2e8f0", true: PRIMARY }}
          thumbColor="#FFF"
        />
      </TouchableOpacity>

      {/* Expanded Settings */}
      {isExpanded && prayer.enabled && (
        <View className="px-4 pb-6 pt-2 gap-5">
          {/* Sound Selection */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="volume-high" size={18} color="#64748b" />
              <Text className="text-sm font-medium text-slate-500">Suara Notifikasi</Text>
            </View>
            <View className="relative bg-slate-100 rounded-xl border border-slate-200 h-12 justify-center px-4">
              <Text className="text-base font-medium text-slate-900">Makkah (Al-Afasy)</Text>
              <View className="absolute right-4">
                <MaterialCommunityIcons name="chevron-down" size={24} color="#64748b" />
              </View>
            </View>
          </View>

          {/* Vibration Selection */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="vibrate" size={18} color="#64748b" />
              <Text className="text-sm font-medium text-slate-500">Pola Getaran</Text>
            </View>
            <View className="flex-row gap-2">
              {VIBRATION_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`flex-1 py-2.5 px-3 rounded-xl ${selectedVibration === option
                    ? "bg-emerald-500"
                    : "bg-slate-100 border border-slate-200"
                    }`}
                  onPress={() => setSelectedVibration(option)}
                >
                  <Text
                    className={`text-sm font-semibold text-center ${selectedVibration === option ? "text-white" : "text-slate-700"
                      }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Pre-Adhan Reminder */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="alarm" size={18} color="#64748b" />
                <Text className="text-sm font-medium text-slate-500">Pengingat Sebelum Adzan</Text>
              </View>
              <Text className="text-sm font-bold text-primary">{reminderMinutes} menit</Text>
            </View>
            <View className="h-6 justify-center">
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={60}
                step={5}
                value={reminderMinutes}
                onValueChange={setReminderMinutes}
                minimumTrackTintColor={PRIMARY}
                maximumTrackTintColor="#e8f5e9"
                thumbTintColor={PRIMARY}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default function NotificationsScreen() {
  const [prayers, setPrayers] = useState(PRAYERS_NOTIFICATION);
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>("fajr");

  const togglePrayer = (id: string, enabled: boolean) => {
    setPrayers(prev => prev.map(p =>
      p.id === id ? { ...p, enabled } : p
    ));
  };

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView className="flex-1">
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <TouchableOpacity
            className="w-12 h-12 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-slate-900">Notifikasi</Text>
          <View className="w-12" />
        </View>

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Headline */}
          <Text className="text-[28px] font-extrabold text-slate-900 pt-2 pb-2">
            Atur Notifikasi Sholat
          </Text>

          {/* Body Text */}
          <Text className="text-base text-slate-500 pb-6 leading-relaxed">
            Kelola suara adzan, getaran, dan pengingat untuk setiap waktu sholat.
          </Text>

          {/* Prayer List */}
          <View className="gap-4">
            {prayers.map((prayer) => (
              <PrayerNotificationCard
                key={prayer.id}
                prayer={prayer}
                isExpanded={expandedPrayer === prayer.id}
                onToggle={(enabled) => togglePrayer(prayer.id, enabled)}
                onExpandToggle={() => setExpandedPrayer(
                  expandedPrayer === prayer.id ? null : prayer.id
                )}
              />
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-slate-50/95 border-t border-transparent">
          <TouchableOpacity
            className="w-full h-14 bg-primary rounded-full items-center justify-center"
            style={styles.finishButton}
            onPress={() => router.replace("/(tabs)/prayer")}
          >
            <Text className="text-white font-bold text-lg">Selesai</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderColor: "transparent",
  },
  finishButton: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
