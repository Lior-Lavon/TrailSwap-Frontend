import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  MapPin, 
  Edit, 
  LogOut, 
  Settings,
  Award,
  Clock,
  Star,
  UserCheck
} from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';
import { VerificationCard } from '@/components/profile/VerificationCard';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { userRole } = useAppStore();
  
  if (!user) {
    return null;
  }
  
  const handleEditProfile = () => {
    router.push('/profile/edit');
  };
  
  const handleSettings = () => {
    router.push('/profile/settings');
  };
  
  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  const handleVerifyLiveness = () => {
    router.push('/auth/verification');
  };

  const handleVerifyEmail = () => {
    // In a real app, this would send a verification email
    alert('Verification email sent. Please check your inbox.');
  };

  const handleVerifyOtherUser = () => {
    router.push('/profile/verify-user');
  };
  
  // Safely access user properties with fallbacks
  const rating = user.rating !== undefined ? user.rating : 0;
  const memberSince = user.memberSince || "2023";
  const verificationLevel = user.verificationLevel || 0;
  const travelHistory = user.travelHistory || [];
  const bio = user.bio || "";
  const location = user.currentLocation || { city: "", country: "" };
  const buyCount = user.buyCount || 0;
  const sellCount = user.sellCount || 0;
  
  // Check verification status
  const isEmailVerified = user.socialVerifications?.includes('email') || false;
  const isLivenessVerified = user.socialVerifications?.includes('liveness') || false;
  const isSocialVerified = user.socialVerifications?.includes('social') || false;
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleSettings}
            >
              <Settings size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.profileImageContainer}>
              {user.profileImage ? (
                <Image 
                  source={{ uri: user.profileImage }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.profileImagePlaceholderText}>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={handleEditProfile}
              >
                <Edit size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          
          {location && (
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.textLight} />
              <Text style={styles.location}>
                {location.city}{location.country ? `, ${location.country}` : ''}
              </Text>
            </View>
          )}
          
          {bio && (
            <Text style={styles.bio}>{bio}</Text>
          )}
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Award size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{verificationLevel}</Text>
              <Text style={styles.statLabel}>Verification</Text>
            </View>
            
            <View style={styles.statItem}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{memberSince}</Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </View>
            
            <View style={styles.statItem}>
              <Star size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>{buyCount}</Text>
              <Text style={styles.activityLabel}>Buys</Text>
            </View>
            <View style={styles.activityDivider} />
            <View style={styles.activityItem}>
              <Text style={styles.activityValue}>{sellCount}</Text>
              <Text style={styles.activityLabel}>Sales</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <VerificationCard 
            verificationLevel={verificationLevel}
            isEmailVerified={isEmailVerified}
            isLivenessVerified={isLivenessVerified}
            isSocialVerified={isSocialVerified}
            onVerifyEmail={handleVerifyEmail}
            onVerifyLiveness={handleVerifyLiveness}
            onVerifyUser={handleVerifyOtherUser}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel History</Text>
          <View style={styles.travelHistoryContainer}>
            {travelHistory.length > 0 ? (
              travelHistory.map((country, index) => (
                <View key={index} style={styles.countryBadge}>
                  <Text style={styles.countryText}>{country}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No travel history added yet</Text>
            )}
          </View>
        </View>
        
        <View style={styles.logoutButtonContainer}>
          <Button
            title="Log Out"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
            leftIcon={<LogOut size={20} color={Colors.text} />}
          />
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
  header: {
    backgroundColor: Colors.white,
    padding: SPACING.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  headerButton: {
    marginRight: SPACING.md,
    padding: SPACING.xs,
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: 4,
  },
  bio: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    width: '80%',
  },
  activityItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  activityValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  activityLabel: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginTop: 2,
  },
  activityDivider: {
    height: 30,
    width: 1,
    backgroundColor: Colors.border,
  },
  section: {
    backgroundColor: Colors.white,
    margin: SPACING.md,
    marginBottom: 0,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  travelHistoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countryBadge: {
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  countryText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
  },
  emptyText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  logoutButtonContainer: {
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  logoutButton: {
    width: '80%',
  },
});