import React from "react";

import CategoriesClient from "./CategoriesClient";

import { Category } from "@/types/category.type";
import { fetchApiFromServer } from "@/lib/fetchApi";

const CategoriesWrapper = async () => {
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

  return <CategoriesClient categories={categories} />;
};

export default CategoriesWrapper;
