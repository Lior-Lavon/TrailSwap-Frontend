import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { GearGridItem } from './GearGridItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { SPACING } from '@/constants/theme';
import Colors from '@/constants/colors';
import { Package } from 'lucide-react-native';

interface GearGridProps {
  items: any[];
  onItemPress: (item: any) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  distanceUnit?: 'km' | 'mi';
}

export const GearGrid: React.FC<GearGridProps> = ({ 
  items, 
  onItemPress, 
  refreshing = false, 
  onRefresh,
  distanceUnit = 'km'
}) => {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Package size={48} color={Colors.textLight} />}
        title="No items found"
        message="There are no items available at the moment. Check back later or try a different search."
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GearGridItem 
          item={item} 
          onPress={onItemPress} 
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: SPACING.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});