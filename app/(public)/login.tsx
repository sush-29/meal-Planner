// app/(public)/login.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IS_DEMO } from '../../config/demo';
import { auth } from '../../config/firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  reload,
} from 'firebase/auth';

// --------- UI theming to match "Create account" page ----------
const GREEN = '#22c55e'; // nice green
const GREEN_DARK = '#16a34a';
const TEXT_DARK = '#0f172a';

function getGreeting() {
  const h = new Date().getHours(); // user’s local time, any timezone
  if (h < 5) return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}
// --------------------------------------------------------------

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const greeting = useMemo(() => getGreeting(), []);

  const onLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Missing info', 'Please enter email and password.');
    }

    try {
      setSubmitting(true);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      // refresh user state (covers "just verified" case)
      await reload(cred.user);

      if (!cred.user.emailVerified) {
        try {
          await sendEmailVerification(cred.user);
        } catch (err: any) {
          console.log('sendEmailVerification error:', err?.message);
        }
        await signOut(auth);
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

  const onGoRegister = () => router.push('/register');
  const continueAsGuest = () => router.replace('/home');

  return (
    <View style={styles.page}>
      {/* top bar to mirror your Create account header color */}
      <View style={styles.topBar} />

      <View style={styles.container}>
        <Text style={styles.title}>{greeting}!</Text>
        <Text style={styles.subtitle}>Sign in to continue planning your meals</Text>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#64748b"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#64748b"
        />

        {/* Forgot password directly under the password box */}
        <View style={{ height: 8 }} />
        <Link href="/reset" style={styles.forgot}>
          Forgot password?
        </Link>

        <View style={{ height: 16 }} />

        {/* Primary button: Sign in (full width, same rounded look) */}
        <TouchableOpacity
          onPress={onLogin}
          disabled={submitting}
          style={[styles.primaryBtn, submitting && { opacity: 0.8 }]}
        >
          <Text style={styles.primaryBtnText}>
            {submitting ? 'Signing in…' : 'SIGN IN'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        {/* Secondary action styled like a button: Create account */}
        <TouchableOpacity onPress={onGoRegister} style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        {IS_DEMO && (
          <>
            <View style={{ height: 16 }} />
            <TouchableOpacity onPress={continueAsGuest} style={styles.ghostBtn}>
              <Text style={styles.ghostBtnText}>Continue as Guest</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8fafc' },
  topBar: { height: 56, backgroundColor: GREEN }, // matches your Create account header
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    marginVertical: 8,
    height: 52,
    borderWidth: 2,
    borderColor: GREEN,
    borderRadius: 26, // pill shape like your Create account page
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  forgot: { color: '#0ea5e9', fontSize: 14, alignSelf: 'flex-start' },

  primaryBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  secondaryBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: GREEN, // same filled style to match your request
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  ghostBtn: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  ghostBtnText: { color: '#334155', fontWeight: '600' },
});
