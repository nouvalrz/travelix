"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

import CategoryCard from "./CategoryCard";

import { Category } from "@/types/category.type";
import { useCategoriesStore } from "@/lib/store/useCategoriesStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const CategoryListClient = ({ categories }: { categories: Category[] }) => {
  const { searchKeyword } = useCategoriesStore();
  const dataPerPage = 9;
  const [page, setPage] = useState<number>(1);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredCategories.length / dataPerPage);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const visibleCategories = filteredCategories.slice(0, page * dataPerPage);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  return (
    <>
      {filteredCategories.length > 0 ? (
        <div className="py-12">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {visibleCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {page < totalPages && (
            <div className="mt-8 flex justify-center">
              <Button color="primary" variant="flat" onPress={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
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
