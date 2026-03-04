import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeadingSectionProps {
  islamicDate?: string;
  location?: string;
  prayerCountdown?: string;
  nextPrayer?: string;
  mosqueName?: string;
  onCameraPress?: () => void;
  onDirectionPress?: () => void;
}

export function HeadingSection({
  islamicDate = "9 Ramadhan 1444H",
  location = "Jakarta, Indonesia",
  prayerCountdown = "02:41:21",
  nextPrayer = "Fajr 2 hour 9 min left",
  mosqueName = "Al-Firdaus Grand Mosque",
  onCameraPress,
  onDirectionPress,
}: HeadingSectionProps) {
  return (
    <View style={styles.container}>
      {/* Top row: Date/location + camera button */}
      <View style={styles.topRow}>
        <View style={styles.dateLocationCol}>
          <Text style={styles.islamicDate}>{islamicDate}</Text>
          <Text style={styles.locationText}>
            {location} - {nextPrayer}
          </Text>
        </View>
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={onCameraPress}
            activeOpacity={0.7}
          >
            <Text style={styles.cameraIcon}>{"\uf030"}</Text>
            <View style={styles.cameraDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom row: Timer + Mosque info */}
      <View style={styles.bottomRow}>
        <Text style={styles.timerText}>{prayerCountdown}</Text>
        <View style={styles.mosqueInfoContainer}>
          <View style={styles.mosqueCol}>
            <View style={styles.mosqueNameRow}>
              <Text style={styles.mosqueIcon}>{"\uf67d"}</Text>
              <Text style={styles.mosqueName} numberOfLines={1}>
                {mosqueName}
              </Text>
            </View>
            <TouchableOpacity onPress={onDirectionPress} activeOpacity={0.7}>
              <Text style={styles.directLink}>Direct to location -&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#131313",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#303030",
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 16,
  },
  dateLocationCol: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
  },
  islamicDate: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    color: "#FAFAFA",
    textTransform: "capitalize",
  },
  locationText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "rgba(250, 250, 250, 0.5)",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cameraButton: {
    width: 32,
    height: 32,
    borderRadius: 99,
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cameraIcon: {
    fontFamily: "FontAwesome6Free-Regular",
    fontSize: 16,
    lineHeight: 20,
    color: "#FAFAFA",
    textAlign: "center",
  },
  cameraDot: {
    position: "absolute",
    top: 0,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#098E8F",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  timerText: {
    fontFamily: "Mulish",
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 40,
    color: "#FAFAFA",
  },
  mosqueInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexShrink: 1,
    maxWidth: "55%",
  },
  mosqueCol: {
    justifyContent: "center",
    gap: 2,
  },
  mosqueNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mosqueIcon: {
    fontFamily: "FontAwesome6Free-Solid",
    fontSize: 12,
    lineHeight: 12,
    color: "#098E8F",
    textAlign: "center",
  },
  mosqueName: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    color: "#098E8F",
    textTransform: "capitalize",
    flexShrink: 1,
  },
  directLink: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "rgba(250, 250, 250, 0.5)",
  },
});
