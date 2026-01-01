import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 justify-between">
        {/* Top Spacer */}
        <View className="pt-8" />

        {/* Hero Section */}
        <View className="items-center flex-1 justify-center">
          {/* Logo / Illustration */}
          <View className="relative w-72 h-72 items-center justify-center mb-8">
            {/* Decorative circles */}
            <View className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
            <View className="absolute inset-8 bg-white rounded-full shadow-lg items-center justify-center">
              <Svg width="150" height="150" viewBox="0 0 200 200">
                <Circle cx="100" cy="100" r="90" fill="#f48c25" fillOpacity={0.1} />
                <Path
                  d="M100 30 L120 70 L170 80 L130 115 L140 165 L100 140 L60 165 L70 115 L30 80 L80 70 Z"
                  fill="#f48c25"
                  fillOpacity={0.8}
                />
                {/* Crescent moon */}
                <Path
                  d="M100 50 A 40 40 0 1 0 100 130 A 30 30 0 1 1 100 50"
                  fill="white"
                />
              </Svg>
            </View>
          </View>

          {/* Text Content */}
          <View className="items-center">
            <Text className="text-3xl font-bold text-foreground text-center mb-3">
              Welcome to{'\n'}Habit Tracker
            </Text>
            <Text className="text-base text-muted text-center px-4 leading-relaxed">
              Your personal Islamic lifestyle companion for tracking prayers, expenses, nutrition, and productivity.
            </Text>
          </View>
        </View>

        {/* Features Preview */}
        <View className="flex-row justify-center gap-6 mb-8">
          {[
            { icon: 'moon', label: 'Prayer', color: '#22c55e' },
            { icon: 'wallet', label: 'Expense', color: '#f48c25' },
            { icon: 'nutrition', label: 'Food', color: '#84cc16' },
            { icon: 'briefcase', label: 'Work', color: '#3b82f6' },
          ].map((feature, index) => (
            <View key={index} className="items-center gap-2">
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Ionicons
                  name={feature.icon as keyof typeof Ionicons.glyphMap}
                  size={28}
                  color={feature.color}
                />
              </View>
              <Text className="text-xs text-muted font-medium">{feature.label}</Text>
            </View>
          ))}
        </View>

        {/* Bottom Actions */}
        <View className="pb-8 gap-3">
          <Button
            variant="primary"
            className="h-14 rounded-full shadow-lg shadow-primary/30"
            onPress={() => router.push('/(onboarding)/prayer')}
          >
            <Button.Label className="text-base font-bold">Get Started</Button.Label>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Button>

          {/* Progress Indicator */}
          <View className="flex-row justify-center gap-2 mt-4">
            <View className="w-6 h-2 rounded-full bg-primary" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
