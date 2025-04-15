import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { GearItem } from '@/types';
import { GearCard } from './GearCard';
import Colors from '@/constants/colors';
import { SPACING } from '@/constants/theme';
import { EmptyState } from '@/components/ui/EmptyState';
import { PackageOpen } from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';

interface GearListProps {
  items: GearItem[];
  onItemPress: (item: GearItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListHeaderComponent?: React.ReactNode;
}

export const GearList: React.FC<GearListProps> = ({
  items,
  onItemPress,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
}) => {
  const { distanceUnit } = useAppStore();
  
  const renderEmptyComponent = () => (
    <EmptyState
      icon={<PackageOpen size={48} color={Colors.textLight} />}
      title="No gear items found"
      message="Try adjusting your filters or search criteria"
    />
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GearCard
          item={item}
          onPress={() => onItemPress(item)}
          distance={item.distance}
          distanceUnit={distanceUnit}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: SPACING.md,
    paddingTop: 0,
    flexGrow: 1,
  },
});