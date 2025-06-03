export const fetchCarts = async () => {
  const response = await fetch("/api/proxy/carts", {
    method: "GET",
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
