"use client";
import React from "react";

import PromoCard from "./PromoCard";

import { Promo } from "@/types/promo.type";
import { usePromosStore } from "@/lib/store/usePromosStore";

const PromoListClient = ({ promos }: { promos: Promo[] }) => {
  const { searchKeyword } = usePromosStore();

  const filteredPromos = promos.filter((promo) =>
    promo.title.toLowerCase().includes(searchKeyword.toLowerCase().trim())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPromos.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  );
};

export default PromoListClient;
