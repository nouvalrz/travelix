"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/modal";
import Link from "next/link";

import CartsModalItem from "./CartsModalItem";

import { useCartsStore } from "@/lib/store/useCartsStore";

const CartsModal = (props: Omit<ModalProps, "children">) => {
  const { cartsModalOpen, setCartsModalOpen, isLoading, carts } =
    useCartsStore();

  return (
    <Modal
      isOpen={cartsModalOpen}
      size="xl"
      onOpenChange={setCartsModalOpen}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Carts</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                {carts.map((cart, index) => (
                  <CartsModalItem key={index} cart={cart} />
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Link href="/carts">
                <Button color="primary" onPress={onClose}>
                  See All
                </Button>
              </Link>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CartsModal;
