import HomePromoListClient from "./HomePromoListClient";

import { BASE_URL } from "@/config/credentials";
import { Promo } from "@/types/promo.type";

const HomePromoList = async () => {
  const response = await fetch(BASE_URL + "/api/proxy/promos", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const promos = (await response.json()).data as Promo[];

  return <HomePromoListClient promos={promos} />;
};

export default HomePromoList;
