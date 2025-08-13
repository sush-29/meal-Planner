// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // redirect the root (/) to the login page
  return <Redirect href="/login" />;
}
