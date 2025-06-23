import React from "react";
import Image from "next/image";

import CategorySearchInput from "./CategorySearchInput";

import categoryCover from "@/src/assets/images/category-cover-1.webp";
import Breadcrumb from "@/components/Breadcrumb";

const CategoriesHeader = () => {
  return (
    <>
      <Image
        fill
        priority
        alt="home-cover"
        blurDataURL={categoryCover.blurDataURL}
        className="object-cover absolute inset-0 object-[0%_45%]"
        placeholder="blur"
        src={categoryCover}
      />
      <div className="relative z-10 h-full px-4 flex flex-col">
        <div className="mx-auto container mt-4">
          <Breadcrumb includeHome variant="solid" />
        </div>
        <div className="container mx-auto flex flex-col justify-center flex-grow">
          <h1
            className="text-white font-bold text-3xl md:text-4xl lg:text-5xl"
            style={{ textShadow: "2px 5px 4px rgba(0,0,0,0.25)" }}
          >
            Discover Destinations by Category
          </h1>
          <div className="w-full md:max-w-md">
            <CategorySearchInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesHeader;
