import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('isOnboarded');
      setIsOnboarded(value === 'true');
    } catch {
      setIsOnboarded(false);
    }
  };

  if (isOnboarded === null) {
    return null; // Loading state
  }

  if (!isOnboarded) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(tabs)" />;
}
