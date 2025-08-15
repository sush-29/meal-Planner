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

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ---------- NEW: use your own pages after email actions ----------
const APP_URL =
  process.env.EXPO_PUBLIC_APP_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

const VERIFY_ACTION = {
  url: `${APP_URL}/verified`,       // after email verification, go here
  handleCodeInApp: false,           // we want web redirect
};

const RESET_ACTION = {
  url: `${APP_URL}/reset-done`,     // after password reset, go here
  handleCodeInApp: false,
};
// ----------------------------------------------------------------

// 1) Sign up and send a verification email using your Firebase template
export async function signUpAndVerify(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(cred.user, VERIFY_ACTION); // include continueUrl
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

// 3) Resend verification email
export async function resendVerification(user?: User) {
  const u = user ?? auth.currentUser;
  if (!u) throw new Error('No authenticated user');
  if (u.emailVerified) return 'already-verified';
  await sendEmailVerification(u, VERIFY_ACTION);
  return 'sent';
}

// 4) Send password reset email
export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email, RESET_ACTION);
  return 'sent';
}
