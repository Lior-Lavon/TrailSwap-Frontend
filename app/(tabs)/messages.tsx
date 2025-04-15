import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useChatStore } from '@/store/chat-store';
import { useAuthStore } from '@/store/auth-store';
import { useAppStore } from '@/store/app-store';
import { ChatListItem } from '@/components/chat/ChatListItem';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { RoleToggle } from '@/components/ui/RoleToggle';
import Colors from '@/constants/colors';
import { SPACING } from '@/constants/theme';
import { MessageCircle } from 'lucide-react-native';

export default function MessagesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { chats, fetchChats } = useChatStore();
  const { userRole, toggleUserRole } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadChats();
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat => {
        const otherUser = chat.participants.find(p => p.id !== user?.id);
        return otherUser?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               otherUser?.lastName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredChats(filtered);
    }
  }, [searchQuery, chats, user]);

  const loadChats = async () => {
    if (user) {
      setIsLoading(true);
      await fetchChats(user.id);
      setIsLoading(false);
    }
  };

  const handleChatPress = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleSearch = () => {
    // Already handled by the useEffect
  };

  const handleToggleRole = () => {
    toggleUserRole();
  };

  const renderEmptyState = () => (
    <EmptyState
      icon={<MessageCircle size={50} color={Colors.textLight} />}
      title="No Messages Yet"
      message={userRole === 'buyer' 
        ? "Start a conversation by contacting a seller" 
        : "You'll see messages from interested buyers here"
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <View style={styles.headerRight}>
              <RoleToggle role={userRole} onToggle={handleToggleRole} />
            </View>
          ),
        }}
      />
      
      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search conversations..."
          onSubmit={handleSearch}
        />
        
        {userRole === 'buyer' ? (
          <Text style={styles.roleLabel}>Showing messages as a Buyer</Text>
        ) : (
          <Text style={styles.roleLabel}>Showing messages as a Seller</Text>
        )}
        
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              chat={item}
              currentUserId={user?.id || ''}
              onPress={() => handleChatPress(item.id)}
            />
          )}
          refreshing={isLoading}
          onRefresh={loadChats}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={filteredChats.length === 0 ? styles.emptyList : undefined}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  headerRight: {
    marginRight: SPACING.sm,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  roleLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
});