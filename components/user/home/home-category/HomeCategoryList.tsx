import HomeCategoryListClient from "./HomeCategoryListClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Category } from "@/types/category.type";

const HomeCategoryList = async () => {
  const response = await fetchApiFromServer("/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const categories = (await response.json()).data as Category[];

  return <HomeCategoryListClient categories={categories} />;
};

export default HomeCategoryList;
