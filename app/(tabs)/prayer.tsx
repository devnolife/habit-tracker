import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check, Clock } from "lucide-react-native";

const PRAYERS = [
  { name: "Subuh", time: "04:30", completed: true },
  { name: "Dzuhur", time: "12:00", completed: true },
  { name: "Ashar", time: "15:30", completed: false },
  { name: "Maghrib", time: "18:00", completed: false },
  { name: "Isya", time: "19:30", completed: false },
];

export default function PrayerScreen() {
  const completedCount = PRAYERS.filter((p) => p.completed).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Tracker Sholat 🕌
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Jaga sholatmu, jaga hidupmu
          </Text>
        </View>

        {/* Progress Card */}
        <View className="bg-soft-green rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-green-800 text-sm font-medium">
                Hari Ini
              </Text>
              <Text className="text-green-900 text-3xl font-bold mt-1">
                {completedCount}/5
              </Text>
              <Text className="text-green-700 text-sm mt-1">
                Sholat Tercatat
              </Text>
            </View>
            <View className="w-20 h-20 rounded-full bg-green-200 items-center justify-center">
              <Text className="text-3xl">🌙</Text>
            </View>
          </View>
        </View>

        {/* Prayer List */}
        <View className="mb-24">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Daftar Sholat
          </Text>
          {PRAYERS.map((prayer, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-4 rounded-2xl mb-3 ${prayer.completed ? "bg-green-50" : "bg-gray-50"
                }`}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${prayer.completed ? "bg-green-500" : "bg-gray-200"
                  }`}
              >
                {prayer.completed ? (
                  <Check size={24} color="white" />
                ) : (
                  <Clock size={24} color="#9CA3AF" />
                )}
              </View>
              <View className="flex-1">
                <Text
                  className={`text-base font-semibold ${prayer.completed ? "text-green-800" : "text-gray-900"
                    }`}
                >
                  {prayer.name}
                </Text>
                <Text className="text-sm text-gray-500">{prayer.time}</Text>
              </View>
              {prayer.completed && (
                <Text className="text-green-600 text-sm font-medium">
                  Tercatat ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
