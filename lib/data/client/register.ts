import { AppError } from "@/lib/appError";
import { RegisterType } from "@/types/schemas/register.schema";

export const fetchRegister = async (data: RegisterType) => {
  const response = await fetch("/api/proxy/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new AppError({
      code: response.status,
      message: responseData.message,
      errors: responseData.errors,
    });
  }

  return data;
};
