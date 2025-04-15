import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Send, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { BORDER_RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';

interface ChatInputProps {
  onSend: (message: string) => void;
  onShareLocation?: () => void;
  canShareLocation?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onShareLocation,
  canShareLocation = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        {canShareLocation && onShareLocation && (
          <TouchableOpacity 
            style={styles.locationButton} 
            onPress={onShareLocation}
          >
            <MapPin size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textLight}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !message.trim() && styles.disabledSendButton
            ]} 
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Send 
              size={20} 
              color={message.trim() ? Colors.white : Colors.textLight} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  locationButton: {
    padding: SPACING.sm,
    marginRight: SPACING.xs,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.round,
    paddingHorizontal: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    maxHeight: 100,
    paddingVertical: SPACING.sm,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: BORDER_RADIUS.round,
    padding: SPACING.sm,
  },
  disabledSendButton: {
    backgroundColor: Colors.backgroundAlt,
  },
});