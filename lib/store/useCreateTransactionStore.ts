import { create } from "zustand";
import { addToast } from "@heroui/toast";

import { fetchDeleteCart, fetchUpdateCartQuantity } from "../data/client/carts";
import { fetchCreateTransaction } from "../data/client/transactions";

import { useCartsStore } from "./useCartsStore";
import { useTransactionsStore } from "./useTransactionsStore";

import { Cart } from "@/types/cart.type";

interface CartWithStatus extends Cart {
  isLoading: boolean;
  isSelected: boolean;
}

type CreateTransactionStore = {
  carts: CartWithStatus[];
  setCarts: (carts: Cart[]) => void;
  toggleCartSelected: (id: string) => void;
  selectedPaymentMethodId: string;
  isAllSelected: () => boolean;
  setSelectedPaymentMethodId: (id: string) => void;
  toggleAllCartsAsSelected: () => void;
  setCartLoading: (id: string, value: boolean) => void;
  deleteCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, newQuantity: number) => Promise<void>;
  totalPriceFromSelected: () => number;
  selectedCartCount: () => number;
  isSomeSelected: () => boolean;
  isFormFilled: () => boolean;
  createTransaction: () => Promise<void>;
  transactionLoading: boolean;
};

export const useCreateTransactionStore = create<CreateTransactionStore>(
  (set, get) => {
    return {
      carts: [],
      setCarts: (carts) => {
        const cartsWithLoading = carts.map(
          (cart) => ({ ...cart, isLoading: false }) as CartWithStatus
        );

        set({ carts: cartsWithLoading });
      },
      selectedCartIds: [],

      selectedPaymentMethodId: "",
      setSelectedPaymentMethodId: (id) => set({ selectedPaymentMethodId: id }),
      toggleCartSelected: (id) => {
        set((state) => {
          const newCarts = state.carts.map((cart) =>
            cart.id === id ? { ...cart, isSelected: !cart.isSelected } : cart
          );

          return { carts: newCarts };
        });
      },
      toggleAllCartsAsSelected: () => {
        const allChecked = get().carts.every((cart) => cart.isSelected);

        if (allChecked) {
          set((state) => {
            const newCarts = state.carts.map((cart) => ({
              ...cart,
              isSelected: false,
            }));

            return { carts: newCarts };
          });
        } else {
          set((state) => {
            const newCarts = state.carts.map((cart) => ({
              ...cart,
              isSelected: true,
            }));

            return { carts: newCarts };
          });
        }
      },
      isAllSelected: () =>
        get().carts.length <= 0
          ? false
          : get().carts.every((cart) => cart.isSelected),
      setCartLoading: (id, value) => {
        set((state) => {
          const newCarts = state.carts.map((cart) =>
            cart.id === id ? { ...cart, isLoading: value } : cart
          );

          return { carts: newCarts };
        });
      },
      deleteCart: async (id) => {
        get().setCartLoading(id, true);
        try {
          const response = await fetchDeleteCart(id);

          set((state) => {
            return { carts: state.carts.filter((cart) => cart.id !== id) };
          });
        } catch (error) {
          if (error instanceof Error) {
            addToast({
              title: "Error",
              description: error.message,
            });
          }
          get().setCartLoading(id, false);
        }
        useCartsStore.getState().fetchCarts();
      },
      updateCartQuantity: async (id, newQuantity) => {
        get().setCartLoading(id, true);
        try {
          const response = await fetchUpdateCartQuantity(id, newQuantity);

          set((state) => {
            const newCarts = state.carts.map((cart) =>
              cart.id === id ? { ...cart, quantity: newQuantity } : cart
            );

            return { carts: newCarts };
          });
        } catch (error) {
          if (error instanceof Error) {
            addToast({
              title: "Error",
              description: error.message,
            });
          }
        }
        get().setCartLoading(id, false);
        useCartsStore.getState().fetchCarts();
      },
      totalPriceFromSelected: () =>
        get()
          .carts.filter((cart) => cart.isSelected)
          .reduce(
            (acc, cart) =>
              acc +
              cart.quantity *
                (cart.activity.price_discount ?? cart.activity.price),
            0
          ),
      selectedCartCount: () =>
        get().carts.filter((cart) => cart.isSelected).length,
      isSomeSelected: () => get().carts.some((cart) => cart.isSelected),
      isFormFilled: () =>
        get().isSomeSelected() && !!get().selectedPaymentMethodId,
      transactionLoading: false,
      createTransaction: async () => {
        if (!get().isFormFilled()) {
          return;
        }
        set({ transactionLoading: true });
        const cartIds = get()
          .carts.filter((cart) => cart.isSelected)
          .map((cart) => cart.id);

        const response = await fetchCreateTransaction(
          cartIds,
          get().selectedPaymentMethodId
        );

        useCartsStore.getState().fetchCarts();
        useTransactionsStore.getState().fetchTransactions();
        set({ transactionLoading: false });
      },
    };
  }
);
