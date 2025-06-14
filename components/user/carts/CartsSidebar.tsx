import { Card, CardBody } from "@heroui/card";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import PaymentMethodChoice from "./PaymentMethodChoice";

import { useCreateTransactionStore } from "@/lib/store/useCreateTransactionStore";
import { formatRupiah } from "@/lib/formatRupiah";
import { PaymentMethod } from "@/types/paymentMethod.type";

const CartsSidebar = ({
  paymentMethods,
}: {
  paymentMethods: PaymentMethod[];
}) => {
  const router = useRouter();
  const {
    totalPriceFromSelected,
    selectedCartCount,
    setSelectedPaymentMethodId,
    isFormFilled,
    createTransaction,
    transactionLoading,
  } = useCreateTransactionStore();

  const totalPrice = totalPriceFromSelected();
  const count = selectedCartCount();

  const handleCreateTransaction = async () => {
    try {
      await createTransaction();
      addToast({
        color: "success",
        title: "Success",
        description: "Successfully created new transaction",
      });
      router.push("/me/transactions");
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <div>
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 flex justify-between items-center">
            {count ? <p>Total ({count} items)</p> : <p>Total</p>}
            {totalPrice ? (
              <p className="font-bold text-lg text-red-600">
                {formatRupiah(totalPrice)}
              </p>
            ) : (
              <p className="font-bold text-lg ">-</p>
            )}
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="mt-4">
            <div className="flex gap-2 items-end">
              <Input
                className="flex-grow"
                classNames={{ label: "text-base" }}
                label="Apply Promo"
                labelPlacement="outside"
                placeholder="Input Promo Code"
              />
              <Button className="flex-shrink-0" color="primary">
                Apply
              </Button>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <div>
            <PaymentMethodChoice
              paymenyMethods={paymentMethods}
              onValueChange={(id) => setSelectedPaymentMethodId(id)}
            />
          </div>
          <div className="mt-4">
            <Button
              className="w-full"
              color="primary"
              isDisabled={!isFormFilled()}
              isLoading={transactionLoading}
              onPress={handleCreateTransaction}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartsSidebar;
