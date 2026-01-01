import { View, Text } from 'react-native';
import { Card, Button } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type PrayerCardProps = {
  name: string;
  arabicName: string;
  time: string;
  subtitle: string;
  countdown?: string;
  progress?: number;
  isActive?: boolean;
  isUpcoming?: boolean;
  isCompleted?: boolean;
};

export function PrayerCard({
  name,
  arabicName,
  time,
  subtitle,
  countdown,
  progress = 0,
  isActive = false,
  isUpcoming = false,
  isCompleted = false,
}: PrayerCardProps) {
  return (
    <Card
      className={`relative min-w-[300px] p-5 overflow-hidden ${isActive
          ? 'bg-white shadow-lg border border-orange-50/50'
          : 'bg-white/60 backdrop-blur-sm border border-white shadow-sm'
        }`}
    >
      {/* Decorative Background */}
      <View className="absolute right-[-20px] top-[-20px] opacity-10">
        <Ionicons
          name="moon"
          size={150}
          color={isActive ? '#f48c25' : '#000'}
        />
      </View>

      {/* Header */}
      <View className="flex-row justify-between items-start mb-6 relative z-10">
        <View>
          <View className="flex-row items-center gap-2">
            <Text className={`text-xl font-bold ${isActive ? 'text-foreground' : 'text-foreground/60'}`}>
              {name}
            </Text>
            <Text className="text-sm text-muted">{arabicName}</Text>
          </View>
          <Text className="text-sm text-muted">{subtitle}</Text>
        </View>
        <View className="items-end">
          <Text className={`text-xl font-bold ${isActive ? 'text-primary' : 'text-foreground/60'}`}>
            {time}
          </Text>
          {countdown && (
            <View className="flex-row items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-md mt-1">
              <Ionicons name="timer-outline" size={14} color="#8a7560" />
              <Text className="text-xs font-medium text-muted">{countdown}</Text>
            </View>
          )}
          {isUpcoming && (
            <Text className="text-xs text-muted mt-1">Upcoming</Text>
          )}
        </View>
      </View>

      {/* Progress Bar (for active prayers) */}
      {isActive && progress > 0 && (
        <View className="relative z-10">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-xs font-medium text-muted">Time Remaining</Text>
            <Text className="text-xs font-medium text-muted">{progress}%</Text>
          </View>
          <View className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <View
              className="h-full rounded-full bg-gradient-to-r from-orange-300 to-primary"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      )}

      {/* Action Button (for active prayers) */}
      {isActive && (
        <View className="mt-6 flex-row items-center justify-between relative z-10">
          <Button
            variant="ghost"
            className="bg-green-50 px-4 py-2 rounded-full"
          >
            <Ionicons name="checkmark-circle" size={18} color="#15803d" />
            <Button.Label className="text-green-700 ml-2">Mark Done</Button.Label>
          </Button>
          <Ionicons name="notifications" size={20} color="#d1d5db" />
        </View>
      )}

      {/* Turn on alerts (for upcoming prayers) */}
      {isUpcoming && !isActive && (
        <View className="mt-8 pt-4 border-t border-dashed border-gray-200 flex-row justify-between items-center">
          <Text className="text-sm text-muted">Turn on alerts</Text>
          <Ionicons name="notifications-off" size={20} color="#8a7560" />
        </View>
      )}
    </Card>
  );
}
