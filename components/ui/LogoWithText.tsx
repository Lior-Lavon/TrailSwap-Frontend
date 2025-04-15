import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface LogoWithTextProps {
  size?: 'small' | 'medium' | 'large';
}

export const LogoWithText: React.FC<LogoWithTextProps> = ({ size = 'medium' }) => {
  // Logo sizes - significantly increased all sizes
  const logoSizes = {
    small: 90,     // Was 80, increased to 90
    medium: 160,   // Was 140, increased to 160
    large: 240,    // Was 220, increased to 240
  };
  
  const logoSize = logoSizes[size];
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.postimg.cc/nL72dXGL/file-00000000cb9061f797687ac27757d5df-conversation-id-67fca22d-ee98-800f-97ee-255c018188bb-message-i.png' }}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160, // Default size increased
    height: 160,
  },
});