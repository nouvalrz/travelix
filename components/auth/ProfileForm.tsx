"use client";

import React, { useMemo, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

import { ImageInputField, ImageInputPicker } from "../ImageInput";

import { User } from "@/types/user.type";
import { UserFormType, UserSchema } from "@/types/schemas/user.schema";
import { AppError } from "@/lib/appError";
import { fetchUpdateUserProfile } from "@/lib/data/client/users";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";

const ProfileForm = ({
  user,
  isAdmin = false,
}: {
  user: User;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<UserFormType>({
      resolver: zodResolver(UserSchema),
      defaultValues: user ?? {},
    });

  const [modalImage, setModalImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formValues = watch();

  const isUpdating = useMemo(() => {
    return (
      JSON.stringify({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
      }) !==
      JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        role: formValues.role,
        profilePictureUrl: formValues.profilePictureUrl,
      })
    );
  }, [formValues]);

  const toggleModalImage = () => setModalImage(!modalImage);

  const submitUser = async (data: UserFormType) => {
    setLoading(true);

    try {
      if (isAdmin) {
        await handleAdminUpdateRole();
      } else {
        await handleUserUpdateProfile(data);
      }

      addToast({
        color: "success",
        title: "Success",
        description: "Successfully updated user",
      });

      router.refresh();
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

  const handleUserUpdateProfile = async (data: UserFormType) => {
    let profilePictureUrl: string | null = null;

    if (data.profilePictureUrl instanceof File) {
      const { url } = await fetchUploadImage(data.profilePictureUrl);

      profilePictureUrl = url;
    }
    await fetchUpdateUserProfile({
      ...data,
      profilePictureUrl: profilePictureUrl ?? data.profilePictureUrl,
    });
  };

  const handleAdminUpdateRole = async () => {};

  return (
    <Card shadow="sm">
      <CardBody>
        <form
          className="flex flex-col items-start gap-6"
          onSubmit={handleSubmit(submitUser)}
        >
          <Input
            {...register("name")}
            isDisabled={isAdmin}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
          />
          <Input
            {...register("email")}
            isDisabled={true}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <Input
            {...register("phoneNumber")}
            isDisabled={isAdmin}
            label="Phone Number"
            labelPlacement="outside"
            placeholder="Enter your phone number"
          />
          <ImageInputField
            image={
              getValues("profilePictureUrl") instanceof File
                ? (getValues("profilePictureUrl") as File)
                : null
            }
            label="Profile Image"
            previewClassName="rounded-full"
            previousImageUrl={user.profilePictureUrl}
            onClick={toggleModalImage}
          />
          <ImageInputPicker
            aspectRatio={1}
            compress={0.7}
            description={
              <div className="text-sm">
                <ul>
                  <li>Image type supported: jpg, jpeg, png, webp</li>
                  <li>Image aspect ratio: 1 : 1</li>
                  <li>Image max size: 1MB</li>
                </ul>
              </div>
            }
            isOpen={modalImage}
            maxSizeInMb={1}
            modalTitle="Upload Profile Image"
            onOpenChange={toggleModalImage}
            onResult={(value: File) => setValue("profilePictureUrl", value)}
          />
          <div className="flex justify-end mt-4 w-full">
            <Button
              color="primary"
              isDisabled={!isUpdating}
              isLoading={loading}
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProfileForm;
