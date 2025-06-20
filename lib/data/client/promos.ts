import { PromoFormType } from "@/types/schemas/promo.schema";

export const fetchAddPromo = async (data: PromoFormType) => {
  const response = await fetch("/api/proxy/create-promo", {
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

interface PromoFormTypeOptionalImage extends Omit<PromoFormType, "imageUrl"> {
  imageUrl?: string;
}

export const fetchUpdatePromo = async (
  id: string,
  data: PromoFormTypeOptionalImage
) => {
  const response = await fetch("/api/proxy/update-promo/" + id, {
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

export const fetchDeletePromo = async (id: string) => {
  const response = await fetch("/api/proxy/delete-promo/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
