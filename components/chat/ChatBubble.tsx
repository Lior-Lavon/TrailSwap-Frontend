import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '@/types';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';

interface ChatBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  showTime?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isCurrentUser,
  showTime = true,
}) => {
  const isSystem = message.isSystem;
  
  if (isSystem) {
    return (
      <View style={styles.systemContainer}>
        <Text style={styles.systemText}>{message.text}</Text>
        {showTime && (
          <Text style={styles.systemTime}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        )}
      </View>
    );
  }
  
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      <View style={[
        styles.bubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        <Text style={[
          styles.text,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
      </View>
      
      {showTime && (
        <Text style={[
          styles.time,
          isCurrentUser ? styles.currentUserTime : styles.otherUserTime
        ]}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  currentUserBubble: {
    backgroundColor: Colors.primary,
  },
  otherUserBubble: {
    backgroundColor: Colors.backgroundAlt,
  },
  text: {
    fontSize: FONT_SIZE.md,
  },
  currentUserText: {
    color: Colors.white,
  },
  otherUserText: {
    color: Colors.text,
  },
  time: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  currentUserTime: {
    color: Colors.textLight,
  },
  otherUserTime: {
    color: Colors.textLight,
  },
  systemContainer: {
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  systemText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    backgroundColor: Colors.backgroundAlt,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
  },
  systemTime: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    marginTop: 2,
  },
});