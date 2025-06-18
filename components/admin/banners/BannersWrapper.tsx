import React from "react";

import BannersClient from "./BannersClient";

import { Banner } from "@/types/banner.type";
import { fetchApiFromServer } from "@/lib/fetchApi";

const BannersWrapper = async () => {
  const response = await fetchApiFromServer("/banners", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const banners = (await response.json()).data as Banner[];

  return <BannersClient banners={banners} />;
};

export default BannersWrapper;
