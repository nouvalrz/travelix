// "use client";

// import { Button } from "@heroui/button";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
// } from "@heroui/modal";
// import { addToast } from "@heroui/toast";
// import clsx from "clsx";
// import { ImageIcon } from "lucide-react";
// import { useCallback, useRef, useState } from "react";
// import Cropper, { CropperProps } from "react-easy-crop";
// import { Area } from "react-easy-crop/types";

// type ImageInputFieldType = {
//   label?: string;
//   image?: File | null;
//   errorMessage?: string;
//   previewClassName?: string;
//   onClick: () => void;
// };

// export const ImageInputField: React.FC<ImageInputFieldType> = ({
//   label,
//   errorMessage,
//   image,
//   previewClassName,
//   onClick,
// }) => {
//   return (
//     // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
//     <div onClick={onClick}>
//       {label && <p className="text-sm text-primary-900 mb-2">{label}</p>}
//       {image ? (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           alt="profile-preview"
//           className={clsx("w-32 h-32 rounded-full", previewClassName)}
//           src={URL.createObjectURL(image)}
//         />
//       ) : (
//         <div
//           className={clsx(
//             "w-32 h-32 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer",
//             previewClassName
//           )}
//         >
//           <p className="text-xs text-gray-600">Upload Image</p>
//         </div>
//       )}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// type ImageInputPickerType = {
//   modalTitle?: string;
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   onResult: (file: File) => void;
//   compress?: number;
//   cropShape?: CropperProps["cropShape"];
//   description?: React.ReactNode;
//   maxSizeInMb?: number;
// };

// export const ImageInputPicker: React.FC<ImageInputPickerType> = ({
//   modalTitle = "Upload",
//   isOpen,
//   onOpenChange,
//   onResult,
//   compress = 0.7,
//   cropShape = "rect",
//   description,
//   maxSizeInMb = 2,
// }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [imageSrc, setImageSrc] = useState<string | null>(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

//   const uploadImage = () => {
//     inputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       const maxByte = maxSizeInMb * 1024 * 1024;

//       if (file.size > maxByte) {
//         addToast({
//           color: "danger",
//           title: "File size limit",
//           description: "Max image size is 2MB",
//         });

//         return;
//       }

//       const imageDataUrl = await readFile(file);

//       setImageSrc(imageDataUrl);
//     }
//   };

//   const readFile = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();

//       reader.addEventListener("load", () => resolve(reader.result as string));
//       reader.readAsDataURL(file);
//     });
//   };

//   const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const getCroppedImage = async () => {
//     if (!imageSrc || !croppedAreaPixels) return;
//     try {
//       const croppedImageFile = await getCroppedImg(
//         imageSrc,
//         croppedAreaPixels,
//         compress
//       );

//       onResult(croppedImageFile);
//     } catch (e) {
//       if (e instanceof Error) {
//         addToast({ color: "warning", description: e.message });
//       }
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">
//               {modalTitle}
//             </ModalHeader>
//             <ModalBody>
//               {imageSrc && (
//                 <div className="relative w-[400px] h-[400px]">
//                   <Cropper
//                     aspect={1}
//                     crop={crop}
//                     cropShape={cropShape}
//                     image={imageSrc}
//                     zoom={zoom}
//                     onCropChange={setCrop}
//                     onCropComplete={onCropComplete}
//                     onZoomChange={setZoom}
//                   />
//                 </div>
//               )}

//               <input
//                 ref={inputRef}
//                 accept="image/jpeg, image/jpg, image/png, image/webp"
//                 className="hidden"
//                 type="file"
//                 onChange={handleFileChange}
//               />

//               <Button
//                 disableRipple
//                 className="mx-auto"
//                 color="default"
//                 startContent={<ImageIcon className="size-5" />}
//                 onClick={uploadImage}
//               >
//                 Choose File
//               </Button>
//               {description}
//               {/* {imageSrc && (
//                 <button onClick={getCroppedImage}>Crop & Preview</button>
//               )} */}
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 color="primary"
//                 onPress={async () => {
//                   await getCroppedImage();
//                   onClose();
//                 }}
//               >
//                 Save
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

// export const getCroppedImg = (
//   imageSrc: string,
//   crop: Area,
//   compress: number = 0.7
// ): Promise<File> => {
//   return new Promise((resolve, reject) => {
//     const image = new Image();

//     image.src = imageSrc;

//     image.onload = () => {
//       const canvas = document.createElement("canvas");

//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext("2d");

//       if (!ctx) {
//         reject(new Error("Canvas context not available"));

//         return;
//       }

//       ctx.drawImage(
//         image,
//         crop.x,
//         crop.y,
//         crop.width,
//         crop.height,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );

//       canvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             reject(new Error("Canvas is empty"));

//             return;
//           }
//           resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
//         },
//         "image/jpeg",
//         compress
//       );
//     };

//     image.onerror = () => reject(new Error("Failed to load image"));
//   });
// };

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
import { useRef, useState } from "react";
// import Cropper, { CropperProps } from "react-easy-crop";
// import { Area } from "react-easy-crop/types";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Image } from "@heroui/image";

type MultipleImageInputFieldProps = {
  label?: string;
  images?: (File | string)[];
  errorMessage?: string;
  previewClassName?: string;
  onClick: () => void;
  previousImageUrls?: string[];
  onDeleteImage: (index: number) => void;
};

export const MultipleImageInputField = ({
  onClick,
  errorMessage,
  images,
  label,
  previewClassName,
  onDeleteImage,
}: MultipleImageInputFieldProps) => {
  return (
    <div className="w-full">
      {label && <p className="text-sm text-primary-900 mb-2">{label}</p>}
      <div className="w-full flex gap-3 rounded-lg p-3 border border-gray-300 border-dashed items-center">
        <button
          className="w-48 h-48 bg-gray-100 flex justify-center items-center cursor-pointer flex-shrink-0 rounded-lg"
          type="button"
          onClick={onClick}
        >
          <p className="text-xs text-gray-600">Add Image</p>
        </button>
        <div className="flex-grow overflow-x-scroll flex items-center gap-3">
          {images &&
            images.map((image, index) => {
              const isFile = image instanceof File;

              return (
                <div
                  key={isFile ? image.name : image}
                  className="relative group flex-shrink-0"
                >
                  <Button
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hidden group-hover:flex z-20"
                    onPress={() => onDeleteImage(index)}
                  >
                    Delete Image
                  </Button>
                  <Image
                    className="w-64 aspect-[4/3] object-contain "
                    src={isFile ? URL.createObjectURL(image) : image}
                  />
                </div>
              );
            })}
          {/* {Array.from({ length: 100 }).map((_, index) => (
            <div key={index} className="w-64 h-32 bg-gray-500 flex-shrink-0">
              p
            </div>
          ))} */}
        </div>
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

type ImageInputFieldType = {
  label?: string;
  image?: File | null;
  errorMessage?: string;
  previewClassName?: string;
  onClick: () => void;
  previousImageUrl?: string | null;
};

export const ImageInputField: React.FC<ImageInputFieldType> = ({
  label,
  errorMessage,
  image,
  previewClassName,
  previousImageUrl,
  onClick,
}) => {
  return (
    <div className="w-full">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="inline-block" onClick={onClick}>
        {label && <p className="text-sm text-primary-900 mb-2">{label}</p>}
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="profile-preview"
            className={clsx(
              "w-32 h-32 rounded-full cursor-pointer",
              previewClassName
            )}
            src={URL.createObjectURL(image)}
          />
        ) : previousImageUrl ? (
          <Image
            className={clsx(
              "w-32 h-32 object-cover cursor-pointer",
              previewClassName
            )}
            src={previousImageUrl}
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
        {errorMessage && (
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

type ImageInputPickerType = {
  modalTitle?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onResult: (file: File) => void;
  compress?: number;
  cropShape?: string;
  description?: React.ReactNode;
  maxSizeInMb?: number;
  aspectRatio?: number;
};

export const ImageInputPicker: React.FC<ImageInputPickerType> = ({
  modalTitle = "Upload Image",
  isOpen,
  onOpenChange,
  onResult,
  compress = 0.7,
  cropShape = "rect",
  aspectRatio,
  description,
  maxSizeInMb = 2,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const uploadImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxByte = maxSizeInMb * 1024 * 1024;

      if (file.size > maxByte) {
        addToast({
          color: "danger",
          title: "File size limit",
          description: `Max image size is ${maxSizeInMb}MB`,
        });

        return;
      }

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

  const getCroppedImage = async () => {
    if (!imageSrc || !cropperRef.current) return;
    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();

    if (!canvas) return;

    return new Promise<File>((resolve, reject) => {
      canvas.toBlob(
        (blob: Blob | null) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));

            return;
          }
          const file = new File([blob], `cropped-${new Date()}.jpg`, {
            type: "image/jpeg",
          });

          resolve(file);
        },
        "image/jpeg",
        compress
      );
    });
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
                    ref={cropperRef}
                    aspectRatio={aspectRatio}
                    autoCropArea={1}
                    background={false}
                    cropBoxMovable={true}
                    cropBoxResizable={true}
                    dragMode="move"
                    guides={true}
                    responsive={true}
                    src={imageSrc}
                    style={{ height: 400, width: "100%" }}
                    viewMode={1}
                  />
                </div>
              )}

              <input
                ref={inputRef}
                accept="image/jpeg, image/jpg, image/png, image/webp"
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
              {description}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={async () => {
                  const result = await getCroppedImage();

                  if (result) onResult(result);
                  setImageSrc(null);
                  if (inputRef.current) inputRef.current.value = "";
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
