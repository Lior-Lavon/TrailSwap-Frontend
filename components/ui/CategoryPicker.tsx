import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GearCategory } from '@/types';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';
import { gearCategories } from '@/mocks/categories';
import { 
  Backpack, 
  Bed, 
  Shirt, 
  Footprints, 
  CookingPot, 
  Smartphone, 
  Tent, 
  Package, 
  MoreHorizontal,
  Mountain,
  Droplet,
  Plane,
  Camera,
  Book
} from 'lucide-react-native';

interface CategoryPickerProps {
  selectedCategory: GearCategory | null;
  onSelectCategory: (category: GearCategory | null) => void;
  showAll?: boolean;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
  showAll = true,
}) => {
  const getCategoryIcon = (categoryId: GearCategory) => {
    switch (categoryId) {
      case 'Backpacks':
        return <Backpack size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Sleeping':
        return <Bed size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Clothing':
        return <Shirt size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Footwear':
        return <Footprints size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Cooking':
        return <CookingPot size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Electronics':
        return <Smartphone size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Camping':
        return <Tent size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Hiking':
        return <Mountain size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Water':
        return <Droplet size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Travel':
        return <Plane size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Photography':
        return <Camera size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Books':
        return <Book size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      case 'Accessories':
        return <Package size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
      default:
        return <MoreHorizontal size={20} color={selectedCategory === categoryId ? Colors.white : Colors.text} />;
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {showAll && (
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === null && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(null)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === null && styles.selectedCategoryText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        )}
        
        {gearCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            {getCategoryIcon(category.id)}
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: SPACING.sm,
  },
  container: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    gap: SPACING.sm,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    gap: 6,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: Colors.white,
  },
});