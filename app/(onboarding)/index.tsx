import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useRef, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler,
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  type SharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY = '#f48c25';
const PRIMARY_DARK = '#e07b15';
const TEXT_PRIMARY = '#1f2937';
const TEXT_SECONDARY = '#6b7280';
const BG_WARM = '#FFF5EB';
const ONBOARDING_KEY = '@habit_tracker_onboarding_complete';

// ============================================
// 📋 SLIDE DATA
// ============================================
const slides = [
  {
    id: 1,
    title: 'Jangan Lewatkan\nSholat',
    titleHighlight: '',
    description:
      'Dapatkan notifikasi tepat waktu, lacak sholat harian Anda, dan bangun kebiasaan konsisten yang membawa ketenangan.',
    buttonText: 'Mulai Melacak',
    image:
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=1000&fit=crop',
    badgeText: '',
    badgeIcon: '',
    imageStyle: 'full' as const,
  },
  {
    id: 2,
    title: 'Jaga Nutrisi\nTubuh & Jiwa',
    titleHighlight: '',
    description:
      'Lacak kalori, makro, dan makanan Sunnah dengan mudah untuk menjaga gaya hidup sehat dan seimbang.',
    buttonText: 'Mulai Melacak',
    image:
      'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&h=1000&fit=crop',
    badgeText: 'Makanan Sunnah',
    badgeIcon: 'leaf',
    imageStyle: 'full' as const,
  },
  {
    id: 3,
    title: 'Lacak Setiap\nRupiah',
    titleHighlight: '',
    description:
      'Dapatkan kejelasan penuh atas keuangan Anda. Kategorikan pengeluaran, atur anggaran, dan kembangkan harta dengan penuh kesadaran.',
    buttonText: 'Kelola Keuangan',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop',
    badgeText: '',
    badgeIcon: '',
    imageStyle: 'centered' as const,
  },
  {
    id: 4,
    title: 'Keberkahan dalam',
    titleHighlight: 'Pekerjaan',
    description:
      'Lacak tujuan profesional Anda, kelola tugas secara efisien, dan atur jadwal kerja sesuai waktu sholat untuk hidup yang seimbang dan produktif.',
    buttonText: 'Optimalkan Kerja',
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=1000&fit=crop',
    badgeText: '',
    badgeIcon: '',
    imageStyle: 'rounded' as const,
  },
];

// ============================================
// 🖼️ SLIDE COMPONENT
// ============================================
const OnboardingSlide = ({
  item,
  index,
  scrollX,
}: {
  item: (typeof slides)[0];
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const imageAnimStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [60, 0, -60],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }, { translateX }],
      opacity,
    };
  });

  const textAnimStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [40, 0, -40],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const isCentered = item.imageStyle === 'centered';
  const isRounded = item.imageStyle === 'rounded';
  const imageContainerHeight = isCentered ? '42%' : '55%';

  return (
    <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
      {/* Image Section */}
      <Animated.View
        style={[
          imageAnimStyle,
          {
            height: imageContainerHeight,
            paddingHorizontal: 20,
            paddingTop: isCentered ? 32 : 8,
            justifyContent: isCentered ? 'center' : 'flex-start',
          },
        ]}
      >
        <View
          style={[
            styles.imageWrapper,
            {
              borderRadius: 24,
              overflow: 'hidden',
            },
            isRounded && styles.imageFramed,
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />

          {/* Floating Badge */}
          {item.badgeText ? (
            <View style={styles.floatingBadge}>
              <MaterialCommunityIcons
                name={item.badgeIcon as any}
                size={18}
                color={PRIMARY}
              />
              <Text style={styles.badgeText}>{item.badgeText}</Text>
            </View>
          ) : null}
        </View>
      </Animated.View>

      {/* Text Section */}
      <Animated.View style={[textAnimStyle, styles.textContainer]}>
        <Text style={styles.slideTitle}>
          {item.title}
          {item.titleHighlight ? (
            <Text style={styles.slideTitleHighlight}>
              {'\n'}
              {item.titleHighlight}
            </Text>
          ) : null}
        </Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};

// ============================================
// 🔵 PAGINATION DOT
// ============================================
const PaginationDot = ({
  index,
  scrollX,
  total,
}: {
  index: number;
  scrollX: SharedValue<number>;
  total: number;
}) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 28, 8],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolation.CLAMP,
    );
    const backgroundColor =
      interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP) >
      0.5
        ? PRIMARY
        : '#d1d5db';

    return {
      width,
      opacity,
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

// ============================================
// 🏠 FINAL SLIDE COMPONENT
// ============================================
const FinalSlide = ({
  onStart,
  onCustomize,
}: {
  onStart: () => void;
  onCustomize: () => void;
}) => {
  return (
    <View style={{ width: SCREEN_WIDTH, flex: 1, justifyContent: 'center' }}>
      {/* Big circle with icon */}
      <View style={styles.finalSlideTop}>
        {/* Outer decorative ring */}
        <Animated.View
          entering={ZoomIn.duration(600).delay(200)}
          style={styles.outerRing}
        >
          {/* Inner white circle */}
          <View style={styles.innerCircle}>
            {/* App Icon / Checkmark */}
            <View style={styles.checkmarkBox}>
              <LinearGradient
                colors={['#1a8a7d', '#0d7377']}
                style={StyleSheet.absoluteFill}
              />
              {/* Decorative dots */}
              <View
                style={[
                  styles.decorativeDot,
                  {
                    top: 20,
                    left: 18,
                    width: 8,
                    height: 8,
                    backgroundColor: 'rgba(59,130,246,0.6)',
                  },
                ]}
              />
              <View
                style={[
                  styles.decorativeDot,
                  {
                    bottom: 24,
                    right: 16,
                    width: 10,
                    height: 10,
                    backgroundColor: 'rgba(34,197,94,0.6)',
                  },
                ]}
              />
              <View
                style={[
                  styles.decorativeDot,
                  {
                    top: 18,
                    right: 28,
                    width: 6,
                    height: 6,
                    backgroundColor: 'rgba(168,85,247,0.5)',
                  },
                ]}
              />
              {/* Main Checkmark */}
              <MaterialCommunityIcons
                name="check-bold"
                size={72}
                color={PRIMARY}
              />
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Text */}
      <Animated.View
        entering={FadeInDown.duration(500).delay(400)}
        style={styles.finalTextContainer}
      >
        <Text style={styles.finalTitle}>Bismillah, Mari Mulai</Text>
        <Text style={styles.finalDescription}>
          Waktu sholat, target Al-Quran, dan kebiasaan Anda sudah siap. Kami
          telah menyesuaikan jadwal berdasarkan preferensi Anda.
        </Text>
      </Animated.View>

      {/* Buttons */}
      <Animated.View
        entering={FadeInUp.duration(500).delay(600)}
        style={styles.finalButtonContainer}
      >
        <TouchableOpacity
          onPress={onStart}
          style={styles.primaryButton}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[PRIMARY, PRIMARY_DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 28 }]}
          />
          <Text style={styles.primaryButtonText}>Mulai Gunakan Aplikasi</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCustomize}
          style={styles.secondaryButton}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Sesuaikan Pengalaman</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// ============================================
// 🎬 MAIN ONBOARDING SCREEN
// ============================================
export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<Animated.FlatList<any>>(null);

  const totalPages = slides.length + 1; // 4 slides + 1 final

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (e) {
      console.log('Error saving onboarding state:', e);
    }
    router.replace('/(tabs)');
  }, [router]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalPages - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  }, [currentIndex, totalPages, completeOnboarding]);

  const handleSkip = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  const handleCustomize = useCallback(() => {
    // Navigate to settings or a customization flow
    completeOnboarding();
  }, [completeOnboarding]);

  // Data for FlatList: slides + final
  const allPages = [...slides, { id: 99, isFinal: true }];

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item.isFinal) {
        return (
          <FinalSlide
            onStart={completeOnboarding}
            onCustomize={handleCustomize}
          />
        );
      }
      return <OnboardingSlide item={item} index={index} scrollX={scrollX} />;
    },
    [scrollX, completeOnboarding, handleCustomize],
  );

  const isLastSlide = currentIndex === totalPages - 1;
  const isOnFinalSlide = currentIndex === slides.length;
  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={['#FFFFFF', BG_WARM, 'rgba(244,140,37,0.12)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header: Skip button (hidden on final slide) */}
        {!isOnFinalSlide ? (
          <View style={styles.header}>
            <View style={{ width: 60 }} />
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={handleSkip}
              style={styles.skipButton}
              activeOpacity={0.7}
            >
              <Text style={styles.skipText}>Lewati</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ height: 48 }} />
        )}

        {/* Slides */}
        <Animated.FlatList
          ref={flatListRef as any}
          data={allPages}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          bounces={false}
          style={{ flex: 1 }}
        />

        {/* Bottom Section (hidden on final slide — final has its own buttons) */}
        {!isOnFinalSlide ? (
          <View style={styles.bottomSection}>
            {/* Pagination */}
            <View style={styles.paginationContainer}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationDot
                  key={i}
                  index={i}
                  scrollX={scrollX}
                  total={totalPages}
                />
              ))}
            </View>

            {/* Primary CTA Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={styles.ctaButton}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[PRIMARY, PRIMARY_DARK]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill, { borderRadius: 28 }]}
              />
              <Text style={styles.ctaButtonText}>
                {currentSlide?.buttonText || 'Lanjut'}
              </Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        ) : (
          /* Pagination at bottom for final slide */
          <View style={styles.finalPaginationRow}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationDot
                key={i}
                index={i}
                scrollX={scrollX}
                total={totalPages}
              />
            ))}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

// ============================================
// 🎨 STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 48,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY,
  },

  // Image
  imageWrapper: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  imageFramed: {
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.18,
        shadowRadius: 28,
      },
      android: {
        elevation: 16,
      },
    }),
  },

  // Floating badge
  floatingBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },

  // Text Content
  textContainer: {
    paddingHorizontal: 28,
    paddingTop: 28,
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 42,
    marginBottom: 12,
  },
  slideTitleHighlight: {
    color: PRIMARY,
    fontSize: 34,
    fontWeight: '800',
  },
  slideDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 24 : 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // CTA Button
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  // ======== FINAL SLIDE ========
  finalSlideTop: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    flex: 1,
  },
  outerRing: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(244,140,37,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244,140,37,0.08)',
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  checkmarkBox: {
    width: 130,
    height: 130,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  decorativeDot: {
    position: 'absolute',
    borderRadius: 999,
  },

  finalTextContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  finalTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  finalDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 4,
  },

  finalButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: PRIMARY,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 28,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_SECONDARY,
  },

  finalPaginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 24 : 16,
  },
});
