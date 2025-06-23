import React from "react";

import CategoryForm from "@/components/user/categories/CategoryForm";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Category } from "@/types/category.type";

const EditCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetchApiFromServer("/category/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const category = (await response.json()).data as Category;

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit Category : <span className="text-primary">{category.name}</span>
      </h1>
      <div className="mt-6">
        <CategoryForm category={category} submitTitle="Update Category" />
      </div>
    </div>
  );
};

export default EditCategoryPage;
