import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
// 👇 import the helper
import { signUpAndVerify } from '@/config/firebaseConfig';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignUp = async () => {
    if (!email || !password) return Alert.alert('Enter email and password');
    try {
      setLoading(true);
      await signUpAndVerify(email.trim(), password);
      Alert.alert('Account created', 'Check your email and verify to continue.');
      // Optional: go to login
      router.replace('/(public)/login');
    } catch (e: any) {
      Alert.alert('Sign up failed', e.message ?? 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={loading ? 'Creating...' : 'Sign up'} onPress={onSignUp} disabled={loading} />

      <View style={{ height: 12 }} />
      <Link href="/(public)/login">Already have an account? Log in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
});
