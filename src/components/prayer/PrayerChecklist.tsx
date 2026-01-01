import { View, Text, Pressable } from 'react-native';
import { Card, Checkbox, Switch, Accordion } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type PrayerStatus = 'completed' | 'current' | 'missed' | 'upcoming';

type Prayer = {
  id: string;
  name: string;
  arabicName: string;
  time: string;
  adhanTime: string;
  iqamahTime: string;
  status: PrayerStatus;
  jamaah: boolean;
};

const prayers: Prayer[] = [
  { id: '1', name: 'Fajr', arabicName: 'الفجر', time: '04:45 AM', adhanTime: '04:30 AM', iqamahTime: '04:40 AM', status: 'completed', jamaah: true },
  { id: '2', name: 'Dhuhr', arabicName: 'الظهر', time: '12:15 PM', adhanTime: '12:00 PM', iqamahTime: '12:10 PM', status: 'completed', jamaah: false },
  { id: '3', name: 'Asr', arabicName: 'العصر', time: '03:30 PM', adhanTime: '03:15 PM', iqamahTime: '03:25 PM', status: 'current', jamaah: false },
  { id: '4', name: 'Maghrib', arabicName: 'المغرب', time: '06:15 PM', adhanTime: '06:15 PM', iqamahTime: '06:20 PM', status: 'upcoming', jamaah: false },
  { id: '5', name: 'Isya', arabicName: 'العشاء', time: '07:30 PM', adhanTime: '07:30 PM', iqamahTime: '07:40 PM', status: 'upcoming', jamaah: false },
];

type PrayerItemProps = {
  prayer: Prayer;
  onToggle: (id: string) => void;
  onJamaahChange: (id: string, value: boolean) => void;
};

function PrayerItem({ prayer, onToggle, onJamaahChange }: PrayerItemProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusStyle = () => {
    switch (prayer.status) {
      case 'completed':
        return 'bg-green-50/50 border-green-500/20';
      case 'current':
        return 'bg-primary/5 border-primary/30';
      case 'missed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  const getStatusBadge = () => {
    switch (prayer.status) {
      case 'completed':
        return (
          <View className="bg-green-100 px-2 py-1 rounded">
            <Text className="text-xs font-semibold text-green-700">Done</Text>
          </View>
        );
      case 'current':
        return (
          <View className="bg-primary/10 px-2 py-1 rounded">
            <Text className="text-xs font-semibold text-primary">Now</Text>
          </View>
        );
      case 'missed':
        return (
          <View className="bg-red-100 px-2 py-1 rounded">
            <Text className="text-xs font-semibold text-red-700">Missed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`p-4 mb-3 ${getStatusStyle()} rounded-2xl shadow-sm overflow-hidden border`}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-4">
          {/* Checkbox / Status Indicator */}
          <View className="relative items-center justify-center">
            {prayer.status === 'completed' ? (
              <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center shadow-md shadow-green-500/30">
                <Ionicons name="checkmark" size={18} color="white" />
              </View>
            ) : prayer.status === 'current' ? (
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center shadow-md shadow-primary/30">
                <Ionicons name="time" size={18} color="white" />
              </View>
            ) : (
              <View className="w-8 h-8 rounded-full border-2 border-gray-300 items-center justify-center">
                <View className="w-3 h-3 rounded-full bg-gray-300" />
              </View>
            )}
          </View>

          {/* Prayer Info */}
          <View>
            <View className="flex-row items-center gap-2">
              <Text className="font-bold text-base text-foreground">{prayer.name}</Text>
              <Text className="text-xs text-muted">{prayer.arabicName}</Text>
            </View>
            <Text className="text-sm text-muted">{prayer.time}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          {getStatusBadge()}
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#9ca3af"
          />
        </View>
      </Pressable>

      {/* Expanded Content */}
      {expanded && (
        <View className="mt-4 pt-4 border-t border-gray-100">
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-xs text-muted">Adhan</Text>
              <Text className="font-medium text-foreground">{prayer.adhanTime}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-muted">Iqamah</Text>
              <Text className="font-medium text-foreground">{prayer.iqamahTime}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center gap-2">
              <Switch
                isSelected={prayer.jamaah}
                onSelectedChange={(value) => onJamaahChange(prayer.id, value)}
                className="w-10 h-6"
              >
                <Switch.Thumb className="w-4 h-4" />
              </Switch>
              <Text className="text-sm text-foreground">Jamaah</Text>
            </View>

            {prayer.status !== 'missed' && prayer.status !== 'upcoming' && (
              <Pressable className="bg-red-50 px-3 py-1 rounded-lg">
                <Text className="text-xs font-medium text-red-500">Mark as Missed</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </Card>
  );
}

export function PrayerChecklist() {
  const [prayerList, setPrayerList] = useState(prayers);

  const handleToggle = (id: string) => {
    setPrayerList(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'completed' ? 'upcoming' : 'completed' as PrayerStatus }
          : p
      )
    );
  };

  const handleJamaahChange = (id: string, value: boolean) => {
    setPrayerList(prev =>
      prev.map(p => p.id === id ? { ...p, jamaah: value } : p)
    );
  };

  return (
    <View>
      {prayerList.map(prayer => (
        <PrayerItem
          key={prayer.id}
          prayer={prayer}
          onToggle={handleToggle}
          onJamaahChange={handleJamaahChange}
        />
      ))}
    </View>
  );
}
