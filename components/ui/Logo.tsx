import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  // Logo sizes - significantly increased all sizes
  const logoSizes = {
    small: 70,    // Was 60, increased to 70
    medium: 100,   // Was 90, increased to 100
    large: 180,   // Was 160, increased to 180
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
    width: 100, // Default size increased
    height: 100,
  },
});