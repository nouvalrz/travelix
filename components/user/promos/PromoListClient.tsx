"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";

import PromoCard from "./PromoCard";

import { Promo } from "@/types/promo.type";
import { usePromosStore } from "@/lib/store/usePromosStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

const PromoListClient = ({ promos }: { promos: Promo[] }) => {
  const { searchKeyword } = usePromosStore();

  const dataPerPage = 9;
  const [page, setPage] = useState<number>(1);

  const filteredPromos = promos.filter((promo) =>
    promo.title.toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredPromos.length / dataPerPage);

  const visiblePromos = filteredPromos.slice(0, page * dataPerPage);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  return (
    <>
      {filteredPromos.length > 0 ? (
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePromos.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
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

export default PromoListClient;
