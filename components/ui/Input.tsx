/**
 * 📥 Input Component
 * ==================
 * Reusable text input dengan styling Tailwind
 */

import { TextInput, View, Text, TextInputProps } from "react-native";
import { forwardRef } from "react";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerClassName = "", className = "", ...props }, ref) => {
    return (
      <View className={containerClassName}>
        {label && (
          <Text className="text-sm font-medium text-foreground mb-2">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={`bg-background-secondary border border-gray-200 rounded-xl px-4 py-3 text-foreground ${error ? "border-error" : ""
            } ${className}`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {error && (
          <Text className="text-sm text-error mt-1">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
