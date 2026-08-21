import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { addMeal } from '@/services';
import { getTodayString } from '@/lib/utils';
import type { MealType } from '@/types';

const PRIMARY = '#22c55e';

const MEAL_LABELS: Record<string, string> = {
  sarapan: 'Sarapan',
  'makan-siang': 'Makan Siang',
  'makan-malam': 'Makan Malam',
};

const MEAL_ICONS: Record<string, string> = {
  sarapan: 'weather-sunny',
  'makan-siang': 'white-balance-sunny',
  'makan-malam': 'weather-night',
};

const POPULAR_FOODS = [
  { id: '1', name: 'Nasi Putih', calories: 204, portion: '1 piring', icon: 'rice', category: 'Karbohidrat' },
  { id: '2', name: 'Ayam Goreng', calories: 260, portion: '1 potong', icon: 'food-drumstick', category: 'Protein' },
  { id: '3', name: 'Telur Rebus', calories: 155, portion: '2 butir', icon: 'egg', category: 'Protein' },
  { id: '4', name: 'Tempe Goreng', calories: 160, portion: '3 potong', icon: 'food-variant', category: 'Protein' },
  { id: '5', name: 'Tahu Goreng', calories: 130, portion: '3 potong', icon: 'food-variant', category: 'Protein' },
  { id: '6', name: 'Sayur Bayam', calories: 36, portion: '1 mangkuk', icon: 'leaf', category: 'Sayuran' },
  { id: '7', name: 'Nasi Goreng', calories: 370, portion: '1 piring', icon: 'rice', category: 'Karbohidrat' },
  { id: '8', name: 'Mie Goreng', calories: 390, portion: '1 piring', icon: 'noodles', category: 'Karbohidrat' },
  { id: '9', name: 'Soto Ayam', calories: 180, portion: '1 mangkuk', icon: 'bowl-mix', category: 'Sup' },
  { id: '10', name: 'Gado-Gado', calories: 250, portion: '1 porsi', icon: 'food', category: 'Sayuran' },
  { id: '11', name: 'Rendang', calories: 340, portion: '1 potong', icon: 'food-steak', category: 'Protein' },
  { id: '12', name: 'Pisang', calories: 89, portion: '1 buah', icon: 'fruit-watermelon', category: 'Buah' },
];

const CAT_ICONS: Record<string, string> = {
  Semua: 'food-apple-outline',
  Karbohidrat: 'barley',
  Protein: 'food-steak',
  Sayuran: 'leaf',
  Buah: 'fruit-watermelon',
  Sup: 'bowl-mix',
};
const CATEGORIES = ['Semua', 'Karbohidrat', 'Protein', 'Sayuran', 'Buah', 'Sup'];

export default function AddFoodScreen() {
  const { meal } = useLocalSearchParams<{ meal?: string }>();
  const mealLabel = MEAL_LABELS[meal ?? ''] ?? 'Makanan';
  const mealIcon = MEAL_ICONS[meal ?? ''] ?? 'food';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [addedFoods, setAddedFoods] = useState<string[]>([]);
  const bottomBarAnim = useRef(new Animated.Value(0)).current;

  // Animate bottom bar in/out
  useEffect(() => {
    Animated.spring(bottomBarAnim, {
      toValue: addedFoods.length > 0 ? 1 : 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [addedFoods.length, bottomBarAnim]);

  const filteredFoods = POPULAR_FOODS.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFood = (food: (typeof POPULAR_FOODS)[0]) => {
    if (addedFoods.includes(food.id)) {
      setAddedFoods((prev) => prev.filter((id) => id !== food.id));
    } else {
      setAddedFoods((prev) => [...prev, food.id]);
    }
  };

  const totalCalories = POPULAR_FOODS
    .filter((f) => addedFoods.includes(f.id))
    .reduce((s, f) => s + f.calories, 0);

  const handleSave = async () => {
    if (addedFoods.length === 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu makanan.');
      return;
    }
    const selectedItems = POPULAR_FOODS.filter((f) => addedFoods.includes(f.id));
    const totalCal = selectedItems.reduce((s, f) => s + f.calories, 0);
    const now = new Date();
    const today = getTodayString();
    const mealTypeMap: Record<string, MealType> = {
      sarapan: 'Sarapan',
      'makan-siang': 'Makan Siang',
      'makan-malam': 'Makan Malam',
    };
    const mealType = mealTypeMap[meal ?? ''] ?? 'Snack';
    await addMeal(today, {
      name: selectedItems.map((f) => f.name).join(', '),
      type: mealType,
      calories: totalCal,
      items: selectedItems.map((f) => f.name),
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    });
    Alert.alert(
      'Berhasil!',
      `${selectedItems.map((f) => f.name).join(', ')}\nTotal: ${totalCal} kkal ditambahkan ke ${mealLabel}.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8faf8' }}>
      <LinearGradient colors={['#f0fdf4', '#f8faf8']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* ── Header ─────────────────────────────── */}
          <View style={st.header}>
            <TouchableOpacity onPress={() => router.back()} style={st.backBtn}>
              <MaterialCommunityIcons name="arrow-left" size={22} color="#374151" />
            </TouchableOpacity>
            <View style={st.headerCenter}>
              <View style={[st.headerMealIcon, { backgroundColor: `${PRIMARY}15` }]}>
                <MaterialCommunityIcons name={mealIcon as any} size={16} color={PRIMARY} />
              </View>
              <Text style={st.headerTitle}>Tambah {mealLabel}</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* ── Search bar ─────────────────────────── */}
          <View style={{ paddingHorizontal: 20, marginTop: 4, marginBottom: 4 }}>
            <View style={st.searchBar}>
              <MaterialCommunityIcons name="magnify" size={20} color="#9ca3af" />
              <TextInput
                style={st.searchInput}
                placeholder="Cari makanan favorit..."
                placeholderTextColor="#b0b0b0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialCommunityIcons name="close-circle" size={18} color="#d1d5db" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* ── Category chips ─────────────────────── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingVertical: 10 }}
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                >
                  {active ? (
                    <LinearGradient
                      colors={[PRIMARY, '#16a34a']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={st.categoryChip}
                    >
                      <MaterialCommunityIcons name={CAT_ICONS[cat] as any} size={14} color="#fff" />
                      <Text style={[st.categoryText, { color: '#fff' }]}>{cat}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[st.categoryChip, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' }]}>
                      <MaterialCommunityIcons name={CAT_ICONS[cat] as any} size={14} color="#9ca3af" />
                      <Text style={st.categoryText}>{cat}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ── Food grid ──────────────────────────── */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: addedFoods.length > 0 ? 120 : 40 }}
          >
            <Text style={st.sectionLabel}>Populer</Text>
            {filteredFoods.map((food) => {
              const isAdded = addedFoods.includes(food.id);
              return (
                <TouchableOpacity
                  key={food.id}
                  onPress={() => handleAddFood(food)}
                  activeOpacity={0.7}
                  style={[st.foodCard, isAdded && st.foodCardSelected]}
                >
                  {/* Icon */}
                  <View style={[st.foodIcon, { backgroundColor: isAdded ? `${PRIMARY}15` : '#f3f4f6' }]}>
                    <MaterialCommunityIcons name={food.icon as any} size={22} color={isAdded ? PRIMARY : '#6b7280'} />
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={st.foodName}>{food.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <View style={st.portionBadge}>
                        <Text style={st.portionText}>{food.portion}</Text>
                      </View>
                      <View style={st.catBadge}>
                        <Text style={st.catBadgeText}>{food.category}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Calories */}
                  <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                    <Text style={[st.foodCal, { color: isAdded ? PRIMARY : '#374151' }]}>{food.calories}</Text>
                    <Text style={{ fontSize: 10, color: '#b0b0b0', fontWeight: '500' }}>kkal</Text>
                  </View>

                  {/* Checkbox */}
                  <View style={[st.checkBox, isAdded && st.checkBoxActive]}>
                    {isAdded && <MaterialCommunityIcons name="check" size={14} color="#fff" />}
                  </View>
                </TouchableOpacity>
              );
            })}

            {filteredFoods.length === 0 && (
              <View style={st.emptyState}>
                <View style={st.emptyIcon}>
                  <MaterialCommunityIcons name="food-off" size={32} color="#d1d5db" />
                </View>
                <Text style={st.emptyTitle}>Tidak ditemukan</Text>
                <Text style={st.emptySub}>Coba kata kunci atau kategori lain</Text>
              </View>
            )}
          </ScrollView>

          {/* ── Bottom action bar ──────────────────── */}
          <Animated.View
            style={[
              st.bottomBar,
              {
                transform: [{
                  translateY: bottomBarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [120, 0],
                  }),
                }],
                opacity: bottomBarAnim,
              },
            ]}
          >
            <View style={st.bottomBarInner}>
              <View>
                <Text style={st.bottomBarCount}>{addedFoods.length} item dipilih</Text>
                <Text style={st.bottomBarCal}>{totalCalories} kkal total</Text>
              </View>
              <TouchableOpacity onPress={handleSave} activeOpacity={0.85}>
                <LinearGradient
                  colors={[PRIMARY, '#16a34a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={st.saveBtn}
                >
                  <MaterialCommunityIcons name="check" size={20} color="#fff" />
                  <Text style={st.saveBtnText}>Simpan</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const st = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerMealIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  // Category chips
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },

  // Section label
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 4,
  },

  // Food card
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  foodCardSelected: {
    borderColor: PRIMARY,
    backgroundColor: '#f0fdf4',
    shadowColor: PRIMARY,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  foodIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  portionBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  portionText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6b7280',
  },
  catBadge: {
    backgroundColor: `${PRIMARY}12`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: PRIMARY,
  },
  foodCal: {
    fontSize: 18,
    fontWeight: '800',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  emptySub: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 4,
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    backgroundColor: 'rgba(248,250,248,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bottomBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBarCount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  bottomBarCal: {
    fontSize: 13,
    fontWeight: '600',
    color: PRIMARY,
    marginTop: 1,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
