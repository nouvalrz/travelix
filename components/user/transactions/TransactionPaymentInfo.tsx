"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { ClockAlert } from "lucide-react";
import { Snippet } from "@heroui/snippet";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import dynamic from "next/dynamic";

import { formatDateTime } from "@/lib/formatDate";
import { formatRupiah } from "@/lib/formatRupiah";
import { ImageInputField, ImageInputPicker } from "@/components/ImageInput";
import { useUplaodPaymentProof } from "@/lib/hooks/useUploadPaymentProof";
import { TransactionWithAdditionalStatus } from "@/lib/store/useTransactiosListStore";

const TimerFromISO = dynamic(() => import("@/components/TimerFromISO"), {
  ssr: false,
});

const TransactionPaymentInfo = ({
  transaction,
  hideReminder = false,
  disableUplaod = false,
}: {
  transaction: TransactionWithAdditionalStatus;
  hideReminder?: boolean;
  disableUplaod?: boolean;
}) => {
  const totalPrice = transaction.transaction_items.reduce(
    (acc, item) => acc + item.quantity * (item.price_discount ?? item.price),
    0
  );

  const {
    image,
    setImage,
    handleUploadPaymentProof,
    loading: paymentProofLoading,
  } = useUplaodPaymentProof(transaction.id);

  const [modalImagePicker, setModalImagePicker] = useState<boolean>(false);

  const toggleModalImagePicker = () => setModalImagePicker(!modalImagePicker);

  return (
    <div>
      {!hideReminder && transaction.status === "pending" && (
        <Card shadow="sm">
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <ClockAlert className="size-5" />
                <p className="font-medium">Pay Before : </p>
                <p>{formatDateTime(transaction.expiredDate)}</p>
              </div>
              <TimerFromISO expiryTimestamp={transaction.expiredDate} />
            </div>
          </CardBody>
        </Card>
      )}
      <Card className="mt-6" shadow="sm">
        <CardHeader>
          <div className="flex gap-3 items-center w-full">
            <p className="font-medium">Payment Information</p>
          </div>
        </CardHeader>
        <hr />
        <CardBody>
          <div>
            <div className="grid grid-cols-2">
              <div>
                <p>Virtual Account Number</p>
                <Snippet className="mt-1" symbol="">
                  {transaction.payment_method.virtual_account_number}
                </Snippet>
              </div>
              <div className="flex gap-8">
                <div>
                  <p>Payment Method</p>
                  <p>{transaction.payment_method.virtual_account_name}</p>
                </div>
                <div>
                  <p>Payment Method</p>
                  <Image
                    alt={transaction.payment_method.name}
                    className="w-32 h-12 object-contain mt-1"
                    classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                    fallbackSrc="/images/fallback-image.jpg"
                    src={transaction.payment_method.imageUrl}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p>Total Price</p>
              <p className="mt-1 font-semibold text-lg text-red-600">
                {formatRupiah(totalPrice)}
              </p>
            </div>
            <div className="mt-4">
              <p>Payment Proof</p>
              <div className="w-full p-2 border border-gray-300 border-dashed mt-2 rounded-lg flex justify-center">
                {(transaction.status === "cancelled" ||
                  transaction.status === "expired") && <p>No Payment Proof</p>}
                {transaction.proofPaymentUrl && (
                  <Image
                    className="w-full max-w-60 h-auto min-h-60 object-contain"
                    classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                    fallbackSrc="/images/fallback-image.jpg"
                    src={transaction.proofPaymentUrl}
                  />
                )}
                {transaction.status == "pending" && (
                  <div className="w-full">
                    <div className="flex justify-center w-full">
                      <ImageInputField
                        image={image}
                        previewClassName="w-60 !h-auto !min-h-60 !object-contain !rounded-lg"
                        onClick={
                          disableUplaod ? () => {} : toggleModalImagePicker
                        }
                      />
                    </div>
                    <ImageInputPicker
                      isOpen={modalImagePicker}
                      onOpenChange={toggleModalImagePicker}
                      onResult={(file: File) => setImage(file)}
                    />
                  </div>
                )}
              </div>
              {!disableUplaod && transaction.status === "pending" && (
                <div className="flex justify-end mt-2">
                  <Button
                    color="primary"
                    isDisabled={!image}
                    isLoading={paymentProofLoading}
                    onPress={handleUploadPaymentProof}
                  >
                    Upload Payment Proof
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TransactionPaymentInfo;
