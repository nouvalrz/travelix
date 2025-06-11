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
