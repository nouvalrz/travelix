"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { Image } from "@heroui/image";

import { Category } from "@/types/category.type";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";

const HomeCategoryListClient = ({ categories }: { categories: Category[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { goLeft, goRight, showLeft, showRight } = useHorizontalScroll({
    scrollElementRef: scrollRef,
    scrollDistance: 210,
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
        className="flex flex-row gap-4 overflow-x-auto justify-start scrollbar-hide scroll-smooth overflow-visible py-8"
      >
        {categories.slice(0, 8).map((category, index) => (
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
