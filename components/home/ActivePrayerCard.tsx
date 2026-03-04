/**
 * 🕌 ACTIVE PRAYER CARD
 * ======================
 * The primary prayer card displayed in the Home carousel.
 * Shows the current/next prayer with time remaining,
 * a progress bar, and interactive "Mark Done" + bell toggle buttons.
 *
 * Usage:
 *   <ActivePrayerCard
 *     prayer={currentPrayer}
 *     theme={theme}
 *     onMarkDone={(id) => toggleDone(id)}
 *     onToggleBell={(id) => toggleBell(id)}
 *     onPress={() => navigateToTab('prayer')}
 *   />
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { HomePrayer, AppTheme } from '@/types';

interface ActivePrayerCardProps {
  /** The prayer data to display. */
  prayer: HomePrayer;
  /** Current app theme (provides primary colors). */
  theme: AppTheme;
  /** Called when the user taps "Mark Done". */
  onMarkDone: (id: string) => void;
  /** Called when the user taps the bell icon. */
  onToggleBell: (id: string) => void;
  /** Called when the user taps the card body (navigates to Prayer tab). */
  onPress: () => void;
  /** Mock time-remaining progress (0–100). Defaults to 65. */
  timeProgress?: number;
  /** Mock countdown label. Defaults to "-01:23:45". */
  countdownLabel?: string;
}

export function ActivePrayerCard({
  prayer,
  theme,
  onMarkDone,
  onToggleBell,
  onPress,
  timeProgress = 65,
  countdownLabel = '-01:23:45',
}: ActivePrayerCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: `${theme.primary}30`,
        },
      ]}
    >
      {/* ── Decorative mosque icon ── */}
      <View style={styles.decorativeIcon}>
        <MaterialCommunityIcons
          name="mosque"
          size={150}
          color={theme.primary}
        />
      </View>

      {/* ── Header row: name + time ── */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.prayerName}>{prayer.name}</Text>
          <Text style={styles.prayerSubtitle}>{prayer.subtitle}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={[styles.prayerTime, { color: theme.primary }]}>
            {prayer.time}
          </Text>
          <View
            style={[
              styles.countdownPill,
              { backgroundColor: `${theme.primary}15` },
            ]}
          >
            <MaterialCommunityIcons
              name="timer-outline"
              size={14}
              color="#8a7560"
            />
            <Text style={styles.countdownText}>{countdownLabel}</Text>
          </View>
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressLabel}>Time Remaining</Text>
          <Text style={styles.progressLabel}>{timeProgress}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[theme.primaryLight, theme.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${timeProgress}%` }]}
          />
        </View>
      </View>

      {/* ── Action buttons ── */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={() => onMarkDone(prayer.id)}
          activeOpacity={0.7}
          style={[
            styles.markDoneButton,
            {
              backgroundColor: prayer.done ? '#dcfce7' : '#f0fdf4',
            },
          ]}
        >
          <MaterialCommunityIcons
            name={prayer.done ? 'check-circle' : 'circle-outline'}
            size={18}
            color="#15803D"
          />
          <Text style={styles.markDoneText}>
            {prayer.done ? 'Done ✓' : 'Mark Done'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onToggleBell(prayer.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons
            name={prayer.bellOn ? 'bell-ring' : 'bell-ring-outline'}
            size={24}
            color={prayer.bellOn ? theme.primary : '#D1D5DB'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// 🎨  Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 2,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  decorativeIcon: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.1,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
    position: 'relative',
    zIndex: 10,
  },
  prayerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181411',
  },
  prayerSubtitle: {
    fontSize: 14,
    color: '#8a7560',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  prayerTime: {
    fontSize: 20,
    fontWeight: '700',
  },
  countdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  countdownText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8a7560',
    marginLeft: 4,
  },

  // Progress
  progressSection: {
    marginBottom: 24,
    position: 'relative',
    zIndex: 10,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8a7560',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },

  // Actions
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
  },
  markDoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  markDoneText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
  },
});
