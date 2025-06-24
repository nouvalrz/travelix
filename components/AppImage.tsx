"use client";

import { Image, ImageProps } from "@heroui/image";
import React, { useState } from "react";

const AppImage = (props: ImageProps) => {
  const baseFallbackUrl = "/images/fallback-image.jpg";
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {!error ? (
        <Image
          {...props}
          fallbackSrc={undefined}
          src={props.src!}
          onError={handleError}
        />
      ) : (
        <Image
          {...props}
          fallbackSrc={undefined}
          src={props.fallbackSrc?.toString() ?? baseFallbackUrl}
        />
      )}
    </>
  );
};

export default AppImage;
