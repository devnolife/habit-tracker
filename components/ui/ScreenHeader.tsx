import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT, GRAY } from '@/config/colors';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT.primary,
  },
  subtitle: {
    fontSize: 14,
    color: TEXT.secondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
