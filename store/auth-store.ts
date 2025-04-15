import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { mockUsers } from '@/mocks/users';
import * as Location from 'expo-location';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  verifyEmail: () => Promise<void>;
  verifyLiveness: () => Promise<void>;
  verifySocial: (verifierId: string) => Promise<void>;
  updateLocation: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Find user with matching email and password
          const user = mockUsers.find(
            user => user.email.toLowerCase() === email.toLowerCase()
          );
          
          if (!user) {
            throw new Error('Invalid email or password');
          }
          
          // In a real app, you would verify the password hash
          
          // Update user's location
          const updatedUser = await updateUserLocation(user);
          
          set({ 
            user: updatedUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
        }
      },
      
      signup: async (userData: Partial<User>, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Check if email already exists
          const emailExists = mockUsers.some(
            user => user.email.toLowerCase() === userData.email?.toLowerCase()
          );
          
          if (emailExists) {
            throw new Error('Email already in use');
          }
          
          // Create new user
          const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            profileImage: userData.profileImage,
            bio: userData.bio || '',
            rating: 0,
            memberSince: new Date().getFullYear().toString(),
            verificationLevel: 0,
            socialVerifications: [],
            homeCountry: userData.homeCountry || '',
            travelHistory: userData.travelHistory || [],
            currentLocation: userData.currentLocation || {
              city: '',
              country: '',
              coordinates: { latitude: 0, longitude: 0 }
            },
            stayDuration: userData.stayDuration || 7,
            buyCount: 0,
            sellCount: 0,
          };
          
          // In a real app, you would hash the password and store it
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Signup failed', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          const updatedUser = {
            ...currentUser,
            ...userData,
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Update failed', 
            isLoading: false 
          });
        }
      },
      
      verifyEmail: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          // Add email to social verifications if not already there
          const socialVerifications = [...(currentUser.socialVerifications || [])];
          if (!socialVerifications.includes('email')) {
            socialVerifications.push('email');
          }
          
          // Update verification level
          let verificationLevel = currentUser.verificationLevel || 0;
          if (verificationLevel < 1) {
            verificationLevel = 1;
          }
          
          const updatedUser = {
            ...currentUser,
            verificationLevel,
            socialVerifications,
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Email verification failed', 
            isLoading: false 
          });
        }
      },
      
      verifyLiveness: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          // Add liveness to social verifications if not already there
          const socialVerifications = [...(currentUser.socialVerifications || [])];
          if (!socialVerifications.includes('liveness')) {
            socialVerifications.push('liveness');
          }
          
          // Update verification level
          let verificationLevel = currentUser.verificationLevel || 0;
          if (verificationLevel < 2) {
            verificationLevel = 2;
          }
          
          const updatedUser = {
            ...currentUser,
            verificationLevel,
            socialVerifications,
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Liveness verification failed', 
            isLoading: false 
          });
        }
      },
      
      verifySocial: async (verifierId: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          // In a real app, you would track who verified the user
          // and only add 'social' verification after 3 unique verifications
          
          // For demo purposes, we'll just add social verification
          const socialVerifications = [...(currentUser.socialVerifications || [])];
          if (!socialVerifications.includes('social')) {
            socialVerifications.push('social');
          }
          
          // Update verification level
          let verificationLevel = currentUser.verificationLevel || 0;
          if (verificationLevel < 3) {
            verificationLevel = 3;
          }
          
          const updatedUser = {
            ...currentUser,
            verificationLevel,
            socialVerifications,
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Social verification failed', 
            isLoading: false 
          });
        }
      },
      
      updateLocation: async () => {
        set({ isLoading: true, error: null });
        try {
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          const updatedUser = await updateUserLocation(currentUser);
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Location update failed', 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper function to update user location
async function updateUserLocation(user: User): Promise<User> {
  try {
    // Request location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Location permission denied');
      return user;
    }
    
    // Get current position
    const position = await Location.getCurrentPositionAsync({});
    
    // Reverse geocode to get address
    const geocode = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    
    if (geocode && geocode.length > 0) {
      return {
        ...user,
        currentLocation: {
          city: geocode[0].city || user.currentLocation?.city || 'Unknown City',
          country: geocode[0].country || user.currentLocation?.country || 'Unknown Country',
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }
      };
    }
    
    return user;
  } catch (error) {
    console.error("Error updating location:", error);
    return user;
  }
}