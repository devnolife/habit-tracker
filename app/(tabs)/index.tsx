import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Avatar } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Components
import { PrayerCard } from '@/components/home/PrayerCard';
import { QuickStats } from '@/components/home/QuickStats';
import { WeatherWidget } from '@/components/home/WeatherWidget';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Background Gradient */}
      <View className="absolute inset-0 bg-gradient-to-br from-[#FFFBF5] via-[#FFF9EE] to-[#FFEACC]" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <View className="px-6 pt-4 pb-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-sm font-medium text-muted">
                14 Ramadan 1445 H • 24 March 2024
              </Text>
              <Text className="text-2xl font-bold text-foreground mt-1">
                Assalamualaikum,{'\n'}Yusuf
              </Text>

              {/* Weather Widget */}
              <WeatherWidget temperature={32} location="Jakarta" />
            </View>

            {/* Profile Avatar */}
            <Avatar size="lg" className="border-2 border-white shadow-md">
              <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=8' }} />
              <Avatar.Fallback>YS</Avatar.Fallback>
            </Avatar>
          </View>
        </View>

        {/* Prayer Times Carousel */}
        <View className="mt-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
          >
            <PrayerCard
              name="Asr"
              arabicName="العصر"
              time="03:30 PM"
              subtitle="Afternoon Prayer"
              countdown="-01:23:45"
              progress={65}
              isActive
            />
            <PrayerCard
              name="Maghrib"
              arabicName="المغرب"
              time="06:15 PM"
              subtitle="Sunset Prayer"
              isUpcoming
            />
            <PrayerCard
              name="Isya"
              arabicName="العشاء"
              time="07:30 PM"
              subtitle="Night Prayer"
              isUpcoming
            />
          </ScrollView>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-foreground mb-4">Quick Stats</Text>
          <QuickStats />
        </View>

        {/* Today's Insights */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-foreground mb-4">Today's Insights</Text>

          <Card className="p-4 bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="sparkles" size={24} color="#f48c25" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">
                  Great Progress Today!
                </Text>
                <Text className="text-xs text-muted mt-0.5">
                  You've completed 4 out of 5 prayers and stayed within budget.
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-foreground mb-4">Quick Actions</Text>

          <View className="flex-row gap-3">
            <Button
              variant="ghost"
              className="flex-1 h-14 bg-green-50 border border-green-100"
              onPress={() => router.push('/prayer')}
            >
              <Button.Label className="text-green-700">+ Add Prayer</Button.Label>
            </Button>
            <Button
              variant="ghost"
              className="flex-1 h-14 bg-red-50 border border-red-100"
              onPress={() => router.push('/expense')}
            >
              <Button.Label className="text-red-700">+ Add Expense</Button.Label>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
