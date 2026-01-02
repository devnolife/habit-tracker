import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

const PRIMARY = "#10b981";

// Dzikir Data
const DZIKIR_CATEGORIES = [
  { id: "pagi", name: "Dzikir Pagi", icon: "weather-sunset-up", count: 12, emoji: "🌅" },
  { id: "petang", name: "Dzikir Petang", icon: "weather-sunset", count: 12, emoji: "🌆" },
  { id: "sholat", name: "Setelah Sholat", icon: "hands-pray", count: 8, emoji: "🤲" },
  { id: "tidur", name: "Sebelum Tidur", icon: "weather-night", count: 6, emoji: "🌙" },
];

const DAILY_DZIKIR = [
  { id: 1, arabic: "سُبْحَانَ اللّٰهِ", latin: "Subhanallah", meaning: "Maha Suci Allah", target: 33, current: 33, color: "#10b981" },
  { id: 2, arabic: "اَلْحَمْدُ لِلّٰهِ", latin: "Alhamdulillah", meaning: "Segala puji bagi Allah", target: 33, current: 20, color: "#f59e0b" },
  { id: 3, arabic: "اَللّٰهُ أَكْبَرُ", latin: "Allahu Akbar", meaning: "Allah Maha Besar", target: 33, current: 0, color: "#8b5cf6" },
  { id: 4, arabic: "لَا إِلَٰهَ إِلَّا اللّٰهُ", latin: "La ilaha illallah", meaning: "Tiada Tuhan selain Allah", target: 100, current: 45, color: "#06b6d4" },
];

const DzikirCounter = ({
  dzikir,
  onIncrement
}: {
  dzikir: typeof DAILY_DZIKIR[0];
  onIncrement: () => void;
}) => {
  const progress = (dzikir.current / dzikir.target) * 100;
  const isComplete = dzikir.current >= dzikir.target;

  return (
    <TouchableOpacity
      onPress={onIncrement}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3"
      style={styles.card}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "serif" }}>
            {dzikir.arabic}
          </Text>
          <Text className="text-sm font-semibold text-slate-700">{dzikir.latin}</Text>
          <Text className="text-xs text-slate-500 mt-0.5">{dzikir.meaning}</Text>
        </View>

        {/* Counter Circle */}
        <TouchableOpacity
          onPress={onIncrement}
          className="w-20 h-20 rounded-full items-center justify-center"
          style={[styles.counterCircle, { backgroundColor: `${dzikir.color}15` }]}
        >
          <Text className="text-2xl font-bold" style={{ color: dzikir.color }}>
            {dzikir.current}
          </Text>
          <Text className="text-[10px] text-slate-500">/ {dzikir.target}</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className="h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: dzikir.color }}
        />
      </View>

      {isComplete && (
        <View className="flex-row items-center gap-1 mt-2">
          <MaterialCommunityIcons name="check-circle" size={14} color={PRIMARY} />
          <Text className="text-xs font-semibold text-emerald-600">Selesai! ✨</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function DzikirScreen() {
  const [dzikirList, setDzikirList] = useState(DAILY_DZIKIR);
  const [selectedCategory, setSelectedCategory] = useState("sholat");

  const incrementDzikir = (id: number) => {
    setDzikirList(prev => prev.map(d =>
      d.id === id && d.current < d.target
        ? { ...d, current: d.current + 1 }
        : d
    ));
  };

  const totalCompleted = dzikirList.filter(d => d.current >= d.target).length;
  const totalDzikir = dzikirList.reduce((sum, d) => sum + d.current, 0);

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
          <Text className="text-lg font-bold text-slate-900">Dzikir & Tasbih</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
          >
            <MaterialCommunityIcons name="history" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Stats Hero */}
          <View className="px-6 mt-4">
            <LinearGradient
              colors={["#8b5cf6", "#6366f1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl p-6"
              style={styles.heroCard}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-violet-200 text-sm font-medium mb-1">Total Dzikir Hari Ini</Text>
                  <Text className="text-white text-4xl font-bold">{totalDzikir}</Text>
                  <Text className="text-violet-200 text-sm mt-1">📿 {totalCompleted}/4 selesai</Text>
                </View>
                <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center">
                  <Text className="text-4xl">🤲</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Category Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-6"
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          >
            {DZIKIR_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-2xl flex-row items-center gap-2 ${selectedCategory === cat.id ? "bg-emerald-500" : "bg-white"
                  }`}
                style={selectedCategory === cat.id ? styles.selectedCategory : styles.category}
              >
                <Text className="text-lg">{cat.emoji}</Text>
                <Text className={`font-semibold text-sm ${selectedCategory === cat.id ? "text-white" : "text-slate-700"
                  }`}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dzikir List */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Dzikir Counter</Text>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-violet-600">Reset</Text>
              </TouchableOpacity>
            </View>

            {dzikirList.map((dzikir) => (
              <DzikirCounter
                key={dzikir.id}
                dzikir={dzikir}
                onIncrement={() => incrementDzikir(dzikir.id)}
              />
            ))}
          </View>

          {/* Quick Tap Hint */}
          <View className="mx-6 mt-4">
            <LinearGradient
              colors={["#faf5ff", "#f3e8ff"]}
              className="rounded-2xl p-4 border border-violet-100"
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">👆</Text>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-violet-800 mb-0.5">Tap untuk Menghitung</Text>
                  <Text className="text-xs text-violet-600">
                    Ketuk lingkaran angka untuk menambah hitungan dzikir
                  </Text>
                </View>
              </View>
            </LinearGradient>
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
  heroCard: {
    shadowColor: "#8b5cf6",
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
  counterCircle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  category: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedCategory: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
