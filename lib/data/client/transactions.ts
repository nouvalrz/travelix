export const fetchTransactions = async () => {
  const response = await fetch("/api/proxy/my-transactions", {
    method: "GET",
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};
