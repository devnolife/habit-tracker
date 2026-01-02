import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// Prayer colors (green theme for sholat)
const PRAYER_GREEN = "#13ec5b";

// Mock data for prayers
const PRAYERS_DATA = [
  {
    id: "fajr",
    name: "Fajr",
    arabic: "الفجر",
    time: "04:45 AM",
    adhan: "04:30 AM",
    iqamah: "04:40 AM",
    completed: true,
    isNext: false,
  },
  {
    id: "dhuhr",
    name: "Dhuhr",
    arabic: "الظهر",
    time: "12:05 PM",
    adhan: "11:55 AM",
    iqamah: "12:15 PM",
    completed: false,
    isNext: true,
  },
  {
    id: "asr",
    name: "Asr",
    arabic: "العصر",
    time: "03:20 PM",
    adhan: "03:10 PM",
    iqamah: "03:25 PM",
    completed: false,
    isNext: false,
  },
  {
    id: "maghrib",
    name: "Maghrib",
    arabic: "المغرب",
    time: "06:10 PM",
    adhan: "06:05 PM",
    iqamah: "06:15 PM",
    completed: false,
    isNext: false,
  },
  {
    id: "isha",
    name: "Isha",
    arabic: "العشاء",
    time: "07:25 PM",
    adhan: "07:20 PM",
    iqamah: "07:30 PM",
    completed: false,
    isNext: false,
  },
];

// Calendar mock data
const CALENDAR_DAYS = [
  { day: 1, prayers: [1, 1, 1, 1, 1] },
  { day: 2, prayers: [1, 1, 0, 1, 1] },
  { day: 3, prayers: [1, 1, 1, 1, 1] },
  { day: 4, prayers: [1, 1, 1, 1, 1] },
  { day: 5, prayers: [1, 1, 1, 0, 1] },
  { day: 6, prayers: [1, 1, 1, 1, 1] },
  { day: 7, prayers: [1, 1, 1, 1, 1] },
  { day: 8, prayers: [1, 1, 1, 1, 1] },
  { day: 9, prayers: [1, 1, 1, 1, 1] },
  { day: 10, prayers: [1, 1, 1, 1, 1] },
  { day: 11, prayers: [1, 1, 1, 1, 1] },
  { day: 12, prayers: [1, 1, 1, 1, 1] },
  { day: 13, prayers: [1, 1, 1, 1, 1] },
  { day: 14, prayers: [1, 0, 0, 0, 0], isToday: true },
];

// Achievement badges
const ACHIEVEMENTS = [
  { id: 1, title: "Fajr Fighter", icon: "medal", color: "#EAB308", bgColor: "#FEF3C7", progress: 70, level: "Level 2" },
  { id: 2, title: "7 Day Streak", icon: "chart-timeline-variant", color: "#3B82F6", bgColor: "#DBEAFE", progress: 100, level: "Completed" },
  { id: 3, title: "Night Warrior", icon: "weather-night", color: "#8B5CF6", bgColor: "#EDE9FE", progress: 20, level: "In Progress", locked: true },
];

// Prayer Card Component
const PrayerCard = ({ prayer, expanded, onToggle }: {
  prayer: typeof PRAYERS_DATA[0];
  expanded: boolean;
  onToggle: () => void;
}) => {
  const [prayerType, setPrayerType] = useState<"individual" | "jamaah">("individual");

  return (
    <View
      style={[
        styles.prayerCard,
        prayer.completed && styles.prayerCardCompleted,
        prayer.isNext && styles.prayerCardNext,
      ]}
    >
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center justify-between p-4"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center gap-4">
          {/* Checkbox */}
          <View className={`w-8 h-8 rounded-full items-center justify-center ${prayer.completed
              ? "bg-[#13ec5b]"
              : "border-2 border-gray-300"
            }`} style={prayer.completed ? styles.checkboxShadow : undefined}>
            {prayer.completed && (
              <MaterialCommunityIcons name="check" size={18} color="#FFF" />
            )}
          </View>

          {/* Prayer Info */}
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="text-base font-bold text-[#111813]">{prayer.name}</Text>
              <Text className="text-xs text-[#61896f]">{prayer.arabic}</Text>
            </View>
            <Text className={`text-sm ${prayer.isNext ? "font-semibold text-[#13ec5b]" : "text-[#61896f]"}`}>
              {prayer.time} {prayer.isNext && "(Next)"}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          {prayer.completed && (
            <View className="bg-[#13ec5b]/10 px-2 py-1 rounded">
              <Text className="text-xs font-semibold text-[#13ec5b]">Done</Text>
            </View>
          )}
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#9CA3AF"
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Content */}
      {expanded && (
        <View className="px-4 pb-4 border-t border-gray-100">
          {/* Adhan & Iqamah Times */}
          <View className="flex-row gap-4 mt-3">
            <View className="flex-1 bg-gray-50 p-3 rounded-lg">
              <Text className="text-xs text-gray-400">Adhan</Text>
              <Text className="font-medium text-[#111813]">{prayer.adhan}</Text>
            </View>
            <View className="flex-1 bg-gray-50 p-3 rounded-lg">
              <Text className="text-xs text-gray-400">Iqamah</Text>
              <Text className="font-medium text-[#111813]">{prayer.iqamah}</Text>
            </View>
          </View>

          {/* Notes Input (for next prayer) */}
          {prayer.isNext && (
            <View className="mt-4">
              <TextInput
                className="w-full bg-gray-50 rounded-lg text-sm p-3 text-[#111813]"
                placeholder="Add notes..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          {/* Prayer Type Toggle */}
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                className={`px-3 py-1.5 rounded ${prayerType === "individual" ? "bg-white" : ""}`}
                onPress={() => setPrayerType("individual")}
                style={prayerType === "individual" ? styles.toggleShadow : undefined}
              >
                <Text className={`text-xs font-medium ${prayerType === "individual" ? "text-[#13ec5b]" : "text-gray-500"}`}>
                  Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-3 py-1.5 rounded ${prayerType === "jamaah" ? "bg-white" : ""}`}
                onPress={() => setPrayerType("jamaah")}
                style={prayerType === "jamaah" ? styles.toggleShadow : undefined}
              >
                <Text className={`text-xs font-medium ${prayerType === "jamaah" ? "text-[#13ec5b]" : "text-gray-500"}`}>
                  Jamaah
                </Text>
              </TouchableOpacity>
            </View>

            {prayer.completed && (
              <TouchableOpacity className="bg-red-50 px-3 py-1.5 rounded-lg">
                <Text className="text-xs font-medium text-red-500">Mark as Missed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default function PrayerScreen() {
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>("dhuhr");

  return (
    <View className="flex-1 bg-[#f6f8f6]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header */}
          <LinearGradient
            colors={["#FFFFFF", "#f0fdf4"]}
            className="pb-6 pt-2 rounded-b-[32px]"
            style={styles.headerShadow}
          >
            <View className="px-4 pt-4 pb-2">
              {/* Top Row */}
              <View className="flex-row items-center justify-between mb-4">
                <MaterialCommunityIcons name="mosque" size={36} color={PRAYER_GREEN} />
                <View className="flex-row gap-3">
                  <TouchableOpacity className="bg-white/50 p-2 rounded-xl" style={styles.iconButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#111813" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white/50 p-2 rounded-xl" style={styles.iconButton}>
                    <MaterialCommunityIcons name="cog-outline" size={24} color="#111813" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Title */}
              <View className="items-center">
                <Text className="text-3xl font-bold tracking-tight text-[#111813]">Prayer Tracker</Text>
                <Text className="text-sm font-medium text-[#61896f] mt-1">14 Ramadhan 1445 AH</Text>

                {/* Location Pill */}
                <View className="flex-row items-center gap-1 mt-2 bg-white px-3 py-1.5 rounded-full border border-gray-100" style={styles.locationPill}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={PRAYER_GREEN} />
                  <Text className="text-xs font-semibold text-[#111813]">Jakarta, Indonesia</Text>
                  <MaterialCommunityIcons name="compass-outline" size={14} color="#61896f" style={{ marginLeft: 4 }} />
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Main Content */}
          <View className="px-4 -mt-4">
            {/* Streak & Stats Mini-Bar */}
            <View className="flex-row gap-3 mb-6">
              <View className="flex-1 bg-white rounded-xl p-3 border border-gray-100" style={styles.statCard}>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs text-[#61896f]">Streak</Text>
                    <Text className="text-xl font-bold text-[#111813]">12 Days</Text>
                  </View>
                  <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center">
                    <MaterialCommunityIcons name="fire" size={22} color="#F97316" />
                  </View>
                </View>
              </View>
              <View className="flex-1 bg-white rounded-xl p-3 border border-gray-100" style={styles.statCard}>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs text-[#61896f]">Completion</Text>
                    <Text className="text-xl font-bold text-[#13ec5b]">80%</Text>
                  </View>
                  <View className="w-10 h-10 rounded-full bg-[#13ec5b]/10 items-center justify-center">
                    <MaterialCommunityIcons name="chart-pie" size={22} color={PRAYER_GREEN} />
                  </View>
                </View>
              </View>
            </View>

            {/* Today's Prayers */}
            <Text className="text-lg font-bold text-[#111813] mb-3 pl-1">Today's Prayers</Text>
            <View className="gap-3 mb-6">
              {PRAYERS_DATA.map((prayer) => (
                <PrayerCard
                  key={prayer.id}
                  prayer={prayer}
                  expanded={expandedPrayer === prayer.id}
                  onToggle={() => setExpandedPrayer(expandedPrayer === prayer.id ? null : prayer.id)}
                />
              ))}
            </View>

            {/* Qibla Compass Widget */}
            <View className="bg-white rounded-2xl p-4 border border-gray-100 mb-6" style={styles.card}>
              <View className="flex-row items-center gap-6">
                {/* Compass Visual */}
                <View className="w-24 h-24 rounded-full bg-slate-100 items-center justify-center border-4 border-white" style={styles.compassShadow}>
                  {/* Kaaba Icon */}
                  <View className="w-8 h-8 bg-black rounded items-center justify-center">
                    <View className="w-6 h-1 bg-yellow-400 absolute top-1" />
                  </View>
                  {/* Compass Needle Indicator */}
                  <View className="absolute top-0 w-1 h-4 bg-red-500 rounded-full" />
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-[#111813]">Qibla Direction</Text>
                    <View className="bg-[#13ec5b]/10 px-2 py-1 rounded-md">
                      <Text className="text-xs font-bold text-[#13ec5b]">Live</Text>
                    </View>
                  </View>
                  <Text className="text-2xl font-bold text-gray-800 mt-1">
                    295° <Text className="text-lg text-gray-500 font-normal">NW</Text>
                  </Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <MaterialCommunityIcons name="ruler" size={14} color="#61896f" />
                    <Text className="text-sm text-[#61896f]">7,900km to Mecca</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Monthly Calendar */}
            <View className="bg-white rounded-2xl p-5 border border-gray-100 mb-6" style={styles.card}>
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold text-[#111813]">Ramadhan 1445</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center bg-gray-50">
                    <MaterialCommunityIcons name="chevron-left" size={20} color="#111813" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center bg-gray-50">
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#111813" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Day Headers */}
              <View className="flex-row mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <View key={i} className="flex-1 items-center">
                    <Text className="text-xs text-gray-400">{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View className="flex-row flex-wrap">
                {/* Previous month placeholder */}
                {[28, 29, 30].map((day) => (
                  <View key={`prev-${day}`} className="w-[14.28%] items-center py-2 opacity-25">
                    <Text className="text-sm">{day}</Text>
                  </View>
                ))}

                {/* Current month days */}
                {CALENDAR_DAYS.map((item) => (
                  <View
                    key={item.day}
                    className={`w-[14.28%] items-center py-2 ${item.isToday ? "bg-[#13ec5b]/5 rounded-lg border border-[#13ec5b]" : ""}`}
                  >
                    <Text className={`text-sm font-medium ${item.isToday ? "text-[#13ec5b] font-bold" : ""}`}>
                      {item.day}
                    </Text>
                    <View className="flex-row gap-[1px] mt-1">
                      {item.prayers.map((done, i) => (
                        <View
                          key={i}
                          className={`w-1 h-1 rounded-full ${done ? "bg-[#13ec5b]" : "border border-red-400"
                            }`}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Statistics */}
            <View className="bg-white rounded-2xl p-5 border border-gray-100 mb-6" style={styles.card}>
              <Text className="text-lg font-bold text-[#111813] mb-4">Statistics</Text>
              <View className="flex-row gap-4">
                {/* Bar Chart */}
                <View className="flex-1">
                  <View className="flex-row items-end justify-between h-24 gap-1">
                    {[90, 70, 100, 60, 85].map((height, i) => (
                      <View key={i} className="flex-1 bg-gray-100 rounded-t-sm h-full items-end">
                        <View
                          className="w-full bg-[#13ec5b] rounded-t-sm"
                          style={{ height: `${height}%` }}
                        />
                      </View>
                    ))}
                  </View>
                  <View className="flex-row justify-between mt-2">
                    {["F", "D", "A", "M", "I"].map((label, i) => (
                      <View key={i} className="flex-1 items-center">
                        <Text className="text-[10px] text-gray-400 font-medium">{label}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Best Performance */}
                <View className="border-l border-gray-100 pl-4">
                  <Text className="text-xs text-gray-500">Best Performance</Text>
                  <Text className="text-xl font-bold text-[#13ec5b]">Asr</Text>
                  <Text className="text-xs text-gray-400">100% on-time</Text>
                  <View className="w-full h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <View className="w-full h-full bg-[#13ec5b]" />
                  </View>
                </View>
              </View>
            </View>

            {/* Achievements */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-bold text-[#111813]">Achievements</Text>
                <TouchableOpacity>
                  <Text className="text-sm font-medium text-[#13ec5b]">View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-4 pr-4">
                  {ACHIEVEMENTS.map((badge) => (
                    <View
                      key={badge.id}
                      className={`w-[140px] bg-white rounded-xl p-3 border border-gray-100 items-center ${badge.locked ? "opacity-60" : ""}`}
                      style={styles.card}
                    >
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center mb-2"
                        style={{ backgroundColor: badge.bgColor }}
                      >
                        <MaterialCommunityIcons name={badge.icon as any} size={22} color={badge.color} />
                      </View>
                      <Text className="text-sm font-bold text-center text-[#111813]">{badge.title}</Text>
                      <View className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <View
                          className="h-full rounded-full"
                          style={{ width: `${badge.progress}%`, backgroundColor: badge.color }}
                        />
                      </View>
                      <Text className="text-[10px] text-gray-400 mt-1">{badge.level}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Resources Grid */}
            <View className="flex-row gap-3 mb-6">
              <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl flex-row items-center gap-3 border border-gray-100" style={styles.card}>
                <View className="w-10 h-10 rounded-full bg-[#f0fdf4] items-center justify-center">
                  <MaterialCommunityIcons name="book-open-variant" size={22} color={PRAYER_GREEN} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#111813]">Daily Dua</Text>
                  <Text className="text-[10px] text-gray-400">Essential supplications</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl flex-row items-center gap-3 border border-gray-100" style={styles.card}>
                <View className="w-10 h-10 rounded-full bg-[#f0fdf4] items-center justify-center">
                  <MaterialCommunityIcons name="counter" size={22} color={PRAYER_GREEN} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#111813]">Dhikr</Text>
                  <Text className="text-[10px] text-gray-400">Digital Counter</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  locationPill: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  prayerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  prayerCardCompleted: {
    backgroundColor: "rgba(19, 236, 91, 0.03)",
    borderColor: "rgba(19, 236, 91, 0.2)",
  },
  prayerCardNext: {
    borderLeftWidth: 4,
    borderLeftColor: "#13ec5b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  checkboxShadow: {
    shadowColor: "#13ec5b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  compassShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
