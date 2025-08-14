import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
// 👇 import the helper
import { sendPasswordReset } from '@/config/firebaseConfig';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendReset = async () => {
    if (!email) return Alert.alert('Enter your email');
    try {
      setLoading(true);
      await sendPasswordReset(email.trim());
      Alert.alert('Email sent', 'Reset link sent. Check your inbox/spam.');
    } catch (e: any) {
      Alert.alert('Could not send reset email', e.message ?? 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>

      <TextInput
        style={styles.input}
        placeholder="Your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Button title={loading ? 'Sending...' : 'Send reset link'} onPress={onSendReset} disabled={loading} />

      <View style={{ height: 12 }} />
      <Link href="/(public)/login">Back to login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
});
