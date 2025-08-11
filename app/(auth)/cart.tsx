import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCart } from './CartContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from '../../config/firebaseConfig'; 
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';



const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalAmount } = useCart();
  const navigation = useNavigation(); // Get the navigation object

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (cartItems.length === 0) {
  //       navigation.navigate('Home');
  //     }
  //   }, [cartItems, navigation])
  // );
  const handleCheckout = async () => {
    try {
      // Create a new order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        items: cartItems,
        totalAmount: totalAmount,
        createdAt: new Date(),
      });
  
      // Show a success alert
      Alert.alert(
        'Success!',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear the cart
              clearCart();
              
  
              // Redirect to the home page
              // navigation.navigate('Home');
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error placing order: ", error);
      // Optionally handle error case
    }
  };





  return (
    <View>
      <Text>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id}>
            <Text>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        ))
      )}
      <Text>Total Amount: ${totalAmount.toFixed(2)}</Text>
      <Button title="Clear Cart" onPress={clearCart} />
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default Cart;