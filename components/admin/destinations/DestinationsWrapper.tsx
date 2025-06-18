import React from "react";

import DestinationsClient from "./DestinationsClient";

import { Destination } from "@/types/destination.type";
import { Category } from "@/types/category.type";
import { fetchApiFromServer } from "@/lib/fetchApi";

const DestinationsWrapper = async () => {
  const destinationResponse = await fetchApiFromServer("/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const categoriesResponse = await fetchApiFromServer("/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const destinations = (await destinationResponse.json()).data as Destination[];
  const categories = (await categoriesResponse.json()).data as Category[];

  return (
    <DestinationsClient categories={categories} destinations={destinations} />
  );
};

export default DestinationsWrapper;
