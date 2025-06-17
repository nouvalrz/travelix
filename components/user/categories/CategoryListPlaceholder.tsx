import React from "react";

import CategoryCardPlaceholder from "./CategoryCardPlaceholder";

const CategoryListPlaceholder = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 py-12">
      {Array.from({ length: 12 }).map((_, index) => (
        <CategoryCardPlaceholder key={index} />
      ))}
    </div>
  );
};

export default CategoryListPlaceholder;
