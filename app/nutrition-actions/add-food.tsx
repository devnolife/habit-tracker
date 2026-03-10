import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const PRIMARY = '#22c55e';

const MEAL_LABELS: Record<string, string> = {
  sarapan: 'Sarapan',
  'makan-siang': 'Makan Siang',
  'makan-malam': 'Makan Malam',
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

const CATEGORIES = ['Semua', 'Karbohidrat', 'Protein', 'Sayuran', 'Buah', 'Sup'];

export default function AddFoodScreen() {
  const { meal } = useLocalSearchParams<{ meal?: string }>();
  const mealLabel = MEAL_LABELS[meal ?? ''] ?? 'Makanan';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [addedFoods, setAddedFoods] = useState<string[]>([]);

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

  const handleSave = () => {
    if (addedFoods.length === 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu makanan.');
      return;
    }
    const selectedNames = POPULAR_FOODS.filter((f) => addedFoods.includes(f.id)).map((f) => f.name);
    const totalCal = POPULAR_FOODS.filter((f) => addedFoods.includes(f.id)).reduce((s, f) => s + f.calories, 0);
    Alert.alert(
      'Makanan Ditambahkan! ✅',
      `${selectedNames.join(', ')}\nTotal: ${totalCal} kkal ditambahkan ke ${mealLabel}.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0fdf4' }}>
      <LinearGradient colors={['#f0fdf4', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tambah {mealLabel}</Text>
            <TouchableOpacity onPress={handleSave} style={[styles.backButton, { backgroundColor: PRIMARY }]}>
              <MaterialCommunityIcons name="check" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={{ paddingHorizontal: 24, marginTop: 4 }}>
            <View style={styles.searchBar}>
              <MaterialCommunityIcons name="magnify" size={22} color="#9ca3af" />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari makanan..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialCommunityIcons name="close-circle" size={20} color="#d1d5db" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8, paddingVertical: 12 }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat && { backgroundColor: PRIMARY, borderColor: PRIMARY },
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat && { color: '#fff' },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Selected count */}
          {addedFoods.length > 0 && (
            <View style={styles.selectedBanner}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: PRIMARY }}>
                {addedFoods.length} makanan dipilih •{' '}
                {POPULAR_FOODS.filter((f) => addedFoods.includes(f.id)).reduce((s, f) => s + f.calories, 0)} kkal
              </Text>
            </View>
          )}

          {/* Food List */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {filteredFoods.map((food) => {
              const isAdded = addedFoods.includes(food.id);
              return (
                <TouchableOpacity
                  key={food.id}
                  onPress={() => handleAddFood(food)}
                  style={[styles.foodCard, isAdded && { borderColor: PRIMARY, borderWidth: 2 }]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.foodIcon, { backgroundColor: PRIMARY + '15' }]}>
                    <MaterialCommunityIcons name={food.icon as any} size={22} color={PRIMARY} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodPortion}>{food.portion}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.foodCalories, { color: PRIMARY }]}>{food.calories}</Text>
                    <Text style={{ fontSize: 11, color: '#9ca3af' }}>kkal</Text>
                  </View>
                  <View style={[styles.checkBox, isAdded && { backgroundColor: PRIMARY, borderColor: PRIMARY }]}>
                    {isAdded && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
                  </View>
                </TouchableOpacity>
              );
            })}

            {filteredFoods.length === 0 && (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151' }}>Tidak ditemukan</Text>
                <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Coba kata kunci lain</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  selectedBanner: {
    marginHorizontal: 24,
    backgroundColor: PRIMARY + '15',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  foodIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodName: { fontSize: 15, fontWeight: '600', color: '#111' },
  foodPortion: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  foodCalories: { fontSize: 18, fontWeight: '800' },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
