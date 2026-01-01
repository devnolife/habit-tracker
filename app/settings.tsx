import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

function SettingItem({ icon, iconColor = '#f48c25', title, subtitle, onPress, rightElement }: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !rightElement}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (onPress && (
        <Ionicons name="chevron-forward" size={20} color="#8a7560" />
      ))}
    </TouchableOpacity>
  );
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#181411" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DN</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Devnolife</Text>
            <Text style={styles.profileEmail}>devnolife@email.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8a7560" />
        </TouchableOpacity>

        {/* General Settings */}
        <SettingSection title="General">
          <SettingItem
            icon="language"
            title="Language"
            subtitle="Bahasa Indonesia"
            onPress={() => { }}
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e0ddd8', true: '#f48c25' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingItem
            icon="calendar"
            title="Calendar Type"
            subtitle="Gregorian + Hijri"
            onPress={() => { }}
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <SettingItem
            icon="notifications"
            iconColor="#3b82f6"
            title="Push Notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e0ddd8', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingItem
            icon="time"
            iconColor="#3b82f6"
            title="Prayer Reminders"
            subtitle="10 minutes before"
            onPress={() => { }}
          />
          <SettingItem
            icon="pulse"
            iconColor="#3b82f6"
            title="Focus Mode Alerts"
            subtitle="Enabled"
            onPress={() => { }}
          />
        </SettingSection>

        {/* Tracker Settings */}
        <SettingSection title="Tracker Settings">
          <SettingItem
            icon="location"
            iconColor="#22c55e"
            title="Prayer Settings"
            subtitle="Calculation method, location"
            onPress={() => { }}
          />
          <SettingItem
            icon="wallet"
            iconColor="#f48c25"
            title="Expense Settings"
            subtitle="Budget, categories"
            onPress={() => { }}
          />
          <SettingItem
            icon="restaurant"
            iconColor="#84cc16"
            title="Nutrition Settings"
            subtitle="Calorie goal, macros"
            onPress={() => { }}
          />
          <SettingItem
            icon="timer"
            iconColor="#3b82f6"
            title="Work Settings"
            subtitle="Pomodoro timer, goals"
            onPress={() => { }}
          />
        </SettingSection>

        {/* Privacy & Security */}
        <SettingSection title="Privacy & Security">
          <SettingItem
            icon="finger-print"
            iconColor="#a855f7"
            title="Biometric Lock"
            rightElement={
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: '#e0ddd8', true: '#a855f7' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingItem
            icon="cloud-upload"
            iconColor="#a855f7"
            title="Data Backup"
            subtitle="Last backup: Today"
            onPress={() => { }}
          />
          <SettingItem
            icon="trash"
            iconColor="#ef4444"
            title="Clear All Data"
            onPress={() => { }}
          />
        </SettingSection>

        {/* About */}
        <SettingSection title="About">
          <SettingItem
            icon="information-circle"
            title="App Version"
            subtitle="1.0.0"
          />
          <SettingItem
            icon="document-text"
            title="Privacy Policy"
            onPress={() => { }}
          />
          <SettingItem
            icon="shield-checkmark"
            title="Terms of Service"
            onPress={() => { }}
          />
          <SettingItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => { }}
          />
        </SettingSection>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0ddd8',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181411',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f48c25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181411',
  },
  profileEmail: {
    fontSize: 14,
    color: '#8a7560',
    marginTop: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8a7560',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0eeeb',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#181411',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#8a7560',
    marginTop: 2,
  },
});
