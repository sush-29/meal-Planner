// app/(public)/register.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { auth } from '../../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSignUpPress = async () => {
    setErr(null);
    setInfo(null);

    if (!emailAddress || !password) {
      setErr('Email and password are required');
      return;
    }

    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        emailAddress.trim(),
        password
      );

      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      try {
        await sendEmailVerification(cred.user);
        setInfo('Verification email sent. You can continue to the app.');
      } catch {}

      router.replace('/home');
    } catch (e: any) {
      setErr(e?.message ?? 'Sign up failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerBackVisible: true, title: 'Create account' }}
      />
      <Text style={styles.title}>Join Meal Planner!</Text>
      <Text style={styles.subtitle}>
        Create an account to start planning your meals
      </Text>

      <TextInput
        placeholder="Name (optional)"
        value={name}
        onChangeText={setName}
        style={styles.inputField}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        style={styles.inputField}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      {err ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{err}</Text>
      ) : null}
      {info ? (
        <Text style={{ color: '#16a34a', marginBottom: 8 }}>{info}</Text>
      ) : null}

      <Button
        title={busy ? 'Creating...' : 'Create Account'}
        onPress={onSignUpPress}
        disabled={busy}
        color="#27ae60"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
