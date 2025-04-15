import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Image
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import { SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { LogoWithText } from '@/components/ui/LogoWithText';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'About TrailSwap',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <LogoWithText size="medium" />
          </View>
          
          <Text style={styles.title}>About TrailSwap</Text>
          
          <Text style={styles.paragraph}>
            TrailSwap is the world's first traveler-to-traveler gear exchange app — built for backpackers, by backpackers.
          </Text>
          
          <Text style={styles.paragraph}>
            Tired of buying overpriced gear you only need for one country? We were too. 
            That's why we created a simple, safe, and community-driven way to buy and sell 
            secondhand hiking, camping, and travel gear with fellow travelers nearby.
          </Text>
          
          <Text style={styles.paragraph}>
            Whether you're starting a journey and need a power bank last minute, or you just 
            finished your book and want to pass it forward — TrailSwap helps you connect fast, 
            meet up, and swap gear with trust.
          </Text>
          
          <Text style={styles.featureTitle}>What makes TrailSwap special:</Text>
          
          <View style={styles.featureContainer}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Verified real travelers only</Text>
          </View>
          
          <View style={styles.featureContainer}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>In-person deals with no shipping needed</Text>
          </View>
          
          <View style={styles.featureContainer}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Built-in trust system & community reports</Text>
          </View>
          
          <View style={styles.featureContainer}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>Zero resellers — no fake stores allowed</Text>
          </View>
          
          <Text style={styles.paragraph}>
            We believe in keeping gear moving, reducing waste, and making adventure more accessible for everyone.
          </Text>
          
          <Text style={styles.slogan}>This isn't a marketplace. It's a movement.</Text>
          
          <Text style={styles.tagline}>Join the swap. Meet travelers. Move lighter.</Text>
          
          <Text style={styles.version}>Version 1.0.0</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: SPACING.md,
  },
  paragraph: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: Colors.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: SPACING.sm,
  },
  featureText: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
  },
  slogan: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  version: {
    fontSize: FONT_SIZE.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});