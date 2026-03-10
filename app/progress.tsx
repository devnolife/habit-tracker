import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const PRIMARY = '#2563EB';

// Category Bar Component
const CategoryBar = ({
  icon,
  label,
  color,
  percentage,
}: {
  icon: string;
  label: string;
  color: string;
  percentage: number;
}) => (
  <View style={{ flex: 1, alignItems: 'center', gap: 12 }}>
    <View
      style={{
        width: '100%',
        height: 192,
        backgroundColor: '#f3f4f6',
        borderRadius: 999,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <LinearGradient
        colors={[color, `${color}99`]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: `${percentage}%`,
          borderRadius: 999,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>
          {percentage}%
        </Text>
      </View>
    </View>
    <View style={{ alignItems: 'center', gap: 4 }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: `${color}20`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons name={icon as any} size={18} color={color} />
      </View>
      <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280' }}>
        {label}
      </Text>
    </View>
  </View>
);

// Metric Card Component
const MetricCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  subtitle,
  badge,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  subtitle?: string;
  badge?: { text: string; color: string; bg: string };
}) => (
  <View
    style={[
      styles.metricCard,
      { flex: 1, backgroundColor: '#fff', borderRadius: 24, padding: 16 },
    ]}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={iconColor}
        />
      </View>
      {badge && (
        <View
          style={{
            backgroundColor: badge.bg,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '700', color: badge.color }}>
            {badge.text}
          </Text>
        </View>
      )}
    </View>
    <Text
      style={{
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
        marginBottom: 4,
      }}
    >
      {label}
    </Text>
    <Text style={{ fontSize: 20, fontWeight: '700', color: '#181411' }}>
      {value}
    </Text>
    {subtitle && (
      <Text style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
        {subtitle}
      </Text>
    )}
  </View>
);

// Heatmap Component
const HeatmapBar = ({
  intensity,
  isToday,
}: {
  intensity: number;
  isToday?: boolean;
}) => (
  <View
    style={{
      width: 12,
      height: 32,
      borderRadius: 999,
      backgroundColor: `rgba(244,140,37,${intensity / 100})`,
      ...(isToday
        ? { borderWidth: 2, borderColor: 'rgba(244,140,37,0.3)' }
        : {}),
    }}
  />
);

export default function ProgressScreen() {
  const router = useRouter();
  const [selectedRange, setSelectedRange] = useState('This Week');

  const ranges = ['Minggu Ini', 'Minggu Lalu', 'Bulan'];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#f8f7f5', '#f0f9ff80', '#f0fdf480']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View
            style={[
              styles.header,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6',
              },
            ]}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#181411',
                  letterSpacing: -0.5,
                }}
              >
                Progres & Wawasan
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: '500', color: '#6b7280' }}
              >
                Terus semangat!
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <TouchableOpacity
                onPress={() => Alert.alert('Notifikasi', 'Belum ada notifikasi baru.')}
                style={[
                  styles.headerButton,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'rgba(244,140,37,0.1)',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'rgba(244,140,37,0.2)',
                }}
              >
                <MaterialCommunityIcons
                  name="trophy"
                  size={20}
                  color={PRIMARY}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: PRIMARY }}
                >
                  Lvl 12
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          >
            {/* Date Range Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 24 }}
              contentContainerStyle={{ gap: 8 }}
            >
              {ranges.map((range) => (
                <TouchableOpacity
                  key={range}
                  onPress={() => setSelectedRange(range)}
                  style={[
                    styles.rangeChip,
                    {
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 999,
                      backgroundColor:
                        selectedRange === range ? PRIMARY : '#fff',
                      borderWidth: selectedRange === range ? 0 : 1,
                      borderColor: '#e5e7eb',
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: selectedRange === range ? '700' : '500',
                      color: selectedRange === range ? '#fff' : '#6b7280',
                    }}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => Alert.alert('Pilih Rentang', 'Pilih rentang tanggal kustom:', [
                  { text: 'Minggu Ini', onPress: () => setSelectedRange('Mingguan') },
                  { text: 'Bulan Ini', onPress: () => setSelectedRange('Bulanan') },
                  { text: '3 Bulan Terakhir', onPress: () => setSelectedRange('3 Bulan') },
                  { text: 'Batal', style: 'cancel' },
                ])}
                style={[
                  styles.rangeChip,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </ScrollView>

            {/* Total Score Hero */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 24,
                position: 'relative',
              }}
            >
              {/* Glow Effect */}
              <View
                style={{
                  position: 'absolute',
                  width: 128,
                  height: 128,
                  borderRadius: 64,
                  backgroundColor: 'rgba(244,140,37,0.2)',
                  top: -32,
                }}
              />
              <View
                style={{
                  backgroundColor: 'rgba(244,140,37,0.1)',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 999,
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: PRIMARY,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Skor Total
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: '800',
                  color: '#181411',
                  letterSpacing: -2,
                }}
              >
                842
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <MaterialCommunityIcons
                  name="trending-up"
                  size={18}
                  color="#22c55e"
                />
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}
                >
                  +124 poin dari minggu lalu
                </Text>
              </View>
            </View>

            {/* Category Breakdown */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: '#fff',
                  borderRadius: 24,
                  padding: 24,
                  marginBottom: 24,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}
                >
                  Rincian Kategori
                </Text>
                <TouchableOpacity onPress={() => Alert.alert('Kategori', 'Pilih kategori:', [
                  { text: 'Semua Kategori', onPress: () => {} },
                  { text: 'Ibadah', onPress: () => {} },
                  { text: 'Kerja', onPress: () => {} },
                  { text: 'Nutrisi', onPress: () => {} },
                  { text: 'Keuangan', onPress: () => {} },
                  { text: 'Batal', style: 'cancel' },
                ])}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={24}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <CategoryBar
                  icon="mosque"
                  label="Sholat"
                  color="#10b981"
                  percentage={48}
                />
                <CategoryBar
                  icon="briefcase"
                  label="Kerja"
                  color="#3b82f6"
                  percentage={35}
                />
                <CategoryBar
                  icon="wallet"
                  label="Pengeluaran"
                  color="#ef4444"
                  percentage={28}
                />
                <CategoryBar
                  icon="silverware-fork-knife"
                  label="Makanan"
                  color="#84cc16"
                  percentage={42}
                />
              </View>
            </View>

            {/* Detailed Metrics Grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 24,
              }}
            >
              <MetricCard
                icon="mosque"
                iconBg="rgba(16,185,129,0.1)"
                iconColor="#10b981"
                label="Streak Sholat"
                value="14 Hari"
                subtitle="92% Sholat tepat waktu"
                badge={{ text: 'Tinggi', color: '#16a34a', bg: '#f0fdf4' }}
              />
              <MetricCard
                icon="timer"
                iconBg="rgba(59,130,246,0.1)"
                iconColor="#3b82f6"
                label="Skor Fokus"
                value="6.5/10"
                subtitle="32 Tugas selesai"
                badge={{ text: 'Cukup', color: '#f97316', bg: '#fff7ed' }}
              />
              <MetricCard
                icon="piggy-bank"
                iconBg="rgba(239,68,68,0.1)"
                iconColor="#ef4444"
                label="Hemat"
                value="Rp 120rb"
                subtitle="-5% vs anggaran"
              />
              <MetricCard
                icon="water"
                iconBg="rgba(132,204,22,0.1)"
                iconColor="#84cc16"
                label="Asupan Air"
                value="1.8 L"
                badge={{ text: 'Baik', color: '#16a34a', bg: '#f0fdf4' }}
              />
            </View>

            {/* AI Insights */}
            <View style={{ marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <MaterialCommunityIcons
                  name="auto-fix"
                  size={20}
                  color={PRIMARY}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}
                >
                  Wawasan AI
                </Text>
              </View>
              <View
                style={[
                  styles.insightCard,
                  {
                    backgroundColor: 'rgba(244,140,37,0.05)',
                    borderWidth: 1,
                    borderColor: 'rgba(244,140,37,0.2)',
                    borderRadius: 24,
                    borderBottomLeftRadius: 4,
                    padding: 16,
                  },
                ]}
              >
                <Text
                  style={{ fontSize: 14, color: '#374151', lineHeight: 22 }}
                >
                  <Text style={{ fontWeight: '700', color: PRIMARY }}>
                    Hebat untuk Sholat!
                  </Text>{' '}
                  Anda tidak melewatkan sholat selama 14 hari. Namun,{' '}
                  <Text style={{ fontWeight: '600' }}>Fokus Kerja</Text> menurun
                  pada hari Rabu. Coba gunakan timer Pomodoro besok pagi.
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 12 }}
                contentContainerStyle={{ gap: 8 }}
              >
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/work' as any)}
                  style={[
                    styles.actionChip,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="timer"
                    size={18}
                    color="#3b82f6"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: '#374151',
                    }}
                  >
                    Atur Pomodoro
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/nutrition' as any)}
                  style={[
                    styles.actionChip,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: '#e5e7eb',
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="cup-water"
                    size={18}
                    color="#84cc16"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: '#374151',
                    }}
                  >
                    Catat Air
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* Leaderboard Teaser */}
            <LinearGradient
              colors={['#1f2937', '#111827']}
              style={[
                styles.leaderboardCard,
                {
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Papan Peringkat Anonim
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#fff',
                    marginTop: 4,
                  }}
                >
                  15% Teratas minggu ini
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Anda unggul dari 840 pengguna
                </Text>
              </View>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <MaterialCommunityIcons
                  name="trophy"
                  size={24}
                  color="#fbbf24"
                />
              </View>
            </LinearGradient>

            {/* Consistency Heatmap */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: '#fff',
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 24,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#181411',
                  marginBottom: 12,
                }}
              >
                Peta Konsistensi
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 4,
                }}
              >
                <HeatmapBar intensity={20} />
                <HeatmapBar intensity={40} />
                <HeatmapBar intensity={80} />
                <HeatmapBar intensity={100} />
                <HeatmapBar intensity={60} />
                <HeatmapBar intensity={30} />
                <HeatmapBar intensity={90} isToday />
                <HeatmapBar intensity={0} />
                <HeatmapBar intensity={0} />
                <HeatmapBar intensity={0} />
                <HeatmapBar intensity={0} />
                <HeatmapBar intensity={0} />
              </View>
            </View>
          </ScrollView>

          {/* Share Progress Button */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 16,
              paddingBottom: 32,
              backgroundColor: 'rgba(255,255,255,0.95)',
            }}
          >
            <TouchableOpacity
              onPress={() => Alert.alert('Bagikan Progres', 'Bagikan pencapaian Anda ke:', [
                { text: 'WhatsApp', onPress: () => Alert.alert('Info', 'Membuka WhatsApp...') },
                { text: 'Instagram Story', onPress: () => Alert.alert('Info', 'Membuat story...') },
                { text: 'Salin Link', onPress: () => Alert.alert('Berhasil', 'Link berhasil disalin!') },
                { text: 'Batal', style: 'cancel' },
              ])}
              style={[
                styles.shareButton,
                {
                  backgroundColor: PRIMARY,
                  paddingVertical: 18,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="share-variant"
                size={20}
                color="#fff"
              />
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>
                Bagikan Progres
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  rangeChip: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  metricCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    minWidth: '47%',
  },
  insightCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  actionChip: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  leaderboardCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  shareButton: {
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
