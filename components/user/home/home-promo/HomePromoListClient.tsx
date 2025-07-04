"use client";

import { Button } from "@heroui/button";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PromoCard from "../../promos/PromoCard";

import { Promo } from "@/types/promo.type";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";

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
          aria-label="previous promo"
          className="left-0  absolute z-20 top-1/2 -translate-y-1/2"
          name="previous promo"
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
          aria-label="next promo"
          className="right-0  absolute z-20 top-1/2 -translate-y-1/2"
          name="next promo"
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
          <PromoCard
            key={promo.id}
            className=" flex-shrink-0 w-[320px] relative"
            promo={promo}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePromoListClient;
