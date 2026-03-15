import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BACKGROUND } from '@/config/colors';

interface LoadingScreenProps {
  color?: string;
}

export function LoadingScreen({ color }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND.primary,
  },
});
