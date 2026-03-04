import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation, useAnimatedScrollHandler } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY = "#f48c25";

// Onboarding slides data
const slides = [
  {
    id: 1,
    title: "Never Miss a Prayer",
    description: "Get timely notifications, track your daily Salah, and build a consistent habit that brings peace to your day.",
    icon: "mosque",
    bgGradient: ['rgba(244,140,37,0.05)', 'rgba(244,140,37,0.2)'],
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Nourish Your Body & Soul",
    description: "Track your calories, macros, and Sunnah foods effortlessly to maintain a balanced, healthy lifestyle.",
    icon: "food-apple",
    bgGradient: ['rgba(34,197,94,0.05)', 'rgba(34,197,94,0.2)'],
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Track Every Dinar",
    description: "Gain full clarity on your finances. Categorize expenses, set budgets, and grow your wealth with mindfulness.",
    icon: "wallet",
    bgGradient: ['rgba(59,130,246,0.05)', 'rgba(59,130,246,0.2)'],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    title: "Barakah in Your Business",
    description: "Track your professional goals, manage tasks efficiently, and schedule work around your prayers for a balanced, productive life.",
    icon: "briefcase",
    bgGradient: ['rgba(168,85,247,0.05)', 'rgba(168,85,247,0.2)'],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=800&fit=crop",
  },
];

// Single Slide Component
const OnboardingSlide = ({ item, index, scrollX }: { item: typeof slides[0]; index: number; scrollX: Animated.SharedValue<number> }) => {
  const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 24 }}>
      <Animated.View style={[animatedStyle, { flex: 1, justifyContent: 'center' }]}>
        {/* Illustration Container */}
        <View style={[styles.imageContainer, { aspectRatio: 4/5, maxHeight: '50%', marginBottom: 32, borderRadius: 24, overflow: 'hidden' }]}>
          <LinearGradient
            colors={item.bgGradient as [string, string]}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          {/* Floating Badge */}
          <View style={[styles.floatingBadge, { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
            <MaterialCommunityIcons name={item.icon as any} size={20} color={PRIMARY} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#181411' }}>
              {index === 0 ? 'Prayer Tracker' : index === 1 ? 'Food Tracker' : index === 2 ? 'Expense Tracker' : 'Work Tracker'}
            </Text>
          </View>
        </View>

        {/* Text Content */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#181411', textAlign: 'center', letterSpacing: -0.5, marginBottom: 12 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#8a7560', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 }}>
            {item.description}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

// Pagination Dot Component
const PaginationDot = ({ index, scrollX }: { index: number; scrollX: Animated.SharedValue<number> }) => {
  const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(scrollX.value, inputRange, [8, 24, 8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolation.CLAMP);

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: PRIMARY,
          marginHorizontal: 4,
        }
      ]}
    />
  );
};

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<Animated.FlatList<typeof slides[0]>>(null);

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

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f7f5' }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#fff', 'rgba(244,140,37,0.05)', 'rgba(244,140,37,0.2)']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Skip Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 8 }}>
          <TouchableOpacity onPress={handleSkip} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#8a7560' }}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Slides */}
        <Animated.FlatList
          ref={flatListRef as any}
          data={slides}
          renderItem={({ item, index }) => (
            <OnboardingSlide item={item} index={index} scrollX={scrollX} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          style={{ flex: 1 }}
        />

        {/* Bottom Section */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          {/* Pagination */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
            {slides.map((_, index) => (
              <PaginationDot key={index} index={index} scrollX={scrollX} />
            ))}
          </View>

          {/* Primary Button */}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.primaryButton, { backgroundColor: PRIMARY, paddingVertical: 18, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }]}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>
              {currentIndex === slides.length - 1 ? 'Start Using App' : 'Continue'}
            </Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 10,
    backgroundColor: '#fff',
  },
  floatingBadge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
});
