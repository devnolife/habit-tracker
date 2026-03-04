/**
 * 📋 ACTIVITY ITEM
 * =================
 * A tappable row displayed in the "Recent Activity" list on the Home screen.
 * Each item shows a colored dot, title, category, time, and a chevron
 * indicating it can be tapped to navigate to the relevant tab.
 *
 * Usage:
 *   <ActivityItem
 *     activity={activity}
 *     onPress={() => navigateToTab(activity.tab)}
 *     isLast={index === activities.length - 1}
 *   />
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { HomeActivity } from '@/types';

interface ActivityItemProps {
  /** The activity data to display. */
  activity: HomeActivity;
  /** Called when the row is pressed (typically navigates to the matching tab). */
  onPress: () => void;
  /** Whether this is the last item in the list (hides the bottom border). */
  isLast?: boolean;
}

export function ActivityItem({ activity, onPress, isLast = false }: ActivityItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        !isLast && styles.borderBottom,
      ]}
    >
      {/* ── Color indicator ── */}
      <View
        style={[
          styles.dotContainer,
          { backgroundColor: `${activity.color}18` },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: activity.color }]} />
      </View>

      {/* ── Content ── */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {activity.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {activity.category} • {activity.time}
        </Text>
      </View>

      {/* ── Trailing: time ago + chevron ── */}
      <View style={styles.trailing}>
        <Text style={styles.ago}>{activity.ago}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          color="#d1d5db"
        />
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// 🎨  Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },

  // Color dot
  dotContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Content
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181411',
  },
  subtitle: {
    fontSize: 12,
    color: '#8a7560',
    marginTop: 2,
  },

  // Trailing
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ago: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
});
