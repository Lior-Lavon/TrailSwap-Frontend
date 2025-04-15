import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { Shield, Check, X, ChevronRight } from 'lucide-react-native';

interface VerificationCardProps {
  verificationLevel: number;
  isEmailVerified: boolean;
  isLivenessVerified: boolean;
  isSocialVerified: boolean;
  onVerifyEmail?: () => void;
  onVerifyLiveness?: () => void;
  onVerifyUser?: () => void;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  verificationLevel,
  isEmailVerified,
  isLivenessVerified,
  isSocialVerified,
  onVerifyEmail,
  onVerifyLiveness,
  onVerifyUser,
}) => {
  const getVerificationLevelText = () => {
    switch (verificationLevel) {
      case 1:
        return 'Basic';
      case 2:
        return 'Verified';
      case 3:
        return 'Trusted';
      default:
        return 'Unverified';
    }
  };

  const getVerificationLevelColor = () => {
    switch (verificationLevel) {
      case 1:
        return Colors.warning;
      case 2:
        return Colors.success;
      case 3:
        return Colors.primary;
      default:
        return Colors.error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Shield size={20} color={getVerificationLevelColor()} />
          <Text style={styles.title}>Liveness Verification</Text>
        </View>
        <View 
          style={[
            styles.levelBadge, 
            { backgroundColor: getVerificationLevelColor() }
          ]}
        >
          <Text style={styles.levelText}>{getVerificationLevelText()}</Text>
        </View>
      </View>

      <View style={styles.verificationItems}>
        <View style={styles.verificationItem}>
          <View style={styles.verificationStatus}>
            {isEmailVerified ? (
              <Check size={16} color={Colors.success} />
            ) : (
              <X size={16} color={Colors.error} />
            )}
            <Text style={styles.verificationText}>Email</Text>
          </View>
          {!isEmailVerified && onVerifyEmail && (
            <TouchableOpacity onPress={onVerifyEmail}>
              <Text style={styles.verifyButton}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.verificationItem}>
          <View style={styles.verificationStatus}>
            {isLivenessVerified ? (
              <Check size={16} color={Colors.success} />
            ) : (
              <X size={16} color={Colors.error} />
            )}
            <Text style={styles.verificationText}>Liveness</Text>
          </View>
          {!isLivenessVerified && onVerifyLiveness && (
            <TouchableOpacity onPress={onVerifyLiveness}>
              <Text style={styles.verifyButton}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.verificationItem}>
          <View style={styles.verificationStatus}>
            {isSocialVerified ? (
              <Check size={16} color={Colors.success} />
            ) : (
              <X size={16} color={Colors.error} />
            )}
            <Text style={styles.verificationText}>Social</Text>
          </View>
          {!isSocialVerified && (
            <Text style={styles.infoText}>Requires 3 user verifications</Text>
          )}
        </View>
      </View>

      {onVerifyUser && (
        <TouchableOpacity style={styles.verifyUserButton} onPress={onVerifyUser}>
          <Text style={styles.verifyUserText}>Verify Another User</Text>
          <ChevronRight size={16} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
  levelBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  levelText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '500',
    color: Colors.white,
  },
  verificationItems: {
    marginBottom: SPACING.sm,
  },
  verificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
  verifyButton: {
    fontSize: FONT_SIZE.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  infoText: {
    fontSize: FONT_SIZE.xs,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  verifyUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  verifyUserText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
});