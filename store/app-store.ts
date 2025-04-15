import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '@/types';

interface AppState {
  userRole: UserRole;
  isFirstLaunch: boolean;
  hasLocationPermission: boolean;
  distanceUnit: 'km' | 'mi';
  
  // Actions
  setUserRole: (role: UserRole) => void;
  toggleUserRole: () => void;
  setFirstLaunch: (value: boolean) => void;
  setLocationPermission: (value: boolean) => void;
  setDistanceUnit: (unit: 'km' | 'mi') => void;
  toggleDistanceUnit: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userRole: 'buyer',
      isFirstLaunch: true,
      hasLocationPermission: false,
      distanceUnit: 'km',
      
      setUserRole: (role) => {
        set({ userRole: role });
      },
      
      toggleUserRole: () => {
        const currentRole = get().userRole;
        set({ userRole: currentRole === 'buyer' ? 'seller' : 'buyer' });
      },
      
      setFirstLaunch: (value) => {
        set({ isFirstLaunch: value });
      },
      
      setLocationPermission: (value) => {
        set({ hasLocationPermission: value });
      },
      
      setDistanceUnit: (unit) => {
        set({ distanceUnit: unit });
      },
      
      toggleDistanceUnit: () => {
        const currentUnit = get().distanceUnit;
        set({ distanceUnit: currentUnit === 'km' ? 'mi' : 'km' });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);