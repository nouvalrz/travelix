import { Card, CardBody, CardFooter } from "@heroui/card";
import { Star, MapPin } from "lucide-react";
import { Image } from "@heroui/image";
import Link from "next/link";
import clsx from "clsx";

import { formatRupiah } from "@/lib/formatRupiah";
import { Destination } from "@/types/destination.type";

const DestinationCard = ({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) => {
  let discountPercentage: number | null = null;

  if (
    destination.price_discount &&
    destination.price > destination.price_discount
  ) {
    discountPercentage = Math.floor(
      ((destination.price - destination.price_discount) / destination.price) *
        100
    );
  }

  return (
    <Card
      key={destination.id}
      isPressable
      as={Link}
      className={clsx(className)}
      classNames={{ base: "relative w-full" }}
      href={"/destinations/" + destination.id}
      shadow="sm"
    >
      {discountPercentage && (
        <div className="bg-secondary text-gray-800 px-4 py-1 absolute top-5 right-0 z-20 rounded-l-full">
          <p className="text-sm font-semibold">{discountPercentage}% OFF</p>
        </div>
      )}
      <CardBody>
        <Image
          isZoomed
          alt={destination.title}
          className="w-full h-[200px] object-cover"
          classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
          fallbackSrc="/images/fallback-image.jpg"
          radius="lg"
          shadow="sm"
          src={destination.imageUrls.find(Boolean)}
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
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <p className="text-base font-bold text-red-600">
              {destination.price_discount !== null
                ? formatRupiah(destination.price_discount)
                : formatRupiah(destination.price)}
            </p>
            {destination.price_discount !== null && (
              <p className="line-through text-xs text-gray-600">
                {formatRupiah(destination.price)}
              </p>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
