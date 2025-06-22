import { DestinationFormType } from "@/types/schemas/destination.schema";

export const fetchAddDestination = async (data: DestinationFormType) => {
  const response = await fetch("/api/proxy/create-activity", {
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
