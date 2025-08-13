// app/(auth)/profile.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState<string>(
    useMemo(() => (user?.displayName ? user.displayName.split(' ')[0] : ''), [user])
  );
  const [lastName, setLastName] = useState<string>(
    useMemo(() => (user?.displayName ? user.displayName.split(' ').slice(1).join(' ') : ''), [user])
  );

  const onSaveUser = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName: `${firstName ?? ''} ${lastName ?? ''}`.trim() });
      console.log('Profile updated');
    } catch (e) {
      console.log('Update error', e);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>You are not signed in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', marginBottom: 12 }}>
        Hello {firstName} {lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />

      <Button onPress={onSaveUser} title="Update account" color={'#6c47ff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Profile;
