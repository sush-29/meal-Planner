


//finalfix1.......

// // Home.tsx
// import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { useUser  } from '@clerk/clerk-expo';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import MealPlanScreen from '../(screens)/MealPlanScreen';
// import CartScreen from '../(screens)/CartScreen';

// import Cart from './cart'; // Ensure this path is correct
// import { Product, CartItem } from '../../types/types'; // Import the types
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../config/firebaseConfig'; // Adjust the path as necessary
// import { Image } from 'react-native';

// // Define the meal plans interface
// interface MealPlan {
//   id: string;
//   name: string;
//   items: Product[];
// }
// const mealPlans = [
//   {
//     id: '1',
//     name: 'Sea Food Meal',
//     image: require('../(cart)/images/seafoodmeal.png'), // Add image for meal plan

//     items: [
//       { id: '1-1', name: 'Fish Curry', ingredients: 'Fish, Spices, Coconut Milk', price: 12.99 , image: require('../(cart)/images/fishcurry.png')},
//       { id: '1-2', name: 'Prawns Curry', ingredients: 'Prawns, Spices, Tomato', price: 14.99 , image: require('../(cart)/images/prawnscurry.jpg')},
//       { id: '1-3', name: 'Crab Curry', ingredients: 'Crab, Spices, Coconut Milk', price: 16.99  , image: require('../(cart)/images/crabcurry.jpg')},
//     ],
//   },
//   {
//     id: '2',
//     name: 'Vegan Meal',
//     image: require('../(cart)/images/veganmeal.jpg'), // Add image for meal plan

//     items: [
//       { id: '2-1', name: 'Vegan Curry', ingredients: 'Tofu, Vegetables, Spices', price: 10.99, image: require('../(cart)/images/vegancurry.jpg') },
//       { id: '2-2', name: 'Chickpea Salad', ingredients: 'Chickpeas, Vegetables, Dressing', price: 8.99 , image: require('../(cart)/images/chickpeasalad.jpg')},
//       { id: '2-3', name: 'Lentil Soup', ingredients: 'Lentils, Spices, Vegetables', price: 7.99, image: require('../(cart)/images/lentilsoup.jpg') },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Protein Meal',
//     image: require('../(cart)/images/proteinmeal.jpg'), // Add image for meal plan

//     items: [
//       { id: '3-1', name: 'Grilled Chicken', ingredients: 'Chicken, Spices, Olive Oil', price: 13.99, image: require('../(cart)/images/grilledchickenfry.jpg') },
//       { id: '3-2', name: 'Beef Stir Fry', ingredients: 'Beef, Vegetables, Soy Sauce', price: 15.99, image: require('../(cart)/images/beefstirfry.jpg') },
//       { id: '3-3', name: 'Egg Omelette', ingredients: 'Eggs, Spices, Vegetables', price: 9.99, image: require('../(cart)/images/eggomlette.jpg') },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Meat Meal',
//     image: require('../(cart)/images/meatmeal.jpg'), // Add image for meal plan

//     items: [
//       { id: '4-1', name: 'Lamb Curry', ingredients: 'Lamb, Spices, Yogurt', price: 17.99 , image: require('../(cart)/images/lambcurry.jpg')},
//       { id: '4-2', name: 'Pork Chops', ingredients: 'Pork, Spices, Garlic', price: 14.99, image: require('../(cart)/images/porkchops.jpg') },
//       { id: '4-3', name: 'Beef Tacos', ingredients: 'Beef, Tortillas, Vegetables', price: 11.99, image: require('../(cart)/images/beeftacos.jpg') },
//     ],
//   },
// ];

// const Home = () => {
//   const { user } = useUser ();
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [viewCart, setViewCart] = useState(false);
//   const [selectedMeal, setSelectedMeal] = useState(null);
  

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === productId);
//       if (existingItem && existingItem.quantity > 1) {
//         return prevCart.map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//       }
//       return prevCart.filter((item) => item.id !== productId);
//     });
//   };

//   // const handleCheckout = () => {
//   //   Alert.alert('Checkout', 'Proceeding to checkout...', [{ text: 'OK' }]);
//   // };
//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       Alert.alert('Checkout', 'Your cart is empty!', [{ text: 'OK' }]);
//       return;
//     }
  
//     try {
//       // Create a new document in the 'orders' collection
//       const orderRef = await addDoc(collection(db, 'orders'), {
//         items: cart,
//         total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
//         createdAt: new Date(),
//       });
  
//       Alert.alert('Checkout', 'Your order has been placed!', [{ text: 'OK' }]);
//       setCart([]); // Clear the cart after successful checkout
//     } catch (error) {
//       console.error('Error adding document: ', error);
//       Alert.alert('Checkout', 'There was an error processing your order.', [{ text: 'OK' }]);
//     }
//   };
  
 

//   const handleMealSelect = (meal:MealPlan) => {
//     setSelectedMeal(meal);
//   };

//   const handleIngredientAlert = (item:Product) => {
//     Alert.alert(item.name, `Ingredients: ${item.ingredients}\nPrice: $${item.price.toFixed(2)}`, [{ text: 'OK' }]);

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Meal Plans</Text>
//       <FlatList
//         data={mealPlans}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.mealItem}>
//          <Image source={item.image} style={styles.mealImage} />

//             <Text style={styles.mealName}>{item.name}</Text>
//             <Button title="View Items" onPress={() => handleMealSelect(item)} />
//           </View>
//         )}
//       />
//       {selectedMeal && (
//         <FlatList
//           data={selectedMeal.items}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//             <Image source={item.image} style={styles.itemImage} />

//               <Text>{item.name} - ${item.price.toFixed(2)}</Text>
//               <Button title="View Ingredients" onPress={() => handleIngredientAlert(item)} />
//               <Button title="Add to Cart" onPress={() => addToCart(item)} />
//             </View>
//           )}
//         />
//       )}
//       {viewCart && (
//         <Cart
//           cartItems={cart}
//           onRemoveFromCart={removeFromCart}
//           onCheckout={handleCheckout}
//         />
//       )}
//       <Button title="View Cart" onPress={() => setViewCart(!viewCart)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   mealItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   mealName: {
//     fontSize: 18,
//   },
//   mealImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default Home;






//....

//just trail 2

// // home.tsx
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
//  import { Product, CartItem } from '../../types/types'; // Import the types

// import { useCart } from './CartContext'; // Adjust the import based on your project structure
// interface MealPlan {
//   id: string;
//   name: string;
//   items: Product[];
// }
// const mealPlans = [
//   {
//     id: '1',
//     name: 'Sea Food Meal',
//     image: require('../(cart)/images/seafoodmeal.png'),
//     items: [
//       { id: '1-1', name: 'Fish Curry', ingredients: 'Fish, Spices, Coconut Milk', price: 12.99, image: require('../(cart)/images/fishcurry.png') },
//       { id: '1-2', name: 'Prawns Curry', ingredients: 'Prawns, Spices, Tomato', price: 14.99, image: require('../(cart)/images/prawnscurry.jpg') },
//       { id: '1-3', name: 'Crab Curry', ingredients: 'Crab, Spices, Coconut Milk', price: 16.99, image: require('../(cart)/images/crabcurry.jpg') },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Vegan Meal',
//     image: require('../(cart)/images/veganmeal.jpg'),
//     items: [
//       { id: '2-1', name: 'Vegan Curry', ingredients: 'Tofu, Vegetables, Spices', price: 10.99, image: require('../(cart)/images/vegancurry.jpg') },
//       { id: '2-2', name: 'Chickpea Salad', ingredients: 'Chickpeas, Vegetables, Dressing', price: 8.99, image: require('../(cart)/images/chickpeasalad.jpg') },
//       { id: '2-3', name: 'Lentil Soup', ingredients: 'Lentils, Spices, Vegetables', price: 7.99, image: require('../(cart)/images/lentilsoup.jpg') },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Protein Meal',
//     image: require('../(cart)/images/proteinmeal.jpg'),
//     items: [
//       { id: '3-1', name: 'Grilled Chicken', ingredients: 'Chicken, Spices, Olive Oil', price: 13.99, image: require('../(cart)/images/grilledchickenfry.jpg') },
//       { id: '3-2', name: 'Beef Stir Fry', ingredients: 'Beef, Vegetables, Soy Sauce', price: 15.99, image: require('../(cart)/images/beefstirfry.jpg') },
//       { id: '3-3', name: 'Egg Omelette', ingredients: 'Eggs, Spices, Vegetables', price: 9.99, image: require('../(cart)/images/eggomlette.jpg') },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Meat Meal',
//     image: require('../(cart)/images/meatmeal.jpg'),
//     items: [
//       { id: '4-1', name: 'Lamb Curry', ingredients: 'Lamb, Spices, Yogurt', price: 17.99, image: require('../(cart)/images/lambcurry.jpg') },
//       { id: '4-2', name: 'Pork Chops', ingredients: 'Pork, Spices, Garlic', price: 14.99, image: require('../(cart)/images/porkchops.jpg') },
//       { id: '4-3', name: 'Beef Tacos', ingredients: 'Beef, Tortillas, Vegetables', price: 11.99, image: require('../(cart)/images/beeftacos.jpg') },
//     ],
//   },
// ];

// const Home = () => {
//   const [selectedMealPlan, setSelectedMealPlan] = useState(null);
//   const { addToCart } = useCart(); // Assuming you have a context for cart management

//   const handleMealPlanPress = (mealPlan) => {
//     setSelectedMealPlan(mealPlan);
//   };

//   const handleItemPress = (item) => {
//     Alert.alert(
//       item.name,
//       `Ingredients: ${item.ingredients}`,
//       [
//         {
//           text: 'Add to Cart ',
//           onPress: () => {
//             addToCart(item);
//             Alert.alert(`${item.name} added to cart!`);
//           },
//         },
//         { text: 'Cancel', style: 'cancel' },
//       ]
//     );
//   };

//   const renderMealPlan = ({ item }) => (
//     <TouchableOpacity onPress={() => handleMealPlanPress(item)} style={styles.mealPlanContainer}>
//       <Image source={item.image} style={styles.mealPlanImage} />
//       <Text style={styles.mealPlanName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
//       <Image source={item.image} style={styles.itemImage} />
//       <Text style={styles.itemName}>{item.name}</Text>
//       <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={mealPlans}
//         renderItem={renderMealPlan}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//       {selectedMealPlan && (
//         <FlatList
//           data={selectedMealPlan.items}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           style={styles.itemsList}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   mealPlanContainer: {
//     marginRight: 16,
//     alignItems: 'flex-start',
//   },
//   mealPlanImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   mealPlanName: {
//     marginTop: 8,
//     fontWeight: 'bold',
//   },
//   itemsList: {
//     marginTop: 16,
//   },
//   itemContainer: {
//     marginBottom: 16,
//     alignItems: 'flex-start',
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   itemName: {
//     marginTop: 4,
//     fontWeight: 'bold',
//   },
//   itemPrice: {
//     marginTop: 2,
//     color: '#888',
//   },
// });

// export default Home;

//....

//.... trying new thing



import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Product, CartItem } from '../../types/types'; // Import the types
import { useCart } from './CartContext'; // Adjust the import based on your project structure

interface MealPlan {
  id: string;
  name: string;
  items: Product[];
}

const mealPlans = [
  {
    id: '1',
    name: 'Sea Food Meal',
    image: require('../(cart)/images/seafoodmeal.png'),
    items: [
      { id: '1-1', name: 'Fish Curry', ingredients: 'Fish, Spices, Coconut Milk', price: 12.99, image: require('../(cart)/images/fishcurry.png') },
      { id: '1-2', name: 'Prawns Curry', ingredients: 'Prawns, Spices, Tomato', price: 14.99, image: require('../(cart)/images/prawnscurry.jpg') },
      { id: '1-3', name: 'Crab Curry', ingredients: 'Crab, Spices, Coconut Milk', price: 16.99, image: require('../(cart)/images/crabcurry.jpg') },
    ],
  },
  {
    id: '2',
    name: 'Vegan Meal',
    image: require('../(cart)/images/veganmeal.jpg'),
    items: [
      { id: '2-1', name: 'Vegan Curry', ingredients: 'Tofu, Vegetables, Spices', price: 10.99, image: require('../(cart)/images/vegancurry.jpg') },
      { id: '2-2', name: 'Chickpea Salad', ingredients: 'Chickpeas, Vegetables, Dressing', price: 8.99, image: require('../(cart)/images/chickpeasalad.jpg') },
      { id: '2-3', name: 'Lentil Soup', ingredients: 'Lentils, Spices, Vegetables', price: 7.99, image: require('../(cart)/images/lentilsoup.jpg') },
    ],
  },
  {
    id: '3',
    name: 'Protein Meal',
    image: require('../(cart)/images/proteinmeal.jpg'),
    items: [
      { id: '3-1', name: 'Grilled Chicken', ingredients: 'Chicken, Spices, Olive Oil', price: 13.99, image: require('../(cart)/images/grilledchickenfry.jpg') },
      { id: '3-2', name: 'Beef Stir Fry', ingredients: 'Beef, Vegetables, Soy Sauce', price: 15.99, image: require('../(cart)/images/beefstirfry.jpg') },
      { id: '3-3', name: 'Egg Omelette', ingredients: 'Eggs, Spices, Vegetables', price: 9.99, image: require('../(cart)/images/eggomlette.jpg') },
    ],
  },
  {
    id: '4',
    name: 'Meat Meal',
    image: require('../(cart)/images/meatmeal.jpg'),
    items: [
      { id: '4-1', name: 'Lamb Curry', ingredients: 'Lamb, Spices, Yogurt', price: 17.99, image: require('../(cart)/images/lambcurry.jpg') },
      { id: '4-2', name: 'Pork Chops', ingredients: 'Pork, Spices, Garlic', price: 14.99, image: require('../(cart)/images/porkchops.jpg') },
      { id: '4-3', name: 'Beef Tacos', ingredients: 'Beef, Tortillas, Vegetables', price: 11.99, image: require('../(cart)/images/beeftacos.jpg') },
    ],
  },
];

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const { addToCart } = useCart(); // Assuming you have a context for cart management

  const handleMealPlanPress = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
  };



  const renderMealPlan = ({ item }) => (
    <TouchableOpacity onPress={() => handleMealPlanPress(item)} style={styles.mealPlanContainer}>
      <Image source={item.image} style={styles.mealPlanImage} />
      <Text style={styles.mealPlanName}>{item.name}</Text>
    </TouchableOpacity>
  );

  
  

  //...
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={{ marginLeft: 16, justifyContent: 'center' }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemIngredients}>{item.ingredients}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

 

  const styles = StyleSheet.create({

    itemContainer: {
      marginBottom: 16,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    itemImage: {
      width: width < 768 ? 80 : 120,
      height: width < 768 ? 80 : 120,
      borderRadius: 8,
    },
    itemName: {
      fontWeight: 'bold',
      fontSize: width < 768 ? 14 : 18,
    },
    itemIngredients: {
      fontSize: width < 768 ? 12 : 16,
      color: '#666',
    },
    itemPrice: {
      fontSize: width < 768 ? 12 : 16,
      color: '#666',
    },
    addToCartButton: {
      backgroundColor: '#4CAF50',
      padding: 8,
      borderRadius: 8,
      marginTop: 8,
    },
    addToCartButtonText: {
      color: '#fff',
      fontSize: width < 768 ? 12 : 16,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      padding: width < 768 ? 16 : 32,
      backgroundColor: '#fff',
    },
    mealPlanContainer: {
      marginRight: width < 768 ? 16 : 32,
      alignItems: 'flex-start',
    },
    mealPlanImage: {
      width: width < 768 ? 100 : 150,
      height: width < 768 ? 100 : 150,
      borderRadius: 8,
    },
    mealPlanName: {
      marginTop: 8,
      fontWeight: 'bold',
      fontSize: width < 768 ? 16 : 20,
    },
    itemsList: {
      marginTop: 16,
    },
    
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={mealPlans}
        renderItem={renderMealPlan}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {selectedMealPlan && (
        <FlatList
          data={selectedMealPlan.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.itemsList}
        />
      )}
    </View>
  );
};

export default Home;
           





//......

// trial with stack screens

// // Home.tsx
// import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { useUser  } from '@clerk/clerk-expo';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import MealPlanScreen from '../(screens)/MealPlanScreen';
// import CartScreen from '../(screens)/CartScreen';
// import { Product, CartItem ,Meal} from '../../types/types'; // Import the types

// const Stack = createStackNavigator();


// const mealPlans = [
//   {
//     id: '1',
//     name: 'Sea Food Meal',
//     items: [
//       { id: '1-1', name: 'Fish Curry', ingredients: 'Fish, Spices, Coconut Milk', price: 12.99 },
//       { id: '1-2', name: 'Prawns Curry', ingredients: 'Prawns, Spices, Tomato', price: 14.99 },
//       { id: '1-3', name: 'Crab Curry', ingredients: 'Crab, Spices, Coconut Milk', price: 16.99 },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Vegan Meal',
//     items: [
//       { id: '2-1', name: 'Vegan Curry', ingredients: 'Tofu, Vegetables, Spices', price: 10.99 },
//       { id: '2-2', name: 'Chickpea Salad', ingredients: 'Chickpeas, Vegetables, Dressing', price: 8.99 },
//       { id: '2-3', name: 'Lentil Soup', ingredients: 'Lentils, Spices, Vegetables', price: 7.99 },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Protein Meal',
//     items: [
//       { id: '3-1', name: 'Grilled Chicken', ingredients: 'Chicken, Spices, Olive Oil', price: 13.99 },
//       { id: '3-2', name: 'Beef Stir Fry', ingredients: 'Beef, Vegetables, Soy Sauce', price: 15.99 },
//       { id: '3-3', name: 'Egg Omelette', ingredients: 'Eggs, Spices, Vegetables', price: 9.99 },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Meat Meal',
//     items: [
//       { id: '4-1', name: 'Lamb Curry', ingredients: 'Lamb, Spices, Yogurt', price: 17.99 },
//       { id: '4-2', name: 'Pork Chops', ingredients: 'Pork, Spices, Garlic', price: 14.99 },
//       { id: '4-3', name: 'Beef Tacos', ingredients: 'Beef, Tortillas, Vegetables', price: 11.99 },
//     ],
//   },
// ];
//   // ... your meal plans here


// const Home = ({ navigation }) => {
//   const { user } = useUser ();
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const handleMealSelect = (meal) => {
//     navigation.navigate('MealPlan', { meal, addToCart });
//   };

//   const handleViewCart = () => {
//     navigation.navigate('Cart', { cartItems: cart });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Meal Plans</Text>
//       <FlatList
//         data={mealPlans}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.mealItem}>
//             <Text style={styles.mealName}>{item.name}</Text>
//             <Button title="View Items" onPress={() => handleMealSelect(item)} />
//           </View>
//         )}
//       />
//       <Button title="View Cart" onPress={handleViewCart} />
//     </View>
//   );
// };

// const MealPlanScreenWrapper = ({ route }) => {
//   const { meal, addToCart } = route.params;
//   return <MealPlanScreen meal={meal} addToCart={addToCart} />;
// };

// const CartScreenWrapper = ({ route }) => {
//   const { cartItems } = route.params;
//   return <CartScreen cartItems={cartItems} />;
// };

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="MealPlan" component={MealPlanScreenWrapper} />
//         <Stack.Screen name="Cart" component={CartScreenWrapper} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   mealItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   mealName: {
//     fontSize: 18,
//   },
// });

// export default AppNavigator;