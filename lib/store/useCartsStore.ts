import { create } from "zustand";

import { fetchCarts } from "../data/client/carts";

import { Cart } from "@/types/cart.type";

type CartsStore = {
  carts: Cart[];
  cartsLoading: boolean;
  fetchCarts: () => Promise<void>;
  totalCarts: () => number;
  cartsModalOpen: boolean; // TODO : Delete unused
  setCartsModalOpen: (value: boolean) => void; // TODO : Delete unused
};

export const useCartsStore = create<CartsStore>((set, get) => {
  return {
    carts: [],
    cartsLoading: true,
    fetchCarts: async () => {
      set({ cartsLoading: true });

      const response = await fetchCarts();
      const carts = response.data as Cart[];

      set({ carts: carts, cartsLoading: false });
    },
    totalCarts: () => get().carts.length,
    cartsModalOpen: false,
    setCartsModalOpen: (value) => set({ cartsModalOpen: value }),
  };
});
