import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type Meal = {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  calories: number;
  items: string[];
};

const meals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    type: 'breakfast',
    time: '07:30',
    calories: 450,
    items: ['Nasi Uduk', 'Telur Ceplok', 'Tempe Goreng']
  },
  {
    id: '2',
    name: 'Lunch',
    type: 'lunch',
    time: '12:30',
    calories: 650,
    items: ['Nasi Putih', 'Ayam Bakar', 'Sayur Asem', 'Sambal']
  },
  {
    id: '3',
    name: 'Snack',
    type: 'snack',
    time: '15:00',
    calories: 150,
    items: ['Kurma', 'Teh Manis']
  },
];

const mealIcons = {
  breakfast: 'sunny',
  lunch: 'restaurant',
  dinner: 'moon',
  snack: 'cafe',
} as const;

const mealColors = {
  breakfast: { bg: 'bg-yellow-50', text: '#eab308' },
  lunch: { bg: 'bg-orange-50', text: '#f97316' },
  dinner: { bg: 'bg-indigo-50', text: '#6366f1' },
  snack: { bg: 'bg-pink-50', text: '#ec4899' },
};

type MealItemProps = {
  meal: Meal;
};

function MealItem({ meal }: MealItemProps) {
  const colors = mealColors[meal.type];

  return (
    <Card className="p-4 bg-white/90 backdrop-blur-sm mb-3 rounded-2xl shadow-sm border border-gray-50">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className={`w-12 h-12 rounded-xl ${colors.bg} items-center justify-center`}>
            <Ionicons
              name={mealIcons[meal.type] as keyof typeof Ionicons.glyphMap}
              size={24}
              color={colors.text}
            />
          </View>
          <View>
            <Text className="font-bold text-foreground">{meal.name}</Text>
            <Text className="text-xs text-muted">{meal.time}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-bold text-foreground">{meal.calories}</Text>
          <Text className="text-xs text-muted">kcal</Text>
        </View>
      </View>

      {/* Food Items */}
      <View className="mt-3 flex-row flex-wrap gap-2">
        {meal.items.map((item, index) => (
          <View key={index} className="bg-gray-100 px-2 py-1 rounded-md">
            <Text className="text-xs text-muted">{item}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

export function MealList() {
  return (
    <View>
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </View>
  );
}
