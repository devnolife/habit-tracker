import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type WorkStatsProps = {
  hoursTracked: number;
  tasksDone: number;
  tasksTotal: number;
  focusScore: number;
};

export function WorkStats({ hoursTracked, tasksDone, tasksTotal, focusScore }: WorkStatsProps) {
  return (
    <View className="flex-row flex-wrap gap-3 px-6 py-4">
      {/* Hours Tracked */}
      <Card className="flex-1 min-w-[100px] p-4 bg-white shadow-sm border border-gray-100 rounded-2xl">
        <View className="flex-row items-center gap-2 mb-1">
          <Ionicons name="time" size={20} color="#2b6cee" />
        </View>
        <Text className="text-xs text-muted font-medium">Hours Tracked</Text>
        <Text className="text-xl font-bold text-foreground">{hoursTracked}</Text>
      </Card>

      {/* Tasks Done */}
      <Card className="flex-1 min-w-[100px] p-4 bg-white shadow-sm border border-gray-100 rounded-2xl">
        <View className="flex-row items-center gap-2 mb-1">
          <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
        </View>
        <Text className="text-xs text-muted font-medium">Tasks Done</Text>
        <Text className="text-xl font-bold text-foreground">{tasksDone}/{tasksTotal}</Text>
      </Card>

      {/* Focus Score */}
      <Card className="flex-1 min-w-[100px] p-4 bg-white shadow-sm border border-gray-100 rounded-2xl">
        <View className="flex-row items-center gap-2 mb-1">
          <Ionicons name="flash" size={20} color="#f97316" />
        </View>
        <Text className="text-xs text-muted font-medium">Focus Score</Text>
        <Text className="text-xl font-bold text-foreground">{focusScore}</Text>
      </Card>
    </View>
  );
}
