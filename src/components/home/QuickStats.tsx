import { View, Text } from 'react-native';
import { Card } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';

type StatCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  bgColor: string;
  label: string;
  value: string | number;
  suffix?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
};

function StatCard({ icon, iconColor, bgColor, label, value, suffix, trend, trendValue }: StatCardProps) {
  return (
    <Card className={`flex-1 p-4 ${bgColor} shadow-sm relative overflow-hidden`}>
      {/* Background Decoration */}
      <View className="absolute right-[-10px] bottom-[-10px] opacity-10">
        <Ionicons name={icon} size={80} color={iconColor} />
      </View>

      <View className="relative z-10">
        <View className={`w-10 h-10 rounded-full items-center justify-center mb-2`}
          style={{ backgroundColor: `${iconColor}20` }}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text className="text-xs text-muted font-medium">{label}</Text>
        <View className="flex-row items-baseline gap-1">
          <Text className="text-xl font-bold text-foreground">{value}</Text>
          {suffix && <Text className="text-sm text-muted">{suffix}</Text>}
        </View>
        {trend && trendValue && (
          <View className="flex-row items-center gap-1 mt-1">
            <Ionicons
              name={trend === 'up' ? 'trending-up' : 'trending-down'}
              size={12}
              color={trend === 'up' ? '#16a34a' : '#dc2626'}
            />
            <Text className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
}

export function QuickStats() {
  return (
    <View className="gap-4">
      {/* Row 1 */}
      <View className="flex-row gap-4">
        <StatCard
          icon="moon"
          iconColor="#16a34a"
          bgColor="bg-green-50"
          label="Sholat"
          value="4/5"
          trend="up"
          trendValue="+1 from yesterday"
        />
        <StatCard
          icon="wallet"
          iconColor="#f48c25"
          bgColor="bg-orange-50"
          label="Spending"
          value="Rp 250K"
          trend="down"
          trendValue="-15% vs avg"
        />
      </View>

      {/* Row 2 */}
      <View className="flex-row gap-4">
        <StatCard
          icon="flame"
          iconColor="#dc2626"
          bgColor="bg-red-50"
          label="Calories"
          value={1150}
          suffix="kcal"
        />
        <StatCard
          icon="time"
          iconColor="#2563eb"
          bgColor="bg-blue-50"
          label="Focus Time"
          value="4.5"
          suffix="hrs"
          trend="up"
          trendValue="+30 min"
        />
      </View>
    </View>
  );
}
