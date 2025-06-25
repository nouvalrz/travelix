"use client";

import { Image, ImageProps } from "@heroui/image";
import React, { useState } from "react";

const AppImage = (props: ImageProps) => {
  const baseFallbackUrl = "/images/fallback-image.jpg";
  const [error, setError] = useState<boolean>(false);
  const src = !props.src ? "error" : props.src;

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {!error ? (
        <Image
          {...props}
          fallbackSrc={undefined}
          src={src}
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
