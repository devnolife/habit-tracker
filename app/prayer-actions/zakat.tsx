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

const PRIMARY = '#098E8F';
const NISAB_EMAS_GRAM = 85; // 85 gram emas
const NISAB_HARGA_PER_GRAM = 1_100_000; // estimasi harga emas per gram (IDR)
const NISAB_THRESHOLD = NISAB_EMAS_GRAM * NISAB_HARGA_PER_GRAM;
const ZAKAT_RATE = 0.025;

type AssetKey = 'tabungan' | 'emas' | 'perak' | 'investasi' | 'piutang' | 'hutang';

const ASSET_FIELDS: { key: AssetKey; label: string; icon: string; placeholder: string }[] = [
  { key: 'tabungan', label: 'Tabungan & Deposito', icon: 'bank', placeholder: '0' },
  { key: 'emas', label: 'Emas & Perhiasan', icon: 'gold', placeholder: '0' },
  { key: 'perak', label: 'Perak', icon: 'circle-outline', placeholder: '0' },
  { key: 'investasi', label: 'Saham & Investasi', icon: 'chart-line', placeholder: '0' },
  { key: 'piutang', label: 'Piutang (yang bisa ditagih)', icon: 'cash-plus', placeholder: '0' },
  { key: 'hutang', label: 'Hutang (pengurang)', icon: 'cash-minus', placeholder: '0' },
];

const formatCurrency = (amount: number) => {
  return 'Rp ' + amount.toLocaleString('id-ID');
};

export default function ZakatScreen() {
  const [assets, setAssets] = useState<Record<AssetKey, string>>({
    tabungan: '',
    emas: '',
    perak: '',
    investasi: '',
    piutang: '',
    hutang: '',
  });
  const [calculated, setCalculated] = useState(false);

  const parseAmount = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const totalHarta =
    parseAmount(assets.tabungan) +
    parseAmount(assets.emas) +
    parseAmount(assets.perak) +
    parseAmount(assets.investasi) +
    parseAmount(assets.piutang);

  const totalHutang = parseAmount(assets.hutang);
  const hartaBersih = totalHarta - totalHutang;
  const memenuhinNisab = hartaBersih >= NISAB_THRESHOLD;
  const zakatAmount = memenuhinNisab ? hartaBersih * ZAKAT_RATE : 0;

  const handleCalculate = () => {
    if (totalHarta === 0) {
      Alert.alert('Perhatian', 'Silakan masukkan nilai harta terlebih dahulu.');
      return;
    }
    setCalculated(true);
  };

  const handleReset = () => {
    setAssets({ tabungan: '', emas: '', perak: '', investasi: '', piutang: '', hutang: '' });
    setCalculated(false);
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
            <Text style={styles.headerTitle}>Kalkulator Zakat</Text>
            <TouchableOpacity onPress={handleReset} style={styles.backButton}>
              <MaterialCommunityIcons name="refresh" size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
          >
            {/* Nisab Info */}
            <View style={[styles.card, { backgroundColor: PRIMARY + '15', borderColor: PRIMARY + '30' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialCommunityIcons name="information-outline" size={20} color={PRIMARY} />
                <Text style={{ fontSize: 13, color: PRIMARY, fontWeight: '600', flex: 1 }}>
                  Nisab saat ini: {formatCurrency(NISAB_THRESHOLD)} ({NISAB_EMAS_GRAM}g emas)
                </Text>
              </View>
            </View>

            {/* Asset Input Fields */}
            <Text style={styles.sectionTitle}>Masukkan Harta Anda</Text>

            {ASSET_FIELDS.map((field) => (
              <View key={field.key} style={styles.inputCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <View style={[styles.iconBox, { backgroundColor: field.key === 'hutang' ? '#fee2e2' : PRIMARY + '15' }]}>
                    <MaterialCommunityIcons
                      name={field.icon as any}
                      size={18}
                      color={field.key === 'hutang' ? '#ef4444' : PRIMARY}
                    />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{field.label}</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={{ fontSize: 14, color: '#9ca3af', marginRight: 4 }}>Rp</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor="#d1d5db"
                    keyboardType="numeric"
                    value={assets[field.key]}
                    onChangeText={(text) => {
                      setAssets((prev) => ({ ...prev, [field.key]: text.replace(/\D/g, '') }));
                      setCalculated(false);
                    }}
                  />
                </View>
              </View>
            ))}

            {/* Calculate Button */}
            <TouchableOpacity
              onPress={handleCalculate}
              style={[styles.calculateButton, { backgroundColor: PRIMARY }]}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="calculator" size={22} color="#fff" />
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Hitung Zakat</Text>
            </TouchableOpacity>

            {/* Result */}
            {calculated && (
              <View style={styles.resultCard}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 16, textAlign: 'center' }}>
                  Hasil Perhitungan
                </Text>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Harta</Text>
                  <Text style={styles.resultValue}>{formatCurrency(totalHarta)}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Total Hutang</Text>
                  <Text style={[styles.resultValue, { color: '#ef4444' }]}>- {formatCurrency(totalHutang)}</Text>
                </View>
                <View style={[styles.resultRow, { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12 }]}>
                  <Text style={[styles.resultLabel, { fontWeight: '700' }]}>Harta Bersih</Text>
                  <Text style={[styles.resultValue, { fontWeight: '700' }]}>{formatCurrency(hartaBersih)}</Text>
                </View>

                <View style={[styles.nisabStatus, { backgroundColor: memenuhinNisab ? '#dcfce7' : '#fef3c7' }]}>
                  <MaterialCommunityIcons
                    name={memenuhinNisab ? 'check-circle' : 'alert-circle'}
                    size={20}
                    color={memenuhinNisab ? '#16a34a' : '#d97706'}
                  />
                  <Text style={{ fontSize: 13, color: memenuhinNisab ? '#16a34a' : '#d97706', fontWeight: '600' }}>
                    {memenuhinNisab ? 'Memenuhi Nisab — Wajib Zakat' : 'Belum Mencapai Nisab'}
                  </Text>
                </View>

                {memenuhinNisab && (
                  <View style={[styles.zakatResult, { backgroundColor: PRIMARY }]}>
                    <Text style={{ fontSize: 13, color: '#fff', opacity: 0.8 }}>Zakat yang harus dibayar (2.5%)</Text>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: '#fff', marginTop: 4 }}>
                      {formatCurrency(zakatAmount)}
                    </Text>
                  </View>
                )}
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
  card: {
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginTop: 24,
    marginBottom: 12,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultLabel: { fontSize: 14, color: '#6b7280' },
  resultValue: { fontSize: 14, fontWeight: '600', color: '#111' },
  nisabStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  zakatResult: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
});
