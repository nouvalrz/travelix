"use client";

import { useEffect } from "react";

import CartsList from "./CartsList";
import CartsSidebar from "./CartsSidebar";

import { useCreateTransactionStore } from "@/lib/store/useCreateTransactionStore";
import { Cart } from "@/types/cart.type";
import { PaymentMethod } from "@/types/paymentMethod.type";

const CartsPageClient = ({
  carts,
  paymentMethods,
}: {
  carts: Cart[];
  paymentMethods: PaymentMethod[];
}) => {
  const { setCarts } = useCreateTransactionStore();

  useEffect(() => {
    if (carts) {
      setCarts(carts);
    }
  }, [carts]);

  return (
    <div className="px-4">
      <div className="mx-auto container py-8">
        <h1 className="font-bold text-2xl">Your Carts</h1>
        <div className="flex gap-8 items-start mt-6">
          <div className="flex-grow">
            <CartsList />
          </div>
          <div className="w-[400px] flex-shrink-0 sticky top-20">
            <CartsSidebar paymentMethods={paymentMethods} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartsPageClient;
