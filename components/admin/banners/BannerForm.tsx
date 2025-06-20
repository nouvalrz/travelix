"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

import { BannerFormType, BannerSchema } from "@/types/schemas/banner.schema";
import { Banner } from "@/types/banner.type";
import { ImageInputField, ImageInputPicker } from "@/components/ImageInput";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";
import { fetchAddBanner, fetchUpdateBanner } from "@/lib/data/client/banners";
import { AppError } from "@/lib/appError";

type BannerFormProps = {
  banner?: Banner;
  submitTitle?: string;
};

const BannerForm = ({
  banner,
  submitTitle = "Submit Banner",
}: BannerFormProps) => {
  const router = useRouter();
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<BannerFormType>({
    resolver: zodResolver(BannerSchema),
    defaultValues: banner ?? {},
  });

  const [modalImage, setModalImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModalImage = () => setModalImage(!modalImage);

  const submitBanner = async (data: BannerFormType) => {
    setLoading(true);

    try {
      if (banner) {
        await handleUpdateBanner(data);
      } else {
        await handleAddBanner(data);
      }

      addToast({
        color: "success",
        title: "Success",
        description: `Successfully ${banner ? "update" : "add"} banner`,
      });

      if (banner) {
        router.refresh();
      } else {
        router.replace("/admin/banners");
      }
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }

      if (error instanceof AppError) {
        addToast({
          color: "danger",
          title: error.message,
          description: error.errors?.join(", "),
        });
      }
    }

    setLoading(false);
  };

  const handleAddBanner = async (data: BannerFormType) => {
    const { url } = await fetchUploadImage(data.imageUrl as File);

    await fetchAddBanner({ name: data.name, imageUrl: url });
  };
  const handleUpdateBanner = async (data: BannerFormType) => {
    let imageUrl: string | undefined = undefined;

    if (data.imageUrl instanceof File) {
      const { url } = await fetchUploadImage(data.imageUrl);

      imageUrl = url;
    }

    await fetchUpdateBanner(banner!.id, {
      name: data.name,
      imageUrl: imageUrl,
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <form
          className="flex flex-col gap-6 items-start"
          onSubmit={handleSubmit(submitBanner)}
        >
          <Input
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name?.message}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter category name"
          />
          <div className="w-full">
            <ImageInputField
              errorMessage={errors.imageUrl?.message}
              image={
                getValues("imageUrl") instanceof File
                  ? (getValues("imageUrl") as File)
                  : null
              }
              label="Banner Image"
              previewClassName="w-[420px] md:w-[620px] lg:w-[720px]  !h-auto !min-h-60 !object-contain !rounded-lg"
              previousImageUrl={banner ? banner.imageUrl : null}
              onClick={toggleModalImage}
            />
          </div>
          <ImageInputPicker
            aspectRatio={16 / 9}
            compress={0.7}
            description={
              <div className="text-sm">
                <ul>
                  <li>Image type supported: jpg, jpeg, png, webp</li>
                  <li>Image aspect ratio: 16 : 9</li>
                  <li>Image max size: 1MB</li>
                </ul>
              </div>
            }
            isOpen={modalImage}
            maxSizeInMb={1}
            modalTitle="Upload Banner Image"
            onOpenChange={toggleModalImage}
            onResult={(value: File) => setValue("imageUrl", value)}
          />
          <div className="flex justify-end mt-6 w-full">
            <Button color="primary" isLoading={loading} type="submit">
              {submitTitle}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default BannerForm;
