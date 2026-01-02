import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Selamat Pagi! 👋
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Ayo raih target harianmu
          </Text>
        </View>

        {/* Daily Progress */}
        <View className="bg-primary rounded-3xl p-5 mb-6">
          <Text className="text-white text-lg font-semibold mb-3">
            Progress Hari Ini
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">5/5</Text>
              <Text className="text-white/80 text-sm">Sholat</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">1,850</Text>
              <Text className="text-white/80 text-sm">Kalori</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">4h</Text>
              <Text className="text-white/80 text-sm">Fokus</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">50k</Text>
              <Text className="text-white/80 text-sm">Expense</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Aksi Cepat
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%] bg-soft-green rounded-2xl p-4 mb-3">
              <Text className="text-lg font-semibold text-gray-900">🕌</Text>
              <Text className="text-sm font-medium text-gray-700 mt-2">
                Catat Sholat
              </Text>
            </View>
            <View className="w-[48%] bg-soft-blue rounded-2xl p-4 mb-3">
              <Text className="text-lg font-semibold text-gray-900">🍽️</Text>
              <Text className="text-sm font-medium text-gray-700 mt-2">
                Tambah Makanan
              </Text>
            </View>
            <View className="w-[48%] bg-soft-yellow rounded-2xl p-4 mb-3">
              <Text className="text-lg font-semibold text-gray-900">⏱️</Text>
              <Text className="text-sm font-medium text-gray-700 mt-2">
                Mulai Pomodoro
              </Text>
            </View>
            <View className="w-[48%] bg-soft-red rounded-2xl p-4 mb-3">
              <Text className="text-lg font-semibold text-gray-900">💰</Text>
              <Text className="text-sm font-medium text-gray-700 mt-2">
                Catat Pengeluaran
              </Text>
            </View>
          </View>
        </View>

        {/* Today's Schedule */}
        <View className="mb-24">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Jadwal Hari Ini
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <View className="w-2 h-2 bg-primary rounded-full mr-3" />
              <Text className="text-gray-700 flex-1">Dzuhur - 12:00</Text>
              <Text className="text-gray-400 text-sm">Dalam 2 jam</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <Text className="text-gray-700 flex-1">Fokus Kerja</Text>
              <Text className="text-gray-400 text-sm">14:00 - 16:00</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              <Text className="text-gray-700 flex-1">Ashar - 15:30</Text>
              <Text className="text-gray-400 text-sm">Dalam 5 jam</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
