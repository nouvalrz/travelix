import Image from "next/image";

import Explorer from "@/components/user/home/Explorer";

export default function Home() {
  return (
    <section className="flex flex-col">
      <div className="h-[600px] md:h-[500px] w-full relative">
        <Image
          fill
          alt="home-cover"
          className="object-cover absolute inset-0 object-[0%_45%]"
          src="/images/home-cover-3.webp"
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
  );
}
