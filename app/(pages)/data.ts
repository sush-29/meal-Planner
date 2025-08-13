// app/(pages)/data.ts

export const IMAGES = {
  beefstirfry:       require('../(cart)/cart/beefstirfry.jpg'),
  beeftacos:         require('../(cart)/cart/beeftacos.jpg'),
  chickpeasalad:     require('../(cart)/cart/chickpeasalad.jpg'),
  crabcurry:         require('../(cart)/cart/crabcurry.jpg'),
  eggomlette:        require('../(cart)/cart/eggomlette.jpg'),
  fishcurry:         require('../(cart)/cart/fishcurry.png'),
  grilledchickenfry: require('../(cart)/cart/grilledchickenfry.jpg'),
  lambcurry:         require('../(cart)/cart/lambcurry.jpg'),
  lentilsoup:        require('../(cart)/cart/lentilsoup.jpg'),
  meatmeal:          require('../(cart)/cart/meatmeal.jpg'),
  porkchops:         require('../(cart)/cart/porkchops.jpg'),
  prawnscurry:       require('../(cart)/cart/prawnscurry.jpg'),
  proteinmeal:       require('../(cart)/cart/proteinmeal.jpg'),
  seafoodmeal:       require('../(cart)/cart/seafoodmeal.png'),
  vegancurry:        require('../(cart)/cart/vegancurry.jpg'),
  veganmeal:         require('../(cart)/cart/veganmeal.jpg'),
};

export type UIItem = {
  id: string;
  name: string;
  price: number;
  image: number;
  ingredients?: string;
};

export type MealPlan = {
  id: string;
  name: string;
  image: number;
  items: UIItem[];
};

export const mealPlans: MealPlan[] = [
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
