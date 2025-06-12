import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

import CartsDropdownItem from "./CartsDropdownItem";

import { Cart } from "@/types/cart.type";

const CartsDropdown = ({ carts }: { carts: Cart[] }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <ShoppingCart className="size-6" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="max-w-md max-h-[500px] overflow-y-scroll"
        items={carts}
        title="Your Cart"
        variant="light"
      >
        <DropdownSection
          classNames={{ heading: "text-sm text-primary-900 " }}
          title="Your Cart"
        >
          {carts.map((cart) => (
            <DropdownItem key={cart.id} isReadOnly className="!my-2">
              <CartsDropdownItem cart={cart} />
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownItem key="cart-action" isReadOnly>
          <Link href="/carts">
            <Button className="!ml-auto" color="primary">
              See All
            </Button>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartsDropdown;
