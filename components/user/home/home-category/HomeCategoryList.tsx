import HomeCategoryListClient from "./HomeCategoryListClient";

import { BASE_URL } from "@/config/credentials";
import { Category } from "@/types/category.type";

const HomeCategoryList = async () => {
  const response = await fetch(BASE_URL! + "/api/proxy/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const categories = (await response.json()).data as Category[];

  return <HomeCategoryListClient categories={categories} />;
};

export default HomeCategoryList;
