import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'emma@example.com',
    firstName: 'Emma',
    lastName: 'Wilson',
    currentLocation: {
      city: 'Bangkok',
      country: 'Thailand',
      coordinates: {
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    homeCountry: 'United Kingdom',
    travelHistory: ['Japan', 'Vietnam', 'Cambodia', 'Thailand'],
    bio: 'Backpacking through Southeast Asia for 6 months. Love hiking and photography!',
    verificationLevel: 3,
    socialConfirmations: 5,
    buyCount: 3,
    sellCount: 2,
    stayDuration: 7,
    stayEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-01-15'),
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    email: 'miguel@example.com',
    firstName: 'Miguel',
    lastName: 'Rodriguez',
    currentLocation: {
      city: 'Chiang Mai',
      country: 'Thailand',
      coordinates: {
        latitude: 18.7883,
        longitude: 98.9853,
      },
    },
    homeCountry: 'Spain',
    travelHistory: ['Thailand', 'Indonesia', 'Malaysia'],
    bio: 'Digital nomad exploring Asia. Always looking for hiking buddies!',
    verificationLevel: 3,
    socialConfirmations: 4,
    buyCount: 1,
    sellCount: 5,
    stayDuration: 10,
    stayEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-02-20'),
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    id: '3',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    currentLocation: {
      city: 'Bangkok',
      country: 'Thailand',
      coordinates: {
        latitude: 13.7563,
        longitude: 100.5018,
      },
    },
    homeCountry: 'Canada',
    travelHistory: ['Thailand', 'Laos', 'Vietnam'],
    bio: 'First time in Southeast Asia! Looking to connect with fellow travelers.',
    verificationLevel: 2,
    socialConfirmations: 1,
    buyCount: 2,
    sellCount: 0,
    stayDuration: 5,
    stayEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-03-10'),
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
  {
    id: '4',
    email: 'david@example.com',
    firstName: 'David',
    lastName: 'Chen',
    currentLocation: {
      city: 'Phuket',
      country: 'Thailand',
      coordinates: {
        latitude: 7.8804,
        longitude: 98.3923,
      },
    },
    homeCountry: 'Australia',
    travelHistory: ['Thailand', 'Philippines', 'Indonesia'],
    bio: 'Surfer and diver traveling through Southeast Asia. Always looking for beach gear!',
    verificationLevel: 2,
    socialConfirmations: 2,
    buyCount: 4,
    sellCount: 1,
    stayDuration: 8,
    stayEndDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2023-02-05'),
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
];

export const currentUser = mockUsers[0];