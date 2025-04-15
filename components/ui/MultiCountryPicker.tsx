import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  TextInput
} from 'react-native';
import { countries } from '@/constants/countries';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { Globe, Search, X, Plus } from 'lucide-react-native';

interface MultiCountryPickerProps {
  selectedCountries: string[];
  onSelect: (countries: string[]) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

export const MultiCountryPicker: React.FC<MultiCountryPickerProps> = ({
  selectedCountries = [],
  onSelect,
  label,
  placeholder = 'Add countries',
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelect = (country: string) => {
    if (!selectedCountries.includes(country)) {
      onSelect([...selectedCountries, country]);
    } else {
      onSelect(selectedCountries.filter(c => c !== country));
    }
  };
  
  const handleRemoveCountry = (country: string) => {
    onSelect(selectedCountries.filter(c => c !== country));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Globe size={16} color={Colors.textLight} />
        <Text style={styles.label}>{label}</Text>
      </View>
      
      <View style={styles.selectedCountriesContainer}>
        {selectedCountries.map((country, index) => (
          <View key={index} style={styles.countryBadge}>
            <Text style={styles.countryBadgeText}>{country}</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveCountry(country)}
            >
              <X size={12} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={16} color={Colors.primary} />
          <Text style={styles.addButtonText}>
            {selectedCountries.length === 0 ? placeholder : 'Add more'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Countries</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search countries..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
              {searchQuery ? (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => setSearchQuery('')}
                >
                  <X size={16} color={Colors.textLight} />
                </TouchableOpacity>
              ) : null}
            </View>
            
            <FlatList
              data={filteredCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.countryItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.countryText}>{item}</Text>
                  {selectedCountries.includes(item) && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
            
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 4,
  },
  selectedCountriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 50,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  countryBadgeText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginRight: 4,
  },
  removeButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: SPACING.xs,
  },
  addButtonText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.primary,
    marginLeft: 4,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.error,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: FONT_SIZE.md,
    color: Colors.text,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  countryText: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  doneButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: Colors.white,
  },
});