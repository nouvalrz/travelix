import React from "react";

import PromosClient from "./PromosClient";

import { Promo } from "@/types/promo.type";
import { fetchApiFromServer } from "@/lib/fetchApi";

const PromosWrapper = async () => {
  const response = await fetchApiFromServer("/promos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const promos = (await response.json()).data as Promo[];

  return <PromosClient promos={promos} />;
};

export default PromosWrapper;
