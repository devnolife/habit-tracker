import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type PrayerStatsProps = {
  streak: number;
  completion: number;
};

export function PrayerStats({ streak, completion }: PrayerStatsProps) {
  return (
    <View className="flex-row gap-3 mt-6">
      {/* Streak Card */}
      <Card className="flex-1 p-3 bg-white shadow-sm border border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-muted">Streak</Text>
            <Text className="text-xl font-bold text-foreground">{streak} Days</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-orange-50 items-center justify-center">
            <Ionicons name="flame" size={20} color="#f97316" />
          </View>
        </View>
      </Card>

      {/* Completion Card */}
      <Card className="flex-1 p-3 bg-white shadow-sm border border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-muted">Completion</Text>
            <Text className="text-xl font-bold text-green-500">{completion}%</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center">
            <Ionicons name="pie-chart" size={20} color="#22c55e" />
          </View>
        </View>
      </Card>
    </View>
  );
}
