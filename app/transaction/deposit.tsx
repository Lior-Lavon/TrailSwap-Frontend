import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useGearStore } from '@/store/gear-store';
import { useTransactionStore } from '@/store/transaction-store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE } from '@/constants/theme';
import { DollarSign, ShieldCheck, AlertTriangle } from 'lucide-react-native';
import { mockUsers } from '@/mocks/users';

export default function DepositScreen() {
  const { gearId, chatId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { getGearItem } = useGearStore();
  const { placeDeposit, isLoading } = useTransactionStore();
  
  const [gearItem, setGearItem] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoadingItem, setIsLoadingItem] = useState(true);

  useEffect(() => {
    loadGearItem();
  }, [gearId]);

  const loadGearItem = async () => {
    setIsLoadingItem(true);
    if (gearId) {
      const item = await getGearItem(gearId as string);
      if (item) {
        setGearItem(item);
        
        // Find the seller
        const sellerData = mockUsers.find(u => u.id === item.sellerId);
        setSeller(sellerData);
        
        // Calculate deposit (10% of price)
        const depositValue = Math.ceil(item.price * 0.1);
        setDepositAmount(depositValue.toString());
      }
    }
    setIsLoadingItem(false);
  };

  const handlePlaceDeposit = async () => {
    if (!user || !gearItem || !chatId) return;
    
    try {
      await placeDeposit(
        gearItem.id,
        user.id,
        gearItem.sellerId,
        chatId as string,
        Number(depositAmount)
      );
      
      Alert.alert(
        'Deposit Placed',
        'Your deposit has been placed successfully. The seller can now share a meetup location.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place deposit');
    }
  };

  if (isLoadingItem || !gearItem || !seller) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Place Deposit',
          headerBackTitle: 'Back',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{gearItem.title}</Text>
            <Text style={styles.itemPrice}>${gearItem.price}</Text>
            <Text style={styles.sellerInfo}>
              Seller: {seller.firstName}
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <ShieldCheck size={20} color={Colors.primary} />
              <Text style={styles.infoTitle}>About Deposits</Text>
            </View>
            <Text style={styles.infoText}>
              Deposits help ensure both buyers and sellers are committed to the exchange. The deposit is held until the transaction is completed in person.
            </Text>
            <Text style={styles.infoText}>
              A 10% deposit (${depositAmount}) is required to proceed with this transaction.
            </Text>
          </View>
          
          <Input
            label="Deposit Amount (USD)"
            value={depositAmount}
            editable={false}
            leftIcon={<DollarSign size={20} color={Colors.textLight} />}
          />
          
          <View style={styles.warningCard}>
            <AlertTriangle size={20} color={Colors.warning} />
            <Text style={styles.warningText}>
              Final payment will be made in person. TrailSwap only facilitates the connection between travelers.
            </Text>
          </View>
          
          <Button
            title={`Place $${depositAmount} Deposit`}
            onPress={handlePlaceDeposit}
            isLoading={isLoading}
            fullWidth
            style={styles.depositButton}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  itemTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: SPACING.sm,
  },
  sellerInfo: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: SPACING.xs,
  },
  infoText: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    alignItems: 'center',
  },
  warningText: {
    fontSize: FONT_SIZE.sm,
    color: Colors.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  depositButton: {
    marginTop: SPACING.md,
  },
});