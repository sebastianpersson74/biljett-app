// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set) => ({
    cartItems: [],
    addToCart: (item) => set((state) => {
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    }),
    increaseQuantity: (id) => set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    })),
    decreaseQuantity: (id) => set((state) => ({
      cartItems: state.cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })),
    clearCart: () => set({ cartItems: [] }),
  }),
  {
    name: 'cart-storage', 
  }
));
