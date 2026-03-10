import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Prayer data
const prayers = [
  {
    name: 'Subuh',
    arabic: 'الفجر',
    time: '04:45',
    adhan: '04:30',
    iqamah: '04:40',
    completed: true,
  },
  {
    name: 'Dzuhur',
    arabic: 'الظهر',
    time: '12:05',
    adhan: '11:55',
    iqamah: '12:15',
    completed: false,
    isNext: true,
  },
  {
    name: 'Ashar',
    arabic: 'العصر',
    time: '15:20',
    adhan: '15:10',
    iqamah: '15:25',
    completed: false,
  },
  {
    name: 'Maghrib',
    arabic: 'المغرب',
    time: '18:10',
    adhan: '18:05',
    iqamah: '18:15',
    completed: false,
  },
  {
    name: 'Isya',
    arabic: 'العشاء',
    time: '19:25',
    adhan: '19:20',
    iqamah: '19:30',
    completed: false,
  },
];

// Calendar days with prayer dots
const calendarDays = [
  { day: 1, prayers: [1, 1, 1, 1, 1] },
  { day: 2, prayers: [1, 1, 0, 1, 1] },
  { day: 3, prayers: [1, 1, 1, 1, 1] },
  { day: 4, prayers: [1, 1, 1, 1, 1] },
  { day: 5, prayers: [1, 1, 1, 1, 1] },
  { day: 6, prayers: [1, 1, 1, 0, 1] },
  { day: 7, prayers: [1, 1, 1, 1, 1] },
  { day: 8, prayers: [1, 1, 1, 1, 1] },
  { day: 9, prayers: [1, 1, 1, 1, 1] },
  { day: 10, prayers: [1, 1, 1, 1, 1] },
  { day: 11, prayers: [1, 1, 1, 1, 1] },
  { day: 12, prayers: [1, 1, 1, 1, 1] },
  { day: 13, prayers: [1, 1, 1, 1, 1] },
  { day: 14, prayers: [1, 0, 0, 0, 0], isToday: true },
];

// Features data (from Figma design)
const FEATURES = [
  { icon: 'calendar-month', label: 'Kalender Islam', color: '#098E8F', route: '/prayer-actions/jadwal' },
  { icon: 'book-open-page-variant', label: 'Panduan Islam', color: '#098E8F', route: '/prayer-actions/doa' },
  { icon: 'calculator-variant', label: 'Kalkulator Zakat', color: '#098E8F', route: '/prayer-actions/zakat' },
  { icon: 'hand-heart', label: 'Donasi Muslim', color: '#BB630B', route: '/prayer-actions/donasi' },
  { icon: 'clock-time-five', label: 'Waktu Sholat', color: '#098E8F', route: '/prayer-actions/jadwal' },
];

// News / Today Updates data (from Figma design)
const NEWS_ITEMS = [
  {
    id: '1',
    title: 'Pentingnya Keikhlasan dalam Beribadah',
    author: 'Ustaz Ahmad Fauzi',
    views: '89rb',
    timeAgo: '1 jam lalu',
  },
  {
    id: '2',
    title: 'Mempererat Ikatan Keluarga Melalui Islam',
    author: 'Ustaz Malik Ridwan',
    views: '89rb',
    timeAgo: '1 jam lalu',
  },
];

export default function PrayerScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>('Dhuhr');

  const ISLAMIC_MONTHS = [
    'Muharram', 'Safar', 'Rabi\'ul Awal', 'Rabi\'ul Akhir',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah',
  ];
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(8); // Ramadhan default
  const [calendarYear, setCalendarYear] = useState(1445);

  const handlePrevMonth = () => {
    if (calendarMonthIndex === 0) {
      setCalendarMonthIndex(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonthIndex((i) => i - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonthIndex === 11) {
      setCalendarMonthIndex(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonthIndex((i) => i + 1);
    }
  };

  const handleFeaturePress = (feature: (typeof FEATURES)[0]) => {
    router.push(feature.route as any);
  };

  // Prayer Card Component (original)
  const PrayerCard = ({ prayer }: { prayer: (typeof prayers)[0] }) => {
    const isCompleted = prayer.completed;
    const isNext = prayer.isNext;
    const expanded = expandedPrayer === prayer.name;

    return (
      <View
        style={[
          styles.prayerCard,
          {
            backgroundColor: isCompleted ? `${theme.primary}08` : '#fff',
            borderWidth: isNext ? 0 : 1,
            borderColor: isCompleted ? `${theme.primary}30` : '#f3f4f6',
            borderLeftWidth: isNext ? 4 : 1,
            borderLeftColor: isNext
              ? theme.primary
              : isCompleted
                ? `${theme.primary}30`
                : '#f3f4f6',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setExpandedPrayer(expanded ? null : prayer.name)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: isCompleted ? theme.primary : 'transparent',
                borderWidth: isCompleted ? 0 : 2,
                borderColor: '#d1d5db',
                alignItems: 'center',
                justifyContent: 'center',
                ...(isCompleted
                  ? {
                      shadowColor: theme.primary,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                    }
                  : {}),
              }}
            >
              {isCompleted && (
                <MaterialCommunityIcons name="check" size={18} color="#fff" />
              )}
            </View>

            <View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: '700', color: '#111' }}
                >
                  {prayer.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#61896f',
                    fontFamily: 'serif',
                  }}
                >
                  {prayer.arabic}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: isNext ? theme.primary : '#61896f',
                  fontWeight: isNext ? '600' : '400',
                }}
              >
                {prayer.time} {isNext && '(Berikutnya)'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {isCompleted && (
              <View
                style={{
                  backgroundColor: `${theme.primary}15`,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: theme.primary,
                  }}
                >
                  Selesai
                </Text>
              </View>
            )}
            <MaterialCommunityIcons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#9ca3af"
            />
          </View>
        </TouchableOpacity>

        {expanded && (
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
              paddingTop: 16,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#f9fafb',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 12, color: '#9ca3af' }}>Adzan</Text>
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#111' }}
                >
                  {prayer.adhan}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#f9fafb',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 12, color: '#9ca3af' }}>Iqamah</Text>
                <Text
                  style={{ fontSize: 14, fontWeight: '500', color: '#111' }}
                >
                  {prayer.iqamah}
                </Text>
              </View>
            </View>

            {isNext && (
              <TextInput
                placeholder="Tambahkan catatan..."
                placeholderTextColor="#9ca3af"
                style={{
                  marginTop: 16,
                  backgroundColor: '#f9fafb',
                  padding: 12,
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#111',
                }}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#f3f4f6',
                  padding: 4,
                  borderRadius: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: theme.primary,
                    }}
                  >
                    Sendiri
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 12, paddingVertical: 6 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#6b7280',
                    }}
                  >
                    Berjamaah
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f8f6' }}>
      <LinearGradient
        colors={['#fff', theme.gradient[1]]}
        style={{
          paddingBottom: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          ...styles.headerShadow,
        }}
      >
        <SafeAreaView edges={['top']}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <MaterialCommunityIcons
                name="mosque"
                size={36}
                color={theme.primary}
              />
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <TouchableOpacity
                  onPress={() => router.push('/prayer-setup/notifications' as any)}
                  style={{
                    padding: 8,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name="bell-outline"
                    size={24}
                    color="#111"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push('/prayer-setup' as any)}
                  style={{
                    padding: 8,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name="cog-outline"
                    size={24}
                    color="#111"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontSize: 28, fontWeight: '700', letterSpacing: -0.5 }}
              >
                Pelacak Sholat
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#61896f',
                  marginTop: 2,
                }}
              >
                14 Ramadhan 1445 AH
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: '#f3f4f6',
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={16}
                  color={theme.primary}
                />
                <Text
                  style={{ fontSize: 12, fontWeight: '600', marginLeft: 4 }}
                >
                  Jakarta, Indonesia
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1, marginTop: -16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        {/* ── NEW: Prayer Countdown Timer (from Figma) ── */}
        <View style={[styles.card, styles.countdownCard]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{ fontSize: 12, color: '#61896f', fontWeight: '500' }}
              >
                Sholat Berikutnya - Dzuhur
              </Text>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: '700',
                  color: '#111',
                  marginTop: 4,
                  letterSpacing: -1,
                }}
              >
                02:41:21
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              >
                <MaterialCommunityIcons
                  name="mosque"
                  size={16}
                  color={theme.primary}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: theme.primary,
                  }}
                  numberOfLines={1}
                >
                  Masjid Agung Al-Firdaus
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/prayer-actions/qibla' as any)}>
                <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                  Arahkan ke lokasi →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Streak & Stats (original) */}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 24,
            marginTop: 16,
          }}
        >
          <View
            style={[
              styles.statCard,
              {
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View>
              <Text style={{ fontSize: 12, color: '#61896f' }}>Streak</Text>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>12 Hari</Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#fff7ed',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons name="fire" size={24} color="#f97316" />
            </View>
          </View>
          <View
            style={[
              styles.statCard,
              {
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View>
              <Text style={{ fontSize: 12, color: '#61896f' }}>Pencapaian</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: theme.primary,
                }}
              >
                80%
              </Text>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${theme.primary}15`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="chart-pie"
                size={24}
                color={theme.primary}
              />
            </View>
          </View>
        </View>

        {/* Today's Prayers (original) */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 12,
            paddingLeft: 4,
          }}
        >
          Sholat Hari Ini
        </Text>
        {prayers.map((prayer) => (
          <PrayerCard key={prayer.name} prayer={prayer} />
        ))}

        {/* ── NEW: Qibla Compass Widget with Image (from Figma) ── */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 0,
              marginTop: 24,
              overflow: 'hidden',
            },
          ]}
        >
          <View
            style={{
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 12,
              backgroundColor: `${theme.primary}08`,
            }}
          >
            <Image
              source={require('../../assets/images/compass-widget.png')}
              style={{ width: 200, height: 210 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ padding: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                Arah Kiblat
              </Text>
              <View
                style={{
                  backgroundColor: `${theme.primary}15`,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: theme.primary,
                  }}
                >
                  Langsung
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#1f2937',
                marginTop: 4,
              }}
            >
              295°{' '}
              <Text
                style={{ fontSize: 18, fontWeight: '400', color: '#6b7280' }}
              >
                NW
              </Text>
            </Text>
            {/* NEW: Kaaba Distance Badge (from Figma) */}
            <View style={styles.kaabaBadge}>
              <Text style={{ fontSize: 16 }}>🕋</Text>
              <Text style={{ fontSize: 13, color: '#61896f' }}>
                Jarak Anda ke Ka'bah adalah 9.638 km
              </Text>
            </View>
          </View>
        </View>

        {/* ── NEW: All Features Grid (from Figma) ── */}
        <View style={{ marginTop: 28 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Semua Fitur
          </Text>
          <View style={styles.featureRow}>
            {FEATURES.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                activeOpacity={0.7}
                onPress={() => handleFeaturePress(feature)}
              >
                <View
                  style={[
                    styles.featureIconBox,
                    { backgroundColor: feature.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={feature.icon as any}
                    size={24}
                    color="#fff"
                  />
                </View>
                <Text style={styles.featureLabel} numberOfLines={2}>
                  {feature.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Monthly Calendar (original) */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginTop: 24,
            },
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
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              {ISLAMIC_MONTHS[calendarMonthIndex]} {calendarYear}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                onPress={handlePrevMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <Text
                key={i}
                style={{
                  width: 36,
                  textAlign: 'center',
                  fontSize: 12,
                  color: '#9ca3af',
                }}
              >
                {day}
              </Text>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {[28, 29, 30].map((day) => (
              <View
                key={`prev-${day}`}
                style={{
                  width: 36,
                  alignItems: 'center',
                  opacity: 0.25,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontSize: 14 }}>{day}</Text>
              </View>
            ))}
            {calendarDays.map((item) => (
              <View
                key={item.day}
                style={{
                  width: 36,
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderRadius: 8,
                  ...(item.isToday
                    ? {
                        backgroundColor: `${theme.primary}08`,
                        borderWidth: 1,
                        borderColor: theme.primary,
                      }
                    : {}),
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: item.isToday ? '700' : '500',
                    color: item.isToday ? theme.primary : '#111',
                  }}
                >
                  {item.day}
                </Text>
                <View style={{ flexDirection: 'row', gap: 1, marginTop: 4 }}>
                  {item.prayers.map((p, i) => (
                    <View
                      key={i}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: p === 1 ? theme.primary : '#e5e7eb',
                        borderWidth: p === 0 ? 1 : 0,
                        borderColor: '#f87171',
                      }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Resources Grid (original) */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
          <TouchableOpacity
            style={[
              styles.card,
              {
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              },
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${theme.primary}15`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="book-open-variant"
                size={20}
                color={theme.primary}
              />
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '700' }}>
                Doa Harian
              </Text>
              <Text style={{ fontSize: 10, color: '#9ca3af' }}>
                Kumpulan doa penting
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                flex: 1,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              },
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${theme.primary}15`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="gesture-tap-button"
                size={20}
                color={theme.primary}
              />
            </View>
            <View>
              <Text style={{ fontSize: 14, fontWeight: '700' }}>Dzikir</Text>
              <Text style={{ fontSize: 10, color: '#9ca3af' }}>
                Penghitung Digital
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── NEW: Today Updates / News Section (from Figma) ── */}
        <View style={{ marginTop: 28 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16 }}>
            Pembaruan Hari Ini
          </Text>
          <View style={{ gap: 24 }}>
            {NEWS_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.newsCard}
                activeOpacity={0.7}
              >
                <View style={styles.newsImagePlaceholder}>
                  <MaterialCommunityIcons
                    name="play-circle-outline"
                    size={36}
                    color="rgba(255,255,255,0.7)"
                  />
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: '600', color: '#111' }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#9ca3af' }}
                    numberOfLines={1}
                  >
                    {item.author} - {item.views} x ditonton - {item.timeAgo}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 24 }} />
      </ScrollView>

      <ThemeSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  prayerCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
    overflow: 'hidden',
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
  compassShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // NEW: Countdown card
  countdownCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 0,
  },
  // NEW: Kaaba distance badge
  kaabaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  // NEW: Feature grid
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  featureCard: {
    width: (SCREEN_WIDTH - 32 - 32) / 5,
    alignItems: 'center',
    gap: 8,
  },
  featureIconBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 15,
    color: '#374151',
    textAlign: 'center',
    width: '100%',
  },
  // NEW: News card
  newsCard: {
    gap: 12,
  },
  newsImagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
