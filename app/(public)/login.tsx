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
} from 'firebase/auth';

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

      if (!cred.user.emailVerified) {
        try {
          await sendEmailVerification(cred.user); // sends using your Firebase template
        } catch (err: any) {
          console.log('sendEmailVerification error:', err?.message);
        }
        await signOut(auth); // block access until verified
        return Alert.alert(
          'Verify your email',
          'We sent a verification link to your email. Please verify, then sign in again.'
        );
      }

      router.replace('/home');
    } catch (e: any) {
      console.log('login error', e);
      Alert.alert('Sign in failed', e?.message ?? 'Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Resend verification email on demand
  const onResendVerification = async () => {
    if (!email || !password) {
      return Alert.alert(
        'Enter credentials',
        'Type the same email and password you used to register so we can resend the link.'
      );
    }

    try {
      setSubmitting(true);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      await reload(cred.user);

      if (cred.user.emailVerified) {
        await signOut(auth);
        return Alert.alert('Already verified', 'You can sign in now.');
      }

      await sendEmailVerification(cred.user);
      await signOut(auth);
      Alert.alert('Sent', 'Verification email resent. Check your inbox/spam.');
    } catch (e: any) {
      console.log('resend verify error', e);
      Alert.alert('Could not resend', e?.message ?? 'Please try again.');
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
      <Button
        title="Resend verification email"
        onPress={onResendVerification}
        disabled={submitting}
      />

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
