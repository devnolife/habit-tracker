import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Play, Pause, RotateCcw, Target, Clock } from "lucide-react-native";
import { useState } from "react";

export default function WorkScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const focusTime = 4; // hours focused today
  const targetFocus = 6;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Tracker Kerja 💼
          </Text>
          <Text className="mt-1 text-base text-gray-500">
            Tingkatkan produktivitasmu
          </Text>
        </View>

        {/* Focus Time Card */}
        <View className="p-5 mb-6 bg-soft-yellow rounded-3xl">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-yellow-800">
                Waktu Fokus Hari Ini
              </Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-3xl font-bold text-yellow-900">
                  {focusTime}h
                </Text>
                <Text className="ml-1 text-lg text-yellow-700">
                  / {targetFocus}h
                </Text>
              </View>
              <Text className="mt-1 text-sm text-yellow-700">
                {targetFocus - focusTime} jam lagi
              </Text>
            </View>
            <View className="items-center justify-center w-20 h-20 bg-yellow-200 rounded-full">
              <Target size={32} color="#CA8A04" />
            </View>
          </View>
        </View>

        {/* Pomodoro Timer */}
        <View className="items-center p-6 mb-6 bg-gray-900 rounded-3xl">
          <Text className="mb-2 text-sm font-medium text-gray-400">
            POMODORO TIMER
          </Text>
          <Text className="text-6xl font-bold text-white">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </Text>
          <Text className="mt-2 mb-6 text-sm text-gray-500">
            Sesi Fokus
          </Text>

          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => setIsRunning(!isRunning)}
              className={`w-16 h-16 rounded-full items-center justify-center ${isRunning ? "bg-red-500" : "bg-primary"
                }`}
            >
              {isRunning ? (
                <Pause size={28} color="white" />
              ) : (
                <Play size={28} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMinutes(25);
                setSeconds(0);
                setIsRunning(false);
              }}
              className="items-center justify-center w-16 h-16 bg-gray-700 rounded-full"
            >
              <RotateCcw size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Sessions */}
        <View className="mb-24">
          <Text className="mb-4 text-lg font-semibold text-gray-900">
            Sesi Hari Ini
          </Text>
          <View className="p-4 mb-3 bg-gray-50 rounded-2xl">
            <View className="flex-row items-center">
              <View className="items-center justify-center w-10 h-10 mr-3 bg-green-100 rounded-full">
                <Clock size={20} color="#16A34A" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  Deep Work - Coding
                </Text>
                <Text className="text-sm text-gray-500">09:00 - 11:00</Text>
              </View>
              <Text className="font-semibold text-green-600">2h</Text>
            </View>
          </View>
          <View className="p-4 mb-3 bg-gray-50 rounded-2xl">
            <View className="flex-row items-center">
              <View className="items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full">
                <Clock size={20} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  Review - Documentation
                </Text>
                <Text className="text-sm text-gray-500">11:30 - 12:30</Text>
              </View>
              <Text className="font-semibold text-blue-600">1h</Text>
            </View>
          </View>
          <View className="p-4 bg-gray-50 rounded-2xl">
            <View className="flex-row items-center">
              <View className="items-center justify-center w-10 h-10 mr-3 bg-purple-100 rounded-full">
                <Clock size={20} color="#7C3AED" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  Meeting - Team Sync
                </Text>
                <Text className="text-sm text-gray-500">14:00 - 15:00</Text>
              </View>
              <Text className="font-semibold text-purple-600">1h</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
