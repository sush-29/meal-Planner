// app/(public)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IS_DEMO } from '../../config/demo';
import { auth } from '../../config/firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  reload,
  User,
} from 'firebase/auth';

function isFirstLogin(u: User) {
  try {
    const created = new Date(u.metadata.creationTime || 0).getTime();
    const last = new Date(u.metadata.lastSignInTime || 0).getTime();
    return Math.abs(last - created) < 10_000; // within 10s = first login
  } catch {
    return false;
  }
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Missing info', 'Please enter email and password.');
    }

    try {
      setSubmitting(true);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      // refresh user state (in case they just verified)
      await reload(cred.user);

      // If not verified, send a verification email, sign out, and guide the user
      if (!cred.user.emailVerified) {
        try {
          await sendEmailVerification(cred.user);
        } catch (err: any) {
          console.log('sendEmailVerification error:', err?.message);
        }
        await signOut(auth);

        return Alert.alert(
          'Verify your email',
          'We sent a verification link to your email. Please verify, then sign in again.',
          [
            { text: 'OK' },
            // Optional quick resend path (requires credentials; we just sent one above)
            // { text: 'Resend', onPress: async () => { try { await sendEmailVerification(cred.user); } catch {} } }
          ]
        );
      }

      // Verified → show welcome message on first login
      if (isFirstLogin(cred.user)) {
        Alert.alert('Account created', 'You’re all set! Welcome aboard.');
      }

      router.replace('/home');
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

      <Button
        title={submitting ? 'Signing in…' : 'Sign in'}
        onPress={onLogin}
        disabled={submitting}
      />

      <View style={{ height: 12 }} />
      <Link href="/reset">Forgot password?</Link>
      <View style={{ height: 12 }} />
      <Link href="/register">Create an account</Link>

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
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  input: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});
