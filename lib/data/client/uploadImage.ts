import { AppError } from "@/lib/appError";

export const fetchUploadImage = async (file: File) => {
  if (!file.type.startsWith("image/")) {
    throw new AppError({ message: "File type is not image" });
  }

  const form = new FormData();

  form.append("image", file);

  const response = await fetch("/api/proxy/upload-image", {
    method: "POST",
    body: form,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new AppError({
      message: responseData.message,
      code: response.status,
    });
  }

  return responseData;
};
