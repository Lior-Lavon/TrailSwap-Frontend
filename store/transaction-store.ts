import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '@/types';
import { mockTransactions } from '@/mocks/transactions';
import { useChatStore } from './chat-store';

interface TransactionState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTransactions: (userId: string) => Promise<void>;
  getTransaction: (id: string) => Promise<Transaction | null>;
  placeDeposit: (gearId: string, buyerId: string, sellerId: string, chatId: string, amount: number) => Promise<void>;
  completeTransaction: (id: string) => Promise<void>;
  cancelTransaction: (id: string) => Promise<void>;
  setCurrentTransaction: (transaction: Transaction | null) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      currentTransaction: null,
      isLoading: false,
      error: null,
      
      fetchTransactions: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Filter mock transactions for those involving the user
          const userTransactions = mockTransactions.filter(
            transaction => transaction.buyerId === userId || transaction.sellerId === userId
          );
          
          set({ transactions: userTransactions, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch transactions', 
            isLoading: false 
          });
        }
      },
      
      getTransaction: async (id: string) => {
        try {
          const transaction = get().transactions.find(transaction => transaction.id === id) || null;
          set({ currentTransaction: transaction });
          return transaction;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to get transaction', 
          });
          return null;
        }
      },
      
      placeDeposit: async (gearId: string, buyerId: string, sellerId: string, chatId: string, amount: number) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newTransaction: Transaction = {
            id: Math.random().toString(36).substring(2, 9),
            gearId,
            buyerId,
            sellerId,
            chatId,
            depositAmount: amount,
            depositDate: new Date(),
            status: 'deposit_placed',
          };
          
          set(state => ({ 
            transactions: [...state.transactions, newTransaction],
            currentTransaction: newTransaction,
            isLoading: false 
          }));
          
          // Update the chat to indicate a deposit has been placed
          const chatStore = useChatStore.getState();
          const chat = await chatStore.getChat(chatId);
          
          if (chat) {
            // Add a system message about the deposit
            await chatStore.sendMessage(
              chatId,
              'system',
              `A deposit of $${amount} has been placed.`
            );
            
            // Update the chat's deposit status
            const updatedChat = { ...chat, hasDeposit: true };
            chatStore.setCurrentChat(updatedChat);
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to place deposit', 
            isLoading: false 
          });
        }
      },
      
      completeTransaction: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set(state => {
            const updatedTransactions = state.transactions.map(transaction => {
              if (transaction.id === id) {
                return {
                  ...transaction,
                  status: 'completed',
                  completedDate: new Date(),
                };
              }
              return transaction;
            });
            
            const updatedCurrentTransaction = state.currentTransaction && state.currentTransaction.id === id
              ? {
                  ...state.currentTransaction,
                  status: 'completed',
                  completedDate: new Date(),
                }
              : state.currentTransaction;
            
            return { 
              transactions: updatedTransactions,
              currentTransaction: updatedCurrentTransaction,
              isLoading: false 
            };
          });
          
          // Add a system message to the chat
          const transaction = get().transactions.find(t => t.id === id);
          if (transaction) {
            const chatStore = useChatStore.getState();
            await chatStore.sendMessage(
              transaction.chatId,
              'system',
              'Transaction completed successfully!'
            );
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to complete transaction', 
            isLoading: false 
          });
        }
      },
      
      cancelTransaction: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set(state => {
            const updatedTransactions = state.transactions.map(transaction => {
              if (transaction.id === id) {
                return {
                  ...transaction,
                  status: 'cancelled',
                };
              }
              return transaction;
            });
            
            const updatedCurrentTransaction = state.currentTransaction && state.currentTransaction.id === id
              ? {
                  ...state.currentTransaction,
                  status: 'cancelled',
                }
              : state.currentTransaction;
            
            return { 
              transactions: updatedTransactions,
              currentTransaction: updatedCurrentTransaction,
              isLoading: false 
            };
          });
          
          // Add a system message to the chat
          const transaction = get().transactions.find(t => t.id === id);
          if (transaction) {
            const chatStore = useChatStore.getState();
            await chatStore.sendMessage(
              transaction.chatId,
              'system',
              'Transaction has been cancelled.'
            );
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to cancel transaction', 
            isLoading: false 
          });
        }
      },
      
      setCurrentTransaction: (transaction) => {
        set({ currentTransaction: transaction });
      },
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist these fields
        transactions: state.transactions,
      }),
    }
  )
);