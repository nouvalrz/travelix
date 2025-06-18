import React from "react";

import CategoriesClient from "./CategoriesClient";

import { BASE_URL } from "@/config/credentials";
import { Category } from "@/types/category.type";

const CategoriesWrapper = async () => {
  const response = await fetch(BASE_URL! + "/api/proxy/categories", {
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
