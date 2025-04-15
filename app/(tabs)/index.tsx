import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useGearStore } from '@/store/gear-store';
import { useAppStore } from '@/store/app-store';
import { GearGrid } from '@/components/gear/GearGrid';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryPicker } from '@/components/ui/CategoryPicker';
import { RoleToggle } from '@/components/ui/RoleToggle';
import { Button } from '@/components/ui/Button';
import { GearCategory } from '@/types';
import Colors from '@/constants/colors';
import { SPACING } from '@/constants/theme';
import { Plus } from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';

export default function IndexScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    items, 
    filteredItems, 
    userItems,
    fetchGearItems, 
    fetchUserGearItems,
    setFilters, 
    applyFilters, 
    setSelectedItem 
  } = useGearStore();
  
  const { userRole, toggleUserRole, distanceUnit } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GearCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simple mock distance calculation
  const calculateDistance = (userCoords: any, itemCoords: any) => {
    if (!userCoords || !itemCoords) return undefined;
    
    // Mock distance calculation - in a real app, use haversine formula
    // This is just a random number between 0.5 and 15 for demonstration
    const distanceInKm = Math.random() * 14.5 + 0.5;
    
    // Convert to miles if needed
    return distanceUnit === 'mi' ? distanceInKm * 0.621371 : distanceInKm;
  };

  useEffect(() => {
    if (user) {
      if (userRole === 'buyer') {
        loadGearItems();
      } else {
        loadUserItems();
      }
    }
  }, [userRole, user]);

  useEffect(() => {
    if (userRole === 'buyer') {
      setFilters({ searchQuery, category: selectedCategory });
      applyFilters();
    }
  }, [searchQuery, selectedCategory, userRole]);

  const loadGearItems = async () => {
    setIsLoading(true);
    await fetchGearItems();
    setIsLoading(false);
  };

  const loadUserItems = async () => {
    setIsLoading(true);
    if (user) {
      await fetchUserGearItems(user.id);
    }
    setIsLoading(false);
  };

  const handleGearItemPress = (item: any) => {
    setSelectedItem(item);
    router.push(`/gear/${item.id}`);
  };

  const handleSearch = () => {
    if (userRole === 'buyer') {
      applyFilters();
    }
  };

  const handleCategorySelect = (category: GearCategory | null) => {
    setSelectedCategory(category);
  };

  const handleToggleRole = () => {
    toggleUserRole();
  };

  const handleAddItem = () => {
    router.push('/gear/new');
  };

  // Add distances and seller names to items for display
  const itemsWithDistanceAndSeller = userRole === 'buyer' 
    ? filteredItems.map(item => {
        const seller = mockUsers.find(u => u.id === item.sellerId);
        return {
          ...item,
          distance: calculateDistance(user?.currentLocation?.coordinates, item.location.coordinates),
          sellerName: seller ? `${seller.firstName}` : 'Unknown'
        };
      })
    : userItems.map(item => ({
        ...item,
        distance: 0, // Own items have no distance
        sellerName: 'You'
      }));

  const renderBuyerContent = () => (
    <View style={styles.content}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for gear..."
        onSubmit={handleSearch}
      />
      
      <View style={styles.categoryContainer}>
        <CategoryPicker
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </View>
      
      <GearGrid
        items={itemsWithDistanceAndSeller}
        onItemPress={handleGearItemPress}
        refreshing={isLoading}
        onRefresh={loadGearItems}
        distanceUnit={distanceUnit}
      />
    </View>
  );

  const renderSellerContent = () => (
    <View style={styles.content}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          Your Listings ({userItems.length})
        </Text>
        <Text style={styles.listSubtitle}>
          Available until you leave {user?.currentLocation?.city || 'your location'} in {user?.stayDuration || 0} days
        </Text>
        <Button
          title="Add New Listing"
          onPress={handleAddItem}
          fullWidth
          style={styles.addButton}
          leftIcon={<Plus size={18} color={Colors.white} />}
        />
      </View>
      
      <GearGrid
        items={itemsWithDistanceAndSeller}
        onItemPress={handleGearItemPress}
        refreshing={isLoading}
        onRefresh={loadUserItems}
        distanceUnit={distanceUnit}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <View style={styles.headerRight}>
              <RoleToggle role={userRole} onToggle={handleToggleRole} />
            </View>
          ),
        }}
      />
      {userRole === 'buyer' ? renderBuyerContent() : renderSellerContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  headerRight: {
    marginRight: SPACING.sm,
  },
  categoryContainer: {
    marginBottom: SPACING.md,
  },
  listHeader: {
    marginBottom: SPACING.md,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  listSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: SPACING.md,
  },
  addButton: {
    marginBottom: SPACING.md,
  },
});