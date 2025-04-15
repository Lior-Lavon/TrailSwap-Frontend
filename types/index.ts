export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  bio?: string;
  rating?: number;
  memberSince?: string;
  verificationLevel?: number;
  socialVerifications?: string[];
  homeCountry?: string;
  travelHistory?: string[];
  currentLocation?: {
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  stayDuration?: number;
  stayEndDate?: Date;
  buyCount?: number;
  sellCount?: number;
}

export interface GearItem {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  category: GearCategory;
  condition: GearCondition;
  images: string[];
  rating?: number;
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  availableFrom: string;
  availableTo: string;
  isAvailable: boolean;
  distance?: number;
}

export type GearCategory = 
  | 'Camping'
  | 'Hiking'
  | 'Climbing'
  | 'Skiing'
  | 'Snowboarding'
  | 'Surfing'
  | 'Kayaking'
  | 'Cycling'
  | 'Photography'
  | 'Other';

export type GearCondition = 
  | 'New'
  | 'Like New'
  | 'Good'
  | 'Fair'
  | 'Poor';

export interface Chat {
  id: string;
  gearId: string;
  buyerId: string;
  sellerId: string;
  messages: ChatMessage[];
  hasDeposit?: boolean;
  meetupLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date | string;
  isRead: boolean;
}

export interface Transaction {
  id: string;
  gearId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: TransactionStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export type TransactionStatus = 
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}