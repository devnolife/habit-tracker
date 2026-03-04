import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "@/lib/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Category data
const categories = [
  { name: "Food & Dining", icon: "food", color: "#f97316", bgColor: "#fff7ed", amount: "3.150k", percent: 60 },
  { name: "Transport", icon: "car", color: "#3b82f6", bgColor: "#eff6ff", amount: "850k", percent: 30 },
];

// Transaction data
const todayTransactions = [
  { title: "Nasi Padang Siang", time: "12:30 PM", method: "QRIS", amount: -45000, icon: "food", iconColor: "#f97316", iconBg: "rgba(244,140,37,0.1)" },
  { title: "Gojek to Office", time: "08:15 AM", method: "Gopay", amount: -22000, icon: "taxi", iconColor: "#3b82f6", iconBg: "#eff6ff" },
];

const yesterdayTransactions = [
  { title: "Freelance Project", time: "04:00 PM", method: "Transfer", amount: 2500000, icon: "cash", iconColor: "#22c55e", iconBg: "#f0fdf4" },
  { title: "Monthly Groceries", time: "07:30 PM", method: "Debit", amount: -450000, icon: "cart", iconColor: "#a855f7", iconBg: "#faf5ff" },
];

const formatCurrency = (amount: number) => {
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

  const TransactionItem = ({ item }: { item: typeof todayTransactions[0] }) => {
    const isIncome = item.amount > 0;
    return (
      <View style={[styles.transactionCard, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 12, borderRadius: 16, marginBottom: 12 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: item.iconBg, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name={item.icon as any} size={20} color={item.iconColor} />
          </View>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontSize: 10, color: '#9ca3af' }}>{item.time}</Text>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#d1d5db' }} />
              <View style={{ backgroundColor: '#f3f4f6', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                <Text style={{ fontSize: 10, color: '#6b7280' }}>{item.method}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '700', color: isIncome ? '#22c55e' : '#ef4444' }}>
          {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={theme.gradient as [string, string, string]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 }}>
            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#181411" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}>Pengeluaran</Text>
            <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#181411" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Month Selector */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
              <TouchableOpacity style={{ padding: 4, borderRadius: 999 }}>
                <MaterialCommunityIcons name="chevron-left" size={20} color="#9ca3af" />
              </TouchableOpacity>
              <View style={[styles.monthPill, { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: '#f5f5f4' }]}>
                <MaterialCommunityIcons name="calendar-month" size={20} color={theme.primary} />
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1f2937' }}>August 2023</Text>
                <MaterialCommunityIcons name="menu-down" size={16} color="#9ca3af" />
              </View>
              <TouchableOpacity style={{ padding: 4, borderRadius: 999 }}>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Hero Card */}
            <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
              <LinearGradient
                colors={[theme.primary, theme.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.heroCard, { borderRadius: 24, padding: 24, overflow: 'hidden' }]}
              >
                <View style={{ position: 'absolute', top: -16, right: -16, width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <View style={{ position: 'absolute', bottom: -16, left: -16, width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(0,0,0,0.05)' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <MaterialCommunityIcons name="wallet" size={18} color="rgba(255,255,255,0.7)" />
                      <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>Total Spent</Text>
                    </View>
                    <Text style={{ fontSize: 36, fontWeight: '800', color: '#fff', letterSpacing: -1 }}>Rp 5.250.000</Text>
                  </View>
                  <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' }}>
                    <MaterialCommunityIcons name="chart-pie" size={24} color="#fff" />
                  </View>
                </View>

                <View style={{ marginTop: 24, position: 'relative', zIndex: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>Monthly Budget</Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>75% Used</Text>
                  </View>
                  <View style={{ height: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 999, overflow: 'hidden' }}>
                    <View style={{ height: '100%', width: '75%', backgroundColor: '#fff', borderRadius: 999 }} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                      Remaining: <Text style={{ fontWeight: '700', color: '#fff' }}>Rp 1.750.000</Text>
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 24, marginBottom: 32 }}>
              <TouchableOpacity style={[styles.actionButton, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 56, borderRadius: 16, backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca' }]}>
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#fee2e2', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons name="minus" size={20} color="#dc2626" />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#dc2626' }}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 56, borderRadius: 16, backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0' }]}>
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#dcfce7', alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons name="plus" size={20} color="#16a34a" />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#16a34a' }}>Income</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Insights */}
            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
                <View style={[styles.insightCard, { width: 160, height: 128, backgroundColor: '#fff', borderRadius: 16, padding: 16, justifyContent: 'space-between' }]}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: `${theme.primary}15`, alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={18} color={theme.primary} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Insight</Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151', lineHeight: 16 }}>You spent 20% less than last month!</Text>
                  </View>
                </View>

                <View style={[styles.insightCard, { width: 160, height: 128, backgroundColor: '#fff', borderRadius: 16, padding: 16, justifyContent: 'space-between', overflow: 'hidden' }]}>
                  <View style={{ position: 'absolute', right: 0, top: 0, padding: 8, opacity: 0.05 }}>
                    <MaterialCommunityIcons name="mosque" size={60} color="#000" />
                  </View>
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0fdfa', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="hand-heart-outline" size={18} color="#0d9488" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Zakat Helper</Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Track your Nisab</Text>
                  </View>
                </View>

                <View style={[styles.insightCard, { width: 160, height: 128, backgroundColor: '#fff', borderRadius: 16, padding: 16, justifyContent: 'space-between' }]}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="timer-sand" size={18} color="#3b82f6" />
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Next Income</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937' }}>5 Days</Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            {/* Category Breakdown */}
            <View style={{ paddingHorizontal: 24, marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}>Category Breakdown</Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: theme.primary }}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <View style={[styles.categoryCard, { backgroundColor: '#fff', borderRadius: 24, padding: 20 }]}>
                {categories.map((cat, index) => (
                  <View key={cat.name} style={{ marginBottom: index < categories.length - 1 ? 16 : 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: cat.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
                        </View>
                        <View>
                          <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>{cat.name}</Text>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>{cat.percent}% of budget</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>Rp {cat.amount}</Text>
                    </View>
                    <View style={{ height: 6, backgroundColor: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${cat.percent}%`, backgroundColor: cat.color, borderRadius: 999 }} />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Transaction List */}
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#181411' }}>Recent Transactions</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity style={[styles.filterButton, { padding: 6, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#f5f5f4' }]}>
                    <MaterialCommunityIcons name="filter-variant" size={18} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.filterButton, { padding: 6, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#f5f5f4' }]}>
                    <MaterialCommunityIcons name="magnify" size={18} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Today</Text>
              {todayTransactions.map((item, index) => (
                <TransactionItem key={index} item={item} />
              ))}
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>Yesterday</Text>
              {yesterdayTransactions.map((item, index) => (
                <TransactionItem key={index} item={item} />
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
