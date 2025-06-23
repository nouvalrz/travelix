import { UserFormType } from "@/types/schemas/user.schema";
import { UserRole } from "@/types/user.type";

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

export const fetchUpdateUserRole = async (id: string, newRole: UserRole) => {
  const response = await fetch("/api/proxy/update-user-role/" + id, {
    method: "POST",
    body: JSON.stringify({ role: newRole }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
