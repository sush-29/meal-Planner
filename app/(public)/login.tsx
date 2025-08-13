// app/(public)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

// ✅ initialize firebase app by importing your config (no alias)
import '../../config/firebaseConfig';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // go to the authenticated tabs
      router.replace('/(auth)/home');
    } catch (e: any) {
      console.log('login error', e);
      Alert.alert('Sign in failed', e?.message ?? 'Check your credentials and try again.');
    }
  };

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

      <Button title="Sign in" onPress={onLogin} />

      <View style={{ height: 12 }} />
      <Link href="/(public)/reset">Forgot password?</Link>
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
