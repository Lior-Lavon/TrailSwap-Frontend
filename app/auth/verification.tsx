import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { 
  Camera, 
  Shield, 
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';

export default function VerificationScreen() {
  const router = useRouter();
  const { user, verifyLiveness } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    setIsLoading(true);
    
    // Simulate photo capture
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };
  
  const handleVerify = async () => {
    setIsLoading(true);
    
    try {
      // Call the verifyLiveness function from auth store
      await verifyLiveness();
      setStep(3);
    } catch (error) {
      Alert.alert("Verification Failed", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleComplete = () => {
    router.back();
  };
  
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Camera size={48} color={Colors.primary} />
      </View>
      
      <Text style={styles.stepTitle}>Liveness Verification</Text>
      
      <Text style={styles.stepDescription}>
        We'll take a quick photo of your face to verify your identity. This helps build trust in the community.
      </Text>
      
      <View style={styles.infoBox}>
        <AlertCircle size={16} color={Colors.textLight} />
        <Text style={styles.infoText}>
          Your photo will only be used for verification purposes and won't be shared with other users.
        </Text>
      </View>
      
      <Button
        title="Take Photo"
        onPress={handleTakePhoto}
        fullWidth
        isLoading={isLoading}
        leftIcon={<Camera size={18} color={Colors.white} />}
        style={styles.button}
      />
    </View>
  );
  
  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.photoPreviewContainer}>
        <Image 
          source={{ uri: user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' }} 
          style={styles.photoPreview} 
        />
        <View style={styles.photoOverlay}>
          <CheckCircle size={48} color={Colors.white} />
        </View>
      </View>
      
      <Text style={styles.stepTitle}>Photo Captured</Text>
      
      <Text style={styles.stepDescription}>
        Great! We've captured your photo. Now we'll verify your identity.
      </Text>
      
      <View style={styles.buttonGroup}>
        <Button
          title="Retake"
          onPress={() => setStep(1)}
          variant="outline"
          style={styles.secondaryButton}
        />
        
        <Button
          title="Verify"
          onPress={handleVerify}
          style={styles.primaryButton}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
  
  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.successIconContainer}>
        <Shield size={48} color={Colors.success} />
        <View style={styles.checkBadge}>
          <CheckCircle size={24} color={Colors.white} fill={Colors.success} />
        </View>
      </View>
      
      <Text style={styles.stepTitle}>Verification Successful</Text>
      
      <Text style={styles.stepDescription}>
        Congratulations! Your liveness has been verified. This will help build trust with other users.
      </Text>
      
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Benefits of Verification:</Text>
        
        <View style={styles.benefitItem}>
          <CheckCircle size={16} color={Colors.success} />
          <Text style={styles.benefitText}>Increased trust from other users</Text>
        </View>
        
        <View style={styles.benefitItem}>
          <CheckCircle size={16} color={Colors.success} />
          <Text style={styles.benefitText}>Higher response rate to your messages</Text>
        </View>
        
        <View style={styles.benefitItem}>
          <CheckCircle size={16} color={Colors.success} />
          <Text style={styles.benefitText}>Priority in search results</Text>
        </View>
      </View>
      
      <Button
        title="Complete"
        onPress={handleComplete}
        fullWidth
        style={styles.button}
        rightIcon={<ArrowRight size={18} color={Colors.white} />}
      />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Liveness Verification',
        }}
      />
      
      <View style={styles.content}>
        <View style={styles.stepsIndicator}>
          <View style={[styles.stepIndicator, step >= 1 && styles.activeStepIndicator]}>
            <Text style={[styles.stepNumber, step >= 1 && styles.activeStepNumber]}>1</Text>
          </View>
          <View style={styles.stepConnector} />
          <View style={[styles.stepIndicator, step >= 2 && styles.activeStepIndicator]}>
            <Text style={[styles.stepNumber, step >= 2 && styles.activeStepNumber]}>2</Text>
          </View>
          <View style={styles.stepConnector} />
          <View style={[styles.stepIndicator, step >= 3 && styles.activeStepIndicator]}>
            <Text style={[styles.stepNumber, step >= 3 && styles.activeStepNumber]}>3</Text>
          </View>
        </View>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepIndicator: {
    backgroundColor: Colors.primary,
  },
  stepNumber: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  activeStepNumber: {
    color: Colors.white,
  },
  stepConnector: {
    height: 2,
    width: 40,
    backgroundColor: Colors.backgroundAlt,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  stepTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  infoBox: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
    width: '100%',
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  button: {
    marginTop: 'auto',
    marginBottom: SPACING.xl,
    width: '100%',
  },
  photoPreviewContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  secondaryButton: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.success,
    borderRadius: 20,
    padding: 4,
  },
  benefitsContainer: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    width: '100%',
    marginBottom: SPACING.lg,
  },
  benefitsTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  benefitText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
});