import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// Circular Progress Component
const CircularProgress = ({
  progress,
  size,
  strokeWidth,
  remaining,
  color,
}: {
  progress: number;
  size: number;
  strokeWidth: number;
  remaining: number;
  color: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#6b7280' }}>
          Sisa
        </Text>
        <Text
          style={{
            fontSize: 36,
            fontWeight: '800',
            color: '#111',
            letterSpacing: -1,
          }}
        >
          {remaining}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280' }}>
          kkal
        </Text>
      </View>
    </View>
  );
};

// Macro Bar Component
const MacroBar = ({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) => {
  const percent = (value / max) * 100;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          height: 80,
          width: 24,
          backgroundColor: '#f3f4f6',
          borderRadius: 12,
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: `${percent}%`,
            backgroundColor: color,
            borderRadius: 12,
            minHeight: 8,
          }}
        />
      </View>
      <Text
        style={{ fontSize: 14, fontWeight: '700', color: '#111', marginTop: 8 }}
      >
        {value}g
      </Text>
      <Text style={{ fontSize: 12, color: '#6b7280' }}>{label}</Text>
    </View>
  );
};

// Food Item Component
const FoodItem = ({
  name,
  calories,
  time,
  icon,
  color,
}: {
  name: string;
  calories: number;
  time: string;
  icon: string;
  color: string;
}) => {
  return (
    <View
      style={[
        styles.foodItem,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 12,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: `${color}15`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons name={icon as any} size={20} color={color} />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
            {name}
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af' }}>{time}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
        {calories} kkal
      </Text>
    </View>
  );
};

export default function NutritionScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const [isFasting, setIsFasting] = useState(false);
  const [hydrationGlasses, setHydrationGlasses] = useState(5);

  const MEAL_SLUG: Record<string, string> = {
    Sarapan: 'sarapan',
    'Makan Siang': 'makan-siang',
    'Makan Malam': 'makan-malam',
  };

  const handleAddFood = (mealType: string) => {
    router.push(`/nutrition-actions/add-food?meal=${MEAL_SLUG[mealType] ?? 'sarapan'}` as any);
  };

  const totalCalories = 2000;
  const consumedCalories = 1150;
  const remainingCalories = totalCalories - consumedCalories;
  const progress = (consumedCalories / totalCalories) * 100;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>
                Senin, 25 Maret
              </Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111' }}>
                Nutrisi
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => router.push('/nutrition-actions/calendar' as any)}
                style={[
                  styles.headerButton,
                  { padding: 10, borderRadius: 12, backgroundColor: '#fff' },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/nutrition-actions/analytics' as any)}
                style={[
                  styles.headerButton,
                  { padding: 10, borderRadius: 12, backgroundColor: '#fff' },
                ]}
              >
                <MaterialCommunityIcons
                  name="chart-line"
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Calorie Summary Card */}
            <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
              <View
                style={[
                  styles.calorieCard,
                  { backgroundColor: '#fff', borderRadius: 24, padding: 24 },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left: Circular Progress */}
                  <CircularProgress
                    progress={progress}
                    size={140}
                    strokeWidth={12}
                    remaining={remainingCalories}
                    color={theme.primary}
                  />

                  {/* Right: Macros */}
                  <View style={{ flex: 1, marginLeft: 24 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#111',
                        marginBottom: 16,
                      }}
                    >
                      Makro
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                      <MacroBar
                        label="Karbo"
                        value={120}
                        max={200}
                        color="#3b82f6"
                      />
                      <MacroBar
                        label="Protein"
                        value={65}
                        max={100}
                        color="#22c55e"
                      />
                      <MacroBar
                        label="Lemak"
                        value={40}
                        max={70}
                        color="#f97316"
                      />
                    </View>
                  </View>
                </View>

                {/* Fasting Mode Toggle */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f9fafb',
                    padding: 16,
                    borderRadius: 16,
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#fef3c7',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialCommunityIcons
                        name="timer-sand"
                        size={20}
                        color="#d97706"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#111',
                        }}
                      >
                        Mode Puasa
                      </Text>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>
                        16:8 Intermiten
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={isFasting}
                    onValueChange={setIsFasting}
                    trackColor={{
                      false: '#e5e7eb',
                      true: `${theme.primary}50`,
                    }}
                    thumbColor={isFasting ? theme.primary : '#fff'}
                  />
                </View>
              </View>
            </View>

            {/* Hydration Tracker */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <View
                style={[
                  styles.hydrationCard,
                  { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#eff6ff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cup-water"
                        size={20}
                        color="#3b82f6"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#111',
                        }}
                      >
                        Hidrasi
                      </Text>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>
                        {hydrationGlasses}/8 gelas
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setHydrationGlasses(Math.min(8, hydrationGlasses + 1))
                    }
                    style={{
                      backgroundColor: '#eff6ff',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 999,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={16}
                      color="#3b82f6"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#3b82f6',
                      }}
                    >
                      Tambah
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Glass indicators */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    justifyContent: 'space-between',
                  }}
                >
                  {[...Array(8)].map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setHydrationGlasses(index + 1)}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor:
                          index < hydrationGlasses ? '#3b82f6' : '#e5e7eb',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 4,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cup"
                        size={18}
                        color={index < hydrationGlasses ? '#fff' : '#9ca3af'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Meal Sections */}
            {/* Breakfast */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialCommunityIcons
                    name="weather-sunny"
                    size={20}
                    color={theme.primary}
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#111' }}
                  >
                    Sarapan
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}
                >
                  450 kkal
                </Text>
              </View>

              <View
                style={[
                  styles.mealCard,
                  { backgroundColor: '#fff', borderRadius: 20, padding: 16 },
                ]}
              >
                <FoodItem
                  name="Oatmeal dengan Madu"
                  calories={280}
                  time="07:30"
                  icon="bowl-mix"
                  color={theme.primary}
                />
                <View style={{ height: 8 }} />
                <FoodItem
                  name="Smoothie Hijau"
                  calories={170}
                  time="08:00"
                  icon="glass-cocktail"
                  color="#22c55e"
                />

                <TouchableOpacity
                  onPress={() => handleAddFood('Sarapan')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    marginTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#f3f4f6',
                    gap: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={20}
                    color={theme.primary}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: theme.primary,
                    }}
                  >
                    Tambah Makanan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Lunch */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={20}
                    color="#f97316"
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#111' }}
                  >
                    Makan Siang
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}
                >
                  520 kkal
                </Text>
              </View>

              <View
                style={[
                  styles.mealCard,
                  { backgroundColor: '#fff', borderRadius: 20, padding: 16 },
                ]}
              >
                <FoodItem
                  name="Salad Ayam Panggang"
                  calories={350}
                  time="12:30"
                  icon="food-drumstick"
                  color="#f97316"
                />
                <View style={{ height: 8 }} />
                <FoodItem
                  name="Jus Jeruk Segar"
                  calories={170}
                  time="12:45"
                  icon="fruit-citrus"
                  color="#fb923c"
                />

                <TouchableOpacity
                  onPress={() => handleAddFood('Makan Siang')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    marginTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#f3f4f6',
                    gap: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={20}
                    color={theme.primary}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: theme.primary,
                    }}
                  >
                    Tambah Makanan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dinner */}
            <View
              style={{ paddingHorizontal: 24, marginTop: 24, marginBottom: 24 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <MaterialCommunityIcons
                    name="weather-night"
                    size={20}
                    color="#6366f1"
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#111' }}
                  >
                    Makan Malam
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}
                >
                  180 kkal
                </Text>
              </View>

              <View
                style={[
                  styles.mealCard,
                  { backgroundColor: '#fff', borderRadius: 20, padding: 16 },
                ]}
              >
                <FoodItem
                  name="Sup Sayuran"
                  calories={180}
                  time="19:00"
                  icon="pot-steam"
                  color="#6366f1"
                />

                <TouchableOpacity
                  onPress={() => handleAddFood('Makan Malam')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    marginTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#f3f4f6',
                    gap: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={20}
                    color={theme.primary}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: theme.primary,
                    }}
                  >
                    Tambah Makanan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Add Button */}
            <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
              <TouchableOpacity
                onPress={() => router.push('/nutrition-actions/scan-barcode' as any)}
                style={[
                  styles.quickAddButton,
                  {
                    backgroundColor: theme.primary,
                    borderRadius: 16,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  color="#fff"
                />
                <Text
                  style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}
                >
                  Pindai Barcode untuk Menambah
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <ThemeSwitcher />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  calorieCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  hydrationCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  mealCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  foodItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  quickAddButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});
