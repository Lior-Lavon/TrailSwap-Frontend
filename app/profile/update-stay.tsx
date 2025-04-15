import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { Clock } from 'lucide-react-native';

export default function UpdateStayScreen() {
  const router = useRouter();
  const { user, updateStayDuration } = useAuthStore();
  
  const [stayDuration, setStayDuration] = useState(user?.stayDuration.toString() || '7');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!stayDuration.trim()) {
      setError('Stay duration is required');
      return false;
    }
    
    const duration = Number(stayDuration);
    if (isNaN(duration) || duration <= 0) {
      setError('Please enter a valid number of days');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await updateStayDuration(Number(stayDuration));
        Alert.alert(
          'Success',
          'Your stay duration has been updated',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to update stay duration');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Update Stay Duration',
          headerBackTitle: 'Back',
        }}
      />
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>How long are you staying?</Text>
          <Text style={styles.subtitle}>
            Let other travelers know how long you'll be in {user?.currentLocation.city}
          </Text>
          
          <Input
            label="Number of Days"
            placeholder="Enter number of days"
            value={stayDuration}
            onChangeText={setStayDuration}
            keyboardType="numeric"
            error={error}
            leftIcon={<Clock size={20} color={Colors.textLight} />}
          />
          
          <Button
            title="Update Stay Duration"
            onPress={handleUpdate}
            isLoading={isLoading}
            fullWidth
            style={styles.button}
          />
        </View>
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
    marginBottom: SPACING.md,
  },
  button: {
    marginTop: SPACING.md,
  },
});