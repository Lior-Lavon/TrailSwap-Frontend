import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    gearId: '3', // Hiking Boots
    buyerId: '1', // Emma (current user)
    sellerId: '4', // David
    chatId: '2',
    depositAmount: 15, // 25% of the price
    depositDate: new Date('2023-06-14T10:30:00'),
    status: 'location_shared',
  },
  {
    id: '2',
    gearId: '5', // Travel Towel
    buyerId: '1', // Emma (current user)
    sellerId: '3', // Sarah
    chatId: '3', // Not shown in mockChats
    depositAmount: 5, // 33% of the price
    depositDate: new Date('2023-06-10T14:20:00'),
    status: 'completed',
    completedDate: new Date('2023-06-11T16:45:00'),
  },
];