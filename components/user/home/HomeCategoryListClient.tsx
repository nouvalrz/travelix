"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "@heroui/image";

import { Category } from "@/types/category.type";

const HomeCategoryListClient = ({ categories }: { categories: Category[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(true);

  const goLeft = () => {
    scrollRef.current?.scrollBy({ left: -210, behavior: "smooth" });
  };

  const goRight = () => {
    scrollRef.current?.scrollBy({ left: 210, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (!scrollRef.current) {
      return;
    }

    setShowLeft(scrollRef.current.scrollLeft > 0);
    setShowRight(
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
        scrollRef.current.scrollWidth
    );
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    checkScroll();

    const handleScroll = () => {
      checkScroll();
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        className="flex flex-row gap-4 overflow-x-auto justify-start scrollbar-hide scroll-smooth overflow-visible py-8"
      >
        {categories.slice(1, 9).map((category, index) => (
          <Card
            key={index}
            disableRipple
            isPressable
            className="w-[200px] flex-shrink-0"
            shadow="sm"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                isZoomed
                alt={category.name}
                className="w-full object-cover h-[140px]"
                classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                fallbackSrc="/images/fallback-image.jpg"
                radius="lg"
                shadow="sm"
                src={category.imageUrl}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="font-medium capitalize">{category.name}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryListClient;
