import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Link, useRouter } from "expo-router";

import "@/lib/firebaseClient"; // <-- make sure this initializes firebase (path may be ../lib/… in your project)
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const auth = getAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!emailAddress || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailAddress.trim(), password);
      // go to your signed-in area
      router.replace("/home"); // or "/(auth)/home" if that’s your route
    } catch (e: any) {
      // a couple of friendly messages
      const code = e?.code || "";
      const msg =
        code === "auth/invalid-credential"
          ? "Invalid email or password."
          : code === "auth/user-not-found"
          ? "No account found for this email."
          : code === "auth/wrong-password"
          ? "Wrong password."
          : "Sign-in failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <Text style={styles.title}>Welcome to Meal Planner!</Text>
      <Text style={styles.subtitle}>Sign in to start planning your meals</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Pressable style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Link href="/reset" asChild>
        <Text style={styles.linkText}>Forgot password?</Text>
      </Link>
      <Link href="/register" asChild>
        <Text style={styles.linkText}>Create Account</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 28, fontWeight: "bold", color: "#2c3e50", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#34495e", marginBottom: 20, textAlign: "center" },
  inputField: {
    marginVertical: 10, height: 50, borderWidth: 1, borderColor: "#27ae60",
    borderRadius: 25, paddingHorizontal: 15, backgroundColor: "#fff",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  button: {
    backgroundColor: "#27ae60", borderRadius: 25, paddingVertical: 15, marginVertical: 20,
    alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4, elevation: 2,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  linkText: { color: "#27ae60", textAlign: "center", marginVertical: 5, textDecorationLine: "underline" },
});
