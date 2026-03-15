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
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@/lib/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LoadingScreen, SectionHeader, EmptyState } from '@/components/ui';
import { getMonthlyFinance, removeTransaction, formatCurrency } from '@/services';
import { getCurrentMonth } from '@/lib/utils';
import { TEXT, GRAY } from '@/config/colors';
import type { MonthlyFinance, Transaction, ExpenseCategory } from '@/types';

// Category icon mapping
const CATEGORY_ICONS: Record<ExpenseCategory, { icon: string; color: string; bgColor: string }> = {
  Makanan: { icon: 'food', color: '#f97316', bgColor: '#fff7ed' },
  Transport: { icon: 'car', color: '#3b82f6', bgColor: '#eff6ff' },
  Belanja: { icon: 'cart', color: '#a855f7', bgColor: '#faf5ff' },
  Tagihan: { icon: 'receipt', color: '#ef4444', bgColor: '#fef2f2' },
  Hiburan: { icon: 'gamepad-variant', color: '#ec4899', bgColor: '#fdf2f8' },
  Kesehatan: { icon: 'hospital-box', color: '#22c55e', bgColor: '#f0fdf4' },
  Lainnya: { icon: 'dots-horizontal-circle', color: '#6b7280', bgColor: '#f3f4f6' },
};

const formatDisplayCurrency = (amount: number) => {
  const absAmount = Math.abs(amount);
  if (absAmount >= 1000000) {
    return `Rp ${(absAmount / 1000000).toFixed(1)}jt`;
  } else if (absAmount >= 1000) {
    return `Rp ${(absAmount / 1000).toFixed(0)}k`;
  }
  return `Rp ${absAmount}`;
};

export default function ExpenseScreen() {
  const { theme } = useThemeContext();
  const router = useRouter();
  const [finance, setFinance] = useState<MonthlyFinance | null>(null);
  const [loading, setLoading] = useState(true);

  const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];
  const now = new Date();
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const currentMonthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

  const loadFinance = useCallback(async () => {
    setLoading(true);
    const data = await getMonthlyFinance(currentMonthKey);
    setFinance(data);
    setLoading(false);
  }, [currentMonthKey]);

  useEffect(() => {
    loadFinance();
  }, [loadFinance]);

  const handlePrevMonth = () => {
    if (monthIndex === 0) { setMonthIndex(11); setYear((y) => y - 1); }
    else { setMonthIndex((i) => i - 1); }
  };
  const handleNextMonth = () => {
    if (monthIndex === 11) { setMonthIndex(0); setYear((y) => y + 1); }
    else { setMonthIndex((i) => i + 1); }
  };

  const handleRemoveTransaction = useCallback(async (txId: string) => {
    Alert.alert('Hapus Transaksi', 'Yakin ingin menghapus transaksi ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          const updated = await removeTransaction(currentMonthKey, txId);
          setFinance(updated);
        },
      },
    ]);
  }, [currentMonthKey]);

  const totalExpense = finance?.expense ?? 0;
  const totalIncome = finance?.income ?? 0;
  const transactions = finance?.transactions ?? [];
  const budgets = finance?.budgets ?? [];

  // Group transactions by date
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  const todayTxs = transactions.filter((t) => t.date === todayStr);
  const yesterdayTxs = transactions.filter((t) => t.date === yesterdayStr);
  const olderTxs = transactions.filter((t) => t.date !== todayStr && t.date !== yesterdayStr);

  // Build category breakdown from transactions
  const categoryBreakdown = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([category, amount]) => ({
    name: category,
    ...(CATEGORY_ICONS[category as ExpenseCategory] || CATEGORY_ICONS.Lainnya),
    amount: formatDisplayCurrency(amount),
    percent: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
  }));

  // Budget progress
  const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const budgetUsedPercent = totalBudgetLimit > 0 ? Math.round((totalExpense / totalBudgetLimit) * 100) : 0;
  const budgetRemaining = Math.max(0, totalBudgetLimit - totalExpense);

  const mapTransactionToItem = (t: Transaction) => {
    const catInfo = CATEGORY_ICONS[t.category] || CATEGORY_ICONS.Lainnya;
    return {
      id: t.id,
      title: t.name,
      time: t.time,
      method: t.notes || (t.type === 'income' ? 'Transfer' : 'QRIS'),
      amount: t.type === 'income' ? t.amount : -t.amount,
      icon: catInfo.icon,
      iconColor: catInfo.color,
      iconBg: catInfo.bgColor,
    };
  };

  const TransactionItem = ({
    item,
  }: {
    item: ReturnType<typeof mapTransactionToItem>;
  }) => {
    const isIncome = item.amount > 0;
    return (
      <View
        style={[
          styles.transactionCard,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 16,
            marginBottom: 12,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: item.iconBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={20}
              color={item.iconColor}
            />
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>
              {item.title}
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Text style={{ fontSize: 10, color: '#9ca3af' }}>
                {item.time}
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#d1d5db',
                }}
              />
              <View
                style={{
                  backgroundColor: '#f3f4f6',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                }}
              >
                <Text style={{ fontSize: 10, color: '#6b7280' }}>
                  {item.method}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: isIncome ? '#22c55e' : '#ef4444',
          }}
        >
          {isIncome ? '+' : '-'} {formatDisplayCurrency(item.amount)}
        </Text>
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen color={theme.primary} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#181411"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}>
              Keuangan
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Menu', 'Pilih opsi:', [
                { text: 'Pengaturan Budget', onPress: () => router.push('/settings' as any) },
                { text: 'Export Laporan', onPress: () => Alert.alert('Export', 'Fitur export laporan sedang dalam pengembangan.') },
                { text: 'Batal', style: 'cancel' },
              ])}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#181411"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Month Selector */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 24,
              }}
            >
              <TouchableOpacity onPress={handlePrevMonth} style={{ padding: 4, borderRadius: 999 }}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.monthPill,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: '#fff',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: '#f5f5f4',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color={theme.primary}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#1f2937' }}
                >
                  {MONTHS[monthIndex]} {year}
                </Text>
                <MaterialCommunityIcons
                  name="menu-down"
                  size={16}
                  color="#9ca3af"
                />
              </View>
              <TouchableOpacity onPress={handleNextMonth} style={{ padding: 4, borderRadius: 999 }}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>

            {/* Hero Card */}
            <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
              <LinearGradient
                colors={[theme.primary, theme.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.heroCard,
                  { borderRadius: 24, padding: 24, overflow: 'hidden' },
                ]}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: -16,
                    right: -16,
                    width: 128,
                    height: 128,
                    borderRadius: 64,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -16,
                    left: -16,
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        marginBottom: 4,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="wallet"
                        size={18}
                        color="rgba(255,255,255,0.7)"
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: 'rgba(255,255,255,0.7)',
                        }}
                      >
                        Total Pengeluaran
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 36,
                        fontWeight: '800',
                        color: '#fff',
                        letterSpacing: -1,
                      }}
                    >
                      {formatCurrency(totalExpense)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="chart-pie"
                      size={24}
                      color="#fff"
                    />
                  </View>
                </View>

                <View
                  style={{ marginTop: 24, position: 'relative', zIndex: 10 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      Anggaran Bulanan
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {budgetUsedPercent}% Terpakai
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 8,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: 999,
                      overflow: 'hidden',
                    }}
                  >
                    <View
                      style={{
                        height: '100%',
                        width: `${Math.min(budgetUsedPercent, 100)}%`,
                        backgroundColor: '#fff',
                        borderRadius: 999,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}
                    >
                      Sisa:{' '}
                      <Text style={{ fontWeight: '700', color: '#fff' }}>
                        {formatCurrency(budgetRemaining)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                gap: 16,
                paddingHorizontal: 24,
                marginBottom: 32,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push('/expense-actions/add-expense' as any)}
                style={[
                  styles.actionButton,
                  {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: '#fef2f2',
                    borderWidth: 1,
                    borderColor: '#fecaca',
                  },
                ]}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#fee2e2',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    size={20}
                    color="#dc2626"
                  />
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#dc2626' }}
                >
                  Pengeluaran
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/expense-actions/add-income' as any)}
                style={[
                  styles.actionButton,
                  {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: '#f0fdf4',
                    borderWidth: 1,
                    borderColor: '#bbf7d0',
                  },
                ]}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#dcfce7',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={20}
                    color="#16a34a"
                  />
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: '700', color: '#16a34a' }}
                >
                  Pemasukan
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Insights */}
            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
              >
                <View
                  style={[
                    styles.insightCard,
                    {
                      width: 160,
                      height: 128,
                      backgroundColor: '#fff',
                      borderRadius: 16,
                      padding: 16,
                      justifyContent: 'space-between',
                    },
                  ]}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: `${theme.primary}15`,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="lightbulb-outline"
                      size={18}
                      color={theme.primary}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      Wawasan
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#374151',
                        lineHeight: 16,
                      }}
                    >
                      Pengeluaran Anda 20% lebih hemat dari bulan lalu!
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.insightCard,
                    {
                      width: 160,
                      height: 128,
                      backgroundColor: '#fff',
                      borderRadius: 16,
                      padding: 16,
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                    },
                  ]}
                >
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      padding: 8,
                      opacity: 0.05,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="mosque"
                      size={60}
                      color="#000"
                    />
                  </View>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: '#f0fdfa',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="hand-heart-outline"
                      size={18}
                      color="#0d9488"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      Bantuan Zakat
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#374151',
                      }}
                    >
                      Lacak Nisab Anda
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.insightCard,
                    {
                      width: 160,
                      height: 128,
                      backgroundColor: '#fff',
                      borderRadius: 16,
                      padding: 16,
                      justifyContent: 'space-between',
                    },
                  ]}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: '#eff6ff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="timer-sand"
                      size={18}
                      color="#3b82f6"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      Pemasukan Berikutnya
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#1f2937',
                      }}
                    >
                      5 Hari
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            {/* Category Breakdown */}
            <View style={{ paddingHorizontal: 24, marginBottom: 8 }}>
              <SectionHeader
                title="Rincian Kategori"
                right={
                  <TouchableOpacity onPress={() => Alert.alert('Rincian Kategori', 'Menampilkan semua kategori pengeluaran dan pemasukan secara detail.')}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: theme.primary }}>
                      Lihat Semua
                    </Text>
                  </TouchableOpacity>
                }
              />
            </View>

            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <View
                style={[
                  styles.categoryCard,
                  { backgroundColor: '#fff', borderRadius: 24, padding: 20 },
                ]}
              >
                {categoryBreakdown.length === 0 ? (
                  <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                    <Text style={{ fontSize: 14, color: '#9ca3af' }}>
                      Belum ada pengeluaran
                    </Text>
                  </View>
                ) : categoryBreakdown.map((cat, index) => (
                  <View
                    key={cat.name}
                    style={{
                      marginBottom: index < categoryBreakdown.length - 1 ? 16 : 0,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            backgroundColor: cat.bgColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MaterialCommunityIcons
                            name={cat.icon as any}
                            size={20}
                            color={cat.color}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              color: '#111',
                            }}
                          >
                            {cat.name}
                          </Text>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>
                            {cat.percent}% dari anggaran
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#111',
                        }}
                      >
                        Rp {cat.amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 6,
                        backgroundColor: '#f3f4f6',
                        borderRadius: 999,
                        overflow: 'hidden',
                      }}
                    >
                      <View
                        style={{
                          height: '100%',
                          width: `${cat.percent}%`,
                          backgroundColor: cat.color,
                          borderRadius: 999,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Transaction List */}
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <SectionHeader
                title="Transaksi Terbaru"
                right={
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => Alert.alert('Filter', 'Pilih filter:', [
                        { text: 'Semua', onPress: () => { } },
                        { text: 'Pengeluaran Saja', onPress: () => { } },
                        { text: 'Pemasukan Saja', onPress: () => { } },
                        { text: 'Batal', style: 'cancel' },
                      ])}
                      style={[styles.filterButton, { padding: 6, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: GRAY[100] }]}
                    >
                      <MaterialCommunityIcons name="filter-variant" size={18} color={TEXT.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Alert.alert('Cari Transaksi', 'Fitur pencarian transaksi akan segera hadir.')}
                      style={[styles.filterButton, { padding: 6, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: GRAY[100] }]}
                    >
                      <MaterialCommunityIcons name="magnify" size={18} color={TEXT.secondary} />
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>

            <View style={{ paddingHorizontal: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                Hari Ini
              </Text>
              {todayTxs.length === 0 ? (
                <Text style={{ fontSize: 14, color: '#d1d5db', marginBottom: 12 }}>
                  Belum ada transaksi hari ini
                </Text>
              ) : todayTxs.map((tx) => (
                <TransactionItem key={tx.id} item={mapTransactionToItem(tx)} />
              ))}
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                Kemarin
              </Text>
              {yesterdayTxs.length === 0 ? (
                <Text style={{ fontSize: 14, color: '#d1d5db', marginBottom: 12 }}>
                  Tidak ada transaksi kemarin
                </Text>
              ) : yesterdayTxs.map((tx) => (
                <TransactionItem key={tx.id} item={mapTransactionToItem(tx)} />
              ))}
            </View>
          </ScrollView>

          <ThemeSwitcher />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  monthPill: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  heroCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  actionButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  insightCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  categoryCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  transactionCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f5f5f4',
  },
  filterButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
});
