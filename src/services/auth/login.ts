"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { unstable_rethrow } from "next/navigation";

import { serverFetch } from "@/lib/api/server-fetch";
import { getDefaultCookieOptions } from "@/lib/auth/cookie-options";
import { setCookie } from "@/lib/auth/tokenHandler";
import { parseCookie } from "cookie";
import { LoginState } from "@/types/auth/auth.type";

type LoginResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  redirectTo?: string;
};

export const login = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginResponse> => {
  let accessToken: string | null = null;

  const payload = {
    email: String(formData.get("email") || "").trim(),
    password: String(formData.get("password") || ""),
  };

  try {
    const res = await serverFetch.post("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to login account",
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();

    if (!setCookieHeaders?.length) {
      throw new Error("No cookies received from backend");
    }

    const allowedCookies = new Set(["access_token", "refresh_token"]);

    for (const cookieString of setCookieHeaders) {
      const parsed = parseCookie(cookieString);

      console.log(parsed);

      for (const [name, value] of Object.entries(parsed)) {
        if (!allowedCookies.has(name) || !value) {
          continue;
        }

        if (name === "access_token") {
          accessToken = value;
        }

        await setCookie(name, value, {
          ...getDefaultCookieOptions(),
          maxAge:
            Number(parsed["Max-Age"]) ||
            (name === "access_token" ? 900 : 604800),
        });
      }
    }

    if (!accessToken) {
      throw new Error("Access token missing after login");
    }
    const decodedToken = jwt.decode(accessToken) as JwtPayload | null;

    if (!decodedToken || typeof decodedToken === "string") {
      throw new Error("Invalid token format");
    }
    console.log(decodedToken);
    // const defaultDashboard = getDefaultDashboard(
    //     decodedToken.systemRole as SystemRole,
    //     decodedToken.role as CenterRole
    // );

    return {
      success: true,
      message: "login success",
      redirectTo: "/feed",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    unstable_rethrow(error);

    console.error(error);

    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
};
