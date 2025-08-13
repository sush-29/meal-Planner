// app/(auth)/CartContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Product, CartItem } from '../../types/types';

type ProductWithImage = Product & { image: number };

type CartContextValue = {
  cart: CartItem[];
  addToCart: (p: ProductWithImage) => void;
  decrement: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function toCartItem(p: ProductWithImage): CartItem {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,          // ✅ include image to satisfy CartItem
    quantity: 1,
  };
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (p: ProductWithImage) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === p.id);
      if (existing) {
        return prev.map(ci =>
          ci.id === p.id ? { ...ci, quantity: (ci.quantity ?? 0) + 1 } : ci
        );
      }
      return [...prev, toCartItem(p)];
    });
  };

  const decrement = (id: string) => {
    setCart(prev =>
      prev
        .map(ci =>
          ci.id === id ? { ...ci, quantity: (ci.quantity ?? 0) - 1 } : ci
        )
        .filter(ci => (ci.quantity ?? 0) > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(ci => ci.id !== id));
  };

  const clearCart = () => setCart([]);

  const count = useMemo(
    () => cart.reduce((n, ci) => n + (ci.quantity ?? 0), 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, ci) => sum + ci.price * (ci.quantity ?? 0), 0),
    [cart]
  );

  const value = useMemo(
    () => ({ cart, addToCart, decrement, removeFromCart, clearCart, count, subtotal }),
    [cart, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
