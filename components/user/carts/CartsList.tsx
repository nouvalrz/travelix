import { Card, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import React, { useCallback } from "react";
import debounce from "lodash.debounce";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@heroui/button";

import { useCreateTransactionStore } from "@/lib/store/useCreateTransactionStore";
import { formatRupiah } from "@/lib/formatRupiah";
import QuantityInput from "@/components/QuantityInput";
import AppImage from "@/components/AppImage";

const CartsList = () => {
  const {
    isAllSelected,
    toggleAllCartsAsSelected,
    carts,
    toggleCartSelected,
    updateCartQuantity,
    deleteCart,
  } = useCreateTransactionStore();

  const debounceUpdateQuantity = useCallback(
    debounce((id: string, newQuantity: number) => {
      updateCartQuantity(id, newQuantity);
    }, 500),
    []
  );

  const handleUpdateCartQuantity = (id: string, newQuantity: number) => {
    debounceUpdateQuantity(id, newQuantity);
  };

  return (
    <div>
      <Card shadow="sm">
        <CardBody>
          <Checkbox
            isSelected={isAllSelected()}
            onChange={() => toggleAllCartsAsSelected()}
          >
            Select All
          </Checkbox>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-4 mt-6">
        {carts.map((cart) => (
          <Card key={cart.id} shadow="sm">
            <CardBody>
              <div className="flex gap-3 justify-between">
                <div className="flex gap-3 items-start">
                  <Checkbox
                    isSelected={cart.isSelected}
                    onChange={() => toggleCartSelected(cart.id)}
                  />
                  <div className="flex-shrink-0">
                    <AppImage
                      alt={cart.activity.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      classNames={{
                        wrapper: "bg-no-repeat bg-cover bg-center",
                      }}
                      fallbackSrc={`/api/fallback-image/destination?title=${encodeURIComponent(cart.activity.title)}`}
                      src={cart.activity.imageUrls[0]}
                    />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">
                      {cart.activity.title}
                    </p>
                    <p className="line-clamp-1">
                      {cart.activity.city}, {cart.activity.province}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {cart.activity.price_discount !== null && (
                    <p className="line-through text-sm text-gray-500">
                      {formatRupiah(cart.activity.price)}
                    </p>
                  )}
                  <p className="font-semibold text-sm">
                    {cart.quantity} x{" "}
                    {cart.activity.price_discount !== null
                      ? formatRupiah(cart.activity.price_discount)
                      : formatRupiah(cart.activity.price)}
                  </p>
                  <p className="mt-3 font-semibold text-red-600">
                    {formatRupiah(
                      cart.quantity *
                        (cart.activity.price_discount ?? cart.activity.price)
                    )}
                  </p>

                  <div className="flex gap-2 items-center mt-2">
                    {cart.isLoading && (
                      <Loader2 className="size-5 text-gray-500 animate-spin" />
                    )}

                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => deleteCart(cart.id)}
                    >
                      <Trash2 className="size-5 text-gray-500" />
                    </Button>

                    <div className="w-[160px]">
                      {/* <NumberInput
                        defaultValue={cart.quantity}
                        isDisabled={cart.isLoading}
                        minValue={1}
                        placeholder="Input quantity"
                        size="sm"
                        onValueChange={(value) =>
                          handleUpdateCartQuantity(cart.id, value)
                        }
                      /> */}
                      <QuantityInput
                        defaultValue={cart.quantity}
                        isDisabled={cart.isLoading}
                        minValue={1}
                        placeholder="Input quantity"
                        size="sm"
                        onValueChange={(value) =>
                          handleUpdateCartQuantity(cart.id, value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CartsList;
