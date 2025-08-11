import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Read Clerk key from .env (make sure .env is saved in project root)
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// ✅ Only use SecureStore on native (Android/iOS). Web doesn't support it.
const tokenCache =
  Platform.OS === 'web'
    ? undefined
    : {
        async getToken(key: string) {
          try {
            return await SecureStore.getItemAsync(key);
          } catch {
            return null;
          }
        },
        async saveToken(key: string, value: string) {
          try {
            await SecureStore.setItemAsync(key, value);
          } catch {
            return;
          }
        },
      };

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn) {
      router.replace('/login');
      return;
    }

    if (isSignedIn && !inAuthGroup) {
      // Change '/(auth)/home' to '/home' if that's your actual route
      router.replace('/(auth)/home');
    }
  }, [isLoaded, isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache as any}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
