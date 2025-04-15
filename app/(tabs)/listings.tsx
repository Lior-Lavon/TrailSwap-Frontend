import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useGearStore } from '@/store/gear-store';
import { useAppStore } from '@/store/app-store';
import { GearList } from '@/components/gear/GearList';
import { RoleToggle } from '@/components/ui/RoleToggle';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { Plus } from 'lucide-react-native';

export default function ListingsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { userItems, fetchUserGearItems, setSelectedItem } = useGearStore();
  const { userRole, toggleUserRole, setUserRole } = useAppStore();
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ensure we're in seller mode
    if (userRole !== 'seller') {
      setUserRole('seller');
    }
    
    if (user) {
      loadUserItems();
    }
  }, [user]);

  const loadUserItems = async () => {
    setIsLoading(true);
    await fetchUserGearItems(user!.id);
    setIsLoading(false);
  };

  const handleGearItemPress = (item: any) => {
    setSelectedItem(item);
    router.push(`/gear/${item.id}?edit=true`);
  };

  const handleAddItem = () => {
    router.push('/gear/new');
  };

  const handleToggleRole = () => {
    toggleUserRole();
    if (userRole === 'seller') {
      // Navigate to explore page when switching to buyer mode
      router.replace('/(tabs)/');
    }
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <RoleToggle role={userRole} onToggle={handleToggleRole} />
      <Text style={styles.listTitle}>
        Your Listings ({userItems.length})
      </Text>
      <Text style={styles.listSubtitle}>
        Available until you leave {user?.currentLocation.city} in {user?.stayDuration} days
      </Text>
      <Button
        title="Add New Listing"
        onPress={handleAddItem}
        fullWidth
        style={styles.addButton}
        leftIcon={<Plus size={18} color={Colors.white} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitle: "GearTrek",
        }}
      />
      <View style={styles.content}>
        <GearList
          items={userItems}
          onItemPress={handleGearItemPress}
          refreshing={isLoading}
          onRefresh={loadUserItems}
          ListHeaderComponent={renderListHeader()}
        />
      </View>
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
  listHeader: {
    marginBottom: SPACING.md,
  },
  listTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  listSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginBottom: SPACING.md,
  },
  addButton: {
    marginBottom: SPACING.md,
  },
});