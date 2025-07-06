import PromoListClient from "./PromoListClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Promo } from "@/types/promo.type";

const PromoListWrapper = async () => {
  const response = await fetchApiFromServer("/promos", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 60 * 5,
    },
  });

  const promos = (await response.json()).data as Promo[];

  return <PromoListClient promos={promos} />;
};

export default PromoListWrapper;
