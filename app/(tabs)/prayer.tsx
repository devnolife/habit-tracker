import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

// Gen Z Color Palette - Fresh & Vibrant
const COLORS = {
  primary: "#10b981", // Emerald green
  primaryLight: "#d1fae5",
  primaryDark: "#059669",
  accent: "#06b6d4", // Cyan accent
  background: "#fafafa",
  card: "#ffffff",
  text: "#0f172a",
  textMuted: "#64748b",
  textLight: "#94a3b8",
  success: "#22c55e",
  warning: "#f59e0b",
  border: "#e2e8f0",
};

// Prayer Data dengan nama Indonesia
const PRAYERS = [
  { id: "subuh", name: "Subuh", time: "04:32", icon: "weather-sunset-up", done: true, emoji: "🌅" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05", icon: "white-balance-sunny", done: false, isNext: true, emoji: "☀️" },
  { id: "ashar", name: "Ashar", time: "15:22", icon: "weather-sunny", done: false, emoji: "🌤️" },
  { id: "maghrib", name: "Maghrib", time: "18:02", icon: "weather-sunset", done: false, emoji: "🌅" },
  { id: "isya", name: "Isya", time: "19:15", icon: "weather-night", done: false, emoji: "🌙" },
];

// Weekly streak data
const WEEK_DATA = [
  { day: "Sen", completed: 5, total: 5 },
  { day: "Sel", completed: 5, total: 5 },
  { day: "Rab", completed: 4, total: 5 },
  { day: "Kam", completed: 5, total: 5 },
  { day: "Jum", completed: 5, total: 5 },
  { day: "Sab", completed: 3, total: 5 },
  { day: "Min", completed: 1, total: 5, isToday: true },
];

// Quick Stats Component
const QuickStat = ({ value, label, icon, color }: { value: string; label: string; icon: string; color: string }) => (
  <View className="flex-1 items-center">
    <View
      className="w-12 h-12 rounded-2xl items-center justify-center mb-2"
      style={{ backgroundColor: `${color}15` }}
    >
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
    </View>
    <Text className="text-2xl font-bold text-slate-900">{value}</Text>
    <Text className="text-xs text-slate-500 mt-0.5">{label}</Text>
  </View>
);

// Prayer Time Card - Minimalist Gen Z Style
const PrayerTimeCard = ({
  prayer,
  onToggle
}: {
  prayer: typeof PRAYERS[0];
  onToggle: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 ${prayer.isNext ? "bg-emerald-50 border-2 border-emerald-200" : "bg-white"
        }`}
      style={[styles.card, prayer.isNext && styles.nextCard]}
    >
      <View className="flex-row items-center gap-4">
        {/* Checkbox / Status */}
        <TouchableOpacity
          onPress={onToggle}
          className={`w-11 h-11 rounded-full items-center justify-center ${prayer.done
            ? "bg-emerald-500"
            : prayer.isNext
              ? "bg-emerald-100 border-2 border-emerald-400"
              : "bg-slate-100"
            }`}
          style={prayer.done ? styles.checkDone : undefined}
        >
          {prayer.done ? (
            <MaterialCommunityIcons name="check" size={22} color="#fff" />
          ) : (
            <Text className="text-lg">{prayer.emoji}</Text>
          )}
        </TouchableOpacity>

        {/* Prayer Info */}
        <View>
          <Text className={`text-lg font-bold ${prayer.isNext ? "text-emerald-700" : "text-slate-800"}`}>
            {prayer.name}
          </Text>
          <Text className={`text-sm ${prayer.isNext ? "text-emerald-600" : "text-slate-500"}`}>
            {prayer.time}
          </Text>
        </View>
      </View>

      {/* Right Side */}
      <View className="items-end">
        {prayer.done && (
          <View className="bg-emerald-100 px-3 py-1 rounded-full">
            <Text className="text-xs font-semibold text-emerald-600">Selesai ✓</Text>
          </View>
        )}
        {prayer.isNext && !prayer.done && (
          <View className="bg-emerald-500 px-3 py-1.5 rounded-full" style={styles.nextBadge}>
            <Text className="text-xs font-bold text-white">Berikutnya</Text>
          </View>
        )}
        {!prayer.done && !prayer.isNext && (
          <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Mini Week View
const WeekView = () => (
  <View className="flex-row justify-between px-2">
    {WEEK_DATA.map((day, index) => {
      const percentage = (day.completed / day.total) * 100;
      return (
        <View key={index} className="items-center">
          <View
            className={`w-10 h-10 rounded-xl items-center justify-center mb-1 ${day.isToday ? "bg-emerald-500" : percentage === 100 ? "bg-emerald-100" : "bg-slate-100"
              }`}
            style={day.isToday ? styles.todayCircle : undefined}
          >
            <Text className={`text-sm font-bold ${day.isToday ? "text-white" : percentage === 100 ? "text-emerald-600" : "text-slate-500"
              }`}>
              {day.completed}
            </Text>
          </View>
          <Text className={`text-[10px] font-medium ${day.isToday ? "text-emerald-600" : "text-slate-400"}`}>
            {day.day}
          </Text>
        </View>
      );
    })}
  </View>
);

export default function PrayerScreen() {
  const [prayers, setPrayers] = useState(PRAYERS);

  const togglePrayer = (id: string) => {
    setPrayers(prev => prev.map(p =>
      p.id === id ? { ...p, done: !p.done } : p
    ));
  };

  const completedCount = prayers.filter(p => p.done).length;
  const streakDays = 7;
  const nextPrayer = prayers.find(p => p.isNext);

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header - Clean & Minimal */}
          <View className="px-6 pt-4 pb-2">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-medium text-slate-500">Assalamu'alaikum 👋</Text>
                <Text className="text-2xl font-bold text-slate-900 mt-0.5">Tracker Sholat</Text>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className="w-10 h-10 bg-white rounded-xl items-center justify-center"
                  style={styles.iconBtn}
                  onPress={() => router.push("/prayer-setup/notifications")}
                >
                  <MaterialCommunityIcons name="bell-outline" size={20} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-10 h-10 bg-white rounded-xl items-center justify-center"
                  style={styles.iconBtn}
                  onPress={() => router.push("/prayer-setup")}
                >
                  <MaterialCommunityIcons name="cog-outline" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Hero Card - Next Prayer */}
          <View className="px-6 mt-4">
            <LinearGradient
              colors={["#10b981", "#059669"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl p-6 overflow-hidden"
              style={styles.heroCard}
            >
              {/* Background Pattern */}
              <View className="absolute -right-8 -top-8 opacity-10">
                <MaterialCommunityIcons name="mosque" size={160} color="#fff" />
              </View>

              <View className="relative z-10">
                <Text className="text-emerald-100 text-sm font-medium mb-1">Sholat Berikutnya</Text>
                <Text className="text-white text-4xl font-bold">{nextPrayer?.name}</Text>

                <View className="flex-row items-baseline mt-2">
                  <Text className="text-white text-5xl font-bold tracking-tight">{nextPrayer?.time}</Text>
                  <Text className="text-emerald-200 text-lg ml-2">WIB</Text>
                </View>

                <View className="flex-row items-center mt-4 bg-white/20 self-start px-4 py-2 rounded-full">
                  <MaterialCommunityIcons name="map-marker" size={16} color="#fff" />
                  <Text className="text-white text-sm font-medium ml-1">Jakarta, Indonesia</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Stats */}
          <View className="flex-row px-6 mt-6 gap-4">
            <View className="flex-1 bg-white rounded-2xl p-4" style={styles.statCard}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-3xl font-bold text-slate-900">{completedCount}/5</Text>
                  <Text className="text-sm text-slate-500 mt-0.5">Hari Ini</Text>
                </View>
                <View className="w-12 h-12 bg-emerald-100 rounded-2xl items-center justify-center">
                  <Text className="text-xl">🕌</Text>
                </View>
              </View>
            </View>

            <View className="flex-1 bg-white rounded-2xl p-4" style={styles.statCard}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-3xl font-bold text-slate-900">{streakDays}</Text>
                  <Text className="text-sm text-slate-500 mt-0.5">Hari Streak 🔥</Text>
                </View>
                <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center">
                  <Text className="text-xl">⭐</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Week Overview */}
          <View className="mx-6 mt-6 bg-white rounded-2xl p-4" style={styles.card}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base font-bold text-slate-900">Minggu Ini</Text>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-emerald-600">Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <WeekView />
          </View>

          {/* Prayer Times Section */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Waktu Sholat</Text>
              <Text className="text-sm text-slate-500">14 Ramadan 1447 H</Text>
            </View>

            {prayers.map((prayer) => (
              <PrayerTimeCard
                key={prayer.id}
                prayer={prayer}
                onToggle={() => togglePrayer(prayer.id)}
              />
            ))}
          </View>

          {/* Motivation Card */}
          <View className="mx-6 mt-4 mb-4">
            <LinearGradient
              colors={["#f0fdf4", "#ecfdf5"]}
              className="rounded-2xl p-5 border border-emerald-100"
            >
              <View className="flex-row items-start gap-3">
                <Text className="text-2xl">💡</Text>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-emerald-800 mb-1">Tips Hari Ini</Text>
                  <Text className="text-sm text-emerald-700 leading-5">
                    "Sholat adalah tiang agama. Barangsiapa menegakkannya, maka ia telah menegakkan agama."
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View className="px-6 mt-2">
            <Text className="text-base font-bold text-slate-900 mb-3">Aksi Cepat</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={styles.actionCard}
                onPress={() => router.push("/prayer-actions/qibla")}
              >
                <View className="w-12 h-12 bg-cyan-100 rounded-2xl items-center justify-center mb-2">
                  <MaterialCommunityIcons name="compass" size={24} color="#06b6d4" />
                </View>
                <Text className="text-sm font-semibold text-slate-800">Kiblat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={styles.actionCard}
                onPress={() => router.push("/prayer-actions/dzikir")}
              >
                <View className="w-12 h-12 bg-violet-100 rounded-2xl items-center justify-center mb-2">
                  <MaterialCommunityIcons name="book-open-variant" size={24} color="#8b5cf6" />
                </View>
                <Text className="text-sm font-semibold text-slate-800">Dzikir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={styles.actionCard}
                onPress={() => router.push("/prayer-actions/doa")}
              >
                <View className="w-12 h-12 bg-rose-100 rounded-2xl items-center justify-center mb-2">
                  <MaterialCommunityIcons name="heart-outline" size={24} color="#f43f5e" />
                </View>
                <Text className="text-sm font-semibold text-slate-800">Doa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={styles.actionCard}
                onPress={() => router.push("/prayer-actions/jadwal")}
              >
                <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center mb-2">
                  <MaterialCommunityIcons name="calendar-month" size={24} color="#f59e0b" />
                </View>
                <Text className="text-sm font-semibold text-slate-800">Jadwal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  actionCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  nextCard: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  checkDone: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nextBadge: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  todayCircle: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
});
