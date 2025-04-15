import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { MapPin, Clock, DollarSign, User } from 'lucide-react-native';

interface GearDetailHeaderProps {
  item: any;
  sellerName: string;
  daysLeft: number;
  distance: number | null;
  distanceUnit?: 'km' | 'mi';
}

export const GearDetailHeader: React.FC<GearDetailHeaderProps> = ({ 
  item, 
  sellerName, 
  daysLeft,
  distance,
  distanceUnit = 'km'
}) => {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDistance = (distance: number | null) => {
    if (distance === null) return 'Distance unknown';
    return `${distance.toFixed(1)} ${distanceUnit}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScroll}
      >
        {item.images.map((image: string, index: number) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
        
        <View style={styles.sellerContainer}>
          <User size={16} color={Colors.textLight} />
          <Text style={styles.sellerName}>{sellerName}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          {distance !== null && (
            <View style={styles.detailItem}>
              <MapPin size={16} color={Colors.textLight} />
              <Text style={styles.detailText}>{formatDistance(distance)}</Text>
            </View>
          )}
          
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.textLight} />
            <Text style={styles.detailText}>
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: SPACING.md,
  },
  imageScroll: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sellerName: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: SPACING.xs,
  },
});