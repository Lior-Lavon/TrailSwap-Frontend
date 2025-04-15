import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useAppStore } from '@/store/app-store';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { MapPin } from 'lucide-react-native';

interface GearGridItemProps {
  item: any;
  onPress: (item: any) => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - (SPACING.md * 3)) / 2; // 2 items per row with spacing

export const GearGridItem: React.FC<GearGridItemProps> = ({ item, onPress }) => {
  const { distanceUnit } = useAppStore();
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDistance = (distance: number | undefined) => {
    if (distance === undefined) return '';
    
    if (distanceUnit === 'mi') {
      // Convert km to miles
      const miles = distance * 0.621371;
      return `${miles.toFixed(1)} ${distanceUnit}`;
    }
    
    return `${distance.toFixed(1)} ${distanceUnit}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={styles.price}>
          {formatPrice(item.price)}
        </Text>
        
        <Text style={styles.sellerName} numberOfLines={1}>
          {item.sellerName || 'Unknown'}
        </Text>
        
        {item.distance !== undefined && (
          <View style={styles.distanceContainer}>
            <MapPin size={12} color={Colors.textLight} />
            <Text style={styles.distanceText}>{formatDistance(item.distance)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    width: ITEM_WIDTH,
    marginBottom: SPACING.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  sellerName: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginBottom: 2,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginLeft: 2,
  },
});