/**
 * 📋 ListItem Component
 * =====================
 * List item dengan left icon, title, subtitle, dan right element
 */

import { View, Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react-native";
import { GRAY } from "@/config/colors";

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showArrow?: boolean;
  onPress?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  showArrow = false,
  onPress,
  className = "",
}: ListItemProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      className={`flex-row items-center py-3 ${className}`}
    >
      {leftIcon && (
        <View className="mr-3">{leftIcon}</View>
      )}

      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-foreground-secondary mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon}

      {showArrow && !rightIcon && (
        <ChevronRight size={20} color={GRAY[400]} />
      )}
    </Container>
  );
}
