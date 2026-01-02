import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        {/* Logo/Illustration */}
        <View className="items-center mb-10">
          <View className="w-32 h-32 bg-primary/10 rounded-full items-center justify-center">
            <Text className="text-6xl">📱</Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
          Selamat Datang di{"\n"}Habit Tracker
        </Text>
        <Text className="text-base text-gray-500 text-center mb-10">
          Aplikasi all-in-one untuk tracking sholat, makanan, produktivitas, dan keuanganmu
        </Text>

        {/* Features */}
        <View className="mb-10">
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4">🕌</Text>
            <Text className="text-gray-700 flex-1">Tracking Sholat 5 waktu</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4">🍽️</Text>
            <Text className="text-gray-700 flex-1">Monitoring kalori harian</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-4">⏱️</Text>
            <Text className="text-gray-700 flex-1">Pomodoro & focus timer</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-2xl mr-4">💰</Text>
            <Text className="text-gray-700 flex-1">Kelola keuangan pribadi</Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="bg-primary py-4 rounded-2xl"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Mulai Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
