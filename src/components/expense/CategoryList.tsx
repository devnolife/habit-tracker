import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  amount: number;
  percentage: number;
};

const categories: Category[] = [
  { id: '1', name: 'Food & Drinks', icon: 'restaurant', color: '#f97316', bgColor: 'bg-orange-50', amount: 1500000, percentage: 35 },
  { id: '2', name: 'Transportation', icon: 'car', color: '#3b82f6', bgColor: 'bg-blue-50', amount: 800000, percentage: 20 },
  { id: '3', name: 'Shopping', icon: 'cart', color: '#a855f7', bgColor: 'bg-purple-50', amount: 1200000, percentage: 25 },
  { id: '4', name: 'Bills & Utilities', icon: 'receipt', color: '#22c55e', bgColor: 'bg-green-50', amount: 750000, percentage: 15 },
  { id: '5', name: 'Entertainment', icon: 'game-controller', color: '#ec4899', bgColor: 'bg-pink-50', amount: 300000, percentage: 5 },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Card className="p-4 bg-white border border-gray-100 mb-3 rounded-2xl shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className={`w-10 h-10 rounded-full ${category.bgColor} items-center justify-center`}>
            <Ionicons name={category.icon} size={20} color={category.color} />
          </View>
          <View>
            <Text className="font-semibold text-foreground">{category.name}</Text>
            <Text className="text-xs text-muted">{category.percentage}% of total</Text>
          </View>
        </View>
        <Text className="font-bold text-foreground">{formatCurrency(category.amount)}</Text>
      </View>

      {/* Progress Bar */}
      <View className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${category.percentage}%`,
            backgroundColor: category.color
          }}
        />
      </View>
    </Card>
  );
}

export function CategoryList() {
  return (
    <View>
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </View>
  );
}
