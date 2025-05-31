import { API_KEY, API_URL } from "@/config/credentials";

type FetchApiType = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  token?: string;
};

export const fetchApiFromServer = async (
  path: string,
  options: FetchApiType = {}
) => {
  if (!API_URL) throw new Error("Missing API_URL");
  if (!API_KEY) throw new Error("Missing API_KEY");

  const url = `${API_URL}${path}`;

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const headers: HeadersInit = {
    apiKey: API_KEY,
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...options.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: isFormData
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  return res;
};

export const fetchApiFormDataFromServer = async (
  path: string,
  options: FetchApiType = {}
) => {
  if (!API_URL) throw new Error("Missing API_URL");
  if (!API_KEY) throw new Error("Missing API_KEY");

  const url = `${API_URL}${path}`;

  const headers: HeadersInit = {
    apiKey: API_KEY,
    ...(options.headers || {}),
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
  };

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  return res;
};
