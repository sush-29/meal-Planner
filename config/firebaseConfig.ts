// config/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// --- Your existing env-based config (unchanged) ---
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

// --- Initialize app once ---
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// --- Export core services (same as before) ---
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// =====================
// EMAIL FLOW HELPERS
// =====================

// 1) Sign up and send a verification email using your Firebase template
export async function signUpAndVerify(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(cred.user); // uses the template you set in Firebase Console
  return cred.user;
}

// 2) Sign in but only allow verified users
export async function signInVerifiedOnly(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  if (!cred.user.emailVerified) {
    await signOut(auth);
    throw new Error('Please verify your email first. We just sent a link.');
  }
  return cred.user;
}

// 3) Resend verification email (optional button in your UI)
export async function resendVerification(user?: User) {
  const u = user ?? auth.currentUser;
  if (!u) throw new Error('No authenticated user');
  if (u.emailVerified) return 'already-verified';
  await sendEmailVerification(u);
  return 'sent';
}

// 4) Send password reset email
export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email); // uses your Firebase template
  return 'sent';
}
