import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// Gen Z Emerald Green (matching prayer tab)
const PRIMARY = "#10b981";

export default function LocationMethodScreen() {
  const [selectedMadhab, setSelectedMadhab] = useState<"standard" | "hanafi">("standard");
  const [location, setLocation] = useState("");

  return (
    <View className="flex-1 bg-slate-50">
      {/* Gradient Background Accent */}
      <LinearGradient
        colors={["rgba(16, 185, 129, 0.08)", "transparent"]}
        style={styles.gradientAccent}
      />

      <SafeAreaView className="flex-1">
        {/* Top App Bar */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#181411" />
          </TouchableOpacity>
          <View className="w-10" />
        </View>

        {/* Progress Bar */}
        <View className="px-6 py-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm font-semibold text-primary">Langkah 1 dari 2</Text>
            <Text className="text-xs text-gray-500">Pengaturan Lokasi</Text>
          </View>
          <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <View className="h-full bg-primary rounded-full" style={{ width: "50%" }} />
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-4"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Illustration */}
          <View className="w-full h-40 mb-6 rounded-2xl bg-emerald-50 items-center justify-center overflow-hidden">
            <MaterialCommunityIcons name="compass" size={80} color={PRIMARY} style={{ opacity: 0.5 }} />
          </View>

          {/* Headline */}
          <Text className="text-3xl font-bold text-center text-slate-900 mb-2">
            Atur Waktu Sholat
          </Text>

          {/* Body Text */}
          <Text className="text-base text-slate-500 text-center mb-8 leading-relaxed">
            Kami membutuhkan lokasi Anda untuk menghitung waktu sholat yang akurat sesuai wilayah Anda.
          </Text>

          {/* Form Elements */}
          <View className="gap-6">
            {/* Location Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-slate-900 ml-2">Lokasi Anda</Text>
              <View className="relative">
                <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
                  <MaterialCommunityIcons name="map-marker" size={22} color={PRIMARY} />
                </View>
                <TextInput
                  className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white text-slate-900"
                  style={styles.input}
                  placeholder="Cari Kota, Negara..."
                  placeholderTextColor="#64748b"
                  value={location}
                  onChangeText={setLocation}
                />
                <TouchableOpacity
                  className="absolute right-2 top-0 bottom-0 justify-center p-2"
                  onPress={() => {
                    // Get current location
                    setLocation("Jakarta, Indonesia");
                  }}
                >
                  <MaterialCommunityIcons name="crosshairs-gps" size={22} color={PRIMARY} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Calculation Method */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-slate-900 ml-2">Metode Perhitungan</Text>
              <TouchableOpacity
                className="w-full h-14 px-5 rounded-2xl bg-white flex-row items-center justify-between"
                style={styles.input}
              >
                <View>
                  <Text className="font-medium text-slate-900 text-sm">Kemenag RI</Text>
                  <Text className="text-[10px] text-slate-500 mt-0.5">Direkomendasikan untuk Indonesia</Text>
                </View>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Madhab Selection */}
            <View className="gap-3">
              <Text className="text-sm font-semibold text-slate-900 ml-2">Metode Asar (Madzhab)</Text>
              <View className="flex-row p-1 bg-slate-100 rounded-3xl">
                {/* Standard Option */}
                <TouchableOpacity
                  className={`flex-1 py-4 px-2 rounded-2xl items-center ${selectedMadhab === "standard" ? "bg-white" : ""
                    }`}
                  style={selectedMadhab === "standard" ? styles.madhabSelected : undefined}
                  onPress={() => setSelectedMadhab("standard")}
                >
                  <Text className={`text-sm font-bold mb-1 ${selectedMadhab === "standard" ? "text-slate-900" : "text-slate-500"
                    }`}>
                    Standar
                  </Text>
                  <Text className="text-[10px] text-center text-slate-500 leading-tight">
                    Syafi'i, Maliki, Hanbali
                  </Text>
                </TouchableOpacity>

                {/* Hanafi Option */}
                <TouchableOpacity
                  className={`flex-1 py-4 px-2 rounded-2xl items-center ${selectedMadhab === "hanafi" ? "bg-white" : ""
                    }`}
                  style={selectedMadhab === "hanafi" ? styles.madhabSelected : undefined}
                  onPress={() => setSelectedMadhab("hanafi")}
                >
                  <Text className={`text-sm font-bold mb-1 ${selectedMadhab === "hanafi" ? "text-slate-900" : "text-slate-500"
                    }`}>
                    Hanafi
                  </Text>
                  <Text className="text-[10px] text-center text-slate-500 leading-tight">
                    Waktu Asar lebih akhir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom Action */}
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-8" style={styles.bottomGradient}>
          <LinearGradient
            colors={["transparent", "#ecfdf5", "#ecfdf5"]}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            className="w-full h-14 bg-primary rounded-full flex-row items-center justify-center gap-2"
            style={styles.continueButton}
            onPress={() => router.push("/prayer-setup/notifications")}
          >
            <Text className="text-white font-bold text-lg">Lanjutkan</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 256,
  },
  input: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  madhabSelected: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  bottomGradient: {
    zIndex: 20,
  },
  continueButton: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
