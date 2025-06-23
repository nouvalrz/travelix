import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import { ShoppingCart, TicketCheck } from "lucide-react";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

import { Cart } from "@/types/cart.type";
import { formatRupiah } from "@/lib/formatRupiah";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const CartsPopover = ({ carts }: { carts: Cart[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const totalPrice = carts.reduce(
    (acc, cart) =>
      acc +
      cart.quantity * (cart.activity.price_discount ?? cart.activity.price),
    0
  );

  return (
    <Popover
      classNames={{
        base: "p-0 ",
        content: "p-0 overflow-clip max-w-[420px] !w-full",
      }}
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={toggleOpen}
    >
      <PopoverTrigger>
        <Button isIconOnly variant="light" onPress={toggleOpen}>
          <ShoppingCart className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" flex flex-col w-full h-full max-h-[500px]">
          <div className="p-3  border-0 border-b-1 border-gray-200">
            <p className="font-semibold">Carts ({carts.length})</p>
          </div>
          {carts.length > 0 ? (
            <div className="flex-1 overflow-y-scroll px-3 flex flex-col gap-3 py-3">
              {carts.map((cart) => (
                <div
                  key={cart.id}
                  className="flex justify-between items-start gap-4"
                >
                  <div className="flex gap-3 items-start">
                    <Image
                      alt={cart.activity.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      classNames={{
                        wrapper: "bg-no-repeat bg-cover bg-center",
                      }}
                      fallbackSrc="/images/fallback-image.jpg"
                      src={cart.activity.imageUrls[0]}
                    />
                    <div>
                      <p className="font-medium line-clamp-1">
                        {cart.activity.title}
                      </p>
                      <p className="line-clamp-1">
                        {cart.activity.city}, {cart.activity.province}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end">
                    <p className="font-medium">
                      {cart.quantity} x{" "}
                      {formatRupiah(
                        cart.activity.price_discount || cart.activity.price
                      )}
                    </p>
                    {cart.activity.price_discount && (
                      <p className="line-through text-xs font-light">
                        {formatRupiah(cart.activity.price)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex justify-center items-center my-8 w-[380px] ">
              <EmptyPlaceholder
                description="Go to explore our destinations"
                imageClassName="!w-32"
                title="Cart is still empty"
              />
            </div>
          )}
          <div className="p-3  border-0 border-t-1 border-gray-200 flex justify-between items-center">
            <div>
              <p>Total</p>
              <p className="font-semibold">{formatRupiah(totalPrice)}</p>
            </div>
            <Button
              color="primary"
              startContent={<TicketCheck className="size-5" />}
              onPress={() => {
                toggleOpen();
                router.push("/carts");
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CartsPopover;
