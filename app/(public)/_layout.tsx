// app/(public)/_layout.tsx
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#27ae60' },
        headerTintColor: '#fff',
      }}
    />
  );
}
