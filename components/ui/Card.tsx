import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <View
      className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}
      style={style}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
}

export function CardHeader({ title, subtitle, rightElement }: CardHeaderProps) {
  return (
    <View className="flex-row justify-between items-start mb-3">
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        )}
      </View>
      {rightElement}
    </View>
  );
}
