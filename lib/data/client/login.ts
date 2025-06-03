import { AppError } from "@/lib/appError";
import { LoginType } from "@/types/schemas/login.schema";

export const fetchLogin = async (data: LoginType) => {
  const response = await fetch("/api/login", {
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

  return responseData;
};
