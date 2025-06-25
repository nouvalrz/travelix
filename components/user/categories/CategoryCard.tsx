import { Card, CardBody, CardFooter } from "@heroui/card";
import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { Category } from "@/types/category.type";
import AppImage from "@/components/AppImage";

const CategoryCard = ({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) => {
  return (
    <Card
      isPressable
      as={Link}
      className={clsx(className)}
      href={`/destinations?category=${category.id}`}
      shadow="sm"
    >
      <CardBody className="overflow-visible p-0">
        <AppImage
          isZoomed
          alt={category.name}
          classNames={{
            wrapper: "bg-no-repeat bg-cover bg-center !max-w-none",
            img: "w-full h-[140px] object-cover",
          }}
          fallbackSrc="/images/fallback-image.jpg"
          loading="lazy"
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
  );
};

export default CategoryCard;
