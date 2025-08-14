// app/(public)/reset.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const onReset = async () => {
    if (!email.trim()) {
      Alert.alert('Oops', 'Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert('Check your inbox', 'Password reset link sent.');
    } catch (e: any) {
      console.log('reset error', e);
      Alert.alert('Error', e?.message ?? 'Could not send reset email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Send reset link" onPress={onReset} />
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
