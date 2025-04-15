import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MultiCountryPicker } from '@/components/ui/MultiCountryPicker';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { Mail, Calendar, Camera, FileText } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [stayDuration, setStayDuration] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [travelHistory, setTravelHistory] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    stayDuration: '',
    bio: '',
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setStayDuration(user.stayDuration ? user.stayDuration.toString() : '7');
      setProfileImage(user.profileImage || null);
      setTravelHistory(user.travelHistory || []);
      setBio(user.bio || '');
    }
  }, [user]);

  const validateForm = () => {
    const errors = {
      email: '',
      stayDuration: '',
      bio: '',
    };
    
    let isValid = true;
    
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
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

  const handleSave = async () => {
    if (validateForm() && user) {
      try {
        await updateUser({
          ...user,
          email,
          profileImage,
          bio,
          stayDuration: Number(stayDuration),
          travelHistory,
        });
        
        router.back();
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to update your profile photo.');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (!user) {
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
          title: 'Edit Profile',
        }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={pickImage}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Camera size={40} color={Colors.textLight} />
                <Text style={styles.profileImageText}>Change Photo</Text>
              </View>
            )}
            <View style={styles.editIconContainer}>
              <Camera size={16} color={Colors.white} />
            </View>
          </TouchableOpacity>
          
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {user.firstName || ''} {user.lastName || ''}
            </Text>
            <Text style={styles.locationText}>
              {user.currentLocation?.city || ''}, {user.currentLocation?.country || ''}
            </Text>
          </View>
          
          <Input
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={formErrors.email}
            leftIcon={<Mail size={20} color={Colors.textLight} />}
          />
          
          <Input
            label="Bio"
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            error={formErrors.bio}
            leftIcon={<FileText size={20} color={Colors.textLight} />}
          />
          
          <MultiCountryPicker
            label="Travel History"
            selectedCountries={travelHistory}
            onSelect={setTravelHistory}
          />
          
          <Input
            label="How many days will you be in town?"
            placeholder="7"
            value={stayDuration}
            onChangeText={setStayDuration}
            keyboardType="numeric"
            error={formErrors.stayDuration}
            leftIcon={<Calendar size={20} color={Colors.textLight} />}
          />
          
          <Button
            title="Save Changes"
            onPress={handleSave}
            isLoading={isLoading}
            fullWidth
            style={styles.saveButton}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: SPACING.md,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  profileImageText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginTop: 4,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  nameText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  locationText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    marginTop: SPACING.md,
  },
});