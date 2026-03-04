import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Color Tokens (from Figma) ───────────────────────────────────
const COLORS = {
  dark: '#131313',
  bgSoft: '#1C1C1C',
  light: '#FAFAFA',
  primary: '#098E8F',
  secondary: '#BB630B',
  tertiaryRed: '#D43A3D',
  border: '#303030',
  gray4: '#BDBDBD',
};

// ─── Feature Data ────────────────────────────────────────────────
const FEATURES = [
  { icon: '🗓', label: 'Islamic Calendar', color: COLORS.primary },
  { icon: '📖', label: 'Islamic Guide', color: COLORS.primary },
  { icon: '🧮', label: 'Zakat Calculator', color: COLORS.primary },
  { icon: '🤲', label: 'Donation Muslim', color: COLORS.secondary },
  { icon: '🕌', label: 'Prayer Times', color: COLORS.primary },
];

// ─── News Data ───────────────────────────────────────────────────
const NEWS_ITEMS = [
  {
    id: '1',
    title: 'The Importance of Sincerity in Worship',
    author: 'Ustaz Ahmad Fauzi',
    views: '89k',
    timeAgo: '1 hour ago',
  },
  {
    id: '2',
    title: 'Strengthening Family Bonds Through Islam',
    author: 'Ustaz Malik Ridwan',
    views: '89k',
    timeAgo: '1 hour ago',
  },
];

// ─── Nav Items ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'news', label: 'News', icon: '📰', hasDot: true },
  { key: 'mosque', label: 'Mosque', icon: '🕌', hasDot: false },
  { key: 'compass', label: 'Compass', icon: '🧭', hasDot: false },
  { key: 'pray', label: 'Pray', icon: '🤲', hasDot: false },
  { key: 'settings', label: 'Settings', icon: '⚙️', hasDot: false },
];

// ─── Sub-components ──────────────────────────────────────────────

function StatusBarOverlay() {
  return (
    <LinearGradient
      colors={['rgba(19,19,19,1)', 'rgba(19,19,19,0)']}
      style={styles.statusBarOverlay}
    >
      <View style={styles.statusBarRow}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarRight}>
          <Text style={styles.statusBarSignal}>📶</Text>
          <Text style={styles.statusBarWifi}>📡</Text>
          <Text style={styles.statusBarBattery}>🔋</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function HeadingSection() {
  return (
    <View style={styles.headingContainer}>
      {/* Top info row */}
      <View style={styles.headingTopRow}>
        <View style={styles.headingTopRowLeft}>
          <View style={styles.headingDateCol}>
            <Text style={styles.islamicDate}>9 Ramadhan 1444H</Text>
            <Text style={styles.locationText}>
              Jakarta, Indonesia - Fajr 2 hour 9 min left
            </Text>
          </View>
        </View>
        <View style={styles.headingTopRowRight}>
          <View style={styles.cameraButton}>
            <Text style={styles.cameraIcon}>📷</Text>
            <View style={styles.cameraDot} />
          </View>
        </View>
      </View>

      {/* Bottom info row */}
      <View style={styles.headingBottomRow}>
        <Text style={styles.timerText}>02:41:21</Text>
        <View style={styles.mosqueInfoWrap}>
          <View style={styles.mosqueCol}>
            <View style={styles.mosqueNameRow}>
              <Text style={styles.mosquePin}>📍</Text>
              <Text style={styles.mosqueName} numberOfLines={1}>
                Al-Firdaus Grand Mosque
              </Text>
            </View>
            <Text style={styles.directLink}>Direct to location →</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function CompassWidget() {
  return (
    <View style={styles.compassContainer}>
      <Image
        source={require('../assets/images/compass-widget.png')}
        style={styles.compassImage}
        resizeMode="contain"
      />
    </View>
  );
}

function InfoBadge() {
  return (
    <View style={styles.infoBadge}>
      <Text style={styles.infoBadgeIcon}>🕋</Text>
      <Text style={styles.infoBadgeText}>
        Your distance to the Kaaba is 9,638km
      </Text>
    </View>
  );
}

function FeatureCard({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.featureCard} activeOpacity={0.7}>
      <View style={[styles.featureIconBox, { backgroundColor: color }]}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>
      <Text style={styles.featureLabel} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FeaturesSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>All Features</Text>
      <View style={styles.featureRow}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} icon={f.icon} label={f.label} color={f.color} />
        ))}
      </View>
    </View>
  );
}

function NewsCard({
  title,
  author,
  views,
  timeAgo,
}: {
  title: string;
  author: string;
  views: string;
  timeAgo: string;
}) {
  return (
    <TouchableOpacity style={styles.newsCard} activeOpacity={0.7}>
      <View style={styles.newsImagePlaceholder} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.newsMeta} numberOfLines={1}>
          {author} - {views} x watching - {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function NewsSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitleAlt}>Today Updates</Text>
      <View style={styles.newsList}>
        {NEWS_ITEMS.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            author={item.author}
            views={item.views}
            timeAgo={item.timeAgo}
          />
        ))}
      </View>
    </View>
  );
}

function BottomNav() {
  const activeTab = 'compass';

  return (
    <View style={styles.bottomNavWrapper}>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomNavGradient}
      >
        <View style={styles.bottomNavRow}>
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeTab;
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.bottomNavItem}
                activeOpacity={0.7}
              >
                <View style={styles.bottomNavIconWrap}>
                  <Text
                    style={[
                      styles.bottomNavIcon,
                      !isActive && styles.bottomNavIconInactive,
                    ]}
                  >
                    {item.icon}
                  </Text>
                  {item.hasDot && <View style={styles.bottomNavDot} />}
                </View>
                <Text
                  style={[
                    styles.bottomNavLabel,
                    !isActive && styles.bottomNavLabelInactive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
      {/* iOS-style home indicator */}
      <View style={styles.homeIndicatorWrap}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────

export default function IslamicHomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header with date, timer, mosque ── */}
        <HeadingSection />

        {/* ── Compass area on bg-soft ── */}
        <View style={styles.compassSection}>
          {/* Dark background rectangle behind compass */}
          <View style={styles.compassBg} />

          <CompassWidget />

          <InfoBadge />
        </View>

        {/* ── Scrollable content container ── */}
        <View style={styles.contentContainer}>
          <FeaturesSection />
          <NewsSection />
        </View>

        {/* Spacer for bottom nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating status bar gradient overlay */}
      <StatusBarOverlay />

      {/* Bottom navigation */}
      <BottomNav />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgSoft,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ─ Status Bar Overlay ─
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 59,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 20 : (StatusBar.currentHeight ?? 0),
  },
  statusBarRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statusBarTime: {
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.light,
  },
  statusBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBarSignal: { fontSize: 12 },
  statusBarWifi: { fontSize: 12 },
  statusBarBattery: { fontSize: 12 },

  // ─ Heading Section ─
  headingContainer: {
    width: '100%',
    backgroundColor: COLORS.dark,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 16,
    gap: 16,
    zIndex: 10,
  },
  headingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  headingTopRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headingDateCol: {
    justifyContent: 'center',
    gap: 2,
  },
  islamicDate: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.light,
    textTransform: 'capitalize',
  },
  locationText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(250, 250, 250, 0.5)',
  },
  headingTopRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cameraButton: {
    width: 32,
    height: 32,
    borderRadius: 99,
    backgroundColor: COLORS.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 14,
  },
  cameraDot: {
    position: 'absolute',
    top: 0,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  headingBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerText: {
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.light,
  },
  mosqueInfoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    maxWidth: '55%',
    height: 35,
  },
  mosqueCol: {
    justifyContent: 'center',
    gap: 2,
  },
  mosqueNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mosquePin: {
    fontSize: 12,
    color: COLORS.primary,
  },
  mosqueName: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  directLink: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(250, 250, 250, 0.5)',
  },

  // ─ Compass Section ─
  compassSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 0,
    position: 'relative',
  },
  compassBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: COLORS.dark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  compassContainer: {
    width: 328,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  compassImage: {
    width: 348,
    height: 370,
  },

  // ─ Info Badge ─
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  infoBadgeIcon: {
    fontSize: 16,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoBadgeText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(250, 250, 250, 0.7)',
    textAlign: 'center',
  },

  // ─ Content Container ─
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 32,
  },

  // ─ Section ─
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    color: COLORS.light,
    textAlign: 'center',
  },
  sectionTitleAlt: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.light,
    textAlign: 'left',
  },

  // ─ Features ─
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: (SCREEN_WIDTH - 32 - 64) / 5,
    alignItems: 'center',
    gap: 8,
  },
  featureIconBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 22,
  },
  featureLabel: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.light,
    textAlign: 'center',
    width: '100%',
  },

  // ─ News ─
  newsList: {
    gap: 32,
  },
  newsCard: {
    width: '100%',
    gap: 16,
  },
  newsImagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: COLORS.gray4,
  },
  newsContent: {
    width: '100%',
    gap: 8,
  },
  newsTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.light,
    textAlign: 'left',
  },
  newsMeta: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.12,
    color: 'rgba(250, 250, 250, 0.7)',
    textAlign: 'left',
  },

  // ─ Bottom Navigation ─
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  bottomNavGradient: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 4,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  bottomNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
    borderRadius: 8,
  },
  bottomNavIconWrap: {
    position: 'relative',
    width: 32,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  bottomNavIconInactive: {
    opacity: 0.4,
  },
  bottomNavLabel: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13,
    color: COLORS.light,
    textAlign: 'center',
  },
  bottomNavLabelInactive: {
    opacity: 0.4,
  },
  bottomNavDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  homeIndicatorWrap: {
    width: '100%',
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
    paddingBottom: Platform.OS === 'ios' ? 8 : 4,
  },
  homeIndicator: {
    width: 139,
    height: 5,
    borderRadius: 100,
    backgroundColor: COLORS.light,
    opacity: 0.3,
  },
});
