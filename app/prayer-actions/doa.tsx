import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

const PRIMARY = "#10b981";

// Doa Categories
const DOA_CATEGORIES = [
  { id: "all", name: "Semua", emoji: "📖" },
  { id: "harian", name: "Harian", emoji: "☀️" },
  { id: "sholat", name: "Sholat", emoji: "🕌" },
  { id: "makan", name: "Makan", emoji: "🍽️" },
  { id: "tidur", name: "Tidur", emoji: "😴" },
  { id: "perjalanan", name: "Perjalanan", emoji: "🚗" },
];

// Doa Data
const DOA_LIST = [
  {
    id: 1,
    title: "Doa Sebelum Makan",
    arabic: "اَللَّهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar",
    meaning: "Ya Allah, berkahilah kami dalam rezeki yang Engkau berikan dan peliharalah kami dari siksa api neraka",
    category: "makan",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Doa Sesudah Makan",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    latin: "Alhamdulillaahil ladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin",
    meaning: "Segala puji bagi Allah yang telah memberi kami makan dan minum, dan menjadikan kami muslim",
    category: "makan",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Doa Bangun Tidur",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ",
    latin: "Alhamdulillaahil ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin nusyuur",
    meaning: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan",
    category: "tidur",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Doa Sebelum Tidur",
    arabic: "بِاسْمِكَ اللّٰهُمَّ أَمُوْتُ وَأَحْيَا",
    latin: "Bismikallahumma amuutu wa ahyaa",
    meaning: "Dengan nama-Mu ya Allah, aku mati dan aku hidup",
    category: "tidur",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Doa Keluar Rumah",
    arabic: "بِسْمِ اللّٰهِ تَوَكَّلْتُ عَلَى اللّٰهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",
    latin: "Bismillaahi tawakkaltu 'alallaah, laa haula wa laa quwwata illaa billaah",
    meaning: "Dengan nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah",
    category: "harian",
    isFavorite: true,
  },
  {
    id: 6,
    title: "Doa Masuk Masjid",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ",
    latin: "Allaahummaf tahlii abwaaba rahmatik",
    meaning: "Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu",
    category: "sholat",
    isFavorite: false,
  },
];

const DoaCard = ({
  doa,
  onToggleFavorite,
  onPress
}: {
  doa: typeof DOA_LIST[0];
  onToggleFavorite: () => void;
  onPress: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
      className="bg-white rounded-2xl mb-3 overflow-hidden"
      style={styles.card}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-base font-bold text-slate-900">{doa.title}</Text>
          </View>
          <TouchableOpacity onPress={onToggleFavorite}>
            <MaterialCommunityIcons
              name={doa.isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={doa.isFavorite ? "#f43f5e" : "#94a3b8"}
            />
          </TouchableOpacity>
        </View>

        {/* Arabic Text */}
        <View className="bg-emerald-50 rounded-xl p-4 mb-3">
          <Text
            className="text-xl text-slate-900 text-right leading-10"
            style={{ fontFamily: "serif" }}
          >
            {doa.arabic}
          </Text>
        </View>

        {/* Latin */}
        <Text className="text-sm text-slate-600 italic mb-2">{doa.latin}</Text>

        {/* Meaning - Expandable */}
        {expanded && (
          <View className="mt-3 pt-3 border-t border-slate-100">
            <Text className="text-xs font-semibold text-slate-500 mb-1">ARTI:</Text>
            <Text className="text-sm text-slate-700 leading-5">{doa.meaning}</Text>

            {/* Actions */}
            <View className="flex-row gap-2 mt-4">
              <TouchableOpacity className="flex-1 bg-emerald-100 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <MaterialCommunityIcons name="volume-high" size={18} color={PRIMARY} />
                <Text className="text-sm font-semibold text-emerald-700">Dengar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-slate-100 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <MaterialCommunityIcons name="share-variant" size={18} color="#64748b" />
                <Text className="text-sm font-semibold text-slate-700">Bagikan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Expand Indicator */}
        <View className="flex-row items-center justify-center mt-2">
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#94a3b8"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function DoaScreen() {
  const [doaList, setDoaList] = useState(DOA_LIST);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id: number) => {
    setDoaList(prev => prev.map(d =>
      d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
    ));
  };

  const filteredDoa = doaList.filter(d => {
    const matchesCategory = selectedCategory === "all" || d.category === selectedCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.latin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoriteCount = doaList.filter(d => d.isFavorite).length;

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={20} color="#64748b" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-slate-900">Kumpulan Doa</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
          >
            <MaterialCommunityIcons name="heart" size={20} color="#f43f5e" />
            {favoriteCount > 0 && (
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full items-center justify-center">
                <Text className="text-[10px] font-bold text-white">{favoriteCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-6 mt-4">
          <View className="relative">
            <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
              <MaterialCommunityIcons name="magnify" size={22} color="#94a3b8" />
            </View>
            <TextInput
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white text-slate-900"
              style={styles.searchInput}
              placeholder="Cari doa..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {DOA_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full flex-row items-center gap-2 ${selectedCategory === cat.id ? "bg-rose-500" : "bg-white"
                }`}
              style={selectedCategory === cat.id ? styles.selectedCategory : styles.category}
            >
              <Text className="text-base">{cat.emoji}</Text>
              <Text className={`font-semibold text-sm ${selectedCategory === cat.id ? "text-white" : "text-slate-700"
                }`}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doa List */}
        <ScrollView
          className="flex-1 mt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        >
          <Text className="text-sm text-slate-500 mb-3">
            {filteredDoa.length} doa ditemukan
          </Text>

          {filteredDoa.map((doa) => (
            <DoaCard
              key={doa.id}
              doa={doa}
              onToggleFavorite={() => toggleFavorite(doa.id)}
              onPress={() => { }}
            />
          ))}

          {filteredDoa.length === 0 && (
            <View className="items-center py-12">
              <Text className="text-5xl mb-4">🔍</Text>
              <Text className="text-lg font-bold text-slate-900">Tidak Ditemukan</Text>
              <Text className="text-sm text-slate-500 mt-1">Coba kata kunci lain</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  category: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedCategory: {
    shadowColor: "#f43f5e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
