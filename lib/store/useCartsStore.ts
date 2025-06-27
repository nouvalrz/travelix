import { create } from "zustand";

import { fetchAddCart, fetchCarts } from "../data/client/carts";

import { Cart } from "@/types/cart.type";

type CartsStore = {
  cartOpen: boolean;
  onCartOpen: () => void;
  toggleCartOpen: () => void;
  setCartOpen: (value: boolean) => void;
  carts: Cart[];
  cartsLoading: boolean;
  fetchCarts: () => Promise<void>;
  totalCarts: () => number;
  addCart: (cartId: string, quantity: number) => Promise<void>;
};

export const useCartsStore = create<CartsStore>((set, get) => {
  return {
    cartOpen: false,
    onCartOpen: () => set({ cartOpen: true }),
    toggleCartOpen: () => set({ cartOpen: !get().cartOpen }),
    setCartOpen: (value) => set({ cartOpen: value }),
    carts: [],
    cartsLoading: true,
    fetchCarts: async () => {
      set({ cartsLoading: true });

      const response = await fetchCarts();
      const carts = response.data as Cart[];
      const cartsSorted = carts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      set({ carts: cartsSorted, cartsLoading: false });
    },
    totalCarts: () => get().carts.length,
    addCart: async (cartId, quantity) => {
      for (let i = 0; i < quantity; i++) {
        await fetchAddCart({ activityId: cartId });
      }

      get().fetchCarts();
    },
  };
});
