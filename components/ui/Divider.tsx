/**
 * ⬜ Divider Component
 * ====================
 * Simple horizontal divider
 */

import { View } from "react-native";

interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return <View className={`h-px bg-gray-200 my-2 ${className}`} />;
}
