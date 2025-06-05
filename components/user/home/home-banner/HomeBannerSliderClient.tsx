"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Image } from "@heroui/image";

import { Banner } from "@/types/banner.type";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeBannerSliderClient = ({ banners }: { banners: Banner[] }) => {
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      className="w-full rounded-xl overflow-clip"
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      navigation={true}
      pagination={{ clickable: true }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner.id} className="relative ">
          <div className="absolute bottom-8 left-5 z-30">
            <p
              className="text-white text-2xl font-bold capitalize"
              style={{ textShadow: "2px 5px 4px rgba(0,0,0,0.25)" }}
            >
              {banner.name}
            </p>
          </div>
          <div className="bg-gradient-to-t from-black/50 via-black/20 to-transparent absolute inset-0 w-full h-full z-20 rounded-xl" />
          <Image
            alt={"banner-" + index}
            className="h-[280px] md:h-[400px] object-cover"
            classNames={{ wrapper: "bg-no-repeat bg-cover bg-center" }}
            fallbackSrc="/images/fallback-image.jpg"
            src={banner.imageUrl}
            width="100%"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeBannerSliderClient;
