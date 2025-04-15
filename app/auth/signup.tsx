import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LogoWithText } from '@/components/ui/LogoWithText';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { Mail, Lock, User, Calendar, Camera, MapPin, FileText } from 'lucide-react-native';
import { CountryPicker } from '@/components/ui/CountryPicker';
import { MultiCountryPicker } from '@/components/ui/MultiCountryPicker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [homeCountry, setHomeCountry] = useState('');
  const [travelHistory, setTravelHistory] = useState<string[]>([]);
  const [stayDuration, setStayDuration] = useState('7');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState<{
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  } | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    homeCountry: '',
    stayDuration: '',
    profileImage: '',
    bio: '',
  });

  useEffect(() => {
    (async () => {
      // Request location permission and get current location
      setIsLocationLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Permission Denied",
          "We need location permissions to show you relevant gear in your area.",
          [{ text: "OK" }]
        );
        setIsLocationLoading(false);
        return;
      }
      
      try {
        // Get current position
        const position = await Location.getCurrentPositionAsync({});
        
        // Reverse geocode to get address
        const geocode = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        
        if (geocode && geocode.length > 0) {
          setLocation({
            city: geocode[0].city || 'Unknown City',
            country: geocode[0].country || 'Unknown Country',
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        }
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Location Error", "Could not determine your location. Please try again later.");
      } finally {
        setIsLocationLoading(false);
      }
    })();
  }, []);

  const validateForm = () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      homeCountry: '',
      stayDuration: '',
      profileImage: '',
      bio: '',
    };
    
    let isValid = true;
    
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    if (!homeCountry) {
      errors.homeCountry = 'Home country is required';
      isValid = false;
    }
    
    if (!stayDuration.trim()) {
      errors.stayDuration = 'Stay duration is required';
      isValid = false;
    } else if (isNaN(Number(stayDuration)) || Number(stayDuration) <= 0) {
      errors.stayDuration = 'Please enter a valid number of days';
      isValid = false;
    }
    
    if (!profileImage) {
      errors.profileImage = 'Profile image is required';
      isValid = false;
    }
    
    if (!location) {
      Alert.alert("Location Required", "We need your location to continue. Please enable location services.");
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        if (!location) {
          Alert.alert("Location Required", "We need your location to continue. Please enable location services.");
          return;
        }
        
        await signup({
          firstName,
          lastName,
          email,
          profileImage,
          bio,
          homeCountry,
          currentLocation: location,
          stayDuration: Number(stayDuration),
          memberSince: new Date().getFullYear().toString(),
          verificationLevel: 1,
          isEmailVerified: false,
          isFaceVerified: false,
          isPhoneVerified: false,
          travelHistory,
          rating: 0,
          buyCount: 0,
          sellCount: 0,
        }, password);
        
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    }
  };

  const handleLoginPress = () => {
    router.replace('/auth/login');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to upload a profile photo.');
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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <LogoWithText size="medium" />
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            
            <TouchableOpacity 
              style={styles.profileImageContainer}
              onPress={pickImage}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Camera size={40} color={Colors.textLight} />
                  <Text style={styles.profileImageText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
            {formErrors.profileImage ? (
              <Text style={styles.errorText}>{formErrors.profileImage}</Text>
            ) : null}
            
            <View style={styles.nameRow}>
              <Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChangeText={setFirstName}
                error={formErrors.firstName}
                leftIcon={<User size={20} color={Colors.textLight} />}
                containerStyle={styles.nameInput}
              />
              
              <Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChangeText={setLastName}
                error={formErrors.lastName}
                containerStyle={styles.nameInput}
              />
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
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={formErrors.password}
              leftIcon={<Lock size={20} color={Colors.textLight} />}
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={formErrors.confirmPassword}
              leftIcon={<Lock size={20} color={Colors.textLight} />}
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
            
            <CountryPicker
              label="Home Country"
              selectedCountry={homeCountry}
              onSelect={setHomeCountry}
              error={formErrors.homeCountry}
            />
            
            <MultiCountryPicker
              label="Travel History"
              selectedCountries={travelHistory}
              onSelect={setTravelHistory}
            />
            
            <View style={styles.locationContainer}>
              <View style={styles.locationLabelContainer}>
                <MapPin size={16} color={Colors.textLight} />
                <Text style={styles.locationLabel}>Current Location</Text>
              </View>
              
              {isLocationLoading ? (
                <Text style={styles.locationText}>Detecting your location...</Text>
              ) : location ? (
                <Text style={styles.locationText}>
                  {location.city}, {location.country}
                </Text>
              ) : (
                <Text style={styles.locationError}>
                  Location not available. Please enable location services.
                </Text>
              )}
            </View>
            
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
              title="Sign Up"
              onPress={handleSignup}
              isLoading={isLoading}
              fullWidth
              style={styles.signupButton}
            />
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLoginPress}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginTop: 4,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  nameRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  nameInput: {
    flex: 1,
  },
  locationContainer: {
    marginBottom: SPACING.md,
  },
  locationLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 4,
  },
  locationText: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationError: {
    fontSize: FONT_SIZE.md,
    color: Colors.error,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  signupButton: {
    marginTop: SPACING.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  loginText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
  },
  loginLink: {
    fontSize: FONT_SIZE.sm,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});