import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const PRIMARY = '#2563EB';

// Settings Item Component
const SettingsItem = ({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  rightElement,
  onPress,
}: {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          backgroundColor: iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={iconColor}
        />
      </View>
      <Text style={{ fontSize: 15, fontWeight: '500', color: '#181411' }}>
        {title}
      </Text>
    </View>
    {rightElement || (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {subtitle && (
          <Text style={{ fontSize: 14, color: '#6b7280' }}>{subtitle}</Text>
        )}
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="#9ca3af"
        />
      </View>
    )}
  </TouchableOpacity>
);

// Settings Section Component
const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ marginBottom: 24 }}>
    <Text
      style={{
        fontSize: 12,
        fontWeight: '700',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
        paddingHorizontal: 8,
      }}
    >
      {title}
    </Text>
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' },
      ]}
    >
      {children}
    </View>
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const [prayerNotif, setPrayerNotif] = useState(true);
  const [workNotif, setWorkNotif] = useState(false);
  const [expenseNotif, setExpenseNotif] = useState(true);
  const [foodNotif, setFoodNotif] = useState(true);
  const [faceId, setFaceId] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#F9FAFB']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View
            style={[
              styles.header,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6',
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#181411"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}>
              Settings
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          >
            {/* Profile Card */}
            <TouchableOpacity
              style={[
                styles.profileCard,
                {
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                },
              ]}
            >
              <View style={{ position: 'relative' }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: '#fff',
                    ...styles.avatarShadow,
                  }}
                >
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    backgroundColor: '#2563EB',
                    borderRadius: 12,
                    padding: 4,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={12}
                    color="#fff"
                  />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: '700', color: '#181411' }}
                >
                  Amina Rahman
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  amina.rahman@example.com
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#9ca3af"
              />
            </TouchableOpacity>

            {/* General */}
            <SettingsSection title="General">
              <SettingsItem
                icon="translate"
                iconColor={PRIMARY}
                iconBg="rgba(37,99,235,0.1)"
                title="Language"
                subtitle="English"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="palette"
                iconColor={PRIMARY}
                iconBg="rgba(37,99,235,0.1)"
                title="Theme"
                subtitle="Warm (Default)"
              />
            </SettingsSection>

            {/* Notifications */}
            <SettingsSection title="Notifications">
              <SettingsItem
                icon="mosque"
                iconColor="#6366f1"
                iconBg="rgba(99,102,241,0.1)"
                title="Prayer Times"
                rightElement={
                  <Switch
                    value={prayerNotif}
                    onValueChange={setPrayerNotif}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="briefcase-clock"
                iconColor="#3b82f6"
                iconBg="rgba(59,130,246,0.1)"
                title="Work & Focus"
                rightElement={
                  <Switch
                    value={workNotif}
                    onValueChange={setWorkNotif}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="cash-multiple"
                iconColor="#10b981"
                iconBg="rgba(16,185,129,0.1)"
                title="Expenses"
                rightElement={
                  <Switch
                    value={expenseNotif}
                    onValueChange={setExpenseNotif}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="silverware-fork-knife"
                iconColor="#f43f5e"
                iconBg="rgba(244,63,94,0.1)"
                title="Food & Fasting"
                rightElement={
                  <Switch
                    value={foodNotif}
                    onValueChange={setFoodNotif}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
            </SettingsSection>

            {/* Privacy & Security */}
            <SettingsSection title="Privacy & Security">
              <SettingsItem
                icon="face-recognition"
                iconColor="#6b7280"
                iconBg="#f3f4f6"
                title="Face ID Lock"
                rightElement={
                  <Switch
                    value={faceId}
                    onValueChange={setFaceId}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="share-variant"
                iconColor="#6b7280"
                iconBg="#f3f4f6"
                title="Data Sharing Consent"
              />
            </SettingsSection>

            {/* Data Management */}
            <SettingsSection title="Data Management">
              <SettingsItem
                icon="cloud-upload"
                iconColor="#0ea5e9"
                iconBg="rgba(14,165,233,0.1)"
                title="Backup & Restore"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="download"
                iconColor="#0ea5e9"
                iconBg="rgba(14,165,233,0.1)"
                title="Export All Data"
              />
            </SettingsSection>

            {/* Accessibility */}
            <SettingsSection title="Accessibility">
              <SettingsItem
                icon="contrast-circle"
                iconColor="#14b8a6"
                iconBg="rgba(20,184,166,0.1)"
                title="High Contrast"
                rightElement={
                  <Switch
                    value={highContrast}
                    onValueChange={setHighContrast}
                    trackColor={{ false: '#e5e7eb', true: PRIMARY }}
                    thumbColor="#fff"
                  />
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#f3f4f6',
                  marginLeft: 64,
                }}
              />
              <SettingsItem
                icon="format-size"
                iconColor="#14b8a6"
                iconBg="rgba(20,184,166,0.1)"
                title="Font Size"
                subtitle="Medium"
              />
            </SettingsSection>

            {/* Support */}
            <SettingsSection title="Support">
              <SettingsItem
                icon="help-circle"
                iconColor="#a855f7"
                iconBg="rgba(168,85,247,0.1)"
                title="Help Center"
              />
            </SettingsSection>

            {/* Logout Button */}
            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#fecaca',
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                  marginBottom: 16,
                },
              ]}
            >
              <Text
                style={{ fontSize: 16, fontWeight: '700', color: '#ef4444' }}
              >
                Log Out
              </Text>
            </TouchableOpacity>

            {/* App Version */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#9ca3af',
                marginBottom: 24,
              }}
            >
              App Version v1.0.2
            </Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  profileCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  logoutButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
});
