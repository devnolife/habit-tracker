import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY = '#22c55e';
const SCAN_SIZE = SCREEN_WIDTH - 120;

const RECENT_SCANS = [
  { id: '1', name: 'Indomie Goreng', calories: 380, brand: 'Indofood', barcode: '089686010947' },
  { id: '2', name: 'Ultra Milk Coklat', calories: 130, brand: 'Ultra Jaya', barcode: '899125600017' },
  { id: '3', name: 'Chitato Original', calories: 160, brand: 'Indofood', barcode: '089686610048' },
  { id: '4', name: 'Yakult', calories: 50, brand: 'Yakult', barcode: '488964000046' },
];

export default function ScanBarcodeScreen() {
  const handleScan = () => {
    Alert.alert(
      'Fitur Kamera',
      'Akses kamera untuk scan barcode membutuhkan modul expo-camera.\n\nSilakan install:\nnpx expo install expo-camera',
    );
  };

  const handleSelectRecent = (item: (typeof RECENT_SCANS)[0]) => {
    Alert.alert(
      item.name,
      `Brand: ${item.brand}\nKalori: ${item.calories} kkal\nBarcode: ${item.barcode}`,
      [
        { text: 'Tambahkan', onPress: () => {
          Alert.alert('✅ Ditambahkan', `${item.name} (${item.calories} kkal) berhasil ditambahkan.`, [
            { text: 'OK', onPress: () => router.back() },
          ]);
        }},
        { text: 'Batal', style: 'cancel' },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pindai Barcode</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Scanner Area */}
        <View style={styles.scannerArea}>
          <View style={styles.scanFrame}>
            {/* Corner decorations */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Center icon */}
            <TouchableOpacity onPress={handleScan} style={styles.scanButton}>
              <MaterialCommunityIcons name="barcode-scan" size={48} color={PRIMARY} />
              <Text style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>
                Ketuk untuk memulai scan
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#6b7280', fontSize: 13, marginTop: 16, textAlign: 'center' }}>
            Arahkan kamera ke barcode produk makanan
          </Text>
        </View>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 14 }}>
            Terakhir Dipindai
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {RECENT_SCANS.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSelectRecent(item)}
                style={styles.recentCard}
                activeOpacity={0.7}
              >
                <View style={[styles.recentIcon, { backgroundColor: PRIMARY + '15' }]}>
                  <MaterialCommunityIcons name="barcode" size={20} color={PRIMARY} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#111' }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af' }}>{item.brand}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: PRIMARY }}>{item.calories}</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>kkal</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Manual Input */}
            <TouchableOpacity
              onPress={() => router.push('/nutrition-actions/add-food' as any)}
              style={styles.manualButton}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="pencil-plus" size={20} color={PRIMARY} />
              <Text style={{ fontSize: 14, fontWeight: '600', color: PRIMARY }}>Input Manual</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  scannerArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  scanFrame: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: PRIMARY,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e5e7eb',
    alignSelf: 'center',
    marginBottom: 16,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  recentIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
  },
});
