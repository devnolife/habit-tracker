import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState, useEffect } from "react";

const { width } = Dimensions.get("window");
const COMPASS_SIZE = width * 0.75;

const PRIMARY = "#10b981";

export default function QiblaScreen() {
  const [compassDegree, setCompassDegree] = useState(295); // Simulated Qibla direction
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Simulated compass rotation
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random fluctuation to simulate real compass
      setCompassDegree(prev => prev + (Math.random() - 0.5) * 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getCardinalDirection = (degree: number) => {
    const normalized = ((degree % 360) + 360) % 360;
    if (normalized >= 337.5 || normalized < 22.5) return "U";
    if (normalized >= 22.5 && normalized < 67.5) return "TL";
    if (normalized >= 67.5 && normalized < 112.5) return "T";
    if (normalized >= 112.5 && normalized < 157.5) return "TG";
    if (normalized >= 157.5 && normalized < 202.5) return "S";
    if (normalized >= 202.5 && normalized < 247.5) return "BD";
    if (normalized >= 247.5 && normalized < 292.5) return "B";
    return "BL";
  };

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
          <Text className="text-lg font-bold text-slate-900">Arah Kiblat</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-xl items-center justify-center"
            style={styles.iconBtn}
            onPress={() => setIsCalibrating(true)}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Compass Container */}
          <View className="items-center">
            {/* Live Badge */}
            <View className="flex-row items-center gap-2 mb-6">
              <View className="w-2 h-2 bg-emerald-500 rounded-full" />
              <Text className="text-emerald-600 font-semibold text-sm">Live Compass</Text>
            </View>

            {/* Compass Visual */}
            <View
              className="relative items-center justify-center"
              style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}
            >
              {/* Outer Ring */}
              <View
                className="absolute rounded-full border-4 border-slate-200"
                style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}
              />

              {/* Compass Rose Background */}
              <LinearGradient
                colors={["#f8fafc", "#e2e8f0"]}
                className="absolute rounded-full items-center justify-center"
                style={{ width: COMPASS_SIZE - 20, height: COMPASS_SIZE - 20 }}
              >
                {/* Cardinal Directions */}
                <Text className="absolute text-lg font-bold text-slate-700" style={{ top: 20 }}>U</Text>
                <Text className="absolute text-lg font-bold text-slate-400" style={{ bottom: 20 }}>S</Text>
                <Text className="absolute text-lg font-bold text-slate-400" style={{ left: 20 }}>B</Text>
                <Text className="absolute text-lg font-bold text-slate-400" style={{ right: 20 }}>T</Text>

                {/* Dashed Circle */}
                <View
                  className="absolute rounded-full border border-dashed border-slate-300"
                  style={{ width: COMPASS_SIZE - 80, height: COMPASS_SIZE - 80 }}
                />
              </LinearGradient>

              {/* Qibla Needle */}
              <View
                className="absolute items-center"
                style={{
                  transform: [{ rotate: `${compassDegree}deg` }],
                  width: COMPASS_SIZE - 60,
                  height: COMPASS_SIZE - 60,
                }}
              >
                {/* Needle Top (Red) */}
                <View
                  className="absolute bg-red-500 rounded-t-full"
                  style={{
                    width: 12,
                    height: (COMPASS_SIZE - 60) / 2 - 30,
                    top: 30,
                  }}
                />
                {/* Needle Bottom (Gray) */}
                <View
                  className="absolute bg-slate-400 rounded-b-full"
                  style={{
                    width: 12,
                    height: (COMPASS_SIZE - 60) / 2 - 30,
                    bottom: 30,
                  }}
                />
              </View>

              {/* Kaaba Icon Center */}
              <View className="w-16 h-16 bg-slate-900 rounded-lg items-center justify-center shadow-lg">
                <View className="absolute top-0 left-0 right-0 h-2 bg-amber-400 rounded-t-lg" />
                <MaterialCommunityIcons name="cube-outline" size={32} color="#fff" />
              </View>
            </View>

            {/* Direction Info */}
            <View className="items-center mt-8">
              <Text className="text-5xl font-bold text-slate-900">
                {Math.round(compassDegree)}°
              </Text>
              <Text className="text-xl text-slate-500 font-medium mt-1">
                {getCardinalDirection(compassDegree)} (Barat Laut)
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Info Cards */}
        <View className="px-6 pb-6">
          {/* Location Card */}
          <View className="bg-white rounded-2xl p-4 mb-4" style={styles.card}>
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-emerald-100 rounded-2xl items-center justify-center">
                <MaterialCommunityIcons name="map-marker" size={24} color={PRIMARY} />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-slate-500">Lokasi Anda</Text>
                <Text className="text-base font-bold text-slate-900">Jakarta, Indonesia</Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Distance Card */}
          <View className="bg-white rounded-2xl p-4" style={styles.card}>
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 bg-cyan-100 rounded-2xl items-center justify-center">
                <MaterialCommunityIcons name="map-marker-distance" size={24} color="#06b6d4" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-slate-500">Jarak ke Mekkah</Text>
                <Text className="text-base font-bold text-slate-900">7,900 km</Text>
              </View>
              <View className="bg-emerald-100 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-emerald-600">🕋 Ka'bah</Text>
              </View>
            </View>
          </View>

          {/* Calibration Tip */}
          <View className="mt-4 flex-row items-center justify-center gap-2">
            <MaterialCommunityIcons name="information-outline" size={16} color="#64748b" />
            <Text className="text-xs text-slate-500">
              Jauhkan dari benda logam untuk akurasi terbaik
            </Text>
          </View>
        </View>
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
});
