import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { getPrayers } from "@/services";
import type { PrayerName } from "@/types";

const PRIMARY = "#10b981";

interface DayData {
  date: number;
  isToday: boolean;
  prayersCompleted: number;
  totalPrayers: number;
}

interface PrayerTimeData {
  id: string;
  name: string;
  time: string;
  adzan: string;
  iqamah: string;
  done: boolean;
}

const ADHAN_OFFSETS: Record<PrayerName, { adzan: number; iqamah: number }> = {
  Subuh: { adzan: -10, iqamah: 10 },
  Dzuhur: { adzan: -10, iqamah: 10 },
  Ashar: { adzan: -10, iqamah: 10 },
  Maghrib: { adzan: -5, iqamah: 5 },
  Isya: { adzan: -5, iqamah: 10 },
};

function offsetTime(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const newM = ((total % 1440) + 1440) % 1440 % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

const DayCell = ({
  day,
  isSelected,
  onSelect
}: {
  day: DayData;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const getCompletionColor = () => {
    if (day.prayersCompleted === 5) return "#10b981"; // All complete
    if (day.prayersCompleted >= 3) return "#f59e0b"; // Partial
    if (day.prayersCompleted > 0) return "#ef4444"; // Low
    return "#e2e8f0"; // None
  };

  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`items-center py-2 rounded-xl ${isSelected ? "bg-emerald-100" : ""} ${day.isToday ? "border-2 border-emerald-500" : ""
        }`}
      style={isSelected ? styles.selectedDay : undefined}
    >
      <Text className={`text-sm font-medium ${isSelected ? "text-emerald-700" : "text-slate-700"}`}>
        {day.date}
      </Text>
      <View className="flex-row gap-0.5 mt-1.5">
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: i < day.prayersCompleted ? getCompletionColor() : "#e2e8f0"
            }}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const PrayerTimeRow = ({ prayer }: { prayer: PrayerTimeData }) => (
  <View
    className={`flex-row items-center justify-between p-4 rounded-2xl mb-2 ${prayer.done ? "bg-emerald-50 border border-emerald-100" : "bg-white"
      }`}
    style={styles.card}
  >
    <View className="flex-row items-center gap-4">
      <View className={`w-10 h-10 rounded-full items-center justify-center ${prayer.done ? "bg-emerald-500" : "bg-slate-100"
        }`}>
        {prayer.done ? (
          <MaterialCommunityIcons name="check" size={20} color="#fff" />
        ) : (
          <MaterialCommunityIcons name="clock-outline" size={20} color="#64748b" />
        )}
      </View>
      <View>
        <Text className={`text-base font-bold ${prayer.done ? "text-emerald-700" : "text-slate-900"}`}>
          {prayer.name}
        </Text>
        <Text className="text-xs text-slate-500">
          Adzan {prayer.adzan} • Iqamah {prayer.iqamah}
        </Text>
      </View>
    </View>
    <View className="items-end">
      <Text className={`text-lg font-bold ${prayer.done ? "text-emerald-600" : "text-slate-900"}`}>
        {prayer.time}
      </Text>
      {prayer.done && (
        <Text className="text-xs text-emerald-600 font-medium">✓ Selesai</Text>
      )}
    </View>
  </View>
);

export default function JadwalScreen() {
  const now = new Date();
  const currentDay = now.getDate();
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const [currentMonth] = useState("Ramadhan 1447 H");
  const [monthDays, setMonthDays] = useState<DayData[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<{ label: string; value: number; total?: number; percentage?: number; suffix?: string }[]>([]);

  // Load month data from service
  useEffect(() => {
    const loadMonth = async () => {
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days: DayData[] = [];
      let monthCompleted = 0;
      let monthTotal = 0;
      let weekCompleted = 0;
      let weekTotal = 0;
      const weekStart = currentDay - now.getDay();

      for (let d = 1; d <= Math.min(daysInMonth, currentDay); d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const prayers = await getPrayers(dateStr);
        const completed = prayers.filter((p) => p.completed).length;
        days.push({ date: d, isToday: d === currentDay, prayersCompleted: completed, totalPrayers: 5 });
        monthCompleted += completed;
        monthTotal += 5;
        if (d >= weekStart) {
          weekCompleted += completed;
          weekTotal += 5;
        }
      }
      setMonthDays(days);
      setWeeklyStats([
        { label: 'Minggu Ini', value: weekCompleted, total: weekTotal, percentage: weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0 },
        { label: 'Bulan Ini', value: monthCompleted, total: monthTotal, percentage: monthTotal > 0 ? Math.round((monthCompleted / monthTotal) * 100) : 0 },
      ]);
    };
    loadMonth();
  }, []);

  // Load selected day prayer times
  useEffect(() => {
    const loadDay = async () => {
      const year = now.getFullYear();
      const month = now.getMonth();
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      const prayers = await getPrayers(dateStr);
      setPrayerTimes(prayers.map((p) => {
        const offsets = ADHAN_OFFSETS[p.name];
        return {
          id: p.id,
          name: p.name,
          time: p.time,
          adzan: offsetTime(p.time, offsets.adzan),
          iqamah: offsetTime(p.time, offsets.iqamah),
          done: p.completed,
        };
      }));
    };
    loadDay();
  }, [selectedDate]);

  const selectedDay = monthDays.find(d => d.date === selectedDate);
  const completedToday = prayerTimes.filter(p => p.done).length;

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="#64748b" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-slate-900">Jadwal Sholat</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
          >
            <MaterialCommunityIcons name="map-marker" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Month Header */}
          <View className="px-6 mt-4">
            <View className="bg-white rounded-2xl p-4" style={styles.card}>
              <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-xl items-center justify-center">
                  <MaterialCommunityIcons name="chevron-left" size={24} color="#64748b" />
                </TouchableOpacity>
                <View className="items-center">
                  <Text className="text-lg font-bold text-slate-900">{currentMonth}</Text>
                  <Text className="text-sm text-slate-500">Maret 2026</Text>
                </View>
                <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-xl items-center justify-center">
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Day Labels */}
              <View className="flex-row mb-2">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, i) => (
                  <View key={i} className="flex-1 items-center">
                    <Text className="text-xs text-slate-400 font-medium">{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View className="flex-row flex-wrap">
                {/* Empty cells for offset (assuming month starts on Wednesday) */}
                {[...Array(3)].map((_, i) => (
                  <View key={`empty-${i}`} className="w-[14.28%] py-2" />
                ))}
                {monthDays.map((day) => (
                  <View key={day.date} className="w-[14.28%]">
                    <DayCell
                      day={day}
                      isSelected={selectedDate === day.date}
                      onSelect={() => setSelectedDate(day.date)}
                    />
                  </View>
                ))}
              </View>

              {/* Legend */}
              <View className="flex-row justify-center gap-4 mt-4 pt-3 border-t border-slate-100">
                <View className="flex-row items-center gap-1.5">
                  <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <Text className="text-xs text-slate-500">Lengkap</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <View className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <Text className="text-xs text-slate-500">Sebagian</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <Text className="text-xs text-slate-500">Sedikit</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-6"
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          >
            {weeklyStats.map((stat, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 w-32"
                style={styles.statCard}
              >
                <Text className="text-xs text-slate-500 mb-1">{stat.label}</Text>
                <View className="flex-row items-baseline">
                  <Text className="text-2xl font-bold text-slate-900">{stat.value}</Text>
                  {stat.total && (
                    <Text className="text-sm text-slate-400 ml-0.5">/{stat.total}</Text>
                  )}
                  {stat.suffix && (
                    <Text className="text-sm text-slate-500 ml-1">{stat.suffix}</Text>
                  )}
                </View>
                {stat.percentage && (
                  <View className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <View
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Selected Day Prayer Times */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-lg font-bold text-slate-900">
                  Tanggal {selectedDate} {currentMonth}
                </Text>
                <Text className="text-sm text-slate-500">
                  {completedToday}/5 sholat selesai
                </Text>
              </View>
              {selectedDay?.prayersCompleted === 5 && (
                <View className="bg-emerald-100 px-3 py-1.5 rounded-full">
                  <Text className="text-sm font-semibold text-emerald-600">Sempurna! 🌟</Text>
                </View>
              )}
            </View>

            {prayerTimes.map((prayer) => (
              <PrayerTimeRow key={prayer.id} prayer={prayer} />
            ))}
          </View>

          {/* Location Info */}
          <View className="mx-6 mt-6">
            <View className="bg-white rounded-2xl p-4" style={styles.card}>
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center">
                  <MaterialCommunityIcons name="map-marker-radius" size={24} color="#f59e0b" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-slate-500">Lokasi Jadwal</Text>
                  <Text className="text-base font-bold text-slate-900">Jakarta, Indonesia</Text>
                  <Text className="text-xs text-slate-400">Metode: Kemenag RI</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/prayer-setup")}>
                  <MaterialCommunityIcons name="pencil" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
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
  selectedDay: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});
