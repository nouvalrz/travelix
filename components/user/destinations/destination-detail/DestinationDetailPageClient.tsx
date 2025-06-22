"use client";

import { Image } from "@heroui/image";
import { Pin, Star } from "lucide-react";
import { Chip } from "@heroui/chip";
import DOMPurify from "isomorphic-dompurify";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

import LocationMap from "./LocationMap";
import DestinationDetailCartAction from "./DestinationDetailCartAction";

import Breadcrumb from "@/components/Breadcrumb";
import { Destination } from "@/types/destination.type";
import { useScrollObserver } from "@/lib/hooks/useScrollObserver";

const DestinationDetailPageClient = ({
  destination,
}: {
  destination: Destination;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleOutView = useScrollObserver(titleRef, -70);

  return (
    <div className="py-4 px-4">
      <div className="container mx-auto">
        <Breadcrumb includeHome uuidReplaceName={destination.title} />
        <div className="grid grid-cols-4 grid-rows-3 lg:grid-rows-2 gap-4 w-full h-[300px] mt-4 ">
          {/* Big left box */}
          <Image
            isBlurred
            classNames={{
              wrapper:
                "bg-no-repeat bg-cover bg-center col-span-4 lg:col-span-2 row-span-2 lg:row-span-2 !max-w-none",
              img: "w-full h-full object-cover",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            radius="lg"
            shadow="sm"
            src={destination.imageUrls[0]}
          />

          <Image
            isBlurred
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center   !max-w-none",
              img: "w-full h-full object-cover",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            radius="lg"
            shadow="sm"
            src={destination.imageUrls[1]}
          />

          <Image
            isBlurred
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center   !max-w-none",
              img: "w-full h-full object-cover",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            radius="lg"
            shadow="sm"
            src={destination.imageUrls[2]}
          />

          <Image
            isBlurred
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center   !max-w-none",
              img: "w-full h-full object-cover",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            radius="lg"
            shadow="sm"
            src={destination.imageUrls[3]}
          />

          <Image
            isBlurred
            classNames={{
              wrapper: "bg-no-repeat bg-cover bg-center   !max-w-none",
              img: "w-full h-full object-cover",
            }}
            fallbackSrc="/images/fallback-image.jpg"
            radius="lg"
            shadow="sm"
            src={destination.imageUrls[4]}
          />
        </div>
        <div className="my-12 flex gap-0 lg:gap-8 items-start">
          <div className="flex-grow">
            <Chip color="primary">{destination.category?.name}</Chip>
            <h1 ref={titleRef} className="capitalize text-3xl font-bold mt-2">
              {destination.title}
            </h1>
            <div className="flex gap-5 items-center ">
              <div className="flex gap-2 mt-3 items-center">
                <Pin className="text-gray-600 size-5" />
                <p>
                  {destination.city}, {destination.province}
                </p>
              </div>
              <div className="mt-3 flex gap-1 items-center">
                <Star className=" size-5" color="#facc15" fill="#facc15" />
                <p>{destination.rating}</p>
                <p className="text-sm">
                  ({destination.total_reviews || 0} review)
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-12 mt-8">
              <div>
                <hr className=" border-black/10 mb-6" />
                <h2 className="text-2xl font-bold">Destination Overview</h2>
                <p className="mt-4">{destination.description}</p>
              </div>
              <div>
                <hr className=" border-black/10 mb-6" />
                <h2 className="text-2xl font-bold">Facilities</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(destination.facilities),
                  }}
                  className="mt-4 prose"
                />
              </div>
              <div>
                <hr className=" border-black/10 mb-6" />
                <h2 className="text-2xl font-bold">Location</h2>
                <LocationMap maps={destination.location_maps} />
              </div>
            </div>
          </div>
          <div
            className={clsx("max-w-[400px] w-0 lg:w-full flex-shrink-0", {
              "lg:sticky top-24": !isMobile,
            })}
          >
            <DestinationDetailCartAction
              destination={destination}
              headerShown={isTitleOutView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPageClient;
