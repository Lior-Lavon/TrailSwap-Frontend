import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAppStore } from '@/store/app-store';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { MapPin, Clock } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';

interface GearCardProps {
  item: any;
  onPress: (item: any) => void;
}

export const GearCard: React.FC<GearCardProps> = ({ item, onPress }) => {
  const { distanceUnit } = useAppStore();
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDistance = (distance: number | undefined) => {
    if (distance === undefined) return 'Distance unknown';
    
    if (distanceUnit === 'mi') {
      // Convert km to miles
      const miles = distance * 0.621371;
      return `${miles.toFixed(1)} ${distanceUnit}`;
    }
    
    return `${distance.toFixed(1)} ${distanceUnit}`;
  };

  const daysLeft = Math.ceil(
    (new Date(item.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {formatPrice(item.price)}
          </Text>
        </View>
        
        <Text style={styles.sellerName}>
          Seller: {item.sellerName || 'Unknown'}
        </Text>
        
        <View style={styles.details}>
          {item.distance !== undefined && (
            <View style={styles.detailItem}>
              <MapPin size={14} color={Colors.textLight} />
              <Text style={styles.detailText}>{formatDistance(item.distance)}</Text>
            </View>
          )}
          
          <View style={styles.detailItem}>
            <Clock size={14} color={Colors.textLight} />
            <Text style={styles.detailText}>
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </Text>
          </View>
        </View>
        
        {item.category && (
          <Badge
            label={item.category}
            variant="secondary"
            size="small"
            style={styles.badge}
          />
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
    marginBottom: SPACING.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sellerName: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginBottom: SPACING.xs,
  },
  details: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginLeft: 4,
  },
  badge: {
    alignSelf: 'flex-start',
  },
});