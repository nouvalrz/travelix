export const fetchCategories = async () => {
  const response = await fetch("/api/proxy/categories", {
    method: "GET",
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchAddCategory = async (data: {
  name: string;
  imageUrl: string;
}) => {
  const response = await fetch("/api/proxy/create-category", {
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

export const fetchUpdateCategory = async (
  id: string,
  data: {
    name: string;
    imageUrl?: string;
  }
) => {
  const response = await fetch("/api/proxy/update-category/" + id, {
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
