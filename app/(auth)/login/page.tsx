import Image from "next/image";
import { Suspense } from "react";

import LoginForm from "@/components/auth/LoginForm";
import { TravelixLogoHorizontal } from "@/components/icons";
import loginCover from "@/src/assets/images/auth-cover-1.webp";

const LoginPage = () => {
  return (
    <div className="h-screen w-full p-4 relative overflow-clip">
      {/* Background */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          fill
          priority
          alt="auth-cover"
          blurDataURL={loginCover.blurDataURL}
          className="object-cover object-left-bottom lg:object-left bg-gradient-to-r from-transparent via-transparent to-white"
          placeholder="blur"
          src={loginCover}
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-white/95 to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-end container mx-auto">
        <div className="w-full lg:max-w-lg flex flex-col gap-8">
          <TravelixLogoHorizontal className="mx-auto" width={160} />
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
