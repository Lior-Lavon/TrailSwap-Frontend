import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  isPassword = false,
  multiline = false,
  numberOfLines = 1,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  const getBorderColor = () => {
    if (error) return Colors.error;
    if (isFocused) return Colors.primary;
    return Colors.border;
  };

  const getInputHeight = () => {
    if (multiline) {
      return numberOfLines * 24; // Approximate line height
    }
    return undefined;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={[
        styles.inputContainer,
        { borderColor: getBorderColor() },
        multiline && { height: getInputHeight(), alignItems: 'flex-start' },
        inputStyle
      ]}>
        {leftIcon && (
          <View style={[
            styles.iconContainer,
            multiline && { marginTop: SPACING.sm }
          ]}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && { paddingLeft: 0 },
            (rightIcon || isPassword) && { paddingRight: 0 },
            multiline && { textAlignVertical: 'top' }
          ]}
          placeholderTextColor={Colors.textLight}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !isPasswordVisible}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
        />
        
        {isPassword && (
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Colors.textLight} />
            ) : (
              <Eye size={20} color={Colors.textLight} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.xs,
    color: Colors.text,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: Colors.text,
  },
  iconContainer: {
    paddingHorizontal: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: FONT_SIZE.xs,
    color: Colors.error,
    marginTop: SPACING.xs,
  },
});