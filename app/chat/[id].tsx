import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useChatStore } from '@/store/chat-store';
import { useGearStore } from '@/store/gear-store';
import { useTransactionStore } from '@/store/transaction-store';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { MapPin, DollarSign } from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';
import * as Location from 'expo-location';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { currentChat, getChat, sendMessage, markAsRead, setMeetupLocation } = useChatStore();
  const { items } = useGearStore();
  const { transactions } = useTransactionStore();
  
  const [otherUser, setOtherUser] = useState<any>(null);
  const [gearItem, setGearItem] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<any>(null);
  
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadChat();
  }, [id]);

  useEffect(() => {
    if (currentChat && user) {
      markAsRead(currentChat.id, user.id);
    }
  }, [currentChat]);

  const loadChat = async () => {
    setIsLoading(true);
    if (id) {
      const chat = await getChat(id as string);
      if (chat) {
        // Find the other user
        const otherUserId = chat.buyerId === user?.id ? chat.sellerId : chat.buyerId;
        const otherUserData = mockUsers.find(u => u.id === otherUserId);
        setOtherUser(otherUserData);
        
        // Find the gear item
        const item = items.find(item => item.id === chat.gearId);
        setGearItem(item);
        
        // Find the transaction
        const trans = transactions.find(t => t.chatId === chat.id);
        setTransaction(trans);
      }
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (text: string) => {
    if (currentChat && user) {
      await sendMessage(currentChat.id, user.id, text);
      
      // Scroll to bottom
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  const handleShareLocation = async () => {
    if (!currentChat || !user) return;
    
    // Check if user is the seller
    const isSeller = currentChat.sellerId === user.id;
    if (!isSeller) {
      Alert.alert('Error', 'Only the seller can share a meetup location');
      return;
    }
    
    // Check if there's a deposit
    if (!currentChat.hasDeposit) {
      Alert.alert('Deposit Required', 'A deposit is required before sharing a meetup location');
      return;
    }
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Location permission is required to share your location');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      
      // Get location name
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      let address = 'Unknown location';
      if (geocode.length > 0) {
        const { street, city, region, country } = geocode[0];
        address = [street, city, region, country].filter(Boolean).join(', ');
      }
      
      // Update the chat with the meetup location
      await setMeetupLocation(currentChat.id, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address,
      });
      
      // Send a system message
      await sendMessage(
        currentChat.id,
        'system',
        `Meetup location shared: ${address}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to share location');
    }
  };

  const handlePlaceDeposit = () => {
    if (currentChat) {
      router.push(`/transaction/deposit?gearId=${currentChat.gearId}&chatId=${currentChat.id}`);
    }
  };

  const renderHeader = () => {
    if (!gearItem) return null;
    
    return (
      <View style={styles.header}>
        <Text style={styles.gearTitle}>{gearItem.title}</Text>
        <Text style={styles.price}>${gearItem.price}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!currentChat || !user) return null;
    
    const isBuyer = currentChat.buyerId === user.id;
    const hasDeposit = currentChat.hasDeposit;
    
    if (isBuyer && !hasDeposit) {
      return (
        <TouchableOpacity
          style={styles.depositButton}
          onPress={handlePlaceDeposit}
        >
          <DollarSign size={16} color={Colors.primary} />
          <Text style={styles.depositText}>Place a deposit to continue</Text>
        </TouchableOpacity>
      );
    }
    
    return null;
  };

  if (isLoading || !currentChat || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: otherUser?.firstName || 'Chat',
          headerBackTitle: 'Back',
        }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={currentChat.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              isCurrentUser={item.senderId === user.id}
            />
          )}
          contentContainerStyle={styles.chatContent}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
        
        <ChatInput
          onSend={handleSendMessage}
          onShareLocation={handleShareLocation}
          canShareLocation={
            currentChat.sellerId === user.id && 
            currentChat.hasDeposit && 
            !currentChat.meetupLocation
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    backgroundColor: Colors.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  gearTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
  },
  price: {
    fontSize: FONT_SIZE.md,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  depositButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  depositText: {
    fontSize: FONT_SIZE.md,
    color: Colors.primary,
    fontWeight: '500',
    marginLeft: SPACING.xs,
  },
});