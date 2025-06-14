export const fetchTransactions = async () => {
  const response = await fetch("/api/proxy/my-transactions", {
    method: "GET",
    credentials: "same-origin",
  });

  const responseData = await response.json();

  return responseData;
};

export const fetchCreateTransaction = async (
  cartIds: string[],
  paymentMethodId: string
) => {
  const response = await fetch("/api/proxy/create-transaction", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartIds, paymentMethodId }),
  });

  const responseData = await response.json();

  return responseData;
};
