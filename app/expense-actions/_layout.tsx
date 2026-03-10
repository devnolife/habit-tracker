import { Stack } from "expo-router";

export default function ExpenseActionsLayout() {
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
