import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LogoWithText } from '@/components/ui/LogoWithText';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
        router.replace('/');
      } catch (error) {
        // Error is handled by the store
      }
    }
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <LogoWithText size="medium" />
            </View>
            
            <View style={styles.formContainer}>
              <Text style={styles.title}>Log In</Text>
              
              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}
              
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
                leftIcon={<Mail size={20} color={Colors.textLight} />}
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                isPassword
                error={passwordError}
                leftIcon={<Lock size={20} color={Colors.textLight} />}
              />
              
              <Button
                title="Log In"
                onPress={handleLogin}
                isLoading={isLoading}
                fullWidth
                style={styles.loginButton}
              />
              
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
      {/* Background image at the bottom */}
      <View style={styles.backgroundImageContainer}>
        <ImageBackground 
          source={{ uri: 'https://i.postimg.cc/43ZVqj4j/file-00000000ba7061f7a9d409b26f6eefe7-conversation-id-67f2bb27-40cc-800f-bbc2-96a52a93c633-message-i.png' }}
          style={styles.backgroundImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Updated to match signup page background color
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    marginTop: 0,
    borderWidth: 1,
    borderColor: Colors.border || '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: Colors.error,
    marginBottom: SPACING.md,
  },
  loginButton: {
    marginTop: SPACING.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  signupText: {
    color: Colors.textLight,
    marginRight: SPACING.xs,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  backgroundImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200, // Adjust height as needed
    zIndex: -1, // Ensure it stays behind content
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});