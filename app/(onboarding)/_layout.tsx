import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="prayer" />
      <Stack.Screen name="expense" />
      <Stack.Screen name="nutrition" />
      <Stack.Screen name="work" />
      <Stack.Screen name="ready" />
    </Stack>
  );
}
