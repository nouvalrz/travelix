import React from "react";

import BannersClient from "./BannersClient";

import { BASE_URL } from "@/config/credentials";
import { Banner } from "@/types/banner.type";

const BannersWrapper = async () => {
  const response = await fetch(BASE_URL! + "/api/proxy/banners", {
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
