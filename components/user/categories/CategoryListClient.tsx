"use client";

import CategoryCard from "./CategoryCard";

import { Category } from "@/types/category.type";
import { useCategoriesStore } from "@/lib/store/useCategoriesStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const CategoryListClient = ({ categories }: { categories: Category[] }) => {
  const { searchKeyword } = useCategoriesStore();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );

  return (
    <>
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 py-12">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-[480px] justify-center items-center">
          <EmptyPlaceholder />
        </div>
      )}
    </>
  );
};

export default CategoryListClient;
