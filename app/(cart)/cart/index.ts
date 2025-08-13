// Map every asset to a stable key. Use `require` (best for RN bundler).
export const IMAGES = {
  beefstirfry: require('./beefstirfry.jpg'),
  beeftacos: require('./beeftacos.jpg'),
  chickpeasalad: require('./chickpeasalad.jpg'),
  crabcurry: require('./crabcurry.jpg'),
  eggomlette: require('./eggomlette.jpg'),
  fishcurry: require('./fishcurry.png'),
  grilledchickenfry: require('./grilledchickenfry.jpg'),
  lambcurry: require('./lambcurry.jpg'),
  lentilsoup: require('./lentilsoup.jpg'),
  meatmeal: require('./meatmeal.jpg'),
  porkchops: require('./porkchops.jpg'),
  prawnscurry: require('./prawnscurry.jpg'),
  proteinmeal: require('./proteinmeal.jpg'),
  seafoodmeal: require('./seafoodmeal.png'),
  vegancurry: require('./vegancurry.jpg'),
  veganmeal: require('./veganmeal.jpg')
} as const;

export type MealImageKey = keyof typeof IMAGES;
export const getMealImage = (key: MealImageKey) => IMAGES[key];
