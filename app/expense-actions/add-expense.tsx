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
import { router } from 'expo-router';
import { useState } from 'react';

const PRIMARY = '#ef4444';

const CATEGORIES = [
  { icon: 'food', label: 'Makanan', color: '#f97316' },
  { icon: 'bus', label: 'Transportasi', color: '#3b82f6' },
  { icon: 'shopping', label: 'Belanja', color: '#ec4899' },
  { icon: 'flash', label: 'Tagihan', color: '#eab308' },
  { icon: 'medical-bag', label: 'Kesehatan', color: '#22c55e' },
  { icon: 'school', label: 'Pendidikan', color: '#6366f1' },
  { icon: 'gamepad-variant', label: 'Hiburan', color: '#8b5cf6' },
  { icon: 'dots-horizontal', label: 'Lainnya', color: '#6b7280' },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Makanan');
  const [selectedDate] = useState(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));

  const handleSave = () => {
    if (!amount.trim()) {
      Alert.alert('Perhatian', 'Jumlah pengeluaran tidak boleh kosong.');
      return;
    }
    const cat = CATEGORIES.find((c) => c.label === selectedCategory);
    Alert.alert(
      'Pengeluaran Dicatat! ✅',
      `${cat?.label}: Rp ${parseInt(amount.replace(/\D/g, ''), 10).toLocaleString('id-ID')}\n${description || '(tanpa deskripsi)'}\nTanggal: ${selectedDate}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fef2f2' }}>
      <LinearGradient colors={['#fef2f2', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tambah Pengeluaran</Text>
            <TouchableOpacity onPress={handleSave} style={[styles.backButton, { backgroundColor: PRIMARY }]}>
              <MaterialCommunityIcons name="check" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {/* Amount Input */}
            <View style={styles.amountCard}>
              <Text style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Jumlah</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: '#6b7280' }}>Rp</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#d1d5db"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(t) => setAmount(t.replace(/\D/g, ''))}
                  autoFocus
                />
              </View>
            </View>

            {/* Date */}
            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar" size={20} color="#6b7280" />
              <Text style={{ fontSize: 14, color: '#374151', fontWeight: '500' }}>{selectedDate}</Text>
            </View>

            {/* Category */}
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.label}
                  onPress={() => setSelectedCategory(cat.label)}
                  style={[
                    styles.categoryCard,
                    selectedCategory === cat.label && { borderColor: cat.color, backgroundColor: cat.color + '10' },
                  ]}
                >
                  <View style={[styles.catIcon, { backgroundColor: cat.color + '15' }]}>
                    <MaterialCommunityIcons name={cat.icon as any} size={22} color={cat.color} />
                  </View>
                  <Text
                    style={[
                      styles.catLabel,
                      selectedCategory === cat.label && { color: cat.color, fontWeight: '700' },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Description */}
            <Text style={styles.label}>Deskripsi (opsional)</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="Contoh: Makan siang di kantin..."
                placeholderTextColor="#9ca3af"
                value={description}
                onChangeText={setDescription}
              />
            </View>
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
    paddingBottom: 12,
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
  amountCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111',
    marginLeft: 8,
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '22%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#f3f4f6',
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catLabel: { fontSize: 11, color: '#6b7280', fontWeight: '500', textAlign: 'center' },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  textInput: { fontSize: 15, color: '#111' },
});
