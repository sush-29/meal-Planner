// app/(auth)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './CartContext';

export default function AuthTabs() {
  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#27ae60' },
          headerTintColor: '#fff',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: 'My Profile',
            tabBarLabel: 'My Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            headerTitle: 'cart',
            tabBarLabel: 'cart',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CartProvider>
  );
}
