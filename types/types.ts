// types/types.ts
import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  name: string;
  ingredients?: string;
  price: number;
  image: any;   // <-- required by home.tsx
};

export type Meal = {
  id: string;
  name: string;
  items: Product[];
};

export interface CartItem extends Product {
  quantity: number;     // required in cart
};
