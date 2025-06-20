export const fetchAddBanner = async (data: {
  name: string;
  imageUrl: string;
}) => {
  const response = await fetch("/api/proxy/create-banner", {
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

export const fetchUpdateBanner = async (
  id: string,
  data: {
    name: string;
    imageUrl?: string;
  }
) => {
  const response = await fetch("/api/proxy/update-banner/" + id, {
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

export const fetchDeleteBanner = async (id: string) => {
  const response = await fetch("/api/proxy/delete-banner/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
