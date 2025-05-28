import Image from "next/image";

import { TravelixLogoHorizontal } from "@/components/icons";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="p-4 flex-1 relative">
      <div className=" h-full w-full absolute inset-0">
        <Image
          fill
          alt="auth-cover"
          className="object-cover object-left-bottom lg:object-left bg-gradient-to-r from-transparent via-transparent to-white"
          src="/images/auth-cover-1.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/95 to-white" />
      </div>
      <div className="flex container mx-auto justify-end lg:justify-between items-end lg:items-center h-full relative z-10">
        <div className="self-end hidden lg:block mb-24">
          <h1 className="text-4xl text-white font-extrabold whitespace-pre-line leading-[56px] opacity-0">
            Your Gateway to{"\n"}Unforgettable Journeys
          </h1>
        </div>
        <div className="w-full lg:max-w-lg flex flex-col gap-8">
          <TravelixLogoHorizontal className="mx-auto" width={160} />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
