import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ProgressRing, ScreenHeader, HeaderIconButton, LoadingScreen } from '@/components/ui';
import { getDailyNutrition, removeMeal } from '@/services';
import { getTodayString, formatDate } from '@/lib/utils';
import { TEXT } from '@/config/colors';
import type { DailyNutrition, Meal, MealType } from '@/types';

// ─── Accent palette ──────────────────────────
const GREEN = '#22c55e';
const BLUE = '#3b82f6';
const ORANGE = '#f97316';
const INDIGO = '#6366f1';
const PURPLE = '#a855f7';

// ─── Macro Horizontal Bar ────────────────────
const MacroRow = ({
  label,
  value,
  max,
  color,
  icon,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: `${color}18`, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name={icon as any} size={13} color={color} />
          </View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: TEXT.primary }}>{label}</Text>
        </View>
        <Text style={{ fontSize: 13, fontWeight: '700', color }}>
          {value}g <Text style={{ fontWeight: '400', color: '#9ca3af' }}>/ {max}g</Text>
        </Text>
      </View>
      <View style={{ height: 6, borderRadius: 3, backgroundColor: `${color}15`, overflow: 'hidden' }}>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: color, width: `${pct}%` } as any} />
      </View>
    </View>
  );
};

// ─── Meal Food Row ──────────────────────────
const FoodRow = ({
  meal,
  color,
  onRemove,
}: {
  meal: Meal;
  color: string;
  onRemove: () => void;
}) => (
  <View style={s.foodRow}>
    <View style={[s.foodRowIcon, { backgroundColor: `${color}12` }]}>
      <MaterialCommunityIcons name="food" size={18} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={s.foodRowName} numberOfLines={1}>{meal.name}</Text>
      <Text style={s.foodRowTime}>{meal.time}</Text>
    </View>
    <View style={{ alignItems: 'flex-end', marginRight: 8 }}>
      <Text style={[s.foodRowCal, { color }]}>{meal.calories}</Text>
      <Text style={{ fontSize: 10, color: '#b0b0b0' }}>kkal</Text>
    </View>
    <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <MaterialCommunityIcons name="close-circle" size={18} color="#d1d5db" />
    </TouchableOpacity>
  </View>
);

// ─── Meal Section Card ──────────────────────
const MealSection = ({
  label,
  icon,
  color,
  meals,
  calories,
  onAdd,
  onRemove,
}: {
  label: string;
  icon: string;
  color: string;
  meals: Meal[];
  calories: number;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) => (
  <View style={s.mealSection}>
    {/* Section header */}
    <View style={s.mealSectionHeader}>
      <View style={[s.mealSectionIconBg, { backgroundColor: `${color}14` }]}>
        <MaterialCommunityIcons name={icon as any} size={18} color={color} />
      </View>
      <Text style={s.mealSectionTitle}>{label}</Text>
      <View style={{ flex: 1 }} />
      <Text style={[s.mealSectionCal, { color }]}>{calories} kkal</Text>
    </View>

    {/* Food items */}
    {meals.length > 0 ? (
      meals.map((m) => (
        <FoodRow key={m.id} meal={m} color={color} onRemove={() => onRemove(m.id)} />
      ))
    ) : (
      <View style={s.emptyMeal}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#d1d5db" />
        <Text style={s.emptyMealText}>Belum ada makanan</Text>
      </View>
    )}

    {/* Add button */}
    <TouchableOpacity onPress={onAdd} style={s.addMealBtn} activeOpacity={0.7}>
      <LinearGradient colors={[`${color}10`, `${color}06`]} style={s.addMealBtnBg}>
        <MaterialCommunityIcons name="plus" size={18} color={color} />
        <Text style={[s.addMealBtnText, { color }]}>Tambah {label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

// ═══════════════════════════════════════════
// MAIN SCREEN
// ═══════════════════════════════════════════
export default function NutritionScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const [isFasting, setIsFasting] = useState(false);
  const [hydration, setHydration] = useState(5);
  const [nutrition, setNutrition] = useState<DailyNutrition | null>(null);
  const [loading, setLoading] = useState(true);
  const today = getTodayString();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const loadNutrition = useCallback(async () => {
    const data = await getDailyNutrition(today);
    setNutrition(data);
    setLoading(false);
  }, [today]);

  useEffect(() => { loadNutrition(); }, [loadNutrition]);
  useEffect(() => () => { loadNutrition(); }, [loadNutrition]);

  const handleRemoveMeal = useCallback(async (id: string) => {
    const updated = await removeMeal(today, id);
    setNutrition(updated);
  }, [today]);

  // Hydration pulse animation when target reached
  useEffect(() => {
    if (hydration >= 8) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [hydration, pulseAnim]);

  const MEAL_SLUG: Record<string, string> = {
    Sarapan: 'sarapan',
    'Makan Siang': 'makan-siang',
    'Makan Malam': 'makan-malam',
    Snack: 'sarapan',
  };
  const handleAddFood = (type: string) =>
    router.push(`/nutrition-actions/add-food?meal=${MEAL_SLUG[type] ?? 'sarapan'}` as any);

  const goal = nutrition?.goal ?? 2000;
  const consumed = nutrition?.totalCalories ?? 0;
  const remaining = Math.max(0, goal - consumed);
  const pct = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;

  const mealsByType = (t: MealType) => nutrition?.meals.filter((m) => m.type === t) ?? [];
  const mealCal = (t: MealType) => mealsByType(t).reduce((sum, m) => sum + m.calories, 0);

  const todayLabel = formatDate(new Date()).split(',').slice(0, 1).join('');

  if (loading) return <LoadingScreen color={theme.primary} />;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={theme.gradient as [string, string, string]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <ScreenHeader
            title="Nutrisi"
            subtitle={todayLabel}
            right={
              <>
                <HeaderIconButton icon="calendar-month" onPress={() => router.push('/nutrition-actions/calendar' as any)} />
                <HeaderIconButton icon="chart-line" onPress={() => router.push('/nutrition-actions/analytics' as any)} />
              </>
            }
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {/* ── Hero calorie card ────────────────── */}
            <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
              <View style={s.heroCard}>
                <LinearGradient
                  colors={[GREEN, '#16a34a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.heroGradient}
                >
                  {/* top row */}
                  <View style={s.heroTopRow}>
                    <View>
                      <Text style={s.heroLabel}>Sisa Kalori</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={s.heroValue}>{remaining}</Text>
                        <Text style={s.heroUnit}> kkal</Text>
                      </View>
                    </View>
                    <ProgressRing
                      progress={pct}
                      size={72}
                      strokeWidth={7}
                      color="#fff"
                      trackOpacity="30"
                    >
                      <Text style={{ fontSize: 16, fontWeight: '800', color: '#fff' }}>{Math.round(pct)}%</Text>
                    </ProgressRing>
                  </View>

                  {/* mini summary */}
                  <View style={s.heroSummaryRow}>
                    {[
                      { l: 'Target', v: goal },
                      { l: 'Dikonsumsi', v: consumed },
                      { l: 'Sisa', v: remaining },
                    ].map((item) => (
                      <View key={item.l} style={s.heroSummaryItem}>
                        <Text style={s.heroSummaryLabel}>{item.l}</Text>
                        <Text style={s.heroSummaryValue}>{item.v}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* ── Macros card ─────────────────────── */}
            <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <View style={s.card}>
                <Text style={s.cardTitle}>Makronutrien</Text>
                <MacroRow label="Karbohidrat" value={120} max={200} color={BLUE} icon="barley" />
                <MacroRow label="Protein" value={65} max={100} color={GREEN} icon="food-steak" />
                <MacroRow label="Lemak" value={40} max={70} color={ORANGE} icon="water" />
              </View>
            </View>

            {/* ── Hydration tracker ───────────────── */}
            <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <View style={s.card}>
                <View style={s.hydrationHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Animated.View style={[s.hydrationIconBg, { transform: [{ scale: pulseAnim }] }]}>
                      <MaterialCommunityIcons name="cup-water" size={18} color={BLUE} />
                    </Animated.View>
                    <View>
                      <Text style={s.cardTitle}>Hidrasi</Text>
                      <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: -2 }}>
                        {hydration}/8 gelas — {hydration >= 8 ? 'Tercapai!' : `${8 - hydration} lagi`}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setHydration(Math.min(8, hydration + 1))}
                    style={s.hydrationAddBtn}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons name="plus" size={18} color={BLUE} />
                  </TouchableOpacity>
                </View>

                <View style={s.glassRow}>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const filled = i < hydration;
                    return (
                      <TouchableOpacity key={i} onPress={() => setHydration(i + 1)} style={{ flex: 1 }}>
                        <LinearGradient
                          colors={filled ? [BLUE, '#2563eb'] : ['#f3f4f6', '#e5e7eb']}
                          style={s.glassItem}
                        >
                          <MaterialCommunityIcons
                            name={filled ? 'cup-water' : 'cup-outline'}
                            size={16}
                            color={filled ? '#fff' : '#c0c0c0'}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* ── Fasting toggle ──────────────────── */}
            <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <View style={[s.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: '#fef3c7', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="timer-sand" size={18} color="#d97706" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: TEXT.primary }}>Mode Puasa</Text>
                    <Text style={{ fontSize: 12, color: '#9ca3af' }}>16:8 Intermiten</Text>
                  </View>
                </View>
                <Switch
                  value={isFasting}
                  onValueChange={setIsFasting}
                  trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                  thumbColor={isFasting ? '#f59e0b' : '#fff'}
                />
              </View>
            </View>

            {/* ── Meal sections ──────────────────── */}
            {([
              { type: 'Sarapan' as MealType, icon: 'weather-sunny', color: GREEN, label: 'Sarapan' },
              { type: 'Makan Siang' as MealType, icon: 'white-balance-sunny', color: ORANGE, label: 'Makan Siang' },
              { type: 'Makan Malam' as MealType, icon: 'weather-night', color: INDIGO, label: 'Makan Malam' },
              { type: 'Snack' as MealType, icon: 'cookie', color: PURPLE, label: 'Snack' },
            ]).map((sec) => (
              <View key={sec.type} style={{ paddingHorizontal: 20, marginTop: 16 }}>
                <MealSection
                  label={sec.label}
                  icon={sec.icon}
                  color={sec.color}
                  meals={mealsByType(sec.type)}
                  calories={mealCal(sec.type)}
                  onAdd={() => handleAddFood(sec.label)}
                  onRemove={handleRemoveMeal}
                />
              </View>
            ))}

            {/* ── Scan barcode banner ──────────────── */}
            <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 8 }}>
              <TouchableOpacity
                onPress={() => router.push('/nutrition-actions/scan-barcode' as any)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[GREEN, '#15803d']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={s.scanBanner}
                >
                  <View style={s.scanBannerIcon}>
                    <MaterialCommunityIcons name="barcode-scan" size={22} color={GREEN} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.scanBannerTitle}>Pindai Barcode</Text>
                    <Text style={s.scanBannerSub}>Tambah makanan kemasan secara cepat</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.6)" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <ThemeSwitcher />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

// ═══════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════
const s = StyleSheet.create({
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  heroGradient: {
    padding: 24,
    borderRadius: 24,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  heroValue: {
    fontSize: 44,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  heroUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },
  heroSummaryRow: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 14,
    gap: 1,
  },
  heroSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroSummaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  heroSummaryValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT.primary,
    marginBottom: 14,
  },
  hydrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  hydrationIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hydrationAddBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassRow: {
    flexDirection: 'row',
    gap: 6,
  },
  glassItem: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  mealSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  mealSectionIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT.primary,
  },
  mealSectionCal: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyMeal: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyMealText: {
    fontSize: 13,
    color: '#c0c0c0',
  },
  addMealBtn: {
    marginTop: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  addMealBtnBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderRadius: 12,
  },
  addMealBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  foodRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodRowName: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT.primary,
  },
  foodRowTime: {
    fontSize: 11,
    color: '#b0b0b0',
    marginTop: 1,
  },
  foodRowCal: {
    fontSize: 15,
    fontWeight: '800',
  },
  scanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 18,
    gap: 14,
  },
  scanBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  scanBannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 1,
  },
});
