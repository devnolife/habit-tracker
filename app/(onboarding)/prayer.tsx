import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, TextField, Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function OnboardingPrayer() {
  const router = useRouter();
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [notifications, setNotifications] = useState(true);
  const [calculationMethod, setCalculationMethod] = useState('kemenag');

  const methods = [
    { id: 'kemenag', name: 'Kemenag RI', description: 'Kementerian Agama Indonesia' },
    { id: 'mwl', name: 'Muslim World League', description: 'International standard' },
    { id: 'isna', name: 'ISNA', description: 'Islamic Society of North America' },
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
          <View className="w-20 h-20 rounded-3xl bg-green-50 items-center justify-center self-center mb-6">
            <Ionicons name="moon" size={40} color="#22c55e" />
          </View>

          <Text className="text-2xl font-bold text-foreground text-center mb-2">
            Prayer Tracker Setup
          </Text>
          <Text className="text-base text-muted text-center mb-8">
            Configure your prayer times based on your location
          </Text>

          {/* Location */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Location</Text>
            <Card className="p-4 bg-white border border-gray-100 flex-row items-center gap-3">
              <Ionicons name="location" size={20} color="#f48c25" />
              <Text className="flex-1 text-foreground font-medium">{location}</Text>
              <Button variant="ghost" className="h-8 px-3">
                <Button.Label className="text-primary text-sm">Change</Button.Label>
              </Button>
            </Card>
          </View>

          {/* Calculation Method */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">Calculation Method</Text>
            {methods.map((method) => (
              <Card
                key={method.id}
                className={`p-4 mb-2 border ${calculationMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-100 bg-white'
                  }`}
                onPress={() => setCalculationMethod(method.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="font-semibold text-foreground">{method.name}</Text>
                    <Text className="text-xs text-muted">{method.description}</Text>
                  </View>
                  {calculationMethod === method.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#f48c25" />
                  )}
                </View>
              </Card>
            ))}
          </View>

          {/* Notifications */}
          <View>
            <Card className="p-4 bg-white border border-gray-100 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Ionicons name="notifications" size={20} color="#f48c25" />
                <View>
                  <Text className="font-semibold text-foreground">Prayer Reminders</Text>
                  <Text className="text-xs text-muted">Get notified before each prayer</Text>
                </View>
              </View>
              <Switch
                isSelected={notifications}
                onSelectedChange={setNotifications}
                className="w-12 h-7"
              >
                <Switch.Thumb className="w-5 h-5" />
              </Switch>
            </Card>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="pb-8 gap-3">
          <Button
            variant="primary"
            className="h-14 rounded-full shadow-lg shadow-primary/30"
            onPress={() => router.push('/(onboarding)/expense')}
          >
            <Button.Label className="text-base font-bold">Continue</Button.Label>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Button>

          {/* Progress Indicator */}
          <View className="flex-row justify-center gap-2 mt-4">
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-6 h-2 rounded-full bg-primary" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
            <View className="w-2 h-2 rounded-full bg-primary/30" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
