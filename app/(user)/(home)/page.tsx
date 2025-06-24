import Image from "next/image";
import { Suspense } from "react";

import Explorer from "@/components/user/home/Explorer";
import HomeCategoryWrapper from "@/components/user/home/home-category/HomeCategoryWrapper";
import HomeBannerWrapper from "@/components/user/home/home-banner/HomeBannerWrapper";
import HomePopularDestinationWrapper from "@/components/user/home/home-popular-destination/HomePopularDestinationWrapper";
import HomePromoWrapper from "@/components/user/home/home-promo/HomePromoWrapper";
import HomeReviewWrapper from "@/components/user/home/home-reviews/HomeReviewWrapper";
import HomeFaqWrapper from "@/components/user/home/home-faq/HomeFaqWrapper";
import HomeBannerPlaceholder from "@/components/user/home/home-banner/HomeBannerPlaceholder";
import homeCover from "@/src/assets/images/home-cover-3.webp";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <section className="flex flex-col" id="jumbotron">
        <div className="h-[600px] md:h-[500px] w-full relative">
          <Image
            fill
            priority
            alt="home-cover"
            blurDataURL={homeCover.blurDataURL}
            className="object-cover absolute inset-0 object-[0%_45%]"
            placeholder="blur"
            src={homeCover}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
            <h1
              className="text-white font-bold text-3xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "2px 5px 4px rgba(0,0,0,0.25)" }}
            >
              Explore The World Around You
            </h1>
            <p
              className="text-white font-medium text-lg mt-4"
              style={{ textShadow: "2px 5px 4px rgba(0,0,0,0.25)" }}
            >
              Take a break from your stress of everyday life
            </p>
            <Explorer />
          </div>
        </div>
      </section>
      <section>
        <Suspense fallback={<HomeBannerPlaceholder />}>
          <HomeBannerWrapper />
        </Suspense>
      </section>
      <section>
        <HomeCategoryWrapper />
      </section>
      <section>
        <HomePopularDestinationWrapper />
      </section>
      <section>
        <HomePromoWrapper />
      </section>
      <section>
        <HomeReviewWrapper />
      </section>
      <section>
        <HomeFaqWrapper />
      </section>
    </>
  );
}
