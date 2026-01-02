import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  USER_SETTINGS: "user_settings",
  PRAYERS: "prayers",
  MEALS: "meals",
  WORK_SESSIONS: "work_sessions",
  TRANSACTIONS: "transactions",
} as const;

// Generic storage functions
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
}

// Specific storage functions
export const storage = {
  keys: STORAGE_KEYS,
  get: getItem,
  set: setItem,
  remove: removeItem,
};
