"use client";
import { Card, CardBody } from "@heroui/card";
import { motion } from "motion/react";
import { Chip } from "@heroui/chip";
import { Pin, ShoppingCart, Star } from "lucide-react";
import { DatePicker } from "@heroui/date-picker";
import { NumberInput } from "@heroui/number-input";
import { Button } from "@heroui/button";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";
import { addToast } from "@heroui/toast";

import { Destination } from "@/types/destination.type";
import { formatRupiah } from "@/lib/formatRupiah";
import { useCartsStore } from "@/lib/store/useCartsStore";

const DestinationDetailSidebar = ({
  destination,
  headerShown,
}: {
  destination: Destination;
  headerShown: boolean;
}) => {
  const { addCart } = useCartsStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [addCartLoading, setAddCartLoading] = useState<boolean>(false);

  const handleAddCart = async () => {
    setAddCartLoading(true);
    await addCart(destination.id, quantity);
    setAddCartLoading(false);
    addToast({
      title: "Success",
      description: "Successfully added to cart!",
      color: "success",
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <motion.div layout>
          <motion.div
            layout
            animate={
              headerShown
                ? {
                    opacity: 1,
                    height: "auto",
                    y: 0,
                    marginBottom: 16,
                    paddingBottom: 0,
                  }
                : {
                    opacity: 0,
                    height: 0,
                    y: -20,
                    marginBottom: 0,
                    paddingBottom: 0,
                  }
            }
            initial={false}
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Chip color="primary">{destination.category?.name}</Chip>
            <h1 className="capitalize text-2xl font-bold mt-2">
              {destination.title}
            </h1>

            <div className="flex gap-2 mt-3 items-center">
              <Pin className="text-gray-600 size-5" />
              <p>
                {destination.city}, {destination.province}
              </p>
            </div>
            <div className="mt-1 flex gap-1 items-center">
              <Star className="size-5" color="#facc15" fill="#facc15" />
              <p>{destination.rating}</p>
              <p className="text-sm">
                ({destination.total_reviews || 0} review)
              </p>
            </div>
          </motion.div>

          <motion.div
            layout
            className="text-sm text-gray-700"
            transition={{ duration: 0.2 }}
          >
            <p className="font-medium">Price</p>
            <div className="flex gap-2 items-center">
              <p className="text-red-600 text-xl font-bold">
                {formatRupiah(destination.price_discount || destination.price)}
              </p>
              {destination.price_discount && (
                <p className="text-sm line-through text-gray-600">
                  {formatRupiah(destination.price)}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <I18nProvider locale="en-GB">
                <DatePicker label="Date" labelPlacement="outside" />
              </I18nProvider>
              <NumberInput
                label="Quantity"
                labelPlacement="outside"
                minValue={1}
                placeholder="Enter quantity"
                value={quantity}
                onValueChange={(value) => setQuantity(value)}
              />
              <Button
                disableRipple
                color="primary"
                isLoading={addCartLoading}
                startContent={
                  !addCartLoading && <ShoppingCart className="size-5" />
                }
                onPress={handleAddCart}
              >
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </CardBody>
    </Card>
  );
};

export default DestinationDetailSidebar;
