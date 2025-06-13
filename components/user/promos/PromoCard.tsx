import { Card, CardFooter } from "@heroui/card";
import { Snippet } from "@heroui/snippet";
import React, { useState } from "react";
import { Image } from "@heroui/image";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Button } from "@heroui/button";
import DOMPurify from "isomorphic-dompurify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { Promo } from "@/types/promo.type";
import { formatRupiah } from "@/lib/formatRupiah";

const PromoCard = ({
  promo,
  className,
}: {
  promo: Promo;
  className?: string;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <Card key={promo.id} isFooterBlurred className={clsx(className)}>
        <Image
          isZoomed
          alt={promo.title}
          className="w-full h-[240px] object-cover"
          classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
          fallbackSrc="/images/fallback-image.jpg"
          radius="lg"
          shadow="sm"
          src={promo.imageUrl}
          width="100%"
        />
        <div className="bg-gradient-to-t from-black/40 via-black/10 to-transparent absolute inset-0 w-full h-full z-20 rounded-xl pointer-events-none" />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-30">
          <button
            className="mr-2 cursor-pointer flex flex-col items-start"
            onClick={toggleModal}
          >
            <div className="flex gap-1 items-center">
              <p className="text-white line-clamp-1 text-sm font-medium text-left">
                {promo.title}
              </p>
              <ChevronRight className="size-4 text-white" />
            </div>
            <p className="text-white text-xs">
              Discount {formatRupiah(promo.promo_discount_price)}
            </p>
          </button>
          <Snippet
            className="ml-auto"
            classNames={{ base: "bg-white" }}
            size="sm"
            symbol=""
          >
            {promo.promo_code}
          </Snippet>
        </CardFooter>
      </Card>
      <Modal isOpen={modalOpen} onOpenChange={toggleModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {promo.title}
              </ModalHeader>
              <ModalBody>
                <Image
                  alt={promo.title}
                  className="h-[200px] object-cover"
                  classNames={{
                    wrapper: "bg-no-repeat bg-cover bg-center",
                  }}
                  fallbackSrc="/images/fallback-image.jpg"
                  src={promo.imageUrl}
                  width="100%"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="font-semibold">Promo Code</p>
                    <Snippet
                      className="ml-auto w-full mt-1"
                      color="primary"
                      symbol=""
                    >
                      {promo.promo_code}
                    </Snippet>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="font-semibold">Discount</p>
                      <p className="text-sm">
                        {formatRupiah(promo.promo_discount_price)}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Purchase Minimum</p>
                      <p className="text-sm">
                        {formatRupiah(promo.minimum_claim_price)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Description</p>
                    <p className="text-sm">{promo.description}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Terms & Conditions</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(promo.terms_condition),
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PromoCard;
