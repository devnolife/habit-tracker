import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: 'onboarding_complete',
  PRAYER_SETTINGS: 'prayer_settings',
  EXPENSE_SETTINGS: 'expense_settings',
  NUTRITION_SETTINGS: 'nutrition_settings',
  WORK_SETTINGS: 'work_settings',
  USER_SETTINGS: 'user_settings',
  THEME: 'theme',
} as const;

/**
 * Get value from AsyncStorage
 */
export async function getStorageItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
}

/**
 * Set value in AsyncStorage
 */
export async function setStorageItem<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to storage:', error);
    return false;
  }
}

/**
 * Remove value from AsyncStorage
 */
export async function removeStorageItem(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<boolean> {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Check if onboarding is complete
 */
export async function isOnboardingComplete(): Promise<boolean> {
  const complete = await getStorageItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
  return complete === true;
}

/**
 * Set onboarding as complete
 */
export async function setOnboardingComplete(): Promise<boolean> {
  return setStorageItem(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
}

/**
 * Reset onboarding (for testing/dev)
 */
export async function resetOnboarding(): Promise<boolean> {
  return removeStorageItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
}

export { STORAGE_KEYS };
