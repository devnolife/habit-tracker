/**
 * 🕌 UPCOMING PRAYER CARD
 * ========================
 * The secondary prayer card displayed in the Home carousel.
 * Shows an upcoming (not yet active) prayer with a muted design,
 * and an interactive bell toggle to enable/disable reminders.
 *
 * Usage:
 *   <UpcomingPrayerCard
 *     prayer={nextPrayer}
 *     theme={theme}
 *     onToggleBell={(id) => toggleBell(id)}
 *     onPress={() => navigateToTab('prayer')}
 *   />
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HomePrayer, AppTheme } from '@/types';

interface UpcomingPrayerCardProps {
  /** The prayer data to display. */
  prayer: HomePrayer;
  /** Current app theme (provides primary colors). */
  theme: AppTheme;
  /** Called when the user taps the bell icon or "Turn on alerts" text. */
  onToggleBell: (id: string) => void;
  /** Called when the user taps the card body (navigates to Prayer tab). */
  onPress: () => void;
}

export function UpcomingPrayerCard({
  prayer,
  theme,
  onToggleBell,
  onPress,
}: UpcomingPrayerCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      {/* ── Decorative mosque icon ── */}
      <View style={styles.decorativeIcon}>
        <MaterialCommunityIcons name="mosque" size={150} color="#181411" />
      </View>

      {/* ── Header row: name + time ── */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.prayerName}>{prayer.name}</Text>
          <Text style={styles.prayerSubtitle}>{prayer.subtitle}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.prayerTime}>{prayer.time}</Text>
          <Text style={styles.upcomingLabel}>Akan datang</Text>
        </View>
      </View>

      {/* ── Bell toggle row ── */}
      <View style={styles.bellRow}>
        <TouchableOpacity
          onPress={() => onToggleBell(prayer.id)}
          activeOpacity={0.7}
          style={styles.alertTextTouchable}
        >
          <Text style={styles.alertText}>
            {prayer.bellOn ? 'Pengingat aktif' : 'Aktifkan pengingat'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onToggleBell(prayer.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialCommunityIcons
            name={prayer.bellOn ? 'bell-ring' : 'bell-off-outline'}
            size={24}
            color={prayer.bellOn ? theme.primary : '#9CA3AF'}
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  // Decorative
  decorativeIcon: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.05,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  prayerName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(24,20,17,0.6)',
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
    color: 'rgba(24,20,17,0.6)',
  },
  upcomingLabel: {
    fontSize: 12,
    color: '#8a7560',
    marginTop: 4,
  },

  // Bell toggle
  bellRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  alertTextTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 14,
    color: '#8a7560',
  },
});
