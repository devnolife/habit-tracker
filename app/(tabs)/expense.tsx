import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react-native";

const TRANSACTIONS = [
  { name: "Makan Siang", category: "Makanan", amount: -35000, time: "12:30" },
  { name: "Grab", category: "Transport", amount: -25000, time: "10:00" },
  { name: "Kopi", category: "Minuman", amount: -28000, time: "09:15" },
  { name: "Transfer Masuk", category: "Income", amount: 500000, time: "08:00" },
];

export default function ExpenseScreen() {
  const totalExpense = TRANSACTIONS.filter((t) => t.amount < 0).reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );
  const budget = 500000;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Tracker Keuangan 💰
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Kelola keuanganmu dengan bijak
          </Text>
        </View>

        {/* Budget Card */}
        <View className="bg-soft-red rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-red-800 text-sm font-medium">
                Pengeluaran Bulan Ini
              </Text>
              <Text className="text-red-900 text-3xl font-bold mt-1">
                Rp {totalExpense.toLocaleString("id-ID")}
              </Text>
              <Text className="text-red-700 text-sm mt-1">
                Budget: Rp {budget.toLocaleString("id-ID")}
              </Text>
            </View>
            <View className="w-20 h-20 rounded-full bg-red-200 items-center justify-center">
              <Wallet size={32} color="#DC2626" />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mt-4 h-3 bg-red-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${Math.min((totalExpense / budget) * 100, 100)}%` }}
            />
          </View>
          <Text className="text-red-700 text-sm mt-2">
            {((totalExpense / budget) * 100).toFixed(0)}% dari budget
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-green-50 rounded-2xl p-4">
            <View className="flex-row items-center mb-2">
              <TrendingUp size={20} color="#16A34A" />
              <Text className="text-green-700 text-sm ml-2">Pemasukan</Text>
            </View>
            <Text className="text-green-900 text-xl font-bold">
              Rp 500k
            </Text>
          </View>
          <View className="flex-1 bg-red-50 rounded-2xl p-4">
            <View className="flex-row items-center mb-2">
              <TrendingDown size={20} color="#DC2626" />
              <Text className="text-red-700 text-sm ml-2">Pengeluaran</Text>
            </View>
            <Text className="text-red-900 text-xl font-bold">
              Rp {(totalExpense / 1000).toFixed(0)}k
            </Text>
          </View>
        </View>

        {/* Add Transaction Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-primary p-4 rounded-2xl mb-6">
          <Plus size={24} color="white" />
          <Text className="text-white font-semibold ml-2">
            Tambah Transaksi
          </Text>
        </TouchableOpacity>

        {/* Transaction List */}
        <View className="mb-24">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Transaksi Terakhir
          </Text>
          {TRANSACTIONS.map((transaction, index) => (
            <View key={index} className="bg-gray-50 rounded-2xl p-4 mb-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {transaction.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {transaction.category} • {transaction.time}
                  </Text>
                </View>
                <Text
                  className={`text-base font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  Rp {Math.abs(transaction.amount).toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
