import Image from "next/image";

import { TravelixLogoHorizontal } from "@/components/icons";
import RegisterForm from "@/components/auth/RegisterForm";
import registerCover from "@/src/assets/images/auth-cover-3.webp";

const RegsiterPage = () => {
  return (
    <div className="p-4 flex-1 relative">
      <div className=" h-full w-full absolute inset-0">
        <Image
          fill
          priority
          alt="auth-cover"
          blurDataURL={registerCover.blurDataURL}
          className="object-cover object-top scale-x-[-1] lg:object-left bg-gradient-to-r from-transparent via-transparent to-white"
          placeholder="blur"
          src="/images/auth-cover-3.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/95 to-white" />
      </div>
      <div className="flex container mx-auto justify-end items-end lg:items-center h-full relative z-10">
        <div className="w-full lg:max-w-lg flex flex-col gap-8">
          <TravelixLogoHorizontal className="mx-auto" width={160} />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegsiterPage;
