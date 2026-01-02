import { View, Text } from "react-native";

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  progress,
  color = "bg-primary",
  backgroundColor = "bg-gray-200",
  height = 8,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View>
      {showLabel && (
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">{label}</Text>
          <Text className="text-sm font-medium text-gray-900">
            {clampedProgress.toFixed(0)}%
          </Text>
        </View>
      )}
      <View
        className={`${backgroundColor} rounded-full overflow-hidden`}
        style={{ height }}
      >
        <View
          className={`${color} h-full rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
}
