import { Suspense } from "react";

import CategoriesHeader from "@/components/user/categories/CategoriesHeader";
import CategoryListPlaceholder from "@/components/user/categories/CategoryListPlaceholder";
import CategoryListWrapper from "@/components/user/categories/CategoryListWrapper";
import FeaturedCategoryWrapper from "@/components/user/categories/FeaturedCategoryWrapper";
import FeaturedCategoryPlaceholder from "@/components/user/categories/FeaturedCategoryPlaceholder";

export const metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return (
    <>
      <section className="flex flex-col" id="jumbotron">
        <div className="h-[300px] w-full relative">
          <CategoriesHeader />
        </div>
      </section>
      <section className="px-4">
        <div className="mx-auto container">
          <Suspense fallback={<CategoryListPlaceholder />}>
            <CategoryListWrapper />
          </Suspense>
        </div>
      </section>
      <section className="px-4 mb-12">
        <Suspense fallback={<FeaturedCategoryPlaceholder />}>
          <FeaturedCategoryWrapper />
        </Suspense>
      </section>
    </>
  );
};

export default CategoriesPage;
