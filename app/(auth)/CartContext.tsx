import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product, CartItem } from "../../types/types";

type CartContextValue = {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  decrement: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === p.id);
      if (existing) {
        return prev.map(ci =>
          ci.id === p.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const decrement = (id: string) => {
    setCart(prev =>
      prev
        .map(ci => (ci.id === id ? { ...ci, quantity: ci.quantity - 1 } : ci))
        .filter(ci => ci.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(ci => ci.id !== id));
  };

  const clearCart = () => setCart([]);

  const count = useMemo(
    () => cart.reduce((n, ci) => n + ci.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),
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
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
