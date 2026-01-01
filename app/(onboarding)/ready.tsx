import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Path } from 'react-native-svg';

export default function OnboardingReady() {
  const router = useRouter();

  const handleStart = async () => {
    try {
      await AsyncStorage.setItem('isOnboarded', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-between">
        {/* Top Spacer */}
        <View className="pt-8" />

        {/* Hero Section */}
        <View className="items-center flex-1 justify-center">
          {/* Success Illustration */}
          <View className="relative w-80 h-80 items-center justify-center mb-8">
            {/* Animated pulse background */}
            <View className="absolute inset-0 bg-primary/10 rounded-full" />
            <View className="absolute inset-4 bg-white rounded-full shadow-lg items-center justify-center">
              <Svg width="180" height="180" viewBox="0 0 200 200">
                {/* Background circle */}
                <Circle cx="100" cy="100" r="90" fill="#f48c25" fillOpacity={0.1} />

                {/* Checkmark */}
                <Path
                  d="M60 100 L90 130 L145 70"
                  stroke="#f48c25"
                  strokeWidth={12}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                {/* Decorative circles */}
                <Circle cx="40" cy="60" r="15" fill="#3b82f6" fillOpacity={0.2} />
                <Circle cx="160" cy="140" r="12" fill="#22c55e" fillOpacity={0.2} />
                <Circle cx="150" cy="50" r="8" fill="#a855f7" fillOpacity={0.2} />
                <Circle cx="50" cy="150" r="10" fill="#f48c25" fillOpacity={0.2} />
              </Svg>
            </View>
          </View>

          {/* Text Content */}
          <View className="items-center max-w-md">
            <Text className="text-3xl font-bold text-foreground text-center mb-3">
              Bismillah, Let's Begin
            </Text>
            <Text className="text-base text-muted text-center leading-relaxed">
              Your prayer times, Quran goals, and habits are ready for you. We've personalized your schedule based on your preferences.
            </Text>
          </View>

          {/* Feature Summary */}
          <View className="flex-row gap-4 mt-8">
            {[
              { icon: 'checkmark-circle', label: 'Prayer Times', color: '#22c55e' },
              { icon: 'checkmark-circle', label: 'Budget Set', color: '#f48c25' },
              { icon: 'checkmark-circle', label: 'Goals Ready', color: '#3b82f6' },
            ].map((item, index) => (
              <View key={index} className="items-center gap-1">
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                  color={item.color}
                />
                <Text className="text-xs text-muted">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="pb-8 gap-3">
          <Button
            variant="primary"
            className="h-14 rounded-full shadow-lg shadow-primary/30"
            onPress={handleStart}
          >
            <Button.Label className="text-base font-bold">Start Using App</Button.Label>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Button>

          <Button
            variant="ghost"
            className="h-12"
            onPress={() => router.back()}
          >
            <Button.Label className="text-muted">Customize Experience</Button.Label>
          </Button>

          {/* Progress Indicator (Completed) */}
          <View className="flex-row justify-center gap-2 mt-2">
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-6 h-2 rounded-full bg-primary" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
