import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { useAuthStore } from "@/store/auth-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/verification" options={{ headerShown: false }} />
      <Stack.Screen name="gear/[id]" options={{ headerShown: true }} />
      <Stack.Screen name="gear/new" options={{ headerShown: true, title: "Add New Gear" }} />
      <Stack.Screen name="gear/edit/[id]" options={{ headerShown: true, title: "Edit Gear" }} />
      <Stack.Screen name="chat/[id]" options={{ headerShown: true }} />
      <Stack.Screen name="transaction/deposit" options={{ headerShown: true, title: "Place Deposit" }} />
      <Stack.Screen name="profile/update-stay" options={{ headerShown: true }} />
      <Stack.Screen name="profile/edit" options={{ headerShown: true, title: "Edit Profile" }} />
      <Stack.Screen name="profile/settings" options={{ headerShown: true, title: "Settings" }} />
      <Stack.Screen name="profile/terms-of-service" options={{ headerShown: true, title: "Terms of Service" }} />
      <Stack.Screen name="profile/about" options={{ headerShown: true, title: "About TrailSwap" }} />
      <Stack.Screen name="profile/notification-settings" options={{ headerShown: true, title: "Notifications" }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}