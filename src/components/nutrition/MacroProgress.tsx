import { View, Text } from 'react-native';

type MacroProgressProps = {
  label: string;
  value: number;
  color: string;
  progress: number; // 0-100
};

export function MacroProgress({ label, value, color, progress }: MacroProgressProps) {
  return (
    <View className="items-center">
      <Text className="text-xs font-medium text-muted">{label}</Text>
      <View className="h-1.5 w-16 bg-gray-200 rounded-full mt-1 overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </View>
      <Text className="text-sm font-bold text-foreground mt-1">{value}g</Text>
    </View>
  );
}
