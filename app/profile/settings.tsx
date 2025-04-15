import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAppStore } from '@/store/app-store';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  Globe, 
  Bell, 
  HelpCircle,
  Info,
  FileText,
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';

export default function SettingsScreen() {
  const router = useRouter();
  const { distanceUnit, setDistanceUnit } = useAppStore();
  const { logout } = useAuthStore();
  
  const handleNotificationsPress = () => {
    router.push('/profile/notification-settings');
  };

  const handleTermsPress = () => {
    router.push('/profile/terms-of-service');
  };

  const handleAboutPress = () => {
    router.push('/profile/about');
  };
  
  const handleHelpCenterPress = () => {
    router.push('/profile/help-center');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Settings',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Globe size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Distance Unit</Text>
                <Text style={styles.settingDescription}>
                  Choose between kilometers and miles
                </Text>
              </View>
            </View>
            
            <View style={styles.settingControl}>
              <TouchableOpacity 
                style={[
                  styles.unitButton, 
                  distanceUnit === 'km' && styles.unitButtonActive
                ]}
                onPress={() => setDistanceUnit('km')}
              >
                <Text style={[
                  styles.unitButtonText,
                  distanceUnit === 'km' && styles.unitButtonTextActive
                ]}>km</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.unitButton, 
                  distanceUnit === 'mi' && styles.unitButtonActive
                ]}
                onPress={() => setDistanceUnit('mi')}
              >
                <Text style={[
                  styles.unitButtonText,
                  distanceUnit === 'mi' && styles.unitButtonTextActive
                ]}>mi</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleNotificationsPress}
          >
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>
                  Manage push notifications
                </Text>
              </View>
            </View>
            
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Privacy</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleTermsPress}
          >
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <FileText size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Terms of Service</Text>
                <Text style={styles.settingDescription}>
                  Read our terms and conditions
                </Text>
              </View>
            </View>
            
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleAboutPress}
          >
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <Info size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>About TrailSwap</Text>
                <Text style={styles.settingDescription}>
                  App version and information
                </Text>
              </View>
            </View>
            
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleHelpCenterPress}
          >
            <View style={styles.settingInfo}>
              <View style={styles.settingIconContainer}>
                <HelpCircle size={20} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.settingTitle}>Help Center</Text>
                <Text style={styles.settingDescription}>
                  Get help with using TrailSwap
                </Text>
              </View>
            </View>
            
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  settingControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: Colors.backgroundAlt,
    marginLeft: SPACING.xs,
  },
  unitButtonActive: {
    backgroundColor: Colors.primary,
  },
  unitButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: Colors.text,
  },
  unitButtonTextActive: {
    color: Colors.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: SPACING.md,
    marginTop: 0,
    padding: SPACING.md,
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: Colors.error,
    marginLeft: SPACING.sm,
  },
});