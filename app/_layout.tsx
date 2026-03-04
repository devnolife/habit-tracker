import './global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/lib/ThemeContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen
            name="progress"
            options={{ headerShown: false, presentation: 'modal' }}
          />
          <Stack.Screen
            name="prayer-actions"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="prayer-setup" options={{ headerShown: false }} />
          <Stack.Screen name="islamic-home" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
