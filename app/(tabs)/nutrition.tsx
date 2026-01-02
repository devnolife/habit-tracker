import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
// Temporarily disabled SVG to debug blank screen
// import Svg, { Circle } from "react-native-svg";

// Color Palette matching design
const COLORS = {
  primary: "#22c55e", // Green
  primaryDark: "#16a34a",
  background: "#fef9c3", // Warm yellow gradient start
  backgroundMid: "#ecfccb",
  backgroundEnd: "#d1fae5",
  card: "rgba(255, 255, 255, 0.9)",
  text: "#1f2937",
  textSub: "#6b7280",
  carbs: "#f97316", // Orange
  protein: "#3b82f6", // Blue
  fat: "#eab308", // Yellow
  blue: "#3b82f6",
  indigo: "#6366f1",
  orange: "#f97316",
  purple: "#a855f7",
};

// Meal Data
type MealItem = {
  name: string;
  portion: string;
  calories: number;
  isHalal: boolean;
  isSunnah: boolean;
  image: string;
};

type Meal = {
  name: string;
  borderColor: string;
  recommended?: string;
  time?: string;
  totalCalories: number;
  items: MealItem[];
};

const MEALS_DATA: Record<string, Meal> = {
  breakfast: {
    name: "Breakfast",
    borderColor: "#fdba74", // Orange-300
    recommended: "Recommended: 400-600 kcal",
    totalCalories: 350,
    items: [
      { name: "Oatmeal & Berries", portion: "1 bowl (medium)", calories: 250, isHalal: true, isSunnah: false, image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=100&h=100&fit=crop" },
      { name: "Dates (Kurma)", portion: "3 pcs", calories: 100, isHalal: true, isSunnah: true, image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=100&h=100&fit=crop" },
    ]
  },
  lunch: {
    name: "Lunch",
    borderColor: COLORS.primary,
    time: "1:00 PM",
    totalCalories: 600,
    items: [
      { name: "Nasi Lemak", portion: "1 serving", calories: 600, isHalal: true, isSunnah: false, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop" },
    ]
  },
  dinner: {
    name: "Dinner",
    borderColor: "#c084fc", // Purple-400
    time: "Not logged yet",
    totalCalories: 0,
    items: []
  }
};

// Circular Progress Component
const CircularProgress = ({ progress, size, strokeWidth, remaining }: {
  progress: number;
  size: number;
  strokeWidth: number;
  remaining: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute items-center justify-center">
        <Text className="text-xs font-medium text-slate-500">Remaining</Text>
        <Text className="text-4xl font-extrabold text-slate-900 tracking-tight">{remaining}</Text>
        <Text className="text-xs font-semibold text-slate-500 mt-0.5">kcal</Text>
      </View>
    </View>
  );
};

// Macro Progress Bar
const MacroBar = ({ label, current, color }: { label: string; current: string; color: string }) => {
  const widthPercentage = label === "Carbs" ? 75 : label === "Protein" ? 50 : 25;

  return (
    <View className="items-center flex-1">
      <Text className="text-xs font-medium text-slate-500">{label}</Text>
      <View className="h-1.5 w-16 bg-slate-200 rounded-full mt-1 overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${widthPercentage}%`, backgroundColor: color }}
        />
      </View>
      <Text className="text-sm font-bold text-slate-900 mt-1">{current}</Text>
    </View>
  );
};

// Hydration Glass
const HydrationGlass = ({ filled, onPress }: { filled: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View
      className={`h-8 w-6 rounded-b-md rounded-t-sm ${filled ? "bg-blue-500" : "bg-blue-100"}`}
      style={filled ? styles.glassFilledShadow : styles.glassEmptyShadow}
    />
  </TouchableOpacity>
);

// Food Item Component
const FoodItem = ({ item }: { item: MealItem }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-slate-100">
    <View className="flex-row items-center gap-3">
      <View className="h-10 w-10 rounded-lg bg-slate-200 overflow-hidden">
        <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      </View>
      <View>
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-slate-800">{item.name}</Text>
          {item.isHalal && (
            <MaterialCommunityIcons name="check-decagram" size={14} color={COLORS.primary} />
          )}
          {item.isSunnah && (
            <MaterialCommunityIcons name="leaf" size={14} color={COLORS.primary} />
          )}
        </View>
        <Text className="text-xs text-slate-500">{item.portion}</Text>
      </View>
    </View>
    <Text className="text-sm font-medium text-slate-700">{item.calories}</Text>
  </View>
);

// Meal Card Component
const MealCard = ({
  meal,
  onAddFood,
  onCamera
}: {
  meal: Meal;
  onAddFood: () => void;
  onCamera: () => void;
}) => {
  const isEmpty = meal.items.length === 0;

  return (
    <View
      className="bg-white rounded-2xl p-5 mb-4"
      style={[styles.card, { borderLeftWidth: 4, borderLeftColor: meal.borderColor }]}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="text-lg font-bold text-slate-900">{meal.name}</Text>
          <Text className="text-xs text-slate-500">
            {meal.recommended || meal.time}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-slate-900">{meal.totalCalories}</Text>
          <Text className="text-xs text-slate-500">kcal</Text>
        </View>
      </View>

      {/* Food Items or Empty State */}
      {isEmpty ? (
        <View className="items-center justify-center py-6">
          <View className="h-12 w-12 rounded-full bg-slate-50 items-center justify-center mb-2">
            <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#9ca3af" />
          </View>
          <Text className="text-sm font-medium text-slate-500">What's for dinner?</Text>
        </View>
      ) : (
        <View>
          {meal.items.map((item, index) => (
            <FoodItem key={index} item={item} />
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row gap-3 mt-4">
        <TouchableOpacity
          onPress={onAddFood}
          className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl gap-2 ${isEmpty ? "bg-primary" : "bg-slate-50"
            }`}
          style={isEmpty ? styles.primaryButton : undefined}
        >
          <MaterialCommunityIcons name="plus" size={20} color={isEmpty ? "#fff" : "#6b7280"} />
          <Text className={`text-sm font-semibold ${isEmpty ? "text-white" : "text-slate-600"}`}>
            {isEmpty ? `Log ${meal.name}` : "Add Food"}
          </Text>
        </TouchableOpacity>
        {!isEmpty && (
          <TouchableOpacity
            onPress={onCamera}
            className="h-10 w-10 rounded-xl bg-slate-50 items-center justify-center"
          >
            <MaterialCommunityIcons name="camera" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function NutritionScreen() {
  const [fastingMode, setFastingMode] = useState(false);
  const [hydration, setHydration] = useState([true, true, true, true, true, false, false, false]);

  const toggleHydration = (index: number) => {
    setHydration(prev => {
      const newHydration = [...prev];
      newHydration[index] = !newHydration[index];
      return newHydration;
    });
  };

  const filledGlasses = hydration.filter(Boolean).length;

  // Calculate totals
  const totalCalories = Object.values(MEALS_DATA).reduce((sum, meal) => sum + meal.totalCalories, 0);
  const targetCalories = 1800;
  const remainingCalories = targetCalories - totalCalories;
  const progressPercentage = (totalCalories / targetCalories) * 100;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundMid, COLORS.backgroundEnd]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          {/* Header */}
          <View className="px-6 pt-4 pb-4 bg-white/30" style={styles.header}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 bg-white rounded-full items-center justify-center shadow-sm">
                  <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={COLORS.primary} />
                </View>
                <View>
                  <Text className="text-lg font-bold text-slate-900">Food & Nutrition</Text>
                  <Text className="text-xs font-medium text-slate-500">Islamic Lifestyle Tracker</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity className="h-10 w-10 bg-white rounded-full items-center justify-center shadow-sm">
                  <MaterialCommunityIcons name="calendar-month" size={22} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity className="h-10 w-10 bg-slate-900 rounded-full items-center justify-center shadow-sm">
                  <MaterialCommunityIcons name="account-circle" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Date Scroller */}
            <View className="flex-row items-center justify-between mt-6">
              <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-left" size={24} color="#6b7280" />
              </TouchableOpacity>
              <View className="items-center">
                <Text className="text-sm font-bold text-primary">Today</Text>
                <Text className="text-2xl font-bold text-slate-900">Wed, 16 Aug</Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120, paddingTop: 8 }}
          >
            {/* Hero: Daily Calorie Goal */}
            <View className="bg-white/90 rounded-2xl p-6 shadow-sm mb-4 overflow-hidden" style={styles.glassCard}>
              {/* Background Icon */}
              <View className="absolute top-0 right-0 p-4 opacity-10">
                <MaterialCommunityIcons name="food-apple" size={100} color="#000" />
              </View>

              <View className="items-center relative z-10">
                <CircularProgress
                  progress={progressPercentage}
                  size={192}
                  strokeWidth={12}
                  remaining={remainingCalories}
                />

                {/* Macro Nutrients */}
                <View className="flex-row w-full justify-between mt-6 px-2">
                  <MacroBar label="Carbs" current="120g" color={COLORS.carbs} />
                  <MacroBar label="Protein" current="85g" color={COLORS.protein} />
                  <MacroBar label="Fat" current="40g" color={COLORS.fat} />
                </View>
              </View>
            </View>

            {/* Fasting Toggle */}
            <View className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-full bg-indigo-50 items-center justify-center">
                  <MaterialCommunityIcons name="weather-night" size={24} color={COLORS.indigo} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-slate-900">Fasting Mode</Text>
                  <Text className="text-xs text-slate-500">Ramadan / Sunnah</Text>
                </View>
              </View>
              <Switch
                value={fastingMode}
                onValueChange={setFastingMode}
                trackColor={{ false: "#e5e7eb", true: COLORS.primary }}
                thumbColor="#fff"
              />
            </View>

            {/* Hydration Tracker */}
            <View className="bg-white/90 rounded-2xl p-5 shadow-sm mb-4" style={styles.glassCard}>
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons name="water" size={24} color={COLORS.blue} />
                  <Text className="font-bold text-slate-900">Hydration</Text>
                </View>
                <Text className="text-sm font-medium text-blue-500">{filledGlasses}/8 Glasses</Text>
              </View>

              <View className="flex-row justify-between items-center px-1">
                {hydration.map((filled, index) => (
                  <HydrationGlass
                    key={index}
                    filled={filled}
                    onPress={() => toggleHydration(index)}
                  />
                ))}
              </View>

              <View className="flex-row items-center justify-between mt-3">
                <Text className="text-xs text-slate-500">Keep it up! You're almost there.</Text>
                <TouchableOpacity>
                  <Text className="text-xs font-bold text-blue-500">Set Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Meal Cards */}
            <MealCard
              meal={MEALS_DATA.breakfast}
              onAddFood={() => { }}
              onCamera={() => { }}
            />
            <MealCard
              meal={MEALS_DATA.lunch}
              onAddFood={() => { }}
              onCamera={() => { }}
            />
            <MealCard
              meal={MEALS_DATA.dinner}
              onAddFood={() => { }}
              onCamera={() => { }}
            />

            {/* Weight & Halal Finder Row */}
            <View className="flex-row gap-4">
              {/* Weight Tracker */}
              <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm" style={styles.card}>
                <View className="flex-row items-center gap-2 mb-2">
                  <MaterialCommunityIcons name="scale-bathroom" size={20} color={COLORS.indigo} />
                  <Text className="text-sm font-bold text-slate-900">Weight</Text>
                </View>
                <Text className="text-2xl font-bold text-slate-900">
                  70.5 <Text className="text-sm font-normal text-slate-500">kg</Text>
                </Text>
                <View className="flex-row items-center mt-1">
                  <MaterialCommunityIcons name="trending-down" size={14} color={COLORS.primary} />
                  <Text className="text-xs font-medium text-green-500 ml-0.5">-0.5 kg</Text>
                </View>
              </View>

              {/* Halal Finder */}
              <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 shadow-sm overflow-hidden" style={styles.card}>
                <LinearGradient
                  colors={["#f0fdf4", "transparent"]}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <View className="relative z-10 flex-row items-center justify-between mb-2">
                  <Text className="text-sm font-bold text-slate-900 leading-tight">Halal{"\n"}Finder</Text>
                  <View className="bg-white rounded-full p-1 shadow-sm">
                    <MaterialCommunityIcons name="map-marker" size={20} color={COLORS.primary} />
                  </View>
                </View>
                <Text className="text-xs text-slate-500 mt-2 relative z-10">3 certified spots nearby</Text>
                <View className="flex-row mt-2 relative z-10">
                  <View className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white" />
                  <View className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white -ml-2" />
                  <View className="w-6 h-6 rounded-full bg-primary border-2 border-white -ml-2 items-center justify-center">
                    <Text className="text-[8px] text-white font-bold">+1</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Floating Action Button */}
          <TouchableOpacity
            className="absolute bottom-24 right-6 h-14 w-14 rounded-full bg-slate-900 items-center justify-center z-30"
            style={styles.fab}
          >
            <MaterialCommunityIcons name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // Note: backdropFilter not supported in RN, handled by className
  },
  glassCard: {
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
  glassFilledShadow: {
    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  glassEmptyShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  primaryButton: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
