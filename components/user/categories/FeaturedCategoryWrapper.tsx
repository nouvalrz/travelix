import FeaturedCategoryClient from "./FeaturedCategoryClient";

import { BASE_URL } from "@/config/credentials";
import { Destination } from "@/types/destination.type";

const FeaturedCategoryWrapper = async () => {
  const response = await fetch(BASE_URL + "/api/proxy/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const destinations = (await response.json()).data as Destination[];

  // create group based on category
  const groupedByCategory: Record<string, Destination[]> = {};

  for (const destination of destinations) {
    const categoryId = destination.category?.id;

    if (!categoryId) continue;

    if (!groupedByCategory[categoryId]) {
      groupedByCategory[categoryId] = [];
    }

    groupedByCategory[categoryId].push(destination);
  }

  // sort by destination length and limit 3
  const sortedByLengthDesc = Object.entries(groupedByCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  return <FeaturedCategoryClient featuredCategories={sortedByLengthDesc} />;
};

export default FeaturedCategoryWrapper;
