import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
}) => {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: SPACING.md,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: SPACING.xs,
    maxWidth: '80%',
  },
});