import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';

const PRIMARY = '#22c55e';

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// Simulated daily nutrition data
const generateDailyData = () => {
  const data: Record<number, { calories: number; status: 'good' | 'ok' | 'over' | 'none' }> = {};
  for (let i = 1; i <= 31; i++) {
    if (i <= 25) {
      const cal = 1200 + Math.floor(Math.random() * 1200);
      const status = cal <= 1800 ? 'good' : cal <= 2200 ? 'ok' : 'over';
      data[i] = { calories: cal, status };
    }
  }
  return data;
};

const STATUS_COLORS = {
  good: '#22c55e',
  ok: '#eab308',
  over: '#ef4444',
  none: '#e5e7eb',
};

const STATUS_LABELS = {
  good: 'Baik (≤1800 kkal)',
  ok: 'Cukup (1800-2200 kkal)',
  over: 'Berlebih (>2200 kkal)',
};

export default function NutritionCalendarScreen() {
  const [monthIndex, setMonthIndex] = useState(2); // Maret
  const [year, setYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dailyData] = useState(generateDailyData);

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((i) => i - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((i) => i + 1);
    }
    setSelectedDay(null);
  };

  // Simple calendar grid (starting Monday-ish, simplified)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarCells.push(i);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const selectedData = selectedDay ? dailyData[selectedDay] : null;

  // Monthly summary
  const dayEntries = Object.values(dailyData);
  const avgCalories = dayEntries.length > 0
    ? Math.round(dayEntries.reduce((s, d) => s + d.calories, 0) / dayEntries.length)
    : 0;
  const goodDays = dayEntries.filter((d) => d.status === 'good').length;
  const okDays = dayEntries.filter((d) => d.status === 'ok').length;
  const overDays = dayEntries.filter((d) => d.status === 'over').length;

  return (
    <View style={{ flex: 1, backgroundColor: '#f0fdf4' }}>
      <LinearGradient colors={['#f0fdf4', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Kalender Nutrisi</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {/* Month Navigation */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.navArrow}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="#374151" />
              </TouchableOpacity>
              <Text style={styles.monthText}>{MONTHS[monthIndex]} {year}</Text>
              <TouchableOpacity onPress={handleNextMonth} style={styles.navArrow}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarCard}>
              {/* Day Headers */}
              <View style={styles.dayHeaderRow}>
                {DAYS.map((day, i) => (
                  <Text key={i} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>

              {/* Day Cells */}
              {Array.from({ length: calendarCells.length / 7 }, (_, weekIdx) => (
                <View key={weekIdx} style={styles.weekRow}>
                  {calendarCells.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, cellIdx) => {
                    const data = day ? dailyData[day] : null;
                    const isSelected = day === selectedDay;
                    return (
                      <TouchableOpacity
                        key={cellIdx}
                        onPress={() => day && setSelectedDay(day)}
                        style={[
                          styles.dayCell,
                          isSelected && { borderColor: PRIMARY, borderWidth: 2 },
                        ]}
                        disabled={!day}
                      >
                        {day && (
                          <>
                            <Text style={[styles.dayText, isSelected && { fontWeight: '700' }]}>{day}</Text>
                            <View
                              style={[
                                styles.statusDot,
                                { backgroundColor: data ? STATUS_COLORS[data.status] : STATUS_COLORS.none },
                              ]}
                            />
                          </>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <View key={key} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: STATUS_COLORS[key as keyof typeof STATUS_COLORS] }]} />
                  <Text style={styles.legendText}>{label}</Text>
                </View>
              ))}
            </View>

            {/* Selected Day Detail */}
            {selectedDay && (
              <View style={styles.detailCard}>
                <Text style={styles.detailTitle}>
                  {selectedDay} {MONTHS[monthIndex]} {year}
                </Text>
                {selectedData ? (
                  <>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Kalori</Text>
                      <Text style={[styles.detailValue, { color: STATUS_COLORS[selectedData.status] }]}>
                        {selectedData.calories} kkal
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[selectedData.status] + '20' }]}>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: STATUS_COLORS[selectedData.status] }}>
                          {selectedData.status === 'good' ? '✓ Baik' : selectedData.status === 'ok' ? '~ Cukup' : '⚠ Berlebih'}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <Text style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', paddingVertical: 16 }}>
                    Belum ada data untuk hari ini
                  </Text>
                )}
              </View>
            )}

            {/* Monthly Summary */}
            <View style={styles.summaryCard}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 14 }}>
                Ringkasan Bulan Ini
              </Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: PRIMARY }]}>{avgCalories}</Text>
                  <Text style={styles.summaryLabel}>Rata-rata kkal</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: '#22c55e' }]}>{goodDays}</Text>
                  <Text style={styles.summaryLabel}>Hari baik</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: '#eab308' }]}>{okDays}</Text>
                  <Text style={styles.summaryLabel}>Hari cukup</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: '#ef4444' }]}>{overDays}</Text>
                  <Text style={styles.summaryLabel}>Hari berlebih</Text>
                </View>
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
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  navArrow: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: { fontSize: 18, fontWeight: '700', color: '#111' },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  dayHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    minHeight: 44,
  },
  dayText: { fontSize: 14, color: '#374151' },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 3,
  },
  legendRow: {
    marginTop: 14,
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: { fontSize: 12, color: '#6b7280' },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  detailTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: { fontSize: 14, color: '#6b7280' },
  detailValue: { fontSize: 16, fontWeight: '700' },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryItem: {
    flex: 1,
    minWidth: '40%',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  summaryValue: { fontSize: 22, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: '#9ca3af', marginTop: 4 },
});
