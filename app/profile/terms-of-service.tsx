import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';

export default function TermsOfServiceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Terms of Service',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.lastUpdated}>Last updated: 15/04/2025</Text>
          
          <Text style={styles.paragraph}>
            Welcome to our community! By using this app, you agree to the following terms. 
            We've kept it clear and traveler-friendly — please read through before you start buying or selling gear.
          </Text>
          
          <Text style={styles.sectionTitle}>1. Who We Are</Text>
          <Text style={styles.paragraph}>
            This app is a peer-to-peer platform for travelers to exchange secondhand traveling, 
            backpacking, hiking, and camping gear. We're not a commercial marketplace — just a 
            community helping each other out.
          </Text>
          
          <Text style={styles.sectionTitle}>2. Eligibility</Text>
          <Text style={styles.paragraph}>
            To use this app, you must:
          </Text>
          <Text style={styles.bulletPoint}>• Be at least 15 years old</Text>
          <Text style={styles.bulletPoint}>• Be a traveler (you must input a home country different than your current location)</Text>
          <Text style={styles.bulletPoint}>• Complete verification (email and facial motion capture required to buy or sell)</Text>
          
          <Text style={styles.sectionTitle}>3. Account Basics</Text>
          <Text style={styles.bulletPoint}>• You're responsible for your own account and activity.</Text>
          <Text style={styles.bulletPoint}>• Don't create multiple accounts or impersonate someone else.</Text>
          <Text style={styles.bulletPoint}>• We may remove accounts that appear to be commercial sellers or violate community guidelines.</Text>
          
          <Text style={styles.sectionTitle}>4. Buying & Selling Gear</Text>
          <Text style={styles.bulletPoint}>• All transactions are between individuals, using cash.</Text>
          <Text style={styles.bulletPoint}>• The seller sets the price.</Text>
          <Text style={styles.bulletPoint}>• The app charges a small non-refundable service fee before a meetup is arranged. The rest of the payment happens in person.</Text>
          <Text style={styles.bulletPoint}>• Sellers never handle money through the app.</Text>
          
          <Text style={styles.sectionTitle}>5. Verification & Trust</Text>
          <Text style={styles.paragraph}>
            We use a three-level verification system to help build trust:
          </Text>
          <Text style={styles.bulletPoint}>• Email verification</Text>
          <Text style={styles.bulletPoint}>• Facial motion capture</Text>
          <Text style={styles.bulletPoint}>• Social confirmation from other travelers</Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend accounts that violate trust or appear commercial.
          </Text>
          
          <Text style={styles.sectionTitle}>6. User Conduct</Text>
          <Text style={styles.bulletPoint}>• Be respectful and honest.</Text>
          <Text style={styles.bulletPoint}>• No commercial resellers or fake listings.</Text>
          <Text style={styles.bulletPoint}>• No spam, scams, or unsafe meetups.</Text>
          <Text style={styles.bulletPoint}>• Don't misuse the "This looks like a store" reporting button.</Text>
          
          <Text style={styles.sectionTitle}>7. Location & Privacy</Text>
          <Text style={styles.bulletPoint}>• Your real-time city location is required to use the app.</Text>
          <Text style={styles.bulletPoint}>• We don't show your exact address or coordinates to other users.</Text>
          <Text style={styles.bulletPoint}>• You agree not to manipulate or spoof your location.</Text>
          
          <Text style={styles.sectionTitle}>8. Content</Text>
          <Text style={styles.bulletPoint}>• You own your gear photos and descriptions, but grant us a license to display them within the app.</Text>
          <Text style={styles.bulletPoint}>• Don't post anything illegal (in the country you're visiting), harmful, or misleading.</Text>
          
          <Text style={styles.sectionTitle}>9. Liability</Text>
          <Text style={styles.bulletPoint}>• We're not responsible for the quality of items exchanged or anything that happens during or after a meetup.</Text>
          <Text style={styles.bulletPoint}>• Use common sense and caution when meeting people in real life.</Text>
          
          <Text style={styles.sectionTitle}>10. Changes</Text>
          <Text style={styles.paragraph}>
            We might update these terms over time. We'll notify you in-app if that happens.
          </Text>
          
          <Text style={styles.conclusion}>
            Thanks for being part of the community. Travel light, trade smart, and take care of each other.
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
  content: {
    backgroundColor: Colors.white,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },
  lastUpdated: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    marginBottom: SPACING.md,
  },
  paragraph: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  bulletPoint: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.sm,
  },
  conclusion: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    fontWeight: '500',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});