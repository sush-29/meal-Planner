// app/(auth)/home.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import type { Product as BaseProduct } from '../../types/types';
import { useCart } from './CartContext';
import { IMAGES } from '@/app/(cart)/cart'; // keep your existing images source

// Extend your base Product type locally to include 'image' and optional 'ingredients'
type UIProduct = BaseProduct & { image: number; ingredients?: string };

interface MealPlan {
  id: string;
  name: string;
  image: number;
  items: UIProduct[];
}

const mealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'Sea Food Meal',
    image: IMAGES.seafoodmeal,
    items: [
      { id: '1-1', name: 'Fish Curry',   ingredients: 'Fish, Spices, Coconut Milk', price: 12.99, image: IMAGES.fishcurry },
      { id: '1-2', name: 'Prawns Curry', ingredients: 'Prawns, Spices, Tomato',      price: 14.99, image: IMAGES.prawnscurry },
      { id: '1-3', name: 'Crab Curry',   ingredients: 'Crab, Spices, Coconut Milk',  price: 16.99, image: IMAGES.crabcurry },
    ],
  },
  {
    id: '2',
    name: 'Vegan Meal',
    image: IMAGES.veganmeal,
    items: [
      { id: '2-1', name: 'Vegan Curry',    ingredients: 'Tofu, Vegetables, Spices',        price: 10.99, image: IMAGES.vegancurry },
      { id: '2-2', name: 'Chickpea Salad', ingredients: 'Chickpeas, Vegetables, Dressing', price: 8.99,  image: IMAGES.chickpeasalad },
      { id: '2-3', name: 'Lentil Soup',    ingredients: 'Lentils, Spices, Vegetables',     price: 7.99,  image: IMAGES.lentilsoup },
    ],
  },
  {
    id: '3',
    name: 'Protein Meal',
    image: IMAGES.proteinmeal,
    items: [
      { id: '3-1', name: 'Grilled Chicken', ingredients: 'Chicken, Spices, Olive Oil', price: 13.99, image: IMAGES.grilledchickenfry },
      { id: '3-2', name: 'Beef Stir Fry',   ingredients: 'Beef, Vegetables, Soy Sauce', price: 15.99, image: IMAGES.beefstirfry },
      { id: '3-3', name: 'Egg Omelette',    ingredients: 'Eggs, Spices, Vegetables',    price: 9.99,  image: IMAGES.eggomlette },
    ],
  },
  {
    id: '4',
    name: 'Meat Meal',
    image: IMAGES.meatmeal,
    items: [
      { id: '4-1', name: 'Lamb Curry',  ingredients: 'Lamb, Spices, Yogurt', price: 17.99, image: IMAGES.lambcurry },
      { id: '4-2', name: 'Pork Chops',  ingredients: 'Pork, Spices, Garlic', price: 14.99, image: IMAGES.porkchops },
      { id: '4-3', name: 'Beef Tacos',  ingredients: 'Beef, Tortillas, Veg', price: 11.99, image: IMAGES.beeftacos },
    ],
  },
];

const Home = () => {
  const { width } = useWindowDimensions();
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(null);
  const { addToCart } = useCart();

  const handleMealPlanPress = (mealPlan: MealPlan) => {
    setSelectedMealPlan(mealPlan);
  };

  const renderMealPlan = ({ item }: { item: MealPlan }) => (
    <TouchableOpacity onPress={() => handleMealPlanPress(item)} style={styles.mealPlanContainer}>
      <Image source={item.image} style={styles.mealPlanImage} />
      <Text style={styles.mealPlanName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: UIProduct }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={{ marginLeft: 16, justifyContent: 'center' }}>
          <Text style={styles.itemName}>{item.name}</Text>
          {!!item.ingredients && <Text style={styles.itemIngredients}>{item.ingredients}</Text>}
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: { flex: 1, padding: width < 768 ? 16 : 32, backgroundColor: '#fff' },
    mealPlanContainer: { marginRight: width < 768 ? 16 : 32, alignItems: 'flex-start' },
    mealPlanImage: { width: width < 768 ? 100 : 150, height: width < 768 ? 100 : 150, borderRadius: 8 },
    mealPlanName: { marginTop: 8, fontWeight: 'bold', fontSize: width < 768 ? 16 : 20 },

    itemsList: { marginTop: 16 },

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
    itemImage: { width: width < 768 ? 80 : 120, height: width < 768 ? 80 : 120, borderRadius: 8 },
    itemName: { fontWeight: 'bold', fontSize: width < 768 ? 14 : 18 },
    itemIngredients: { fontSize: width < 768 ? 12 : 16, color: '#666' },
    itemPrice: { fontSize: width < 768 ? 12 : 16, color: '#666' },
    addToCartButton: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 8, marginTop: 8 },
    addToCartButtonText: { color: '#fff', fontSize: width < 768 ? 12 : 16, textAlign: 'center' },
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
