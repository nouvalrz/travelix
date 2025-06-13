import React from "react";

import FeaturedCategoryItem from "./FeaturedCategoryItem";

import { Destination } from "@/types/destination.type";

const FeaturedCategoryClient = ({
  featuredCategories,
}: {
  featuredCategories: [string, Destination[]][];
}) => {
  return (
    <div className="mx-auto container">
      <h2 className="font-bold text-3xl">Featured Categories</h2>
      <div className="flex flex-col gap-12 my-6">
        {featuredCategories.map(([categoryId, destinations]) => (
          <FeaturedCategoryItem key={categoryId} destinations={destinations} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategoryClient;
