

// Payment.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Payment = () => {
  const handlePayment = () => {
    // Implement payment logic here
    alert('Payment successful!');
  };

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.paymentHeader}>Payment Page</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentHeader: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Payment;




//...........


// // Payment.tsx
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const Payment = ({ route, navigation }) => {
//   // const { onPaymentSuccess } = route.params;
//   const { onPaymentSuccess } = route.params || { onPaymentSuccess: () => {} };


//   const handlePayment = () => {
//     // Simulate a successful payment process
//     // After successful payment
//     onPaymentSuccess(); // Reset the cart
//     navigation.navigate('CartSummary', { cartItems: [], handleResetCart: onPaymentSuccess }); // Navigate to Cart Summary
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Payment Screen</Text>
//       <Button title="Pay Now" onPress={handlePayment} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

// export default Payment;




