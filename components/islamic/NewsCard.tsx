import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface NewsCardProps {
  title: string;
  author: string;
  views: string;
  timeAgo: string;
  onPress?: () => void;
}

export function NewsCard({
  title,
  author,
  views,
  timeAgo,
  onPress,
}: NewsCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {author} - {views} x watching - {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#BDBDBD",
  },
  content: {
    width: "100%",
    gap: 8,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: "#FAFAFA",
    textAlign: "left",
  },
  meta: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.12,
    color: "rgba(250, 250, 250, 0.7)",
    textAlign: "left",
  },
});
