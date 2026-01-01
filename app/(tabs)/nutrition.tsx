import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// Components
import { MacroProgress } from '@/components/nutrition/MacroProgress';
import { MealList } from '@/components/nutrition/MealList';

export default function NutritionScreen() {
  const remainingCalories = 850;
  const totalCalories = 2000;
  const progress = ((totalCalories - remainingCalories) / totalCalories) * 100;

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#FEF9C3] via-[#ECFCCB] to-[#D1FAE5]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-4">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm">
            <Ionicons name="restaurant" size={24} color="#0df259" />
          </View>
          <View>
            <Text className="text-lg font-bold text-foreground">Food & Nutrition</Text>
            <Text className="text-xs text-muted">Islamic Lifestyle Tracker</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <Button variant="ghost" className="w-10 h-10 rounded-full bg-white shadow-sm">
            <Ionicons name="calendar" size={22} color="#111813" />
          </Button>
          <Button variant="primary" className="w-10 h-10 rounded-full shadow-sm">
            <Ionicons name="person" size={22} color="white" />
          </Button>
        </View>
      </View>

      {/* Date Selector */}
      <View className="flex-row items-center justify-between gap-4 px-6 mt-2">
        <Button variant="ghost">
          <Ionicons name="chevron-back" size={24} color="#608a6e" />
        </Button>
        <View className="items-center">
          <Text className="text-sm font-bold text-primary">Today</Text>
          <Text className="text-2xl font-bold text-foreground">Wed, 16 Aug</Text>
        </View>
        <Button variant="ghost">
          <Ionicons name="chevron-forward" size={24} color="#608a6e" />
        </Button>
      </View>

      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Calorie Goal Card */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-sm relative overflow-hidden">
          {/* Background Icon */}
          <View className="absolute top-0 right-0 p-4 opacity-10">
            <Ionicons name="nutrition" size={100} color="#0df259" />
          </View>

          <View className="items-center relative z-10">
            {/* Circular Progress */}
            <View className="relative w-48 h-48 items-center justify-center">
              <Svg className="absolute w-full h-full -rotate-90">
                {/* Background Circle */}
                <Circle
                  cx="96"
                  cy="96"
                  r="85"
                  stroke="#e5e7eb"
                  strokeWidth={8}
                  fill="none"
                />
                {/* Progress Circle */}
                <Circle
                  cx="96"
                  cy="96"
                  r="85"
                  stroke="#0df259"
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 534} 534`}
                />
              </Svg>
              <View className="absolute items-center">
                <Text className="text-sm text-muted">Remaining</Text>
                <Text className="text-4xl font-extrabold text-foreground">{remainingCalories}</Text>
                <Text className="text-xs text-muted mt-1">kcal</Text>
              </View>
            </View>

            {/* Macro Progress */}
            <View className="flex-row w-full justify-between mt-6 px-2">
              <MacroProgress label="Carbs" value={120} color="#FACC15" progress={75} />
              <MacroProgress label="Protein" value={85} color="#0df259" progress={50} />
              <MacroProgress label="Fat" value={40} color="#FB923C" progress={25} />
            </View>
          </View>
        </Card>

        {/* Today's Meals */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-foreground">Today's Meals</Text>
            <Button variant="ghost" className="h-8">
              <Button.Label className="text-primary text-sm">+ Add Meal</Button.Label>
            </Button>
          </View>
          <MealList />
        </View>

        {/* Water Intake */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-foreground mb-4">Water Intake</Text>
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="water" size={24} color="#3b82f6" />
                </View>
                <View>
                  <Text className="text-xl font-bold text-foreground">6 / 8</Text>
                  <Text className="text-xs text-muted">glasses today</Text>
                </View>
              </View>
              <Button variant="ghost" className="bg-blue-50 border border-blue-100 px-4">
                <Button.Label className="text-blue-600">+ Add</Button.Label>
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
