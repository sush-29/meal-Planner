import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function VerifiedPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/home'); // auto-go to Home
    }, 2000); // 2 seconds
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account created successfully 🎉</Text>
      <Text style={styles.body}>
        Your email is verified. Redirecting to Home…
      </Text>

      <View style={{ height: 16 }} />
      <Button title="Go to Home now" onPress={() => router.replace('/home')} />

      <View style={{ height: 12 }} />
      <Link href="/login">Or go to Sign in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  body: { fontSize: 16, textAlign: 'center', color: '#333' },
});
