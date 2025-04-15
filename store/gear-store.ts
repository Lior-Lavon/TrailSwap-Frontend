import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GearItem, GearCategory, GearCondition } from '@/types';
import { mockGearItems } from '@/mocks/gear';

interface GearState {
  items: GearItem[];
  userItems: GearItem[];
  filteredItems: GearItem[];
  selectedItem: GearItem | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: GearCategory | null;
    maxDistance: number;
    minVerificationLevel: number;
    searchQuery: string;
  };
  
  // Actions
  fetchGearItems: () => Promise<void>;
  fetchUserGearItems: (userId: string) => Promise<void>;
  getGearItem: (id: string) => Promise<GearItem | null>;
  addGearItem: (item: Omit<GearItem, 'id' | 'createdAt' | 'expiresAt' | 'isActive' | 'storeFlagCount'>) => Promise<void>;
  updateGearItem: (id: string, updates: Partial<GearItem>) => Promise<void>;
  deleteGearItem: (id: string) => Promise<void>;
  flagAsStore: (id: string) => Promise<void>;
  setFilters: (filters: Partial<GearState['filters']>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setSelectedItem: (item: GearItem | null) => void;
}

export const useGearStore = create<GearState>()(
  persist(
    (set, get) => ({
      items: mockGearItems,
      userItems: [],
      filteredItems: mockGearItems,
      selectedItem: null,
      isLoading: false,
      error: null,
      filters: {
        category: null,
        maxDistance: 50, // km
        minVerificationLevel: 1,
        searchQuery: '',
      },
      
      fetchGearItems: async () => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // For now, we'll just use our mock data
          set({ items: mockGearItems, filteredItems: mockGearItems, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch gear items', 
            isLoading: false 
          });
        }
      },
      
      fetchUserGearItems: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Filter mock data for items belonging to the user
          const userItems = mockGearItems.filter(item => item.sellerId === userId);
          set({ userItems, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch user gear items', 
            isLoading: false 
          });
        }
      },
      
      getGearItem: async (id: string) => {
        try {
          // In a real app, this might be an API call for fresh data
          const item = get().items.find(item => item.id === id) || null;
          set({ selectedItem: item });
          return item;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to get gear item', 
          });
          return null;
        }
      },
      
      addGearItem: async (itemData) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + itemData.location.stayDuration || 7);
          
          const newItem: GearItem = {
            ...itemData,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            expiresAt,
            isActive: true,
            storeFlagCount: 0,
          };
          
          set(state => ({ 
            items: [...state.items, newItem],
            userItems: [...state.userItems, newItem],
            isLoading: false 
          }));
          
          // Re-apply filters
          get().applyFilters();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add gear item', 
            isLoading: false 
          });
        }
      },
      
      updateGearItem: async (id: string, updates: Partial<GearItem>) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set(state => {
            const updatedItems = state.items.map(item => 
              item.id === id ? { ...item, ...updates } : item
            );
            
            const updatedUserItems = state.userItems.map(item => 
              item.id === id ? { ...item, ...updates } : item
            );
            
            return { 
              items: updatedItems,
              userItems: updatedUserItems,
              isLoading: false 
            };
          });
          
          // Re-apply filters
          get().applyFilters();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update gear item', 
            isLoading: false 
          });
        }
      },
      
      deleteGearItem: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set(state => ({ 
            items: state.items.filter(item => item.id !== id),
            userItems: state.userItems.filter(item => item.id !== id),
            isLoading: false 
          }));
          
          // Re-apply filters
          get().applyFilters();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete gear item', 
            isLoading: false 
          });
        }
      },
      
      flagAsStore: async (id: string) => {
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => {
            const updatedItems = state.items.map(item => 
              item.id === id ? { ...item, storeFlagCount: item.storeFlagCount + 1 } : item
            );
            
            return { items: updatedItems };
          });
          
          // Re-apply filters
          get().applyFilters();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to flag item', 
          });
        }
      },
      
      setFilters: (filters) => {
        set(state => ({
          filters: { ...state.filters, ...filters }
        }));
      },
      
      applyFilters: () => {
        const { items, filters } = get();
        
        let filtered = [...items];
        
        // Apply category filter
        if (filters.category) {
          filtered = filtered.filter(item => item.category === filters.category);
        }
        
        // Apply search query filter
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        // In a real app, we would also filter by distance and verification level
        // This would require knowing the user's location and the seller's verification level
        
        set({ filteredItems: filtered });
      },
      
      clearFilters: () => {
        set({
          filters: {
            category: null,
            maxDistance: 50,
            minVerificationLevel: 1,
            searchQuery: '',
          },
          filteredItems: get().items,
        });
      },
      
      setSelectedItem: (item) => {
        set({ selectedItem: item });
      },
    }),
    {
      name: 'gear-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        filters: state.filters,
      }),
    }
  )
);