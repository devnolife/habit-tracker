import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Flame } from "lucide-react-native";

const MEALS = [
  { name: "Sarapan", time: "07:00", calories: 450, items: ["Nasi Goreng", "Teh Manis"] },
  { name: "Makan Siang", time: "12:30", calories: 650, items: ["Nasi Padang", "Es Jeruk"] },
  { name: "Snack", time: "15:00", calories: 150, items: ["Pisang", "Kopi"] },
];

export default function NutritionScreen() {
  const totalCalories = MEALS.reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 2000;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Tracker Makanan 🍽️
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Pantau asupan nutrisimu
          </Text>
        </View>

        {/* Calorie Card */}
        <View className="bg-soft-blue rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-blue-800 text-sm font-medium">
                Total Kalori
              </Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-blue-900 text-3xl font-bold">
                  {totalCalories}
                </Text>
                <Text className="text-blue-700 text-lg ml-1">
                  / {targetCalories}
                </Text>
              </View>
              <Text className="text-blue-700 text-sm mt-1">
                {targetCalories - totalCalories} kalori tersisa
              </Text>
            </View>
            <View className="w-20 h-20 rounded-full bg-blue-200 items-center justify-center">
              <Flame size={32} color="#1D4ED8" />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mt-4 h-3 bg-blue-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(totalCalories / targetCalories) * 100}%` }}
            />
          </View>
        </View>

        {/* Add Meal Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-primary p-4 rounded-2xl mb-6">
          <Plus size={24} color="white" />
          <Text className="text-white font-semibold ml-2">Tambah Makanan</Text>
        </TouchableOpacity>

        {/* Meal List */}
        <View className="mb-24">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Makanan Hari Ini
          </Text>
          {MEALS.map((meal, index) => (
            <View
              key={index}
              className="bg-gray-50 rounded-2xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {meal.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{meal.time}</Text>
                  <Text className="text-sm text-gray-600 mt-2">
                    {meal.items.join(", ")}
                  </Text>
                </View>
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-700 font-semibold">
                    {meal.calories} kal
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
