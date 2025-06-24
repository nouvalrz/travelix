"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { LoginSchema, LoginType } from "@/types/schemas/login.schema";
import { fetchLogin } from "@/lib/data/client/login";
import { AppError } from "@/lib/appError";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

  const togglePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  const login = async (data: LoginType) => {
    setLoading(true);
    try {
      await fetchLogin(data);
      addToast({
        title: "Login Success",
        color: "success",
        description: "Welcome to Travelix!",
      });
      const prevUrl = searchParams.get("prevUrl");

      if (prevUrl) {
        router.replace(decodeURIComponent(String(prevUrl)));
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      addToast({
        title: "Error",
        description:
          error instanceof AppError ? error.message : "Something went wrong",
        color: "danger",
      });
    }
    setLoading(false);
  };

  return (
    <Card className=" p-2" shadow="sm">
      <CardHeader className="flex flex-col gap-1 items-start ">
        <p className="font-medium">Welcome Back</p>
        <p className="text-sm text-secondary">
          Please login using your account
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(login)}>
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
          <Button
            disableRipple
            color="primary"
            isLoading={loading}
            type="submit"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 flex justify-end text-sm text-gray-700">
          <p>
            Don&apos;t have an account?{" "}
            <Link className="underline" href="/register">
              Register
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
