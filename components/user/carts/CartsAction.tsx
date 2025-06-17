import { Card, CardBody } from "@heroui/card";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Select, SelectItem } from "@heroui/select";
import { BadgePercent } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalProps,
} from "@heroui/modal";

import PaymentMethodChoice from "./PaymentMethodChoice";

import { useCreateTransactionStore } from "@/lib/store/useCreateTransactionStore";
import { formatRupiah } from "@/lib/formatRupiah";
import { PaymentMethod } from "@/types/paymentMethod.type";

const CartsAction = ({
  paymentMethods,
}: {
  paymentMethods: PaymentMethod[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
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
    <>
      {!isMobile ? (
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
      ) : (
        <div className="fixed bottom-0 z-20 left-0 w-full">
          <Card classNames={{ base: "!rounded-b-none" }} shadow="sm">
            <CardBody>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    {count ? <p>Total ({count} items)</p> : <p>Total</p>}
                    {totalPrice ? (
                      <p className="font-bold text-lg text-red-600">
                        {formatRupiah(totalPrice)}
                      </p>
                    ) : (
                      <p className="font-bold text-lg ">-</p>
                    )}
                  </div>
                  <div>
                    <Button
                      startContent={
                        <BadgePercent className="size-5 text-gray-600" />
                      }
                      variant="light"
                      onPress={onOpen}
                    >
                      Apply Promo
                    </Button>
                  </div>
                </div>
                <div className="flex gap-3 items-stretch mt-2">
                  <div className="flex-grow">
                    <Select
                      label="Payment Method"
                      placeholder="Select payment method"
                      onSelectionChange={(key) =>
                        setSelectedPaymentMethodId(key.currentKey ?? "")
                      }
                    >
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id}>{method.name}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Button
                      className="w-full h-full"
                      color="primary"
                      isDisabled={!isFormFilled()}
                      isLoading={transactionLoading}
                      onPress={handleCreateTransaction}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <CartsActionPromoModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
      )}
    </>
  );
};

const CartsActionPromoModal = (props: Omit<ModalProps, "children">) => {
  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Apply Promo
            </ModalHeader>
            <ModalBody>
              <div>
                <Input
                  className="flex-grow"
                  classNames={{ label: "text-base" }}
                  placeholder="Input Promo Code"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Apply
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CartsAction;
