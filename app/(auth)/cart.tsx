// app/(auth)/cart.tsx
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useCart } from './CartContext';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { IS_DEMO } from '../../config/demo';

const handleCheckout = async () => {
  if (IS_DEMO) {
    Alert.alert('Success!', 'Order placed (demo). No backend calls.');
    clearCart();
    return;
  }

  // your real Firestore flow:
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      items: cartItems,
      totalAmount,
      createdAt: new Date(),
    });
    Alert.alert('Success!', 'Your order has been placed successfully!', [
      { text: 'OK', onPress: () => clearCart() },
    ]);
  } catch (e) {
    console.error('Error placing order', e);
    Alert.alert('Checkout failed', 'Please try again.');
  }
};

const Cart = () => {
  const { cart, removeFromCart, clearCart, subtotal } = useCart();

  const handleCheckout = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        items: cart,
        totalAmount: subtotal,
        createdAt: new Date(),
      });

      Alert.alert('Success!', 'Your order has been placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
          },
        },
      ]);
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'Could not place the order. Please try again.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>
        Your Cart
      </Text>

      {cart.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity ?? 0}
            </Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        ))
      )}

      <Text style={{ marginTop: 12, fontWeight: 'bold' }}>
        Total Amount: ${subtotal.toFixed(2)}
      </Text>

      <View style={{ height: 8 }} />
      <Button title="Clear Cart" onPress={clearCart} />
      <View style={{ height: 8 }} />
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default Cart;
