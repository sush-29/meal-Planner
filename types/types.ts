// types.ts

export interface Product {
    id: string;
    name: string;
    ingredients?: string;
    price: number;


  }
  
  // export interface CartItem extends Product {
  //   quantity: number;
  // }
  export interface Meal {
    id: string;
    name: string;
    items: Product[];
  }
  // types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity?: number; // Optional, as it will be added when the item is in the cart
}