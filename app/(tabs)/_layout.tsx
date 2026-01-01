import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
};

function TabIcon({ name, color, focused }: TabIconProps) {
  return (
    <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-60'}`}>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f48c25',
        tabBarInactiveTintColor: '#8a7560',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: 'Sholat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'moon' : 'moon-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Pengeluaran',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Makanan',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'nutrition' : 'nutrition-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: 'Kerja',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'briefcase' : 'briefcase-outline'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
