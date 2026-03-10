/**
 * 📊 QUICK STAT CARD
 * ===================
 * A tappable card used in the Home screen's "Quick Stats" grid.
 * Each card represents a tracker category (Sholat, Work, Expense, Food)
 * and navigates to the corresponding tab when pressed.
 *
 * Usage:
 *   <QuickStatCard
 *     label="Sholat"
 *     value="4/5"
 *     unit="Done"
 *     icon="hands-pray"
 *     decorativeIcon="spa"
 *     colors={{ icon: '#15803D', label: '#166534', unit: '#15803D', bg: '#E6F4EA', decorative: '#166534' }}
 *     onPress={() => navigateToTab('prayer')}
 *   />
 */

import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QuickStatCardColors {
  /** Color of the main icon. */
  icon: string;
  /** Color of the label text. */
  label: string;
  /** Color of the unit/suffix text. */
  unit: string;
  /** Background color of the card. */
  bg: string;
  /** Color of the large decorative icon in the corner. */
  decorative: string;
}

interface QuickStatCardProps {
  /** Display label (e.g. "Sholat", "Work"). */
  label: string;
  /** Primary display value (e.g. "4/5", "6.5"). */
  value: string;
  /** Unit or suffix shown after the value (e.g. "Done", "hrs", "IDR", "cal"). */
  unit: string;
  /** Main icon name from MaterialCommunityIcons. */
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Large decorative icon shown in the bottom-right corner. */
  decorativeIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Color scheme for the card. */
  colors: QuickStatCardColors;
  /** Called when the card is pressed. */
  onPress: () => void;
  /** Optional: use full width instead of half. */
  fullWidth?: boolean;
}

export function QuickStatCard({
  label,
  value,
  unit,
  icon,
  decorativeIcon,
  colors,
  onPress,
  fullWidth = false,
}: QuickStatCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          width: fullWidth ? '100%' : '48%',
          backgroundColor: colors.bg,
        },
      ]}
    >
      {/* Decorative background icon */}
      <View style={styles.decorativeContainer}>
        <MaterialCommunityIcons
          name={decorativeIcon}
          size={90}
          color={colors.decorative}
        />
      </View>

      {/* Icon + Label row */}
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} size={20} color={colors.icon} />
        </View>
        <Text style={[styles.label, { color: colors.label }]}>{label}</Text>
      </View>

      {/* Value + Unit */}
      <Text style={styles.value}>
        {value}{' '}
        <Text style={[styles.unit, { color: colors.unit }]}>{unit}</Text>
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// 🎨  Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    minHeight: 150,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  // Decorative icon
  decorativeContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    opacity: 0.12,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 8,
    borderRadius: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
  },

  // Value
  value: {
    fontSize: 38,
    fontWeight: '700',
    color: '#181411',
    marginTop: 8,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
  },
});
