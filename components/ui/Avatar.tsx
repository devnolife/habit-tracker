/**
 * 🔲 Avatar Component
 * ===================
 * User avatar dengan initials atau image
 */

import { View, Text, Image, ImageSourcePropType } from "react-native";

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-lg" },
};

export function Avatar({ source, name, size = "md", className = "" }: AvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const { container, text } = sizeStyles[size];

  if (source) {
    return (
      <Image
        source={source}
        className={`${container} rounded-full ${className}`}
      />
    );
  }

  return (
    <View
      className={`${container} rounded-full bg-primary items-center justify-center ${className}`}
    >
      <Text className={`${text} font-semibold text-white`}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
