import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';
import { UserRole } from '@/types';

interface RoleToggleProps {
  role: UserRole;
  onToggle: () => void;
}

export const RoleToggle: React.FC<RoleToggleProps> = ({ role, onToggle }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.toggle}>
        <View 
          style={[
            styles.option, 
            role === 'buyer' && styles.activeOption
          ]}
        >
          <Text 
            style={[
              styles.optionText,
              role === 'buyer' && styles.activeOptionText
            ]}
          >
            Buyer
          </Text>
        </View>
        <View 
          style={[
            styles.option, 
            role === 'seller' && styles.activeOption
          ]}
        >
          <Text 
            style={[
              styles.optionText,
              role === 'seller' && styles.activeOptionText
            ]}
          >
            Seller
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.lg,
    padding: 2,
  },
  option: {
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  activeOption: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    fontWeight: '500',
  },
  activeOptionText: {
    color: Colors.text,
    fontWeight: '600',
  },
});