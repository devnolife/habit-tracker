import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, TextField } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function OnboardingExpense() {
  const router = useRouter();
  const [budget, setBudget] = useState('5000000');
  const [currency, setCurrency] = useState('IDR');

  const categories = [
    { id: 'food', name: 'Food & Drinks', icon: 'restaurant', selected: true },
    { id: 'transport', name: 'Transportation', icon: 'car', selected: true },
    { id: 'shopping', name: 'Shopping', icon: 'cart', selected: true },
    { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', selected: true },
    { id: 'entertainment', name: 'Entertainment', icon: 'game-controller', selected: false },
    { id: 'health', name: 'Health', icon: 'fitness', selected: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-between">
        {/* Header */}
        <View className="pt-4">
          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full self-start"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#181411" />
          </Button>
        </View>

        {/* Content */}
        <View className="flex-1 pt-8">
          {/* Icon */}
          <View className="w-20 h-20 rounded-3xl bg-orange-50 items-center justify-center self-center mb-6">
            <Ionicons name="wallet" size={40} color="#f48c25" />
          </View>

          <Text className="text-2xl font-bold text-foreground text-center mb-2">
            Expense Tracker Setup
          </Text>
          <Text className="text-base text-muted text-center mb-8">
            Set your monthly budget and spending categories
          </Text>

          {/* Monthly Budget */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Monthly Budget</Text>
            <Card className="p-4 bg-white border border-gray-100">
              <View className="flex-row items-center gap-3">
                <Text className="text-lg font-bold text-muted">Rp</Text>
                <TextField className="flex-1">
                  <TextField.Input
                    value={budget}
                    onChangeText={setBudget}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                    className="text-2xl font-bold"
                  />
                </TextField>
              </View>
            </Card>
          </View>

          {/* Categories */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">Spending Categories</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <Card
                  key={cat.id}
                  className={`px-4 py-3 flex-row items-center gap-2 ${cat.selected
                      ? 'bg-primary/10 border border-primary/30'
                      : 'bg-white border border-gray-100'
                    }`}
                >
                  <Ionicons
                    name={cat.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={cat.selected ? '#f48c25' : '#9ca3af'}
                  />
                  <Text className={`text-sm font-medium ${cat.selected ? 'text-primary' : 'text-muted'}`}>
                    {cat.name}
                  </Text>
                </Card>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="pb-8 gap-3">
          <Button
            variant="primary"
            className="h-14 rounded-full shadow-lg shadow-primary/30"
            onPress={() => router.push('/(onboarding)/ready')}
          >
            <Button.Label className="text-base font-bold">Continue</Button.Label>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Button>

          <Button
            variant="ghost"
            className="h-12"
            onPress={() => router.push('/(onboarding)/ready')}
          >
            <Button.Label className="text-muted">Skip for now</Button.Label>
          </Button>

          {/* Progress Indicator */}
          <View className="flex-row justify-center gap-2 mt-2">
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-6 h-2 rounded-full bg-primary" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
