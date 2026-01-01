import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Chip } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import { ExpenseCard } from '@/components/expense/ExpenseCard';
import { CategoryList } from '@/components/expense/CategoryList';

export default function ExpenseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFFDF9]">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-6 pb-2 justify-between">
        <Button variant="ghost" className="w-10 h-10 rounded-full">
          <Ionicons name="arrow-back" size={24} color="#181411" />
        </Button>
        <Text className="text-lg font-bold text-foreground">Pengeluaran</Text>
        <Button variant="ghost" className="w-10 h-10 rounded-full">
          <Ionicons name="ellipsis-vertical" size={24} color="#181411" />
        </Button>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Month Selector */}
        <View className="flex-row items-center justify-center gap-2 mb-6">
          <Button variant="ghost" className="p-1 rounded-full">
            <Ionicons name="chevron-back" size={20} color="#9ca3af" />
          </Button>
          <View className="flex-row items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
            <Ionicons name="calendar" size={20} color="#f48c25" />
            <Text className="text-sm font-bold text-foreground">August 2023</Text>
            <Ionicons name="chevron-down" size={16} color="#9ca3af" />
          </View>
          <Button variant="ghost" className="p-1 rounded-full">
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </Button>
        </View>

        {/* Hero Card: Total Spent */}
        <View className="px-6 mb-6">
          <ExpenseCard
            totalSpent={5250000}
            budget={7000000}
            remaining={1750000}
            percentUsed={75}
          />
        </View>

        {/* Action Buttons */}
        <View className="px-6 mb-8">
          <View className="flex-row gap-4">
            <Button
              variant="ghost"
              className="flex-1 h-14 bg-red-50 border border-red-100 rounded-2xl"
            >
              <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-2">
                <Ionicons name="remove" size={20} color="#dc2626" />
              </View>
              <Button.Label className="text-red-600 font-bold">Expense</Button.Label>
            </Button>
            <Button
              variant="ghost"
              className="flex-1 h-14 bg-green-50 border border-green-100 rounded-2xl"
            >
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-2">
                <Ionicons name="add" size={20} color="#16a34a" />
              </View>
              <Button.Label className="text-green-600 font-bold">Income</Button.Label>
            </Button>
          </View>
        </View>

        {/* Quick Insights */}
        <View className="px-6 mb-8">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          >
            {/* Insight Card */}
            <Card className="w-40 p-4 bg-white border border-gray-100 h-32 justify-between">
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="bulb" size={18} color="#f48c25" />
              </View>
              <View>
                <Text className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">
                  Insight
                </Text>
                <Text className="text-xs font-medium text-foreground leading-snug">
                  You spent 20% less than last month. Great job!
                </Text>
              </View>
            </Card>

            {/* Zakat Helper */}
            <Card className="w-40 p-4 bg-green-50 border border-green-100 h-32 justify-between">
              <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center">
                <Ionicons name="heart" size={18} color="#16a34a" />
              </View>
              <View>
                <Text className="text-[10px] text-green-700 font-bold uppercase tracking-wider mb-1">
                  Zakat
                </Text>
                <Text className="text-xs font-medium text-green-800 leading-snug">
                  Calculate your zakat eligibility
                </Text>
              </View>
            </Card>
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="px-6">
          <Text className="text-lg font-bold text-foreground mb-4">Spending by Category</Text>
          <CategoryList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
