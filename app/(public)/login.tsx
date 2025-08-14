// app/(public)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IS_DEMO } from '../../config/demo';

// Initialize Firebase (your existing config file)
import '../../config/firebaseConfig';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onLogin = async () => {
    try {
      setSubmitting(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/home'); // no route-group names in URL
    } catch (e: any) {
      console.log('login error', e);
      Alert.alert('Sign in failed', e?.message ?? 'Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const continueAsGuest = () => router.replace('/home');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title={submitting ? 'Signing in…' : 'Sign in'} onPress={onLogin} disabled={submitting} />

      <View style={{ height: 12 }} />
      <Link href="/reset">Forgot password?</Link>

      {IS_DEMO && (
        <>
          <View style={{ height: 16 }} />
          <Button title="Continue as Guest" onPress={continueAsGuest} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 16 },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});
