"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { MapPin, Star } from "lucide-react";

import { Destination } from "@/types/destination.type";
import { formatRupiah } from "@/lib/formatRupiah";

const HomePopularDestinationListClient = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
        {destinations.slice(0, 10).map((destination) => (
          <Card
            key={destination.id}
            disableRipple
            isPressable
            // className=" flex-shrink-0 w-[380px]"
            shadow="sm"
          >
            <CardBody>
              <Image
                isZoomed
                alt={destination.title}
                className="w-full h-[200px] object-cover"
                classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
                fallbackSrc="/images/fallback-image.jpg"
                radius="lg"
                shadow="sm"
                src={destination.imageUrls[0]}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between flex flex-col items-start">
              <div className="flex justify-between w-full">
                <p className="font-medium capitalize">{destination.title}</p>
                <div className="flex gap-1 items-center">
                  <Star className="text-yellow-400 size-5" fill="#facc15" />
                  <p className="font-medium">{destination.rating}</p>
                  {destination.total_reviews && (
                    <p className="text-xs text-gray-600">
                      ({destination.total_reviews})
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-1 mt-1">
                <MapPin className="size-5 text-gray-600" />
                <p>
                  {[destination.city, destination.province]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
              <div className="flex justify-between w-full mt-3">
                <div className="flex flex-col items-start">
                  {destination.price && (
                    <p className="line-through text-xs text-gray-600">
                      {formatRupiah(destination.price)}
                    </p>
                  )}
                  <p className="text-base font-bold text-red-600">
                    {destination.price_discount
                      ? formatRupiah(destination.price_discount)
                      : formatRupiah(destination.price)}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePopularDestinationListClient;
