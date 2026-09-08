"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { unstable_rethrow } from "next/navigation";

import { serverFetch } from "@/lib/api/server-fetch";
import { getDefaultCookieOptions } from "@/lib/auth/cookie-options";
import { setCookie } from "@/lib/auth/tokenHandler";
import { LoginState } from "@/types/auth/auth.type";

type LoginResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  redirectTo?: string;
};

const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const login = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginResponse> => {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      success: false,
      message: "Email or Password required",
    };
  }

  try {
    const response = await serverFetch.post("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to login account",
      };
    }

    const setCookieHeaders = response.headers.getSetCookie();

    if (!setCookieHeaders.length) {
      throw new Error("No cookies received from backend");
    }

    let accessToken: string | null = null;

    for (const cookie of setCookieHeaders) {
      const [nameValue] = cookie.split(";");

      const separatorIndex = nameValue.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const name = nameValue.slice(0, separatorIndex).trim();
      const value = nameValue.slice(separatorIndex + 1).trim();

      if (
        name !== COOKIE_NAMES.ACCESS_TOKEN &&
        name !== COOKIE_NAMES.REFRESH_TOKEN
      ) {
        continue;
      }

      if (!value) {
        continue;
      }

      if (name === COOKIE_NAMES.ACCESS_TOKEN) {
        accessToken = value;
      }

      await setCookie(name, value, {
        ...getDefaultCookieOptions(),
        maxAge: name === COOKIE_NAMES.ACCESS_TOKEN ? 900 : 604800,
      });
    }

    if (!accessToken) {
      throw new Error("Access token missing after login");
    }

    const decodedToken = jwt.decode(accessToken) as JwtPayload | null;

    if (!decodedToken) {
      throw new Error("Invalid token format");
    }

    console.log(decodedToken);

    return {
      success: true,
      message: "Login success",
      redirectTo: "/feed",
    };
  } catch (error: unknown) {
    unstable_rethrow(error);

    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
};
