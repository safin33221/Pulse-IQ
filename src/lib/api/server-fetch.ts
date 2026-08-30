import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const buildRequestUrl = (endpoint: string): string => {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is missing");
  }

  const normalizedBase = BACKEND_URL.endsWith("/")
  
    ? BACKEND_URL
    : `${BACKEND_URL}/`;

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;

  return new URL(normalizedEndpoint, normalizedBase).toString();
};

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(buildRequestUrl(endpoint), {
      ...options,

      headers: {
        "Content-Type": "application/json",

        Cookie: cookieStore.toString(),

        ...(options.headers ?? {}),
      },
      cache: options.cache ?? "no-store",
      next: options.next,
    });

    return response;
  } catch (error) {
    unstable_rethrow(error);
    throw error;
  }
};

export const serverFetch = {
  get: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "GET",
    }),

  post: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
    }),

  put: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
    }),

  patch: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
    }),

  delete: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "DELETE",
    }),
};
