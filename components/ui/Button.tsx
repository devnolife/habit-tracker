import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { PRIMARY } from "@/config/colors";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: ViewStyle;
}

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  outline: "bg-transparent border border-primary",
  ghost: "bg-transparent",
};

const textVariantStyles = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary",
  ghost: "text-primary",
};

const sizeStyles = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8",
};

const textSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-2xl flex-row items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50" : ""} ${className}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? PRIMARY.contrast : PRIMARY.main}
          size="small"
        />
      ) : typeof children === "string" ? (
        <Text
          className={`font-semibold ${textVariantStyles[variant]} ${textSizeStyles[size]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
