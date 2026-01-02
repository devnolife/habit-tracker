import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="prayer-setup" />
      <Stack.Screen name="nutrition-setup" />
      <Stack.Screen name="work-setup" />
      <Stack.Screen name="expense-setup" />
    </Stack>
  );
}
