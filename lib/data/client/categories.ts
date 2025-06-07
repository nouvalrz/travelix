export const fetchCategories = async () => {
  const response = await fetch("/api/proxy/categories", {
    method: "GET",
  });

  const responseData = await response.json();

  return responseData;
};
