"use client";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

import CategoryCard from "../../categories/CategoryCard";

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
          aria-label="previous category"
          className="left-0  absolute z-20 top-1/2 -translate-y-1/2"
          name="previous category"
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
          aria-label="next category"
          className="right-0  absolute z-20 top-1/2 -translate-y-1/2"
          name="next category"
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
        {categories.slice(0, 8).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            className="w-[200px] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryListClient;
