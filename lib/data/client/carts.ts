export const fetchCarts = async () => {
  const response = await fetch("/api/proxy/carts", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchAddCart = async (body: { activityId: string }) => {
  const response = await fetch("/api/proxy/add-cart", {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchDeleteCart = async (id: string) => {
  const response = await fetch("/api/proxy/delete-cart/" + id, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchUpdateCartQuantity = async (id: string, quantity: number) => {
  const response = await fetch("/api/proxy/update-cart/" + id, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  const responseData = await response.json();

  return responseData;
};
