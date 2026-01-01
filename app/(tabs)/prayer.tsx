import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Chip } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import { PrayerChecklist } from '@/components/prayer/PrayerChecklist';
import { PrayerStats } from '@/components/prayer/PrayerStats';

export default function PrayerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f6f8f6]">
      {/* Header */}
      <View className="relative bg-gradient-to-b from-white to-[#f0fdf4] pb-6 pt-2 rounded-b-3xl shadow-sm">
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center justify-between mb-4">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
              <Ionicons name="moon" size={24} color="#13ec5b" />
            </View>
            <View className="flex-row gap-3">
              <View className="bg-white/50 p-2 rounded-xl">
                <Ionicons name="notifications-outline" size={24} color="#111813" />
              </View>
              <View className="bg-white/50 p-2 rounded-xl">
                <Ionicons name="settings-outline" size={24} color="#111813" />
              </View>
            </View>
          </View>

          <View className="items-center">
            <Text className="text-3xl font-bold text-foreground">Prayer Tracker</Text>
            <Text className="text-sm text-muted mt-1">14 Ramadhan 1445 AH</Text>

            <View className="flex-row items-center gap-1 mt-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              <Ionicons name="location" size={16} color="#13ec5b" />
              <Text className="text-xs font-semibold text-foreground">Jakarta, Indonesia</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 -mt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Stats Mini Bar */}
        <PrayerStats streak={12} completion={80} />

        {/* Prayer Checklist */}
        <View className="mt-6">
          <Text className="text-lg font-bold text-foreground mb-3 pl-1">Today's Prayers</Text>
          <PrayerChecklist />
        </View>

        {/* Weekly Overview */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-foreground mb-3 pl-1">This Week</Text>
          <Card className="p-4 bg-white border border-gray-100">
            <View className="flex-row justify-between">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <View key={day} className="items-center gap-2">
                  <Text className="text-xs text-muted">{day}</Text>
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${index < 4 ? 'bg-green-500' : index === 4 ? 'bg-primary' : 'bg-gray-200'
                      }`}
                  >
                    {index < 5 ? (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={index < 5 ? 'white' : '#9ca3af'}
                      />
                    ) : (
                      <Text className="text-xs text-muted">-</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
