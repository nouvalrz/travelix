"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import {
  CategoryFormType,
  CategorySchema,
} from "@/types/schemas/category.schema";
import { ImageInputField, ImageInputPicker } from "@/components/ImageInput";
import { Category } from "@/types/category.type";
import { AppError } from "@/lib/appError";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";
import {
  fetchAddCategory,
  fetchUpdateCategory,
} from "@/lib/data/client/categories";

type CategoryFormProps = {
  category?: Category;
  submitTitle?: string;
};

const CategoryForm = ({
  category,
  submitTitle = "Submit Category",
}: CategoryFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: category ?? {},
  });

  const [modalImage, setModalImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleModalImage = () => setModalImage(!modalImage);

  const submitCategory = async (data: CategoryFormType) => {
    setLoading(true);

    try {
      if (category) {
        await handleEditCategory(data);
      } else {
        await handleAddCategory(data);
      }

      addToast({
        color: "success",
        title: "Success",
        description: `Successfully ${category ? "update" : "add"} category`,
      });

      if (category) {
        router.refresh();
      } else {
        router.replace("/admin/categories");
      }
    } catch (error) {
      if (error instanceof AppError) {
        addToast({
          color: "danger",
          title: error.message,
          description: error.errors?.join(", "),
        });
      }

      if (error instanceof Error) {
        addToast({
          color: "danger",
          title: "Error",
          description: error.message,
        });
      }
    }

    setLoading(false);
  };

  const handleAddCategory = async (data: CategoryFormType) => {
    const { url } = await fetchUploadImage(data.imageUrl as File);

    await fetchAddCategory({ name: data.name, imageUrl: url });
  };
  const handleEditCategory = async (data: CategoryFormType) => {
    let imageUrl: string | undefined = undefined;

    if (data.imageUrl instanceof File) {
      const { url } = await fetchUploadImage(data.imageUrl);

      imageUrl = url;
    }

    await fetchUpdateCategory(category!.id, {
      name: data.name,
      imageUrl: imageUrl,
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <form
          className="flex flex-col gap-6 items-start"
          onSubmit={handleSubmit(submitCategory)}
        >
          <Input
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name?.message}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter category name"
          />
          <ImageInputField
            errorMessage={errors.imageUrl?.message}
            image={
              getValues("imageUrl") instanceof File
                ? (getValues("imageUrl") as File)
                : null
            }
            label="Category Cover"
            previewClassName="w-60 !h-auto !min-h-60 !object-contain !rounded-lg"
            previousImageUrl={category ? category.imageUrl : null}
            onClick={toggleModalImage}
          />
          <ImageInputPicker
            compress={0.3}
            description={
              <div className="text-sm">
                <ul>
                  <li>Image type supported: jpg, jpeg, png, webp</li>
                  <li>Image max size: 2MB</li>
                </ul>
              </div>
            }
            isOpen={modalImage}
            modalTitle="Upload Category Cover"
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

export default CategoryForm;
