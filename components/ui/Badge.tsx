/**
 * 📊 Badge Component
 * ==================
 * Small label/badge untuk status atau kategori
 */

import { View, Text } from "react-native";
import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  error: "bg-error-light text-error",
  info: "bg-info-light text-info",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const [bgClass, textClass] = variantStyles[variant].split(" ");

  return (
    <View className={`px-3 py-1 rounded-full ${bgClass} ${className}`}>
      <Text className={`text-xs font-medium ${textClass}`}>
        {children}
      </Text>
    </View>
  );
}
