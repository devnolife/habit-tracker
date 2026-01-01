import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type WeatherWidgetProps = {
  temperature: number;
  location: string;
  condition?: 'sunny' | 'cloudy' | 'rainy' | 'partly_cloudy';
};

const conditionIcons = {
  sunny: 'sunny',
  cloudy: 'cloudy',
  rainy: 'rainy',
  partly_cloudy: 'partly-sunny',
} as const;

export function WeatherWidget({
  temperature,
  location,
  condition = 'partly_cloudy'
}: WeatherWidgetProps) {
  return (
    <View className="mt-2 flex-row items-center gap-1.5 self-start rounded-full bg-white/60 backdrop-blur-sm border border-white/50 px-3 py-1 shadow-sm">
      <Ionicons
        name={conditionIcons[condition] as keyof typeof Ionicons.glyphMap}
        size={18}
        color="#f48c25"
      />
      <Text className="text-xs font-semibold text-muted">
        {temperature}°C {location}
      </Text>
    </View>
  );
}
