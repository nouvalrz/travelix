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
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    apiKey: API_KEY,
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return res;
};
