import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Switch as RNSwitch,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';

// Button Component
interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: 'solid' | 'ghost' | 'outline';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  disabled = false,
  style,
}: ButtonProps) {
  const colors = {
    primary: '#f48c25',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
  };

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 24, fontSize: 18 },
  };

  const bgColor = variant === 'solid' ? colors[color] : 'transparent';
  const textColor = variant === 'solid' ? '#ffffff' : colors[color];
  const borderColor = variant === 'outline' ? colors[color] : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: 12,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor,
          opacity: disabled ? 0.5 : 1,
          alignItems: 'center',
          justifyContent: 'center',
          ...sizes[size],
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={{ color: textColor, fontWeight: '600', fontSize: sizes[size].fontSize }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

// Card Component
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
}

export function Card({ children, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Avatar Component
interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  source?: ImageSourcePropType;
  fallback?: string;
  style?: ViewStyle;
  className?: string;
  children?: React.ReactNode;
}

export function Avatar({ size = 'md', source, fallback, style, children }: AvatarProps) {
  const sizes = { sm: 32, md: 48, lg: 64 };
  const dimension = sizes[size];

  if (children) {
    return (
      <View
        style={[
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: '#f48c25',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {source ? (
        <Image source={source} style={{ width: dimension, height: dimension }} />
      ) : (
        <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: dimension * 0.4 }}>
          {fallback || 'U'}
        </Text>
      )}
    </View>
  );
}

// Chip Component
interface ChipProps {
  children: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  variant?: 'solid' | 'flat';
  style?: ViewStyle;
}

export function Chip({ children, color = 'default', variant = 'flat', style }: ChipProps) {
  const colors = {
    primary: { bg: '#fff7ed', text: '#f48c25' },
    success: { bg: '#dcfce7', text: '#22c55e' },
    warning: { bg: '#fef9c3', text: '#ca8a04' },
    danger: { bg: '#fee2e2', text: '#ef4444' },
    default: { bg: '#f3f4f6', text: '#6b7280' },
  };

  return (
    <View
      style={[
        {
          backgroundColor: variant === 'solid' ? colors[color].text : colors[color].bg,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color: variant === 'solid' ? '#ffffff' : colors[color].text,
            fontSize: 13,
            fontWeight: '500',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

// TextField Component
interface TextFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  style?: ViewStyle;
}

export function TextField({
  value,
  onChangeText,
  placeholder,
  label,
  keyboardType = 'default',
  style,
}: TextFieldProps) {
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{
          backgroundColor: '#f9fafb',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          color: '#181411',
          borderWidth: 1,
          borderColor: '#e5e7eb',
        }}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}

// Switch Component
interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch({ value = false, onValueChange, disabled = false }: SwitchProps) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: '#e0ddd8', true: '#f48c25' }}
      thumbColor="#ffffff"
    />
  );
}

// Checkbox Component
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked = false, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={() => onChange?.(!checked)}
      disabled={disabled}
      style={{ flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: checked ? '#f48c25' : '#d1d5db',
          backgroundColor: checked ? '#f48c25' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>}
      </View>
      {label && (
        <Text style={{ marginLeft: 10, fontSize: 15, color: '#181411' }}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

// Progress Component
interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export function Progress({ value, max = 100, color = '#f48c25', height = 8, style }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <View
      style={[
        {
          height,
          backgroundColor: '#e5e7eb',
          borderRadius: height / 2,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: color,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}
