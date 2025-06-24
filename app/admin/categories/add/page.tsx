import React from "react";

import CategoryForm from "@/components/user/categories/CategoryForm";

export const metadata = {
  title: "Add Category",
};

const AddCategoryPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Add New Category</h1>
      <div className="mt-6">
        <CategoryForm submitTitle="Add Category" />
      </div>
    </div>
  );
};

export default AddCategoryPage;
