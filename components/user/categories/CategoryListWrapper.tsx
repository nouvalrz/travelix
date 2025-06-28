import CategoryListClient from "./CategoryListClient";

import { BASE_URL } from "@/config/credentials";
import { Category } from "@/types/category.type";

const CategoryListWrapper = async () => {
  const response = await fetch(BASE_URL! + "/api/proxy/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 5,
    },
  });

  const categories = (await response.json()).data as Category[];
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return <CategoryListClient categories={sortedCategories} />;
};

export default CategoryListWrapper;
