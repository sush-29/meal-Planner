// data.ts
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
  
  export default mealPlans;