import { ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { params, headers, ...rest } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as ApiError;
    throw {
      message: errorData.message || "Something went wrong",
      status: response.status,
      errors: errorData.errors,
    };
  }

  // Placeholder thường không có wrap data node, nên mình check nếu là JSON thì return
  return response.json();
};

export const fetcher = <T>(url: string) => apiClient<T>(url);
