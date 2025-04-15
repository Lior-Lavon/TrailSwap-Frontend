import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert,
  Platform
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useGearStore } from '@/store/gear-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CategoryPicker } from '@/components/ui/CategoryPicker';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  Camera, 
  DollarSign, 
  Tag, 
  Info, 
  CheckCircle,
  Clock
} from 'lucide-react-native';
import { GearCategory, GearCondition } from '@/types';
import * as ImagePicker from 'expo-image-picker';

export default function NewGearScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addGearItem, isLoading } = useGearStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<GearCategory | null>(null);
  const [condition, setCondition] = useState<GearCondition>('Used');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [stayDuration, setStayDuration] = useState(user?.stayDuration.toString() || '7');
  
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: '',
    stayDuration: '',
  });

  useEffect(() => {
    // Request camera roll permissions
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images!');
        }
      }
    })();
  }, []);

  const validateForm = () => {
    const errors = {
      title: '',
      description: '',
      price: '',
      category: '',
      images: '',
      stayDuration: '',
    };
    
    let isValid = true;
    
    if (!title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }
    
    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }
    
    if (!price.trim()) {
      errors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      errors.price = 'Price must be a positive number';
      isValid = false;
    }
    
    if (!category) {
      errors.category = 'Category is required';
      isValid = false;
    }
    
    if (images.length === 0) {
      errors.images = 'At least one image is required';
      isValid = false;
    }
    
    if (!stayDuration.trim()) {
      errors.stayDuration = 'Stay duration is required';
      isValid = false;
    } else if (isNaN(Number(stayDuration)) || Number(stayDuration) <= 0) {
      errors.stayDuration = 'Please enter a valid number of days';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleAddGear = async () => {
    if (validateForm() && user) {
      try {
        // Parse tags into array
        const tagsArray = tags
          .split(',')
          .map(tag => tag.trim().toLowerCase())
          .filter(tag => tag.length > 0);
        
        // Calculate expiration date based on stay duration
        const stayEndDate = new Date();
        stayEndDate.setDate(stayEndDate.getDate() + Number(stayDuration));
        
        await addGearItem({
          sellerId: user.id,
          title,
          description,
          price: Number(price),
          category: category!,
          condition,
          images,
          tags: tagsArray,
          location: {
            ...user.currentLocation,
            stayDuration: Number(stayDuration),
          },
          stayDuration: Number(stayDuration),
          stayEndDate,
        });
        
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Error', 'Failed to add gear item');
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const conditions: GearCondition[] = ['Unopened', 'Like New', 'Used'];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Add New Gear',
          headerBackTitle: 'Cancel',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Input
            label="Title"
            placeholder="What are you selling?"
            value={title}
            onChangeText={setTitle}
            error={formErrors.title}
          />
          
          <Input
            label="Description"
            placeholder="Describe your item (condition, features, etc.)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            error={formErrors.description}
            leftIcon={<Info size={20} color={Colors.textLight} />}
          />
          
          <Input
            label="Price (USD)"
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            error={formErrors.price}
            leftIcon={<DollarSign size={20} color={Colors.textLight} />}
          />
          
          <Input
            label="How many days will you be in town?"
            placeholder="Enter number of days"
            value={stayDuration}
            onChangeText={setStayDuration}
            keyboardType="numeric"
            error={formErrors.stayDuration}
            leftIcon={<Clock size={20} color={Colors.textLight} />}
          />
          
          <Text style={styles.label}>Category</Text>
          <CategoryPicker
            selectedCategory={category}
            onSelectCategory={setCategory}
            showAll={false}
          />
          {formErrors.category ? (
            <Text style={styles.errorText}>{formErrors.category}</Text>
          ) : null}
          
          <Text style={styles.label}>Condition</Text>
          <View style={styles.conditionContainer}>
            {conditions.map((cond) => (
              <TouchableOpacity
                key={cond}
                style={[
                  styles.conditionOption,
                  condition === cond && styles.selectedCondition,
                ]}
                onPress={() => setCondition(cond)}
              >
                {condition === cond && (
                  <CheckCircle size={16} color={Colors.white} style={styles.checkIcon} />
                )}
                <Text
                  style={[
                    styles.conditionText,
                    condition === cond && styles.selectedConditionText,
                  ]}
                >
                  {cond}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Input
            label="Tags (comma separated)"
            placeholder="backpack, osprey, hiking..."
            value={tags}
            onChangeText={setTags}
            leftIcon={<Tag size={20} color={Colors.textLight} />}
          />
          
          <Text style={styles.label}>Images</Text>
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Text style={styles.removeImageText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={handlePickImage}
            >
              <Camera size={24} color={Colors.textLight} />
              <Text style={styles.addImageText}>Add Image</Text>
            </TouchableOpacity>
          </View>
          {formErrors.images ? (
            <Text style={styles.errorText}>{formErrors.images}</Text>
          ) : null}
          
          <Button
            title="Add Listing"
            onPress={handleAddGear}
            isLoading={isLoading}
            fullWidth
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  conditionContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  conditionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  selectedCondition: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  conditionText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
  },
  selectedConditionText: {
    color: Colors.white,
  },
  checkIcon: {
    marginRight: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.sm,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: Colors.white,
    fontSize: FONT_SIZE.xs,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
  },
  addImageText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginTop: SPACING.xs,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.error,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
  },
  submitButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
});