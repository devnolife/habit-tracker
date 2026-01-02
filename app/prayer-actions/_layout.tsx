import { Stack } from "expo-router";

export default function PrayerActionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#fafafa" },
      }}
    />
  );
}
