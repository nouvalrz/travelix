"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { NumberInput } from "@heroui/number-input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import MapPicker from "../NewMap";

import { Category } from "@/types/category.type";
import { Destination } from "@/types/destination.type";
import {
  DestinationFormType,
  DestinationsSchema,
} from "@/types/schemas/destination.schema";
import TextEditor from "@/app/admin/TextEditor";
import {
  ImageInputPicker,
  MultipleImageInputField,
} from "@/components/ImageInput";
import { parseGoogleMapsIframeLatLng } from "@/lib/mapsIframe";
import { AppError } from "@/lib/appError";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";
import { fetchAddDestination } from "@/lib/data/client/destinations";

type DestinationFormProps = {
  destination?: Destination;
  categories: Category[];
  submitTitle?: string;
};

const DestinationForm = ({
  categories,
  destination,
  submitTitle = "Submit Destination",
}: DestinationFormProps) => {
  const router = useRouter();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm<DestinationFormType>({
    resolver: zodResolver(DestinationsSchema),
    defaultValues: destination ?? {},
    criteriaMode: "all",
  });

  const [modalImage, setModalImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModalImage = () => setModalImage(!modalImage);

  const imageUrls = watch("imageUrls") ?? [];

  const handleAddImage = (image: File) => {
    setValue("imageUrls", [image, ...imageUrls]);
  };

  const handleDeleteImage = (index: number) => {
    setValue(
      "imageUrls",
      imageUrls.filter((item, itemIndex) => itemIndex !== index)
    );
  };

  const parsedCoordinateFromIframe = parseGoogleMapsIframeLatLng(
    destination?.location_maps ?? ""
  );

  const submitDestination = async (data: DestinationFormType) => {
    setLoading(true);

    try {
      if (destination) {
        await handleUpdateDestination(data);
      } else {
        await handleAddDestination(data);
      }

      addToast({
        color: "success",
        title: "Success",
        description: `Successfully ${destination ? "update" : "add"} destination`,
      });

      if (destination) {
        router.refresh();
      } else {
        router.replace("/admin/destinations");
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

  const handleAddDestination = async (data: DestinationFormType) => {
    const destinationImageUrls = await Promise.all(
      (data.imageUrls as File[]).map(async (file) => {
        const { url } = await fetchUploadImage(file);

        return url;
      })
    );

    await fetchAddDestination({ ...data, imageUrls: destinationImageUrls });
  };
  const handleUpdateDestination = async (data: DestinationFormType) => {};

  return (
    <Card shadow="sm">
      <CardBody>
        <form
          className="flex flex-col items-start gap-6"
          onSubmit={handleSubmit(submitDestination)}
        >
          <div className="flex items-start gap-4 w-full">
            <Input
              {...register("title")}
              className="flex-1"
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title?.message}
              label="Title"
              labelPlacement="outside"
              placeholder="Enter destination title"
            />
            <Controller
              control={control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <Autocomplete
                  className="flex-1"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label="Category"
                  labelPlacement="outside"
                  placeholder="Choose a category"
                  selectedKey={field.value}
                  onSelectionChange={(key) =>
                    field.onChange(key?.toString() ?? "")
                  }
                >
                  {categories.map((category) => (
                    <AutocompleteItem key={String(category.id)}>
                      {category.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
            />
          </div>
          <Textarea
            {...register("description")}
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description?.message}
            label="Description"
            labelPlacement="outside"
            placeholder="Describe the destination"
          />
          <div className="w-full ">
            <Controller
              control={control}
              defaultValue=""
              name="facilities"
              render={({ field }) => (
                <TextEditor
                  errorMessage={errors.facilities?.message}
                  label="Facilities"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-4 items-start w-full">
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => (
                <NumberInput
                  className="flex-1"
                  errorMessage={fieldState.error?.message}
                  formatOptions={{
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  isInvalid={!!fieldState.error}
                  label="Price"
                  labelPlacement="outside"
                  placeholder="Enter in Rupiah"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="price_discount"
              render={({ field, fieldState }) => (
                <NumberInput
                  className="flex-1"
                  errorMessage={fieldState.error?.message}
                  formatOptions={{
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  isInvalid={!!fieldState.error}
                  label="Price Discount"
                  labelPlacement="outside"
                  placeholder="Enter in Rupiah"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-4 items-start w-full">
            <Controller
              control={control}
              name="rating"
              render={({ field, fieldState }) => (
                <NumberInput
                  className="flex-1"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label="Rating (1-5)"
                  labelPlacement="outside"
                  placeholder="Enter rating between 1 - 5"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="total_reviews"
              render={({ field, fieldState }) => (
                <NumberInput
                  className="flex-1"
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  label="Total Reviews"
                  labelPlacement="outside"
                  placeholder="Enter total reviews"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <Textarea
            {...register("address")}
            errorMessage={errors.address?.message}
            isInvalid={!!errors.address?.message}
            label="Address"
            labelPlacement="outside"
            placeholder="Enter full address"
          />
          <div className="flex items-start gap-4 w-full">
            <Input
              {...register("city")}
              className="flex-1"
              errorMessage={errors.city?.message}
              isInvalid={!!errors.city?.message}
              label="City"
              labelPlacement="outside"
              placeholder="Enter city name"
            />
            <Input
              {...register("province")}
              className="flex-1"
              errorMessage={errors.province?.message}
              isInvalid={!!errors.province?.message}
              label="Province"
              labelPlacement="outside"
              placeholder="Enter province name"
            />
          </div>
          <MultipleImageInputField
            errorMessage={errors.imageUrls?.message}
            images={imageUrls}
            label="Destination Images"
            onClick={toggleModalImage}
            onDeleteImage={handleDeleteImage}
          />
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
            onResult={handleAddImage}
          />
          <div className="h-[400px] w-full">
            <MapPicker
              initialCoordinate={parsedCoordinateFromIframe ?? undefined}
              onCoordinateChangeToGMaps={(mapsUrl) =>
                setValue("location_maps", mapsUrl)
              }
            />
          </div>
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

export default DestinationForm;
