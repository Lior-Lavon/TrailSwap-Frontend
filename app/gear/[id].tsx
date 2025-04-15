import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useGearStore } from '@/store/gear-store';
import { useChatStore } from '@/store/chat-store';
import { useAppStore } from '@/store/app-store';
import { GearDetailHeader } from '@/components/gear/GearDetailHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { 
  MessageCircle, 
  DollarSign, 
  AlertTriangle, 
  Tag, 
  Trash, 
  Edit 
} from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';
import * as Location from 'expo-location';

export default function GearDetailScreen() {
  const { id, edit } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { selectedItem, getGearItem, flagAsStore, deleteGearItem } = useGearStore();
  const { startChat } = useChatStore();
  const { distanceUnit } = useAppStore();
  
  const [seller, setSeller] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    loadGearItem();
  }, [id]);

  const loadGearItem = async () => {
    setIsLoading(true);
    if (id) {
      const item = await getGearItem(id as string);
      if (item) {
        // Find the seller
        const sellerData = mockUsers.find(u => u.id === item.sellerId);
        setSeller(sellerData);
        
        // Check if current user is the owner
        setIsOwner(item.sellerId === user?.id);
        
        // Calculate days left
        const daysRemaining = Math.ceil(
          (new Date(item.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        setDaysLeft(Math.max(0, daysRemaining));
        
        // Calculate distance if user has location
        if (user && user.currentLocation && item.location) {
          calculateDistance(
            user.currentLocation.coordinates.latitude,
            user.currentLocation.coordinates.longitude,
            item.location.coordinates.latitude,
            item.location.coordinates.longitude
          );
        }
      }
    }
    setIsLoading(false);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distanceInKm = R * c; // Distance in km
    
    // Convert to miles if needed
    const finalDistance = distanceUnit === 'mi' 
      ? distanceInKm * 0.621371 
      : distanceInKm;
      
    setDistance(Math.round(finalDistance * 10) / 10); // Round to 1 decimal place
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  const handleMessageSeller = async () => {
    if (!user || !selectedItem || !seller) return;
    
    try {
      const chat = await startChat(selectedItem.id, user.id, seller.id);
      router.push(`/chat/${chat.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to start chat');
    }
  };

  const handlePlaceDeposit = () => {
    router.push(`/transaction/deposit?gearId=${selectedItem?.id}`);
  };

  const handleFlagAsStore = () => {
    Alert.alert(
      'Flag as Store',
      'Are you sure you want to flag this listing as a store? This helps us maintain a community of travelers.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Flag', 
          style: 'destructive',
          onPress: async () => {
            if (selectedItem) {
              await flagAsStore(selectedItem.id);
              Alert.alert('Thank You', 'This listing has been flagged for review.');
            }
          }
        },
      ]
    );
  };

  const handleEditItem = () => {
    router.push(`/gear/edit/${selectedItem?.id}`);
  };

  const handleDeleteItem = () => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this listing? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            if (selectedItem) {
              await deleteGearItem(selectedItem.id);
              router.back();
            }
          }
        },
      ]
    );
  };

  if (!selectedItem || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: selectedItem.title,
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <GearDetailHeader
          item={selectedItem}
          sellerName={seller?.firstName || 'Unknown'}
          daysLeft={daysLeft}
          distance={distance}
          distanceUnit={distanceUnit}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{selectedItem.description}</Text>
        </View>
        
        {selectedItem.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {selectedItem.tags.map((tag, index) => (
                <Badge
                  key={index}
                  label={tag}
                  variant="secondary"
                  size="small"
                  icon={<Tag size={12} color={Colors.white} />}
                  style={styles.tag}
                />
              ))}
            </View>
          </View>
        )}
        
        {isOwner ? (
          <View style={styles.ownerActions}>
            <Button
              title="Edit Listing"
              onPress={handleEditItem}
              leftIcon={<Edit size={18} color={Colors.white} />}
              style={styles.actionButton}
            />
            <Button
              title="Delete Listing"
              onPress={handleDeleteItem}
              variant="outline"
              leftIcon={<Trash size={18} color={Colors.primary} />}
              style={styles.actionButton}
            />
          </View>
        ) : (
          <View style={styles.actions}>
            <Button
              title="Message Seller"
              onPress={handleMessageSeller}
              leftIcon={<MessageCircle size={18} color={Colors.white} />}
              style={styles.actionButton}
            />
            <Button
              title="Place Deposit"
              onPress={handlePlaceDeposit}
              variant="secondary"
              leftIcon={<DollarSign size={18} color={Colors.white} />}
              style={styles.actionButton}
            />
          </View>
        )}
        
        {!isOwner && (
          <TouchableOpacity
            style={styles.flagContainer}
            onPress={handleFlagAsStore}
          >
            <AlertTriangle size={16} color={Colors.textLight} />
            <Text style={styles.flagText}>This looks like a store</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.white,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  tag: {
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  actions: {
    backgroundColor: Colors.white,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  ownerActions: {
    backgroundColor: Colors.white,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  actionButton: {
    marginBottom: SPACING.xs,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  flagText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: SPACING.xs,
  },
});