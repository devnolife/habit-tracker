import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Text className="text-2xl font-bold text-orange-500">
        🎉 NativeWind is Working!
      </Text>
      <Text className="mt-2 text-gray-500">
        Tailwind CSS for React Native
      </Text>
      <View className="px-6 py-3 mt-6 rounded-full bg-orange-500">
        <Text className="font-semibold text-white">Get Started</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
