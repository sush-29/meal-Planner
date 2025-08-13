// app/_layout.tsx
import { Slot } from 'expo-router';

export default function RootLayout() {
  // Root just renders child route groups like (public) and (auth)
  return <Slot />;
}
