import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FeatureCardProps {
  icon: string;
  label: string;
  bgColor?: string;
  onPress?: () => void;
}

export function FeatureCard({
  icon,
  label,
  bgColor = "#098E8F",
  onPress,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 59,
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: "100%",
    height: 59,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
    color: "#FAFAFA",
    textAlign: "center",
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 18,
    color: "#FAFAFA",
    textAlign: "center",
    width: "100%",
  },
});
