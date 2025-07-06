import CategoryListClient from "./CategoryListClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Category } from "@/types/category.type";

const CategoryListWrapper = async () => {
  const response = await fetchApiFromServer("/categories", {
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
