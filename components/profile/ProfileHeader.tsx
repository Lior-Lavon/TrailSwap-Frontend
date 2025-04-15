import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Clock, CheckCircle, ShieldCheck } from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';

interface ProfileHeaderProps {
  user: any;
  distance?: number; // in km
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  distance,
}) => {
  const { distanceUnit } = useAppStore();
  
  // Safely access user properties with fallbacks
  const verificationLevel = user?.verificationLevel || 1;
  const stayDuration = user?.stayDuration || 0;
  const buyCount = user?.buyCount || 0;
  const sellCount = user?.sellCount || 0;
  const bio = user?.bio || "";
  const travelHistory = user?.travelHistory || [];
  const currentLocation = user?.currentLocation || { city: "", country: "" };
  
  // Format distance based on unit preference
  const formattedDistance = distance !== undefined 
    ? (distanceUnit === 'mi' 
        ? `${(distance * 0.621371).toFixed(1)} mi away` 
        : `${distance.toFixed(1)} km away`)
    : '';
  
  const getVerificationBadge = () => {
    switch (verificationLevel) {
      case 3:
        return (
          <Badge
            label="Verified Traveler"
            variant="success"
            icon={<ShieldCheck size={14} color={Colors.white} />}
          />
        );
      case 2:
        return (
          <Badge
            label="Email Verified"
            variant="info"
            icon={<CheckCircle size={14} color={Colors.white} />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          source={user?.profileImage}
          name={user?.firstName}
          size={80}
        />
        
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.firstName || ''}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.textLight} />
            <Text style={styles.location}>
              {currentLocation.city}{currentLocation.country ? `, ${currentLocation.country}` : ''}
              {formattedDistance ? ` • ${formattedDistance}` : ''}
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <Text style={styles.stat}>
              {buyCount} {buyCount === 1 ? 'buy' : 'buys'}
            </Text>
            <Text style={styles.statDivider}>•</Text>
            <Text style={styles.stat}>
              {sellCount} {sellCount === 1 ? 'sale' : 'sales'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.badgeContainer}>
        {getVerificationBadge()}
        
        <View style={styles.timeContainer}>
          <Clock size={14} color={Colors.textLight} />
          <Text style={styles.timeText}>
            {stayDuration} {stayDuration === 1 ? 'day' : 'days'} left in town
          </Text>
        </View>
      </View>
      
      {bio ? (
        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>About</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      ) : null}
      
      <View style={styles.travelContainer}>
        <Text style={styles.travelTitle}>Travel History</Text>
        <Text style={styles.travelHistory}>
          {travelHistory.length > 0 ? travelHistory.join(', ') : 'No travel history yet'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
  },
  statDivider: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginHorizontal: SPACING.xs,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  timeText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: 4,
  },
  bioContainer: {
    marginBottom: SPACING.md,
  },
  bioTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    lineHeight: 22,
  },
  travelContainer: {
    marginTop: SPACING.sm,
  },
  travelTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  travelHistory: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
  },
});