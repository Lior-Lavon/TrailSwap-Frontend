import { Badge } from '@/types';

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Sale',
    description: 'Completed your first sale',
    icon: 'award',
  },
  {
    id: '2',
    name: 'First Purchase',
    description: 'Completed your first purchase',
    icon: 'shopping-bag',
  },
  {
    id: '3',
    name: 'Globetrotter',
    description: 'Visited 5+ countries',
    icon: 'globe',
  },
  {
    id: '4',
    name: 'Verified Traveler',
    description: 'Received 3+ social confirmations',
    icon: 'check-circle',
  },
  {
    id: '5',
    name: 'Power Seller',
    description: 'Completed 5+ sales',
    icon: 'trending-up',
  },
];

export const mockUserBadges = [
  {
    userId: '1', // Emma
    badgeId: '2', // First Purchase
    earnedAt: new Date('2023-03-15'),
  },
  {
    userId: '1', // Emma
    badgeId: '3', // Globetrotter
    earnedAt: new Date('2023-04-20'),
  },
  {
    userId: '1', // Emma
    badgeId: '4', // Verified Traveler
    earnedAt: new Date('2023-05-10'),
  },
];