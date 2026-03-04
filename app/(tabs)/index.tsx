/**
 * 🏠 HOME SCREEN
 * ===============
 * Main dashboard screen of the Habit Tracker app.
 *
 * All interactive elements are wired up:
 * - Avatar → Settings
 * - Prayer cards → toggle done / bell, tap to Prayer tab
 * - Quick Stats → navigate to matching tab
 * - Daily Insights → Progress screen
 * - Recent Activity → navigate to matching tab
 *
 * Components, hooks, and constants are imported from their
 * dedicated modules to keep this file lean and readable.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ActivePrayerCard } from '@/components/home/ActivePrayerCard';
import { UpcomingPrayerCard } from '@/components/home/UpcomingPrayerCard';
import { QuickStatCard } from '@/components/home/QuickStatCard';
import { ActivityItem } from '@/components/home/ActivityItem';
import { usePrayerTracker } from '@/hooks/usePrayerTracker';
import { useTabNavigator } from '@/hooks/useTabNavigator';
import { MOCK_ACTIVITIES, buildHomeStats } from '@/constants';
import type { AppTheme } from '@/types';

// ─────────────────────────────────────────────
// Quick-stat card configurations
// ─────────────────────────────────────────────

const STAT_CARDS = [
  {
    key: 'prayer',
    label: 'Sholat',
    icon: 'hands-pray' as const,
    decorativeIcon: 'spa' as const,
    tab: 'prayer' as const,
    colors: {
      icon: '#15803D',
      label: '#166534',
      unit: '#15803D',
      bg: '#E6F4EA',
      decorative: '#166534',
    },
  },
  {
    key: 'work',
    label: 'Work',
    icon: 'briefcase-outline' as const,
    decorativeIcon: 'briefcase' as const,
    tab: 'work' as const,
    colors: {
      icon: '#1D4ED8',
      label: '#1E40AF',
      unit: '#1D4ED8',
      bg: '#E3F2FD',
      decorative: '#1E40AF',
    },
  },
  {
    key: 'expense',
    label: 'Expense',
    icon: 'wallet-outline' as const,
    decorativeIcon: 'cash-multiple' as const,
    tab: 'expense' as const,
    colors: {
      icon: '#B91C1C',
      label: '#991B1B',
      unit: '#B91C1C',
      bg: '#FCE8E6',
      decorative: '#991B1B',
    },
  },
  {
    key: 'food',
    label: 'Food',
    icon: 'silverware-fork-knife' as const,
    decorativeIcon: 'food' as const,
    tab: 'nutrition' as const,
    colors: {
      icon: '#A16207',
      label: '#92400E',
      unit: '#A16207',
      bg: '#FFF7E0',
      decorative: '#92400E',
    },
  },
] as const;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const { navigateToTab, navigateTo } = useTabNavigator();

  const {
    stats,
    progressPercent,
    allCompleted,
    carouselPrayers,
    toggleDone,
    toggleBell,
  } = usePrayerTracker();

  const homeStats = buildHomeStats(stats.done, stats.total);

  // Map stat card keys to their display values
  const statValues: Record<string, { value: string; unit: string }> = {
    prayer: {
      value: `${homeStats.prayer.done}/${homeStats.prayer.total}`,
      unit: 'Done',
    },
    work: { value: `${homeStats.work.hours}`, unit: 'hrs' },
    expense: { value: homeStats.expense.amount, unit: 'IDR' },
    food: { value: homeStats.food.calories.toLocaleString(), unit: 'cal' },
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={styles.root}
      >
        <SafeAreaView style={styles.root} edges={['top']}>
          <ScrollView
            style={styles.root}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* ─── Header ─── */}
            <HeaderSection
              theme={theme as AppTheme}
              onAvatarPress={() => navigateTo('/settings')}
            />

            {/* ─── Prayer Times Carousel ─── */}
            <View style={styles.sectionWrap}>
              <SectionHeader
                title="Prayer Times"
                actionLabel="See All"
                actionColor={theme.primary}
                onAction={() => navigateToTab('prayer')}
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carouselScroll}
                contentContainerStyle={styles.carouselContent}
              >
                {carouselPrayers.map(({ prayer, isActive }) =>
                  isActive ? (
                    <ActivePrayerCard
                      key={prayer.id}
                      prayer={prayer}
                      theme={theme as AppTheme}
                      onMarkDone={toggleDone}
                      onToggleBell={toggleBell}
                      onPress={() => navigateToTab('prayer')}
                    />
                  ) : (
                    <UpcomingPrayerCard
                      key={prayer.id}
                      prayer={prayer}
                      theme={theme as AppTheme}
                      onToggleBell={toggleBell}
                      onPress={() => navigateToTab('prayer')}
                    />
                  ),
                )}
              </ScrollView>
            </View>

            {/* ─── Quick Stats Grid ─── */}
            <View style={styles.paddedSection}>
              <Text style={styles.sectionTitle}>Quick Stats</Text>
              <View style={styles.statsGrid}>
                {STAT_CARDS.map((card) => {
                  const sv = statValues[card.key];
                  return (
                    <QuickStatCard
                      key={card.key}
                      label={card.label}
                      value={sv.value}
                      unit={sv.unit}
                      icon={card.icon}
                      decorativeIcon={card.decorativeIcon}
                      colors={card.colors}
                      onPress={() => navigateToTab(card.tab)}
                    />
                  );
                })}
              </View>
            </View>

            {/* ─── Daily Insights ─── */}
            <View style={styles.paddedSection}>
              <TouchableOpacity
                onPress={() => navigateTo('/progress')}
                activeOpacity={0.85}
                style={[
                  styles.insightsCard,
                  {
                    backgroundColor: `${theme.primary}15`,
                    borderColor: `${theme.primary}30`,
                  },
                ]}
              >
                <View style={styles.insightsContent}>
                  <View style={styles.insightsHeader}>
                    <Text style={styles.insightsTitle}>Daily Insights</Text>
                    <MaterialCommunityIcons
                      name="fire"
                      size={18}
                      color={theme.primary}
                      style={styles.insightsIcon}
                    />
                  </View>
                  <Text style={styles.insightsText}>
                    {allCompleted
                      ? 'MasyaAllah! All prayers completed today! 🌟'
                      : `Keep it up! ${stats.done}/${stats.total} prayers done.`}
                  </Text>
                </View>
                <ProgressRing
                  progress={progressPercent}
                  size={48}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            {/* ─── Recent Activity ─── */}
            <View style={styles.activitySection}>
              <SectionHeader
                title="Recent Activity"
                actionLabel="View All"
                actionColor={theme.primary}
                onAction={() => navigateTo('/progress')}
              />
              <View style={styles.activityList}>
                {MOCK_ACTIVITIES.map((activity, index) => (
                  <ActivityItem
                    key={`${activity.tab}-${index}`}
                    activity={activity}
                    onPress={() => navigateToTab(activity.tab)}
                    isLast={index === MOCK_ACTIVITIES.length - 1}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Theme Switcher FAB */}
          <ThemeSwitcher />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

// ─────────────────────────────────────────────
// Sub-components (private to this file)
// ─────────────────────────────────────────────

/** Reusable section header with title + optional action link. */
function SectionHeader({
  title,
  actionLabel,
  actionColor,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  actionColor?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={[styles.sectionAction, { color: actionColor }]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/** Top header with greeting, weather pill, and avatar. */
function HeaderSection({
  theme,
  onAvatarPress,
}: {
  theme: AppTheme;
  onAvatarPress: () => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerDate}>14 Ramadan 1445 H • 24 March 2024</Text>
        <Text style={styles.headerGreeting}>Assalamualaikum,{'\n'}Yusuf</Text>

        {/* Weather Pill */}
        <View style={[styles.weatherPill, styles.weatherPillShadow]}>
          <MaterialCommunityIcons
            name="weather-partly-cloudy"
            size={18}
            color={theme.primary}
          />
          <Text style={styles.weatherText}>32°C Jakarta</Text>
        </View>
      </View>

      {/* Avatar → Settings */}
      <TouchableOpacity
        onPress={onAvatarPress}
        activeOpacity={0.8}
        style={styles.avatarTouchable}
      >
        <View style={[styles.avatarContainer, styles.avatarShadow]}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.onlineDot} />
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // ── Header ──
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8a7560',
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181411',
    marginTop: 4,
    lineHeight: 32,
  },

  // Weather pill
  weatherPill: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  weatherPillShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5c4a3d',
    marginLeft: 6,
  },

  // Avatar
  avatarTouchable: {
    position: 'relative',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },

  // ── Section headers ──
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181411',
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Carousel ──
  sectionWrap: {
    paddingVertical: 16,
  },
  carouselScroll: {
    paddingLeft: 24,
    marginTop: 8,
  },
  carouselContent: {
    paddingRight: 24,
    paddingVertical: 8,
  },

  // ── Quick stats ──
  paddedSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  // ── Daily insights ──
  insightsCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  insightsContent: {
    flex: 1,
    paddingRight: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181411',
  },
  insightsIcon: {
    marginLeft: 8,
  },
  insightsText: {
    fontSize: 14,
    color: '#8a7560',
    lineHeight: 20,
  },

  // ── Recent activity ──
  activitySection: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  activityList: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
});
