/**
 * 🔵 PROGRESS RING
 * =================
 * A circular progress indicator built with react-native-svg.
 *
 * Usage:
 *   <ProgressRing progress={75} size={48} color="#3B82F6" />
 *   <ProgressRing progress={100} size={64} color="#22C55E" icon="check" />
 *   <ProgressRing progress={60} size={140} color="#3B82F6">
 *     <Text>Custom content</Text>
 *   </ProgressRing>
 */

import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle as SvgCircle } from 'react-native-svg';

interface ProgressRingProps {
  /** Progress value between 0 and 100. */
  progress?: number;
  /** Diameter of the ring in pixels. */
  size?: number;
  /** Stroke color for the filled arc. */
  color: string;
  /** Width of the ring stroke. */
  strokeWidth?: number;
  /** Optional icon name to render in the center (ignored when children provided). */
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  /** Size of the center icon. Defaults to `size * 0.375`. */
  iconSize?: number;
  /** Color of the center icon. Defaults to `color`. */
  iconColor?: string;
  /** Opacity of the background (unfilled) track. Hex suffix, e.g. "30". */
  trackOpacity?: string;
  /** Custom content to render in the center. Overrides icon. */
  children?: React.ReactNode;
}

export function ProgressRing({
  progress = 0,
  size = 48,
  color,
  strokeWidth = 4,
  icon = 'bell',
  iconSize,
  iconColor,
  trackOpacity = '30',
  children,
}: ProgressRingProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (clampedProgress / 100) * circumference;

  const resolvedIconSize = iconSize ?? Math.round(size * 0.375);
  const resolvedIconColor = iconColor ?? color;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: '-90deg' }], position: 'absolute' }}
      >
        {/* Background track */}
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`${color}${trackOpacity}`}
          strokeWidth={strokeWidth}
        />
        {/* Filled arc */}
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      {/* Center content: children override icon */}
      {children ?? (
        <MaterialCommunityIcons
          name={icon}
          size={resolvedIconSize}
          color={resolvedIconColor}
        />
      )}
    </View>
  );
}
