


//....



import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
      <Text style={styles.title}>Reset Your Password</Text>
      <Text style={styles.subtitle}>Please enter your email to receive a reset link</Text>

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <Button onPress={onRequestReset} title="Send Reset Email" color={'#27ae60'} />
        </>
      )}

      {successfulCreation && (
        <>
          <Text style={styles.subtitle}>Enter the verification code and your new password</Text>
          <TextInput
            value={code}
            placeholder="Verification Code"
            style={styles.inputField}
            onChangeText={setCode}
          />
          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
          <Button onPress={onReset} title="Set New Password" color={'#27ae60'} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background for a fresh look
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Darker color for text
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e', // Slightly lighter color for subtitle
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#27ae60', // Green color for input borders
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

export default PwReset;