import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define color themes
export const THEMES = {
  clean: {
    name: 'Clean',
    primary: '#3B82F6',
    primaryLight: '#93C5FD',
    primaryDark: '#2563EB',
    gradient: ['#FFFFFF', '#FFFFFF', '#F9FAFB'],
    accent: '#6366F1',
    icon: 'white-balance-sunny',
  },
  sunset: {
    name: 'Sunset',
    primary: '#f48c25',
    primaryLight: '#ffb366',
    primaryDark: '#c66d00',
    gradient: ['#FFFBF5', '#FFF9EE', '#FFEACC'],
    accent: '#ff6b6b',
    icon: 'weather-sunset',
  },
  ocean: {
    name: 'Ocean',
    primary: '#0ea5e9',
    primaryLight: '#7dd3fc',
    primaryDark: '#0284c7',
    gradient: ['#f0f9ff', '#e0f2fe', '#bae6fd'],
    accent: '#06b6d4',
    icon: 'waves',
  },
  forest: {
    name: 'Forest',
    primary: '#22c55e',
    primaryLight: '#86efac',
    primaryDark: '#16a34a',
    gradient: ['#f0fdf4', '#dcfce7', '#bbf7d0'],
    accent: '#10b981',
    icon: 'tree',
  },
  lavender: {
    name: 'Lavender',
    primary: '#a855f7',
    primaryLight: '#d8b4fe',
    primaryDark: '#9333ea',
    gradient: ['#faf5ff', '#f3e8ff', '#e9d5ff'],
    accent: '#c084fc',
    icon: 'flower',
  },
  rose: {
    name: 'Rose',
    primary: '#f43f5e',
    primaryLight: '#fda4af',
    primaryDark: '#e11d48',
    gradient: ['#fff1f2', '#ffe4e6', '#fecdd3'],
    accent: '#fb7185',
    icon: 'heart',
  },
  midnight: {
    name: 'Midnight',
    primary: '#6366f1',
    primaryLight: '#a5b4fc',
    primaryDark: '#4f46e5',
    gradient: ['#eef2ff', '#e0e7ff', '#c7d2fe'],
    accent: '#818cf8',
    icon: 'moon-waning-crescent',
  },
  emerald: {
    name: 'Emerald',
    primary: '#10b981',
    primaryLight: '#6ee7b7',
    primaryDark: '#059669',
    gradient: ['#ecfdf5', '#d1fae5', '#a7f3d0'],
    accent: '#34d399',
    icon: 'diamond-stone',
  },
  coral: {
    name: 'Coral',
    primary: '#fb923c',
    primaryLight: '#fdba74',
    primaryDark: '#ea580c',
    gradient: ['#fff7ed', '#ffedd5', '#fed7aa'],
    accent: '#f97316',
    icon: 'fire',
  },
};

export type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];

interface ThemeContextType {
  theme: Theme;
  themeKey: ThemeKey;
  setTheme: (key: ThemeKey) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@habit_tracker_theme';
const themeKeys = Object.keys(THEMES) as ThemeKey[];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = useState<ThemeKey>('clean');

  // Load saved theme on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && THEMES[savedTheme as ThemeKey]) {
        setThemeKey(savedTheme as ThemeKey);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const saveTheme = async (key: ThemeKey) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, key);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const setTheme = (key: ThemeKey) => {
    setThemeKey(key);
    saveTheme(key);
  };

  const cycleTheme = () => {
    const currentIndex = themeKeys.indexOf(themeKey);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextKey = themeKeys[nextIndex];
    setTheme(nextKey);
  };

  const value: ThemeContextType = {
    theme: THEMES[themeKey],
    themeKey,
    setTheme,
    cycleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
