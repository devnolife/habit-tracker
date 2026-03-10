import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const PRIMARY = '#BB630B';

const DONATION_CATEGORIES = [
  { icon: 'mosque', label: 'Masjid', color: '#098E8F', count: 12 },
  { icon: 'account-group', label: 'Yatim Piatu', color: '#7c3aed', count: 8 },
  { icon: 'school', label: 'Pendidikan', color: '#2563eb', count: 15 },
  { icon: 'hand-heart', label: 'Kemanusiaan', color: '#dc2626', count: 6 },
];

const DONATION_PROGRAMS = [
  {
    id: '1',
    title: 'Pembangunan Masjid Al-Ikhlas',
    organization: 'Yayasan Al-Ikhlas',
    target: 500_000_000,
    collected: 350_000_000,
    donors: 1240,
    icon: 'mosque',
    color: '#098E8F',
    category: 'Masjid',
  },
  {
    id: '2',
    title: 'Beasiswa Santri Berprestasi',
    organization: 'Rumah Yatim',
    target: 200_000_000,
    collected: 145_000_000,
    donors: 890,
    icon: 'school',
    color: '#2563eb',
    category: 'Pendidikan',
  },
  {
    id: '3',
    title: 'Santunan Anak Yatim Ramadhan',
    organization: 'Baznas',
    target: 100_000_000,
    collected: 82_000_000,
    donors: 567,
    icon: 'account-group',
    color: '#7c3aed',
    category: 'Yatim Piatu',
  },
  {
    id: '4',
    title: 'Bantuan Korban Bencana Alam',
    organization: 'ACT Foundation',
    target: 300_000_000,
    collected: 210_000_000,
    donors: 2100,
    icon: 'hand-heart',
    color: '#dc2626',
    category: 'Kemanusiaan',
  },
  {
    id: '5',
    title: 'Wakaf Quran untuk Pesantren',
    organization: 'Dompet Dhuafa',
    target: 50_000_000,
    collected: 38_000_000,
    donors: 420,
    icon: 'book-open-page-variant',
    color: '#098E8F',
    category: 'Pendidikan',
  },
];

const formatCurrency = (amount: number) => {
  if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
  if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(0)}jt`;
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

const DonationCard = ({ program }: { program: (typeof DONATION_PROGRAMS)[0] }) => {
  const progress = program.collected / program.target;

  return (
    <View style={styles.donationCard}>
      <View style={{ flexDirection: 'row', gap: 14 }}>
        <View style={[styles.programIcon, { backgroundColor: program.color + '15' }]}>
          <MaterialCommunityIcons name={program.icon as any} size={24} color={program.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.categoryBadge}>{program.category}</Text>
          <Text style={styles.programTitle}>{program.title}</Text>
          <Text style={styles.organizationText}>{program.organization}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ marginTop: 16 }}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: program.color }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: program.color }}>
            {formatCurrency(program.collected)}
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af' }}>
            Target: {formatCurrency(program.target)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialCommunityIcons name="account-multiple" size={16} color="#9ca3af" />
          <Text style={{ fontSize: 12, color: '#9ca3af' }}>{program.donors} donatur</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Donasi', `Terima kasih atas niat baik Anda untuk "${program.title}".\n\nFitur pembayaran akan segera tersedia.`)
          }
          style={[styles.donateButton, { backgroundColor: program.color }]}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#fff' }}>Donasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DonasiScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fffbeb' }}>
      <LinearGradient colors={['#fffbeb', '#fafafa']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Donasi Muslim</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 10, paddingTop: 8 }}
            >
              {DONATION_CATEGORIES.map((cat, i) => (
                <View key={i} style={[styles.categoryCard, { borderColor: cat.color + '30' }]}>
                  <View style={[styles.catIcon, { backgroundColor: cat.color + '15' }]}>
                    <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151' }}>{cat.label}</Text>
                  <Text style={{ fontSize: 11, color: '#9ca3af' }}>{cat.count} program</Text>
                </View>
              ))}
            </ScrollView>

            {/* Programs */}
            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 14 }}>
                Program Pilihan
              </Text>
              {DONATION_PROGRAMS.map((program) => (
                <DonationCard key={program.id} program={program} />
              ))}
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
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  catIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  donationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  programIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  programTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginTop: 2,
  },
  organizationText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  donateButton: {
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
});
