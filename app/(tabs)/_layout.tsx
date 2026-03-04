import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "@/lib/ThemeContext";

export default function TabLayout() {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopWidth: 0,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
            },
            android: {
              elevation: 10,
            },
          }),
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && { backgroundColor: `${theme.primary}15` }]}>
              <MaterialCommunityIcons name="home" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: "Sholat",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && { backgroundColor: `${theme.primary}15` }]}>
              <MaterialCommunityIcons name="mosque" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Makan",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && { backgroundColor: `${theme.primary}15` }]}>
              <MaterialCommunityIcons name="food-apple" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Kerja",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && { backgroundColor: `${theme.primary}15` }]}>
              <MaterialCommunityIcons name="briefcase" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Uang",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && { backgroundColor: `${theme.primary}15` }]}>
              <MaterialCommunityIcons name="wallet" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
