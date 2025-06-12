



import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { CartProvider } from './CartContext'; // Adjust the import based on your project structure

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};



const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <CartProvider> {/* Wrap Tabs with CartProvider */}

    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#27ae60', // Green color for the header
        },
        headerTintColor: '#fff', // White color for header text
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
      {/* <Tabs.Screen
        name="payment"
        options={{
          headerTitle: 'Payment',
          tabBarIcon: ({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />,
          tabBarLabel: 'Payment',
        }}
        redirect={!isSignedIn}
      /> */}
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: 'cart',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
          tabBarLabel: 'cart',
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
    </CartProvider>

  );
};

export default TabsPage;