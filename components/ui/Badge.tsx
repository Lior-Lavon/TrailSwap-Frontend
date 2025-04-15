import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  icon,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return Colors.secondary;
      case 'success':
        return Colors.success;
      case 'error':
        return Colors.error;
      case 'warning':
        return Colors.warning;
      case 'info':
        return '#2196F3'; // Info blue
      default:
        return Colors.primary;
    }
  };

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: getBackgroundColor(),
      borderRadius: BORDER_RADIUS.round,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = 2;
        baseStyle.paddingHorizontal = SPACING.xs;
        break;
      case 'large':
        baseStyle.paddingVertical = SPACING.xs;
        baseStyle.paddingHorizontal = SPACING.md;
        break;
      default: // medium
        baseStyle.paddingVertical = 3;
        baseStyle.paddingHorizontal = SPACING.sm;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: Colors.white,
      fontWeight: '500',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = FONT_SIZE.xs;
        break;
      case 'large':
        baseStyle.fontSize = FONT_SIZE.md;
        break;
      default: // medium
        baseStyle.fontSize = FONT_SIZE.sm;
    }

    return baseStyle;
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 4,
  },
});