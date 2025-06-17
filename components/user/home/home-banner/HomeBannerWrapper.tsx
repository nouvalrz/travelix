import HomeBannerSliderClient from "./HomeBannerSliderClient";

import { BASE_URL } from "@/config/credentials";
import { Banner } from "@/types/banner.type";

const HomeBannerWrapper = async () => {
  const response = await fetch(BASE_URL! + "/api/proxy/banners", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 60 * 5,
    },
  });

  const banners = (await response.json()).data as Banner[];

  return (
    <div className="px-4 py-12">
      <div className="container mx-auto">
        <HomeBannerSliderClient banners={banners} />
      </div>
    </div>
  );
};

export default HomeBannerWrapper;
