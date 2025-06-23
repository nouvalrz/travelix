import React from "react";
import Image from "next/image";

import PromoSearchInput from "./PromoSearchInput";

import promoCover from "@/src/assets/images/promo-cover-1.webp";
import Breadcrumb from "@/components/Breadcrumb";

const PromosHeader = () => {
  return (
    <>
      <Image
        fill
        priority
        alt="home-cover"
        blurDataURL={promoCover.blurDataURL}
        className="object-cover absolute inset-0 object-[0%_60%]"
        placeholder="blur"
        src={promoCover}
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
            Latest Promos & Offers
          </h1>
          <div className="w-full md:max-w-md">
            <PromoSearchInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default PromosHeader;
