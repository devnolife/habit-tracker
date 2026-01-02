import { Tabs } from "expo-router";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f48c25",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 10,
          height: 80,
          paddingBottom: 12,
          paddingTop: 8,
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? "bg-orange-100 p-2 rounded-xl" : ""}>
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
            <View className={focused ? "bg-orange-100 p-2 rounded-xl" : ""}>
              <MaterialCommunityIcons name="mosque" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Makanan",
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? "bg-orange-100 p-2 rounded-xl" : ""}>
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
            <View className={focused ? "bg-orange-100 p-2 rounded-xl" : ""}>
              <MaterialCommunityIcons name="briefcase" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Keuangan",
          tabBarIcon: ({ color, focused }) => (
            <View className={focused ? "bg-orange-100 p-2 rounded-xl" : ""}>
              <MaterialCommunityIcons name="wallet" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
