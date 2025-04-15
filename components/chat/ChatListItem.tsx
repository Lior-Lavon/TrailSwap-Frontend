import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Chat } from '@/types';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface ChatListItemProps {
  chat: Chat;
  gearTitle: string;
  otherUserName: string;
  otherUserImage?: string;
  unreadCount: number;
  lastMessageTime: string;
  onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  gearTitle,
  otherUserName,
  otherUserImage,
  unreadCount,
  lastMessageTime,
  onPress,
}) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Avatar source={otherUserImage} name={otherUserName} size={50} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {otherUserName}
          </Text>
          <Text style={styles.time}>{lastMessageTime}</Text>
        </View>
        
        <Text style={styles.gearTitle} numberOfLines={1}>
          {gearTitle}
        </Text>
        
        <View style={styles.messageRow}>
          <Text 
            style={[
              styles.message, 
              unreadCount > 0 && styles.unreadMessage
            ]} 
            numberOfLines={1}
          >
            {lastMessage?.text}
          </Text>
          
          {unreadCount > 0 && (
            <Badge 
              label={unreadCount.toString()} 
              variant="primary" 
              size="small" 
            />
          )}
          
          {chat.hasDeposit && (
            <Badge 
              label="Deposit" 
              variant="success" 
              size="small" 
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  time: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
  },
  gearTitle: {
    fontSize: FONT_SIZE.sm,
    color: Colors.secondary,
    marginBottom: 4,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    flex: 1,
    marginRight: SPACING.sm,
  },
  unreadMessage: {
    fontWeight: '600',
    color: Colors.text,
  },
});