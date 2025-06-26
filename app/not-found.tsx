"use client";

import React from "react";
import { Button } from "@heroui/button";
import Link from "next/link";

import { TravelixLogoHorizontal } from "@/components/icons";

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <TravelixLogoHorizontal width={100} />
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="empty" className={"w-60 h-auto"} src="/svg/not-found.svg" />
      </div>
      <h2 className="font-semibold text-xl">Page Not Found</h2>
      <Button as={Link} className="mt-2" color="primary" href="/">
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
