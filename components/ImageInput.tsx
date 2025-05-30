"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import { ImageIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";

type ImageInputFieldType = {
  label: string;
  image?: File | null;
  errorMessage?: string;
  previewClassName?: string;
  onClick: () => void;
};

export const ImageInputField: React.FC<ImageInputFieldType> = ({
  label,
  errorMessage,
  image,
  previewClassName,
  onClick,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onClick}>
      <p className="text-sm text-primary-900 mb-2">{label}</p>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="profile-preview"
          className={clsx("w-32 h-32 rounded-full", previewClassName)}
          src={URL.createObjectURL(image)}
        />
      ) : (
        <div
          className={clsx(
            "w-32 h-32 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer",
            previewClassName
          )}
        >
          <p className="text-xs text-gray-600">Upload Image</p>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

type ImageInputPickerType = {
  modalTitle: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onResult: (file: File) => void;
};

export const ImageInputPicker: React.FC<ImageInputPickerType> = ({
  modalTitle,
  isOpen,
  onOpenChange,
  onResult,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const uploadImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);

      onResult(croppedImageFile);
    } catch (e) {
      if (e instanceof Error) {
        addToast({ color: "warning", description: e.message });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalTitle}
            </ModalHeader>
            <ModalBody>
              {imageSrc && (
                <div className="relative w-[400px] h-[400px]">
                  <Cropper
                    aspect={1}
                    crop={crop}
                    image={imageSrc}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
              )}

              <input
                ref={inputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />

              <Button
                disableRipple
                className="mx-auto"
                color="default"
                startContent={<ImageIcon className="size-5" />}
                onClick={uploadImage}
              >
                Choose File
              </Button>
              {/* {imageSrc && (
                <button onClick={getCroppedImage}>Crop & Preview</button>
              )} */}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={async () => {
                  await getCroppedImage();
                  onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const getCroppedImg = (imageSrc: string, crop: Area): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));

        return;
      }

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));

          return;
        }
        resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    };

    image.onerror = () => reject(new Error("Failed to load image"));
  });
};
