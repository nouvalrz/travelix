"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDisclosure } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ImageInputField, ImageInputPicker } from "../ImageInput";

import RoleChoices from "./RoleChoices";

import { RegisterSchema, RegisterType } from "@/types/schemas/register.schema";
import { fetchUploadImage } from "@/lib/data/client/uploadImage";
import { AppError } from "@/lib/appError";
import { fetchRegister } from "@/lib/data/client/register";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    getValues,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { role: "user" },
  });

  const togglePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  const submitRegister = async (data: RegisterType) => {
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      if (data.profilePictureFile) {
        const { url } = await fetchUploadImage(data.profilePictureFile);

        imageUrl = url;
      }

      await fetchRegister({
        ...data,
        profilePictureUrl: imageUrl ? imageUrl : undefined,
      });

      router.replace("/login");

      addToast({
        title: "Register Success",
        color: "success",
        description:
          "Successfully created new account! Redirecting to Login Page",
      });
    } catch (error) {
      if (error instanceof AppError) {
        addToast({
          color: "danger",
          description: error.message,
        });
      }
    }

    setLoading(false);
  };

  return (
    <Card className=" p-2" shadow="sm">
      <CardHeader className="flex flex-col gap-1 items-start ">
        <p className="font-medium">Join to Get Unforgettable Journeys</p>
        <p className="text-sm text-secondary">Create a new account</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(submitRegister)}
        >
          <RoleChoices
            defaultValue="user"
            errorMessage={errors.role?.message}
            isInvalid={!!errors.role?.message}
            onValueChange={(value) =>
              setValue("role", value as RegisterType["role"])
            }
          />
          <Input
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name?.message}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
          />
          <Input
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <Input
            {...register("password")}
            endContent={
              <button
                className="text-gray-700"
                type="button"
                onClick={togglePasswordVisible}
              >
                {isPasswordVisible ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            }
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type={isPasswordVisible ? "text" : "password"}
          />
          <Input
            {...register("passwordRepeat")}
            endContent={
              <button
                className="text-gray-700"
                type="button"
                onClick={togglePasswordVisible}
              >
                {isPasswordVisible ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            }
            errorMessage={errors.passwordRepeat?.message}
            isInvalid={!!errors.passwordRepeat?.message}
            label="Password Repeat"
            labelPlacement="outside"
            placeholder="Enter your password repeat"
            type={isPasswordVisible ? "text" : "password"}
          />
          <Input
            {...register("phoneNumber")}
            errorMessage={errors.phoneNumber?.message}
            isInvalid={!!errors.phoneNumber?.message}
            label="Phone Number"
            labelPlacement="outside"
            min={0}
            placeholder="Enter your phone number"
            type="number"
          />
          <ImageInputField
            image={getValues("profilePictureFile")}
            label="Profile Picture (Optional)"
            onClick={onOpen}
          />
          <ImageInputPicker
            compress={0.3}
            cropShape="round"
            description={
              <div className="text-sm">
                <ul>
                  <li>Image type supported: jpg, jpeg, png, webp</li>
                  <li>Image max size: 2MB</li>
                </ul>
              </div>
            }
            isOpen={isOpen}
            modalTitle="Upload Image"
            onOpenChange={onOpenChange}
            onResult={(value: File) => setValue("profilePictureFile", value)}
          />
          <Button
            disableRipple
            color="primary"
            isLoading={loading}
            type="submit"
          >
            Register
          </Button>
        </form>
        <div className="mt-6 flex justify-end text-sm text-gray-700">
          <p>
            Already have an account?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
