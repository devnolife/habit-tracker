import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY, SOFT } from "@/config/colors";
import { getGreeting, formatDate } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

// Mock data - nanti diganti dengan data real
const mockPrayers = [
  { name: "Asr", time: "03:30 PM", subtitle: "Afternoon Prayer", remaining: "-01:23:45", progress: 65, isActive: true },
  { name: "Maghrib", time: "06:15 PM", subtitle: "Sunset Prayer", isActive: false },
];

const mockStats = {
  prayer: { done: 4, total: 5 },
  work: { hours: 6.5 },
  expense: { amount: "150K" },
  food: { calories: 1450 },
};

const mockActivities = [
  { title: "Lunch (Ayam Bakar)", category: "Makanan", time: "12:30 PM", ago: "1h ago", color: "#FBBF24" },
  { title: "Dhuhr Prayer", category: "Sholat", time: "12:15 PM", ago: "1h ago", color: "#22C55E" },
  { title: "Deep Work Session", category: "Work", time: "09:00 AM", ago: "4h ago", color: "#3B82F6" },
  { title: "Transport (Gojek)", category: "Pengeluaran", time: "08:30 AM", ago: "5h ago", color: "#EF4444" },
];

// Progress Ring Component
const ProgressRing = ({ progress = 75, size = 48 }: { progress?: number; size?: number }) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Path
          d={`M ${size / 2} ${strokeWidth / 2} a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
          fill="none"
          stroke="#FED7AA"
          strokeWidth={strokeWidth}
        />
        <Path
          d={`M ${size / 2} ${strokeWidth / 2} a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 -${radius * 2}`}
          fill="none"
          stroke={PRIMARY.main}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={StyleSheet.absoluteFill} className="items-center justify-center">
        <MaterialCommunityIcons name="bell" size={18} color={PRIMARY.main} />
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { greeting } = getGreeting();
  const today = new Date();

  return (
    <View className="flex-1">
      {/* Background Gradient */}
      <LinearGradient
        colors={["#FFFBF5", "#FFF9EE", "#FFEACC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header Section */}
          <View className="flex-row items-start justify-between px-6 pt-6 pb-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-[#8a7560]">
                14 Ramadan 1445 H • 24 March 2024
              </Text>
              <Text className="text-2xl font-bold text-[#181411] mt-1 leading-tight">
                Assalamualaikum,{"\n"}Yusuf
              </Text>

              {/* Weather Pill */}
              <View className="mt-3 flex-row items-center self-start bg-white/60 border border-white/50 rounded-full px-3 py-1.5" style={styles.weatherPill}>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={18} color={PRIMARY.main} />
                <Text className="text-xs font-semibold text-[#5c4a3d] ml-1.5">
                  32°C Jakarta
                </Text>
              </View>
            </View>

            {/* Avatar */}
            <View className="relative">
              <View className="w-12 h-12 overflow-hidden bg-gray-200 border-2 border-white rounded-full" style={styles.avatarShadow}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/100" }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </View>
          </View>

          {/* Prayer Times Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6 mt-2"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {/* Active Prayer Card */}
            <View className="w-[300px] mr-4 bg-white rounded-2xl p-5 shadow-sm border border-orange-50/50">
              {/* Decorative Mosque Icon */}
              <View className="absolute right-[-20px] top-[-20px] opacity-10">
                <MaterialCommunityIcons name="mosque" size={100} color={PRIMARY.main} />
              </View>

              <View className="flex-row items-start justify-between mb-6">
                <View>
                  <Text className="text-xl font-bold text-[#181411]">Asr</Text>
                  <Text className="text-sm text-[#8a7560]">Afternoon Prayer</Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-bold text-primary">03:30 PM</Text>
                  <View className="flex-row items-center bg-soft-orange px-2 py-0.5 rounded-md mt-1">
                    <MaterialCommunityIcons name="timer-outline" size={12} color="#8a7560" />
                    <Text className="text-xs font-medium text-[#8a7560] ml-1">-01:23:45</Text>
                  </View>
                </View>
              </View>

              {/* Progress */}
              <View className="mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-xs font-medium text-[#8a7560]">Time Remaining</Text>
                  <Text className="text-xs font-medium text-[#8a7560]">65%</Text>
                </View>
                <View className="h-2 overflow-hidden bg-gray-100 rounded-full">
                  <View
                    className="h-full rounded-full bg-primary"
                    style={{ width: "65%" }}
                  />
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row items-center justify-between">
                <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-full bg-green-50">
                  <MaterialCommunityIcons name="check-circle" size={18} color="#15803D" />
                  <Text className="ml-2 text-sm font-semibold text-green-700">Mark Done</Text>
                </TouchableOpacity>
                <MaterialCommunityIcons name="bell-ring-outline" size={22} color={GRAY[300]} />
              </View>
            </View>

            {/* Next Prayer Card */}
            <View className="w-[300px] bg-white/60 rounded-2xl p-5 border border-white backdrop-blur-sm">
              <View className="flex-row items-start justify-between mb-8">
                <View>
                  <Text className="text-xl font-bold text-[#181411]/60">Maghrib</Text>
                  <Text className="text-sm text-[#8a7560]">Sunset Prayer</Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-bold text-[#181411]/60">06:15 PM</Text>
                  <Text className="text-xs text-[#8a7560] mt-1">Upcoming</Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between pt-4 mt-8 border-t border-gray-200 border-dashed">
                <Text className="text-sm text-[#8a7560]">Turn on alerts</Text>
                <MaterialCommunityIcons name="bell-off-outline" size={22} color={GRAY[400]} />
              </View>
            </View>
          </ScrollView>

          {/* Quick Stats Grid */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#181411] mb-4">Quick Stats</Text>

            <View className="flex-row flex-wrap justify-between">
              {/* Sholat */}
              <View className="w-[48%] bg-soft-green rounded-2xl p-4 mb-4 overflow-hidden">
                <View className="flex-row items-center mb-3">
                  <View className="bg-white/50 p-1.5 rounded-lg">
                    <MaterialCommunityIcons name="hands-pray" size={20} color="#15803D" />
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-green-800">Sholat</Text>
                </View>
                <Text className="text-2xl font-bold text-[#181411]">
                  {mockStats.prayer.done}/{mockStats.prayer.total}{" "}
                  <Text className="text-sm font-medium text-green-700">Done</Text>
                </Text>
              </View>

              {/* Work */}
              <View className="w-[48%] bg-soft-blue rounded-2xl p-4 mb-4 overflow-hidden">
                <View className="flex-row items-center mb-3">
                  <View className="bg-white/50 p-1.5 rounded-lg">
                    <MaterialCommunityIcons name="briefcase-outline" size={20} color="#1D4ED8" />
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-blue-800">Work</Text>
                </View>
                <Text className="text-2xl font-bold text-[#181411]">
                  {mockStats.work.hours}{" "}
                  <Text className="text-sm font-medium text-blue-700">hrs</Text>
                </Text>
              </View>

              {/* Expense */}
              <View className="w-[48%] bg-soft-red rounded-2xl p-4 overflow-hidden">
                <View className="flex-row items-center mb-3">
                  <View className="bg-white/50 p-1.5 rounded-lg">
                    <MaterialCommunityIcons name="wallet-outline" size={20} color="#B91C1C" />
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-red-800">Expense</Text>
                </View>
                <Text className="text-xl font-bold text-[#181411]">
                  {mockStats.expense.amount}{" "}
                  <Text className="text-sm font-medium text-red-700">IDR</Text>
                </Text>
              </View>

              {/* Food */}
              <View className="w-[48%] bg-soft-yellow rounded-2xl p-4 overflow-hidden">
                <View className="flex-row items-center mb-3">
                  <View className="bg-white/50 p-1.5 rounded-lg">
                    <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#A16207" />
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-yellow-800">Food</Text>
                </View>
                <Text className="text-xl font-bold text-[#181411]">
                  {mockStats.food.calories.toLocaleString()}{" "}
                  <Text className="text-sm font-medium text-yellow-700">cal</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Daily Insights Card */}
          <View className="px-6 mt-2">
            <View className="bg-[#FFF4E6] rounded-2xl p-5 flex-row items-center justify-between border border-orange-100">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center mb-1">
                  <Text className="text-base font-bold text-[#181411]">Daily Insights</Text>
                  <MaterialCommunityIcons name="fire" size={18} color={PRIMARY.main} style={{ marginLeft: 8 }} />
                </View>
                <Text className="text-sm text-[#8a7560] leading-relaxed">
                  Keep up the good work! You're on a 7-day streak.
                </Text>
              </View>

              {/* Progress Ring Placeholder */}
              <View className="items-center justify-center w-12 h-12 border-4 border-orange-200 rounded-full">
                <MaterialCommunityIcons name="bell-ring" size={20} color={PRIMARY.main} />
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-[#181411]">Recent Activity</Text>
              <TouchableOpacity>
                <Text className="text-xs font-semibold text-primary">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="p-2 bg-white border border-gray-100 rounded-2xl">
              {mockActivities.map((activity, index) => (
                <View
                  key={index}
                  className={`flex-row items-center p-3 ${index < mockActivities.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                >
                  <View
                    className="w-2 h-2 mr-4 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-[#181411]">
                      {activity.title}
                    </Text>
                    <Text className="text-xs text-[#8a7560]">
                      {activity.category} • {activity.time}
                    </Text>
                  </View>
                  <Text className="text-xs font-medium text-gray-400">
                    {activity.ago}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
