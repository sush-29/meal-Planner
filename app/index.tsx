// app/index.tsx
import { Redirect } from 'expo-router';
import { IS_DEMO } from '../config/demo';

export default function Index() {
   return <Redirect href={IS_DEMO ? '/home' : '/login'} />;
}