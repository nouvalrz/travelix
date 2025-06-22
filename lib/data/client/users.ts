import { UserFormType } from "@/types/schemas/user.schema";

export const fetchUpdateUserProfile = async (data: UserFormType) => {
  const response = await fetch("/api/update-profile", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
