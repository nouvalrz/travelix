"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

import { PromoFormType, PromoSchema } from "@/types/schemas/promo.schema";
import { Promo } from "@/types/promo.type";
import TextEditor from "@/app/admin/TextEditor";
import { ImageInputField, ImageInputPicker } from "@/components/ImageInput";
import { AppError } from "@/lib/appError";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";
import { fetchAddPromo, fetchUpdatePromo } from "@/lib/data/client/promos";

type PromoFormProps = {
  promo?: Promo;
  submitTitle?: string;
};

const PromoForm = ({ promo, submitTitle = "Submit Promo" }: PromoFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm<PromoFormType>({
    resolver: zodResolver(PromoSchema),
    defaultValues: promo ?? {},
  });

  const [modalImage, setModalImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModalImage = () => setModalImage(!modalImage);

  const submitPromo = async (data: PromoFormType) => {
    setLoading(true);

    try {
      if (promo) {
        await handleUpdatePromo(data);
      } else {
        await handleAddPromo(data);
      }

      addToast({
        color: "success",
        title: "Success",
        description: `Successfully ${promo ? "update" : "add"} promo`,
      });

      if (promo) {
        router.refresh();
      } else {
        router.replace("/admin/promos");
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

  const handleAddPromo = async (data: PromoFormType) => {
    const { url } = await fetchUploadImage(data.imageUrl as File);

    await fetchAddPromo({ ...data, imageUrl: url });
  };
  const handleUpdatePromo = async (data: PromoFormType) => {
    let imageUrl: string | undefined = undefined;

    if (data.imageUrl instanceof File) {
      const { url } = await fetchUploadImage(data.imageUrl);

      imageUrl = url;
    }

    await fetchUpdatePromo(promo!.id, { ...data, imageUrl: imageUrl });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <form
          className="flex flex-col items-start gap-6"
          onSubmit={handleSubmit(submitPromo)}
        >
          <Input
            label="Title"
            labelPlacement="outside"
            placeholder="Enter promo title"
            {...register("title")}
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title?.message}
          />
          <Textarea
            {...register("description")}
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description?.message}
            label="Description"
            labelPlacement="outside"
            placeholder="Describe the promo"
          />
          <Input
            label="Promo Code"
            labelPlacement="outside"
            placeholder="Enter promo code"
            {...register("promo_code")}
            errorMessage={errors.promo_code?.message}
            isInvalid={!!errors.promo_code?.message}
          />
          <Controller
            control={control}
            name="promo_discount_price"
            render={({ field, fieldState }) => (
              <NumberInput
                errorMessage={fieldState.error?.message}
                formatOptions={{
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                isInvalid={!!fieldState.error}
                label="Promo Discount Price"
                labelPlacement="outside"
                placeholder="Enter in Rupiah"
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="minimum_claim_price"
            render={({ field, fieldState }) => (
              <NumberInput
                errorMessage={fieldState.error?.message}
                formatOptions={{
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                isInvalid={!!fieldState.error}
                label="Minimum Claim Price"
                labelPlacement="outside"
                placeholder="Enter in Rupiah"
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <div className="w-full ">
            <Controller
              control={control}
              defaultValue=""
              name="terms_condition"
              render={({ field }) => (
                <TextEditor
                  errorMessage={errors.terms_condition?.message}
                  label="Terms and Conditions"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="w-full">
            <ImageInputField
              errorMessage={errors.imageUrl?.message}
              image={
                getValues("imageUrl") instanceof File
                  ? (getValues("imageUrl") as File)
                  : null
              }
              label="Promo Cover Image"
              previewClassName="w-[320px] md:w-[420px] lg:w-[620px]  !h-auto !min-h-60 !object-contain !rounded-lg"
              previousImageUrl={promo ? promo.imageUrl : null}
              onClick={toggleModalImage}
            />
          </div>
          <ImageInputPicker
            aspectRatio={4 / 3}
            compress={0.7}
            description={
              <div className="text-sm">
                <ul>
                  <li>Image type supported: jpg, jpeg, png, webp</li>
                  <li>Image aspect ratio: 4 : 3</li>
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

export default PromoForm;
