import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, useColorScheme } from 'react-native';
import Colors from '@/constants/colors';
import { Home, MessageCircle, User } from 'lucide-react-native';
import { Logo } from '@/components/ui/Logo';
import { SPACING } from '@/constants/theme';
import { useChatStore } from '@/store/chat-store';
import { useAuthStore } from '@/store/auth-store';
import { Badge } from '@/components/ui/Badge';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { unreadCount, fetchChats, countUnreadMessages } = useChatStore();
  const { user } = useAuthStore();

  // Fetch chats and count unread messages when the component mounts
  useEffect(() => {
    if (user?.id) {
      fetchChats(user.id);
      countUnreadMessages(user.id);
    }
  }, [user?.id, fetchChats, countUnreadMessages]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
        },
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: () => (
          <Logo size="small" />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <MessageCircle size={size} color={color} />
              {unreadCount > 0 && (
                <Badge
                  label={unreadCount > 99 ? '99+' : unreadCount.toString()}
                  variant="error"
                  size="small"
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    paddingHorizontal: 2,
                  }}
                  textStyle={{
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}
                />
              )}
            </View>
          ),
          tabBarLabel: "Messages"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          tabBarLabel: "Profile"
        }}
      />
    </Tabs>
  );
}