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
const PRIMARY = '#6366f1';
const BAR_MAX_HEIGHT = 100;

const PERIODS = ['Minggu Ini', 'Bulan Ini', '3 Bulan'];

const WEEKLY_DATA = [
  { day: 'Sen', hours: 6.5, tasks: 5 },
  { day: 'Sel', hours: 7.2, tasks: 6 },
  { day: 'Rab', hours: 5.8, tasks: 4 },
  { day: 'Kam', hours: 8.0, tasks: 7 },
  { day: 'Jum', hours: 4.5, tasks: 3 },
  { day: 'Sab', hours: 3.0, tasks: 2 },
  { day: 'Min', hours: 1.5, tasks: 1 },
];

const PROJECT_STATS = [
  { name: 'HabitTracker', hours: 18.5, tasks: 12, color: PRIMARY },
  { name: 'Freelance', hours: 8.0, tasks: 6, color: '#f97316' },
  { name: 'Personal', hours: 5.2, tasks: 4, color: '#22c55e' },
  { name: 'Belajar', hours: 4.8, tasks: 6, color: '#ec4899' },
];

const ACHIEVEMENTS = [
  { icon: 'fire', label: 'Streak 7 Hari', description: 'Kerja 7 hari berturut-turut', color: '#f97316', unlocked: true },
  { icon: 'clock-fast', label: 'Speed Worker', description: '5+ tugas selesai dalam sehari', color: PRIMARY, unlocked: true },
  { icon: 'trophy', label: 'Produktif Max', description: '8+ jam kerja dalam sehari', color: '#eab308', unlocked: true },
  { icon: 'target', label: 'Target Master', description: 'Capai target mingguan 4x berturut', color: '#22c55e', unlocked: false },
];

export default function WorkAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const totalHours = WEEKLY_DATA.reduce((s, d) => s + d.hours, 0);
  const totalTasks = WEEKLY_DATA.reduce((s, d) => s + d.tasks, 0);
  const avgHours = totalHours / WEEKLY_DATA.length;
  const maxHours = Math.max(...WEEKLY_DATA.map((d) => d.hours));

  return (
    <View style={{ flex: 1, backgroundColor: '#eef2ff' }}>
      <LinearGradient colors={['#eef2ff', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Analitik Kerja</Text>
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
            {/* Summary Cards */}
            <View style={styles.summaryRow}>
              <View style={[styles.summaryCard, { backgroundColor: PRIMARY + '10' }]}>
                <MaterialCommunityIcons name="clock-outline" size={22} color={PRIMARY} />
                <Text style={[styles.summaryValue, { color: PRIMARY }]}>{totalHours.toFixed(1)}</Text>
                <Text style={styles.summaryLabel}>Total Jam</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#22c55e10' }]}>
                <MaterialCommunityIcons name="check-circle-outline" size={22} color="#22c55e" />
                <Text style={[styles.summaryValue, { color: '#22c55e' }]}>{totalTasks}</Text>
                <Text style={styles.summaryLabel}>Tugas Selesai</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#f9731610' }]}>
                <MaterialCommunityIcons name="trending-up" size={22} color="#f97316" />
                <Text style={[styles.summaryValue, { color: '#f97316' }]}>{avgHours.toFixed(1)}</Text>
                <Text style={styles.summaryLabel}>Rata-rata/Hari</Text>
              </View>
            </View>

            {/* Bar Chart */}
            <View style={styles.chartCard}>
              <Text style={styles.sectionTitle}>Jam Kerja Harian</Text>
              <View style={styles.barsRow}>
                {WEEKLY_DATA.map((item, i) => {
                  const barHeight = (item.hours / maxHours) * BAR_MAX_HEIGHT;
                  return (
                    <View key={i} style={styles.barWrapper}>
                      <Text style={styles.barValue}>{item.hours}</Text>
                      <View style={[styles.bar, { height: barHeight, backgroundColor: PRIMARY }]} />
                      <Text style={styles.barLabel}>{item.day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Project Breakdown */}
            <View style={styles.chartCard}>
              <Text style={styles.sectionTitle}>Per Project</Text>
              {PROJECT_STATS.map((project) => {
                const progress = project.hours / totalHours;
                return (
                  <View key={project.name} style={styles.projectRow}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={[styles.dot, { backgroundColor: project.color }]} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{project.name}</Text>
                      </View>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>
                        {project.hours}h • {project.tasks} tugas
                      </Text>
                    </View>
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: project.color }]} />
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Achievements */}
            <View style={styles.chartCard}>
              <Text style={styles.sectionTitle}>Pencapaian</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {ACHIEVEMENTS.map((ach, i) => (
                  <View
                    key={i}
                    style={[
                      styles.achievementCard,
                      !ach.unlocked && { opacity: 0.4 },
                    ]}
                  >
                    <View style={[styles.achievementIcon, { backgroundColor: ach.color + '15' }]}>
                      <MaterialCommunityIcons name={ach.icon as any} size={22} color={ach.color} />
                    </View>
                    <Text style={styles.achievementLabel}>{ach.label}</Text>
                    <Text style={styles.achievementDesc}>{ach.description}</Text>
                    {!ach.unlocked && (
                      <MaterialCommunityIcons name="lock" size={14} color="#9ca3af" style={{ marginTop: 4 }} />
                    )}
                  </View>
                ))}
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
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    gap: 4,
  },
  summaryValue: { fontSize: 20, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: '#9ca3af' },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 14 },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_MAX_HEIGHT + 40,
    paddingTop: 20,
  },
  barWrapper: { flex: 1, alignItems: 'center', gap: 4 },
  barValue: { fontSize: 10, color: '#9ca3af' },
  bar: { width: 24, borderRadius: 6 },
  barLabel: { fontSize: 12, color: '#6b7280', fontWeight: '500' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  projectRow: { marginBottom: 14 },
  progressBg: { height: 6, backgroundColor: '#f3f4f6', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  achievementCard: {
    width: '47%',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementLabel: { fontSize: 13, fontWeight: '700', color: '#111' },
  achievementDesc: { fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 2 },
});
