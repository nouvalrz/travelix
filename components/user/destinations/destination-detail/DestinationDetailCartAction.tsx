"use client";
import { Card, CardBody } from "@heroui/card";
import { motion } from "motion/react";
import { Chip } from "@heroui/chip";
import { Pin, ShoppingCart, Star } from "lucide-react";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { useMediaQuery } from "react-responsive";

import { Destination } from "@/types/destination.type";
import { formatRupiah } from "@/lib/formatRupiah";
import { useCartsStore } from "@/lib/store/useCartsStore";
import { useRedirectLoginMiddleware } from "@/lib/hooks/useRedirectLoginMiddleware";
import QuantityInput from "@/components/QuantityInput";

const DestinationDetailCartAction = ({
  destination,
  headerShown,
}: {
  destination: Destination;
  headerShown: boolean;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const withUser = useRedirectLoginMiddleware();
  const { addCart } = useCartsStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [addCartLoading, setAddCartLoading] = useState<boolean>(false);

  const handleAddCart = withUser(async () => {
    setAddCartLoading(true);
    try {
      await addCart(destination.id, quantity);
      setQuantity(1);
      addToast({
        title: "Success",
        description: "Successfully added to cart!",
        color: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          title: "Error",
          description: error.message,
          color: "danger",
        });
      }
    }
    setAddCartLoading(false);
  });

  return (
    <>
      {!isMobile ? (
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
                    {formatRupiah(
                      destination.price_discount || destination.price
                    )}
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
                  {/* <NumberInput
                    hideStepper
                    classNames={{ input: "text-center" }}
                    endContent={
                      <Button isIconOnly variant="light">
                        <Plus className="size-4" />
                      </Button>
                    }
                    label="Quantity"
                    labelPlacement="outside"
                    minValue={1}
                    placeholder="Enter quantity"
                    startContent={
                      <Button isIconOnly variant="light">
                        <Minus className="size-4 cursor-pointer" />{" "}
                      </Button>
                    }
                    value={quantity}
                    onValueChange={(value) => setQuantity(value)}
                  /> */}
                  <QuantityInput
                    label="Quantity"
                    labelPlacement="outside"
                    minValue={1}
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
      ) : (
        <div className="fixed bottom-0 z-20 left-0 w-full">
          <Card classNames={{ base: "!rounded-b-none" }} shadow="sm">
            <CardBody>
              <div>
                <div className="flex gap-3 items-center justify-between">
                  <div>
                    <p className="font-bold text-xl">{destination.title}</p>
                    <p>
                      {destination.city}, {destination.province}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {destination.price_discount && (
                      <p className="line-through text-sm">
                        {formatRupiah(destination.price)}
                      </p>
                    )}
                    <p className="font-semibold text-red-600 text-lg">
                      {formatRupiah(
                        destination.price_discount || destination.price
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-3 items-stretch">
                  <div className="flex-shrink-0 w-[160px]">
                    <QuantityInput
                      height=""
                      minValue={1}
                      size="sm"
                      value={quantity}
                      onValueChange={(value) => setQuantity(value)}
                    />
                  </div>
                  <div className="flex-grow">
                    <Button
                      disableRipple
                      fullWidth
                      className="h-full"
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
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default DestinationDetailCartAction;
