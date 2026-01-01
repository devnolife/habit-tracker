import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type ExpenseCardProps = {
  totalSpent: number;
  budget: number;
  remaining: number;
  percentUsed: number;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function ExpenseCard({ totalSpent, budget, remaining, percentUsed }: ExpenseCardProps) {
  const isOverBudget = percentUsed > 80;

  return (
    <Card className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f48c25] to-[#e06c00] p-6 shadow-lg shadow-orange-500/30">
      {/* Background Pattern */}
      <View className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <View className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/5 rounded-full blur-xl" />

      <View className="relative z-10">
        {/* Header */}
        <View className="flex-row justify-between items-start">
          <View>
            <View className="flex-row items-center gap-1 mb-1">
              <Ionicons name="wallet" size={18} color="#fed7aa" />
              <Text className="text-orange-100 text-sm font-medium">Total Spent</Text>
            </View>
            <Text className="text-4xl font-extrabold text-white tracking-tight">
              {formatCurrency(totalSpent)}
            </Text>
          </View>

          {/* Icon */}
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm border border-white/30">
            <Ionicons name="pie-chart" size={24} color="white" />
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mt-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-xs font-medium text-orange-50">Monthly Budget</Text>
            <Text className="text-xs font-medium text-orange-50">{percentUsed}% Used</Text>
          </View>
          <View className="relative h-2 w-full bg-black/20 rounded-full overflow-hidden">
            <View
              className="absolute top-0 left-0 h-full bg-white rounded-full"
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </View>

          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-orange-100">
              Remaining: <Text className="font-bold text-white">{formatCurrency(remaining)}</Text>
            </Text>
            {isOverBudget && (
              <View className="flex-row items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30">
                <Ionicons name="warning" size={10} color="#fecaca" />
                <Text className="text-[10px] text-red-100">Overspending on Food</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
}
