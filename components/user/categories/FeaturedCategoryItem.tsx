"use client";

import React, { useRef } from "react";
import { Button } from "@heroui/button";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import DestinationCard from "../destinations/DestinationCard";

import { Destination } from "@/types/destination.type";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";

const FeaturedCategoryItem = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { goLeft, goRight, showLeft, showRight } = useHorizontalScroll({
    scrollElementRef: scrollRef,
    scrollDistance: 400,
  });

  return (
    <div>
      <div className="flex lg:gap-6 items-start lg:items-center w-full lg:flex-row flex-col">
        <Card
          isFooterBlurred
          className="lg:h-[400px] lg:w-[300px] flex-shrink-0 h-[120px] w-full"
          shadow="sm"
        >
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
            fallbackSrc="/images/fallback-image.jpg"
            src={destinations[0].category?.imageUrl}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <p className="font-semibold text-white">
                {destinations[0].category?.name}
              </p>
            </div>
            <Button
              as={Link}
              href={`/destinations?category=${destinations[0].categoryId}`}
              radius="full"
              size="sm"
            >
              See All
            </Button>
          </CardFooter>
        </Card>

        <div className="relative flex-1 overflow-hidden w-full lg:w-auto">
          {showLeft && (
            <Button
              disableRipple
              isIconOnly
              className="left-0 absolute z-20 top-1/2 -translate-y-1/2"
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
              className="right-0 absolute z-20 top-1/2 -translate-y-1/2"
              radius="full"
              onPress={goRight}
            >
              <ChevronRight />
            </Button>
          )}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth py-8 lg:px-2 w-full scrollbar-hide"
          >
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                className="w-[340px] flex-shrink-0"
                destination={destination}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategoryItem;
