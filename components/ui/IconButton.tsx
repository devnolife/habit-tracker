/**
 * 🔘 IconButton Component
 * =======================
 * Tombol dengan icon saja (tanpa text)
 */

import { TouchableOpacity, ViewStyle } from "react-native";
import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: "default" | "primary" | "soft";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
}

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const variantStyles = {
  default: "bg-gray-100",
  primary: "bg-primary",
  soft: "bg-soft-orange",
};

export function IconButton({
  children,
  onPress,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-xl items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50" : ""
        } ${className}`}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}
