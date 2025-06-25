"use client";

import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

import CartsList from "./CartsList";
import CartsAction from "./CartsAction";

import { useCreateTransactionStore } from "@/lib/store/useCreateTransactionStore";
import { Cart } from "@/types/cart.type";
import { PaymentMethod } from "@/types/paymentMethod.type";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const CartsPageClient = ({
  carts,
  paymentMethods,
}: {
  carts: Cart[];
  paymentMethods: PaymentMethod[];
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
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
        <div className="flex gap-0 lg:gap-8 items-start mt-6">
          <div className="flex-grow h-full">
            {carts.length > 0 ? (
              <CartsList />
            ) : (
              <div className="flex-grow flex flex-col justify-center h-full min-h-[400px]">
                <EmptyPlaceholder
                  description="Go explore our destination"
                  title="Cart is Empty"
                />
              </div>
            )}
          </div>
          <div
            className={clsx("lg:w-full max-w-[400px] w-0 flex-shrink-0", {
              " lg:sticky top-20": !isMobile,
            })}
          >
            <CartsAction paymentMethods={paymentMethods} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartsPageClient;
