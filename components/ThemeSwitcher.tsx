import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useThemeContext, THEMES, ThemeKey } from '@/lib/ThemeContext';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function ThemeSwitcher() {
  const { theme, themeKey, setTheme, cycleTheme } = useThemeContext();
  const [showPicker, setShowPicker] = useState(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePress = () => {
    // Animate the button
    scale.value = withSequence(
      withSpring(0.8, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 400 })
    );
    rotation.value = withSequence(
      withTiming(rotation.value + 360, { duration: 500 }),
    );
    
    setShowPicker(true);
  };

  const handleSelectTheme = (key: ThemeKey) => {
    setTheme(key);
    setShowPicker(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const themeEntries = Object.entries(THEMES) as [ThemeKey, typeof THEMES[ThemeKey]][];

  return (
    <>
      {/* Floating Button */}
      <AnimatedTouchable
        onPress={handlePress}
        style={[
          styles.floatingButton,
          animatedStyle,
          { backgroundColor: theme.primary }
        ]}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="palette" size={28} color="#fff" />
      </AnimatedTouchable>

      {/* Theme Picker Modal */}
      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Tema</Text>
              <Text style={styles.modalSubtitle}>Customize tampilan aplikasimu</Text>
            </View>

            <View style={styles.themeGrid}>
              {themeEntries.map(([key, t]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleSelectTheme(key)}
                  style={[
                    styles.themeOption,
                    themeKey === key && styles.themeOptionActive,
                    themeKey === key && { borderColor: t.primary }
                  ]}
                >
                  <View style={[styles.themePreview, { backgroundColor: t.gradient[2] }]}>
                    <View style={[styles.themeCircle, { backgroundColor: t.primary }]}>
                      <MaterialCommunityIcons name={t.icon as any} size={24} color="#fff" />
                    </View>
                  </View>
                  <Text style={[
                    styles.themeName,
                    themeKey === key && { color: t.primary, fontWeight: '700' }
                  ]}>
                    {t.name}
                  </Text>
                  {themeKey === key && (
                    <View style={[styles.checkBadge, { backgroundColor: t.primary }]}>
                      <MaterialCommunityIcons name="check" size={12} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.closeButtonText}>Selesai</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181411',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  themeOption: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f9fafb',
  },
  themeOptionActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  themePreview: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  themeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

