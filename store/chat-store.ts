import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat, ChatMessage } from '@/types';
import { mockChats } from '@/mocks/chats';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchChats: (userId: string) => Promise<void>;
  getChat: (chatId: string) => Promise<Chat | null>;
  startChat: (gearId: string, buyerId: string, sellerId: string) => Promise<Chat>;
  sendMessage: (chatId: string, senderId: string, text: string) => Promise<void>;
  markAsRead: (chatId: string, userId: string) => Promise<void>;
  setMeetupLocation: (chatId: string, location: { latitude: number; longitude: number; address: string }) => Promise<void>;
  setCurrentChat: (chat: Chat | null) => void;
  countUnreadMessages: (userId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: mockChats,
      currentChat: null,
      unreadCount: 0,
      isLoading: false,
      error: null,
      
      fetchChats: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Filter mock chats for those involving the user
          const userChats = mockChats.filter(
            chat => chat.buyerId === userId || chat.sellerId === userId
          );
          
          set({ chats: userChats, isLoading: false });
          get().countUnreadMessages(userId);
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch chats', 
            isLoading: false 
          });
        }
      },
      
      getChat: async (chatId: string) => {
        try {
          const chat = get().chats.find(chat => chat.id === chatId) || null;
          set({ currentChat: chat });
          return chat;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to get chat', 
          });
          return null;
        }
      },
      
      startChat: async (gearId: string, buyerId: string, sellerId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Check if a chat already exists for this gear item and these users
          const existingChat = get().chats.find(
            chat => chat.gearId === gearId && chat.buyerId === buyerId && chat.sellerId === sellerId
          );
          
          if (existingChat) {
            set({ currentChat: existingChat, isLoading: false });
            return existingChat;
          }
          
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newChat: Chat = {
            id: Math.random().toString(36).substring(2, 9),
            gearId,
            buyerId,
            sellerId,
            messages: [],
            hasDeposit: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set(state => ({ 
            chats: [...state.chats, newChat],
            currentChat: newChat,
            isLoading: false 
          }));
          
          return newChat;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to start chat', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      sendMessage: async (chatId: string, senderId: string, text: string) => {
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const newMessage: ChatMessage = {
            id: Math.random().toString(36).substring(2, 9),
            senderId,
            text,
            timestamp: new Date(),
            isRead: false,
          };
          
          set(state => {
            const updatedChats = state.chats.map(chat => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  updatedAt: new Date(),
                };
              }
              return chat;
            });
            
            const updatedCurrentChat = state.currentChat && state.currentChat.id === chatId
              ? {
                  ...state.currentChat,
                  messages: [...state.currentChat.messages, newMessage],
                  updatedAt: new Date(),
                }
              : state.currentChat;
            
            return { 
              chats: updatedChats,
              currentChat: updatedCurrentChat,
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to send message', 
          });
        }
      },
      
      markAsRead: async (chatId: string, userId: string) => {
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          set(state => {
            const updatedChats = state.chats.map(chat => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  messages: chat.messages.map(msg => {
                    if (msg.senderId !== userId && !msg.isRead) {
                      return { ...msg, isRead: true };
                    }
                    return msg;
                  }),
                };
              }
              return chat;
            });
            
            const updatedCurrentChat = state.currentChat && state.currentChat.id === chatId
              ? {
                  ...state.currentChat,
                  messages: state.currentChat.messages.map(msg => {
                    if (msg.senderId !== userId && !msg.isRead) {
                      return { ...msg, isRead: true };
                    }
                    return msg;
                  }),
                }
              : state.currentChat;
            
            return { 
              chats: updatedChats,
              currentChat: updatedCurrentChat,
            };
          });
          
          get().countUnreadMessages(userId);
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to mark messages as read', 
          });
        }
      },
      
      setMeetupLocation: async (chatId: string, location) => {
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => {
            const updatedChats = state.chats.map(chat => {
              if (chat.id === chatId) {
                return {
                  ...chat,
                  meetupLocation: location,
                  updatedAt: new Date(),
                };
              }
              return chat;
            });
            
            const updatedCurrentChat = state.currentChat && state.currentChat.id === chatId
              ? {
                  ...state.currentChat,
                  meetupLocation: location,
                  updatedAt: new Date(),
                }
              : state.currentChat;
            
            return { 
              chats: updatedChats,
              currentChat: updatedCurrentChat,
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to set meetup location', 
          });
        }
      },
      
      setCurrentChat: (chat) => {
        set({ currentChat: chat });
      },
      
      countUnreadMessages: (userId: string) => {
        const { chats } = get();
        
        let count = 0;
        chats.forEach(chat => {
          chat.messages.forEach(msg => {
            if (msg.senderId !== userId && !msg.isRead) {
              count++;
            }
          });
        });
        
        set({ unreadCount: count });
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        chats: state.chats,
      }),
    }
  )
);