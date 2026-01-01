import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Chip } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// Components
import { TaskList } from '@/components/work/TaskList';
import { WorkStats } from '@/components/work/WorkStats';

export default function WorkScreen() {
  const timerMinutes = 14;
  const timerSeconds = 59;
  const progress = 65; // percentage

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#eaf4ff] via-[#f6f6f8] to-[#f6f6f8]">
      {/* Header */}
      <View className="flex-row items-center justify-between p-6 pb-2">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
            <Ionicons name="briefcase" size={24} color="#2b6cee" />
          </View>
          <View>
            <Text className="text-lg font-bold text-foreground">Work & Productivity</Text>
            <Text className="text-xs text-muted">
              Tue, Oct 24 • <Text className="text-primary">Focus Mode</Text>
            </Text>
          </View>
        </View>
        <Button variant="ghost" className="w-10 h-10 rounded-full">
          <Ionicons name="calendar" size={24} color="#64748b" />
        </Button>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Stats */}
        <WorkStats hoursTracked={4.5} tasksDone={6} tasksTotal={10} focusScore={85} />

        {/* Timer Section */}
        <View className="items-center py-6 px-4">
          <Text className="text-2xl font-bold text-foreground mb-6">Drafting Q3 Report</Text>

          {/* Circular Timer */}
          <View className="relative w-72 h-72 items-center justify-center bg-white rounded-full shadow-lg">
            <Svg className="absolute w-full h-full -rotate-90 p-4">
              {/* Background Circle */}
              <Circle
                cx="144"
                cy="144"
                r="128"
                stroke="#e2e8f0"
                strokeWidth={8}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx="144"
                cy="144"
                r="128"
                stroke="#2b6cee"
                strokeWidth={8}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * 804} 804`}
              />
            </Svg>
            <View className="items-center z-10">
              <Text className="text-6xl font-bold text-foreground tracking-tighter">
                {timerMinutes}:{timerSeconds.toString().padStart(2, '0')}
              </Text>
              <Text className="text-sm text-muted mt-2">until break</Text>
            </View>

            {/* Play Button */}
            <View className="absolute -bottom-6">
              <Button
                variant="primary"
                className="w-16 h-16 rounded-full shadow-lg shadow-primary/30"
              >
                <Ionicons name="play" size={32} color="white" />
              </Button>
            </View>
          </View>

          {/* Timer Presets */}
          <View className="flex-row gap-3 mt-10">
            <Chip variant="primary" className="px-5 py-2">
              <Text className="text-sm font-semibold text-white">25m</Text>
            </Chip>
            <Chip variant="ghost" className="px-5 py-2 bg-white border border-gray-200">
              <Text className="text-sm font-medium text-muted">50m</Text>
            </Chip>
            <Chip variant="ghost" className="px-5 py-2 bg-white border border-gray-200">
              <Text className="text-sm font-medium text-muted">Custom</Text>
            </Chip>
          </View>
        </View>

        {/* Task Categories */}
        <View className="px-6 py-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            <Chip variant="primary" className="px-5 py-2.5 bg-foreground">
              <Text className="text-sm font-bold text-white">All Tasks</Text>
              <Text className="text-xs text-white/70 ml-1">8</Text>
            </Chip>
            <Chip variant="ghost" className="px-5 py-2.5 bg-white border border-gray-200">
              <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
              <Text className="text-sm font-medium text-muted">Personal</Text>
            </Chip>
            <Chip variant="ghost" className="px-5 py-2.5 bg-white border border-gray-200">
              <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
              <Text className="text-sm font-medium text-muted">Deep Work</Text>
            </Chip>
          </ScrollView>
        </View>

        {/* Task List */}
        <View className="px-6 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-foreground">Today's Plan</Text>
            <Button variant="ghost" className="h-8">
              <Button.Label className="text-primary text-sm font-semibold">View All</Button.Label>
            </Button>
          </View>
          <TaskList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
