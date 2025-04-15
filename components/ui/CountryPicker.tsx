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
import { Globe, Search, X } from 'lucide-react-native';

interface CountryPickerProps {
  selectedCountry: string | undefined;
  onSelect: (country: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({
  selectedCountry,
  onSelect,
  label,
  placeholder = 'Select a country',
  error,
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelect = (country: string) => {
    onSelect(country);
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Globe size={16} color={Colors.textLight} />
        <Text style={styles.label}>{label}</Text>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.selector,
          error ? styles.selectorError : null,
          disabled ? styles.selectorDisabled : null
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text 
          style={[
            styles.selectorText, 
            !selectedCountry ? styles.placeholder : null,
            disabled ? styles.textDisabled : null
          ]}
        >
          {selectedCountry || placeholder}
        </Text>
        {!disabled && <Text style={styles.chevron}>›</Text>}
      </TouchableOpacity>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
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
                  {selectedCountry === item && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
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
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectorError: {
    borderColor: Colors.error,
  },
  selectorDisabled: {
    backgroundColor: Colors.backgroundAlt,
    opacity: 0.7,
  },
  selectorText: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
  },
  placeholder: {
    color: Colors.textLight,
  },
  textDisabled: {
    color: Colors.textLight,
  },
  chevron: {
    fontSize: FONT_SIZE.lg,
    color: Colors.textLight,
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
});