import { AppError } from "@/lib/appError";

export const fetchLogout = async () => {
  const response = await fetch("/api/logout", {
    method: "GET",
    credentials: "same-origin",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new AppError({
      code: response.status,
      message: responseData.message,
    });
  }

  return responseData;
};
