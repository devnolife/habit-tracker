import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface NavItem {
  key: string;
  icon: string;
  label: string;
  active?: boolean;
  hasDot?: boolean;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (key: string) => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "news",
    icon: "\uf1ea", // newspaper
    label: "News",
    hasDot: true,
  },
  {
    key: "mosque",
    icon: "\uf678", // mosque
    label: "Mosque",
  },
  {
    key: "compass",
    icon: "\uf14e", // compass
    label: "Compass",
    active: true,
  },
  {
    key: "pray",
    icon: "\uf683", // praying hands
    label: "Pray",
  },
  {
    key: "settings",
    icon: "\uf013", // gear/cog
    label: "Settings",
  },
];

export function BottomNavigation({
  activeTab = "compass",
  onTabPress,
}: BottomNavigationProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(19, 19, 19, 1)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.navRow}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeTab;
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.navItem}
                onPress={() => onTabPress?.(item.key)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <View
                    style={[
                      styles.iconBg,
                      !isActive && styles.iconBgInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.navIcon,
                        !isActive && styles.navIconInactive,
                      ]}
                    >
                      {item.icon}
                    </Text>
                  </View>
                  {item.hasDot && <View style={styles.notificationDot} />}
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    !isActive && styles.navLabelInactive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
      {/* Home indicator bar */}
      <View style={styles.homeIndicatorBar}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  gradientContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...Platform.select({
      ios: {
        // iOS supports backdrop blur natively via BlurView,
        // but we approximate with gradient opacity
      },
      android: {},
    }),
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 4,
    borderRadius: 8,
  },
  iconContainer: {
    position: "relative",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBg: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBgInactive: {
    opacity: 0.4,
  },
  navIcon: {
    fontFamily: Platform.select({
      ios: "FontAwesome6Free-Solid",
      android: "FontAwesome6Free-Solid",
    }),
    fontSize: 20,
    lineHeight: 20,
    color: "#FAFAFA",
    textAlign: "center",
  },
  navIconInactive: {
    color: "#FAFAFA",
  },
  navLabel: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 11,
    lineHeight: 13,
    color: "#FAFAFA",
    textAlign: "center",
  },
  navLabelInactive: {
    opacity: 0.4,
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#098E8F",
  },
  homeIndicatorBar: {
    width: "100%",
    height: 23,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Platform.OS === "ios" ? 8 : 4,
  },
  homeIndicator: {
    width: 139,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#FAFAFA",
    opacity: 0.3,
  },
});
