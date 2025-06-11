"use client";

import { Image } from "@heroui/image";
import { Pin, Star } from "lucide-react";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import DOMPurify from "isomorphic-dompurify";

import Breadcrumb from "@/components/Breadcrumb";
import { Destination } from "@/types/destination.type";

const DestinationDetailPageClient = ({
  destination,
}: {
  destination: Destination;
}) => {
  return (
    <div className="py-4 px-4">
      <div className="container mx-auto">
        <Breadcrumb includeHome uuidReplaceName={destination.title} />
        <div className="grid grid-cols-4 grid-rows-2 gap-4 w-full h-[300px] mt-4 ">
          {/* Big left box */}
          {/* <div className="col-span-2 row-span-2 bg-red-600">s</div> */}
          <Image
            isBlurred
            classNames={{
              wrapper:
                "bg-no-repeat bg-cover bg-center  col-span-2 row-span-2 !max-w-none",
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
        <div className="mt-12 flex gap-8 ">
          <div className="flex-grow">
            <Chip color="primary">{destination.category?.name}</Chip>
            <h1 className="capitalize text-3xl font-bold mt-2">
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
            <hr className=" border-black/10 my-6" />
            <div className="flex flex-col gap-12">
              <div>
                <h2 className="text-2xl font-bold">Destination Overview</h2>
                <p className="mt-4">{destination.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Facilities</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(destination.facilities),
                  }}
                  className="mt-4"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Location</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: destination.location_maps,
                  }}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          <div className="w-[600px]">
            <Card shadow="sm">
              <CardBody />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPageClient;
