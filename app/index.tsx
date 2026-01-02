import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Add logic to check if user has completed onboarding
  const hasCompletedOnboarding = true;

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(tabs)" />;
}
