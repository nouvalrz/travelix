import { useState } from "react";
import { Area } from "react-easy-crop/types";

export const useImageInput = () => {
  const [imageSource, setImageSource] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageResult, setImageResult] = useState<File | null>(null);

  return {
    imageSource,
    setImageSource,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    setCroppedAreaPixels,
    imageResult,
    setImageResult,
  };
};
