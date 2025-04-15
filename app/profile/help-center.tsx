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

export default function HelpCenterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Help Center',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Help Center</Text>
          <Text style={styles.subtitle}>
            Welcome to TrailSwap! Here's everything you need to know to get started and make the most out of the app.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Create an Account</Text>
              <Text style={styles.stepDescription}>
                Sign up using your email. You'll need to verify your profile before listing or buying items.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Browse Gear Nearby</Text>
              <Text style={styles.stepDescription}>
                Open explore page to see gear available near your location. You can search by category (tents, boots, power banks, etc.).
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Post an Item for Sale</Text>
              <Text style={styles.stepDescription}>
                Have something to pass on? Switch to Seller Mode and make a new listing.
              </Text>
              <View style={styles.bulletPoints}>
                <Text style={styles.bulletPoint}>• Upload 2–4 clear photos</Text>
                <Text style={styles.bulletPoint}>• Write a short title and description</Text>
                <Text style={styles.bulletPoint}>• Choose a fair price</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Contact a Seller or Buyer</Text>
              <Text style={styles.stepDescription}>
                Found what you need? Send a message in-app and set a time and place to meet — usually a nearby hostel or café.
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Meet & Swap</Text>
              <Text style={styles.stepDescription}>
                Complete the swap in person. The buyer pays the listen price.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What kind of items can I post?</Text>
            <Text style={styles.faqAnswer}>
              Only travel-related gear! No souvenirs, reselling, or shop items.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is it safe?</Text>
            <Text style={styles.faqAnswer}>
              Yes! All users are verified travelers. If anything seems off, report it.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What if I have a problem with someone?</Text>
            <Text style={styles.faqAnswer}>
              Use the "Report User" feature in their profile. We take these seriously and review every case.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel a meetup?</Text>
            <Text style={styles.faqAnswer}>
              Yes, just message the other person as early as possible. Be respectful — your reliability rating depends on it.
            </Text>
          </View>
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
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: Colors.textLight,
    lineHeight: 22,
  },
  section: {
    backgroundColor: Colors.white,
    margin: SPACING.md,
    marginTop: 0,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: SPACING.md,
  },
  step: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  stepNumber: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: FONT_SIZE.md,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    lineHeight: 20,
  },
  bulletPoints: {
    marginTop: SPACING.xs,
  },
  bulletPoint: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    lineHeight: 22,
  },
  faqItem: {
    marginBottom: SPACING.md,
  },
  faqQuestion: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    lineHeight: 20,
  },
});