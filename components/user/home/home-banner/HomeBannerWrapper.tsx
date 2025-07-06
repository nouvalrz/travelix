import HomeBannerSliderClient from "./HomeBannerSliderClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Banner } from "@/types/banner.type";

const HomeBannerWrapper = async () => {
  const response = await fetchApiFromServer("/banners", {
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
