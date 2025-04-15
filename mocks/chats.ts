import { Chat, ChatMessage } from '@/types';
import { mockUsers } from './users';

export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '1', // Emma (current user)
    text: "Hi, I'm interested in your Osprey backpack. Is it still available?",
    timestamp: new Date('2023-06-15T10:30:00'),
    isRead: true,
  },
  {
    id: '2',
    senderId: '2', // Miguel
    text: "Yes, it's still available! When would you like to meet?",
    timestamp: new Date('2023-06-15T10:45:00'),
    isRead: true,
  },
  {
    id: '3',
    senderId: '1', // Emma
    text: "Great! I'm in Bangkok until Friday. Could we meet tomorrow?",
    timestamp: new Date('2023-06-15T11:00:00'),
    isRead: true,
  },
  {
    id: '4',
    senderId: '2', // Miguel
    text: "I'm actually in Chiang Mai right now. I can ship it to you if you'd like?",
    timestamp: new Date('2023-06-15T11:15:00'),
    isRead: true,
  },
  {
    id: '5',
    senderId: '1', // Emma
    text: "Oh, I see. Let me think about it. How much would shipping be?",
    timestamp: new Date('2023-06-15T11:30:00'),
    isRead: true,
  },
  {
    id: '6',
    senderId: '2', // Miguel
    text: "About 10 USD. Or if you're coming to Chiang Mai soon, we could meet then?",
    timestamp: new Date('2023-06-15T11:45:00'),
    isRead: false,
  },
];

export const mockChats: Chat[] = [
  {
    id: '1',
    gearId: '1', // Osprey Backpack
    buyerId: '1', // Emma (current user)
    sellerId: '2', // Miguel
    messages: mockMessages,
    hasDeposit: false,
    createdAt: new Date('2023-06-15T10:30:00'),
    updatedAt: new Date('2023-06-15T11:45:00'),
  },
  {
    id: '2',
    gearId: '3', // Hiking Boots
    buyerId: '1', // Emma (current user)
    sellerId: '4', // David
    messages: [
      {
        id: '7',
        senderId: '1', // Emma
        text: "Hi, are the hiking boots still available?",
        timestamp: new Date('2023-06-14T09:15:00'),
        isRead: true,
      },
      {
        id: '8',
        senderId: '4', // David
        text: "Yes they are! Are you in Phuket?",
        timestamp: new Date('2023-06-14T09:30:00'),
        isRead: true,
      },
      {
        id: '9',
        senderId: '1', // Emma
        text: "I'm in Bangkok now but will be in Phuket next week.",
        timestamp: new Date('2023-06-14T09:45:00'),
        isRead: true,
      },
      {
        id: '10',
        senderId: '4', // David
        text: "Perfect! I'll be here. Let me know when you arrive.",
        timestamp: new Date('2023-06-14T10:00:00'),
        isRead: true,
      },
    ],
    hasDeposit: true,
    meetupLocation: {
      latitude: 7.8804,
      longitude: 98.3923,
      address: "Patong Beach, Phuket",
    },
    createdAt: new Date('2023-06-14T09:15:00'),
    updatedAt: new Date('2023-06-14T10:00:00'),
  },
];