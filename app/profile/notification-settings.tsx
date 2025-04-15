import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Switch
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  Bell, 
  MessageCircle, 
  Tag,
  AlertTriangle
} from 'lucide-react-native';

export default function NotificationSettingsScreen() {
  const [allNotifications, setAllNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [productSuggestions, setProductSuggestions] = useState(true);
  
  const handleAllNotificationsToggle = (value: boolean) => {
    setAllNotifications(value);
    if (!value) {
      // If turning off all notifications, also turn off individual ones
      setMessageNotifications(false);
      setProductSuggestions(false);
    }
  };
  
  const handleMessageNotificationsToggle = (value: boolean) => {
    setMessageNotifications(value);
    // If turning on any individual notification, ensure master switch is on
    if (value && !allNotifications) {
      setAllNotifications(true);
    }
  };
  
  const handleProductSuggestionsToggle = (value: boolean) => {
    setProductSuggestions(value);
    // If turning on any individual notification, ensure master switch is on
    if (value && !allNotifications) {
      setAllNotifications(true);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Notification Settings',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>All Notifications</Text>
                <Text style={styles.settingDescription}>
                  Turn on/off all notifications
                </Text>
              </View>
            </View>
            
            <Switch
              value={allNotifications}
              onValueChange={handleAllNotificationsToggle}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
          
          <View style={[styles.settingItem, !allNotifications && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <MessageCircle size={20} color={allNotifications ? Colors.primary : Colors.textLight} />
              </View>
              <View>
                <Text style={[styles.settingTitle, !allNotifications && styles.textDisabled]}>
                  Message Notifications
                </Text>
                <Text style={[styles.settingDescription, !allNotifications && styles.textDisabled]}>
                  Get notified when you receive new messages
                </Text>
              </View>
            </View>
            
            <Switch
              value={messageNotifications}
              onValueChange={handleMessageNotificationsToggle}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
              disabled={!allNotifications}
            />
          </View>
          
          <View style={[styles.settingItem, !allNotifications && styles.settingDisabled]}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Tag size={20} color={allNotifications ? Colors.primary : Colors.textLight} />
              </View>
              <View>
                <Text style={[styles.settingTitle, !allNotifications && styles.textDisabled]}>
                  Product Suggestions
                </Text>
                <Text style={[styles.settingDescription, !allNotifications && styles.textDisabled]}>
                  Get notified about new products that match your interests
                </Text>
              </View>
            </View>
            
            <Switch
              value={productSuggestions}
              onValueChange={handleProductSuggestionsToggle}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.white}
              disabled={!allNotifications}
            />
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <AlertTriangle size={16} color={Colors.textLight} />
          <Text style={styles.infoText}>
            You will still receive important account-related notifications even if you turn off all notifications.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.white,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingDisabled: {
    opacity: 0.7,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  settingTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: Colors.text,
  },
  settingDescription: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginTop: 2,
  },
  textDisabled: {
    color: Colors.textLight,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    backgroundColor: Colors.backgroundAlt,
    margin: SPACING.md,
    marginTop: 0,
    borderRadius: BORDER_RADIUS.md,
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: SPACING.xs,
    flex: 1,
  },
});