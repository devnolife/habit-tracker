import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY = '#22c55e';

const PERIODS = ['Minggu Ini', 'Bulan Ini', '3 Bulan'];

const WEEKLY_DATA = [
  { day: 'Sen', calories: 1650, target: 2000 },
  { day: 'Sel', calories: 2100, target: 2000 },
  { day: 'Rab', calories: 1800, target: 2000 },
  { day: 'Kam', calories: 1950, target: 2000 },
  { day: 'Jum', calories: 2300, target: 2000 },
  { day: 'Sab', calories: 1700, target: 2000 },
  { day: 'Min', calories: 1500, target: 2000 },
];

const MACRO_DATA = {
  carbs: { current: 245, target: 300, color: '#eab308', label: 'Karbohidrat' },
  protein: { current: 85, target: 100, color: PRIMARY, label: 'Protein' },
  fat: { current: 62, target: 65, color: '#f97316', label: 'Lemak' },
  fiber: { current: 18, target: 25, color: '#8b5cf6', label: 'Serat' },
};

const INSIGHTS = [
  { icon: 'trending-up', text: 'Asupan kalori 8% lebih rendah dari minggu lalu', color: PRIMARY },
  { icon: 'water', text: 'Hidrasi rata-rata 6 gelas/hari — tingkatkan ke 8', color: '#3b82f6' },
  { icon: 'food-apple', text: 'Konsumsi buah meningkat 15% — pertahankan!', color: '#22c55e' },
  { icon: 'alert-circle', text: 'Asupan gula melebihi batas 2 hari minggu ini', color: '#ef4444' },
];

const BAR_MAX_HEIGHT = 120;

export default function NutritionAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const maxCalories = Math.max(...WEEKLY_DATA.map((d) => d.calories));

  return (
    <View style={{ flex: 1, backgroundColor: '#f0fdf4' }}>
      <LinearGradient colors={['#f0fdf4', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Analisis Nutrisi</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Period Selector */}
          <View style={styles.periodRow}>
            {PERIODS.map((period, i) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(i)}
                style={[styles.periodChip, selectedPeriod === i && { backgroundColor: PRIMARY }]}
              >
                <Text style={[styles.periodText, selectedPeriod === i && { color: '#fff' }]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {/* Calorie Chart */}
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Kalori Harian</Text>
              <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>
                Target: 2.000 kkal/hari
              </Text>

              {/* Bar Chart */}
              <View style={styles.chartArea}>
                {/* Target line */}
                <View style={styles.targetLine}>
                  <Text style={{ fontSize: 10, color: '#9ca3af' }}>2000</Text>
                  <View style={styles.targetDash} />
                </View>

                <View style={styles.barsRow}>
                  {WEEKLY_DATA.map((item, i) => {
                    const barHeight = (item.calories / maxCalories) * BAR_MAX_HEIGHT;
                    const isOver = item.calories > item.target;
                    return (
                      <View key={i} style={styles.barWrapper}>
                        <Text style={styles.barValue}>{item.calories}</Text>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: barHeight,
                              backgroundColor: isOver ? '#ef4444' : PRIMARY,
                              opacity: 0.85,
                            },
                          ]}
                        />
                        <Text style={styles.barLabel}>{item.day}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Average */}
              <View style={styles.avgRow}>
                <Text style={{ fontSize: 13, color: '#6b7280' }}>Rata-rata</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>
                  {Math.round(WEEKLY_DATA.reduce((s, d) => s + d.calories, 0) / WEEKLY_DATA.length)} kkal
                </Text>
              </View>
            </View>

            {/* Macro Breakdown */}
            <View style={styles.macroCard}>
              <Text style={styles.chartTitle}>Distribusi Makro</Text>
              <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Rata-rata harian (gram)</Text>

              {Object.values(MACRO_DATA).map((macro) => {
                const progress = Math.min(macro.current / macro.target, 1);
                return (
                  <View key={macro.label} style={styles.macroRow}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{macro.label}</Text>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>
                        {macro.current}g / {macro.target}g
                      </Text>
                    </View>
                    <View style={styles.macroBarBg}>
                      <View
                        style={[
                          styles.macroBarFill,
                          { width: `${progress * 100}%`, backgroundColor: macro.color },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Insights */}
            <View style={styles.insightsCard}>
              <Text style={styles.chartTitle}>Insights</Text>
              {INSIGHTS.map((insight, i) => (
                <View key={i} style={styles.insightRow}>
                  <View style={[styles.insightIcon, { backgroundColor: insight.color + '15' }]}>
                    <MaterialCommunityIcons name={insight.icon as any} size={18} color={insight.color} />
                  </View>
                  <Text style={styles.insightText}>{insight.text}</Text>
                </View>
              ))}
            </View>

            {/* Weight Trend Placeholder */}
            <View style={styles.weightCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <MaterialCommunityIcons name="scale-bathroom" size={22} color={PRIMARY} />
                <Text style={styles.chartTitle}>Trend Berat Badan</Text>
              </View>

              <View style={styles.weightStats}>
                <View style={styles.weightStat}>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>Saat Ini</Text>
                  <Text style={{ fontSize: 22, fontWeight: '800', color: '#111' }}>68.5</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>kg</Text>
                </View>
                <View style={styles.weightStat}>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>Target</Text>
                  <Text style={{ fontSize: 22, fontWeight: '800', color: PRIMARY }}>65.0</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>kg</Text>
                </View>
                <View style={styles.weightStat}>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>Sisa</Text>
                  <Text style={{ fontSize: 22, fontWeight: '800', color: '#f97316' }}>3.5</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>kg</Text>
                </View>
              </View>

              <View style={styles.trendBar}>
                <View style={[styles.trendFill, { width: '50%' }]} />
                <View style={styles.trendMarker} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                <Text style={{ fontSize: 11, color: '#9ca3af' }}>72 kg (mulai)</Text>
                <Text style={{ fontSize: 11, color: '#9ca3af' }}>65 kg (target)</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
  periodRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  periodChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  periodText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  chartArea: {
    position: 'relative',
  },
  targetLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    position: 'absolute',
    top: BAR_MAX_HEIGHT * (1 - 2000 / 2300) + 18,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  targetDash: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_MAX_HEIGHT + 40,
    paddingTop: 20,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barValue: { fontSize: 10, color: '#9ca3af' },
  bar: {
    width: 24,
    borderRadius: 6,
  },
  barLabel: { fontSize: 12, color: '#6b7280', fontWeight: '500' },
  avgRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  macroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  macroRow: {
    marginBottom: 14,
  },
  macroBarBg: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: 8,
    borderRadius: 4,
  },
  insightsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  insightIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightText: { fontSize: 13, color: '#374151', flex: 1, lineHeight: 18 },
  weightCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  weightStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weightStat: {
    alignItems: 'center',
  },
  trendBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'visible',
    position: 'relative',
  },
  trendFill: {
    height: 8,
    backgroundColor: PRIMARY,
    borderRadius: 4,
  },
  trendMarker: {
    position: 'absolute',
    top: -4,
    left: '50%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
