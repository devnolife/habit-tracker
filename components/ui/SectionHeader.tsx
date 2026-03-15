import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TEXT } from '@/config/colors';

interface SectionHeaderProps {
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  right?: React.ReactNode;
}

export function SectionHeader({ title, icon, iconColor, right }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={20} color={iconColor ?? TEXT.primary} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {right && right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT.primary,
  },
});
