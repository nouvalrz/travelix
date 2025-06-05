"use client";

import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Snippet } from "@heroui/snippet";

import { Promo } from "@/types/promo.type";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";
import { formatRupiah } from "@/lib/formatRupiah";

const HomePromoListClient = ({ promos }: { promos: Promo[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { goLeft, goRight, showLeft, showRight } = useHorizontalScroll({
    scrollElementRef: scrollRef,
    scrollDistance: 400,
  });

  return (
    <div className="relative">
      {showLeft && (
        <Button
          disableRipple
          isIconOnly
          className="left-0  absolute z-20 top-1/2 -translate-y-1/2"
          radius="full"
          onPress={goLeft}
        >
          <ChevronLeft />
        </Button>
      )}
      {showRight && (
        <Button
          disableRipple
          isIconOnly
          className="right-0  absolute z-20 top-1/2 -translate-y-1/2"
          radius="full"
          onPress={goRight}
        >
          <ChevronRight />
        </Button>
      )}
      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-8"
      >
        {promos.slice(0, 8).map((promo) => (
          <Card
            key={promo.id}
            isFooterBlurred
            className=" flex-shrink-0 w-[320px] relative"
          >
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
              <div className="mr-2">
                <p className="text-white line-clamp-1 text-sm font-medium">
                  {promo.title}
                </p>
                <p className="text-white text-xs">
                  Discount {formatRupiah(promo.promo_discount_price)}
                </p>
              </div>
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
        ))}
      </div>
    </div>
  );
};

export default HomePromoListClient;
