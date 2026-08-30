"use server";

import { unstable_rethrow } from "next/navigation";

import { serverFetch } from "@/lib/api/server-fetch";
import { login } from "./login";
import { RegisterState } from "@/types/auth/auth.type";

type RegisterResponse = {
    success: boolean;
    message: string;
    data?: unknown;
    redirectTo?: string;
};

export const register = async (
    _prevState: RegisterState,
    formData: FormData,
): Promise<RegisterResponse> => {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    const payload = {
        email,
        password,
        username: String(formData.get("username") || "").trim(),
        firstName: String(formData.get("firstName") || "").trim(),
        lastName: String(formData.get("lastName") || "").trim(),
    };

    try {
        const res = await serverFetch.post("/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message ||
                    "Failed to create account",
            };
        }

        /*
         * Registration successful.
         * Now automatically login with the same credentials.
         */

        const loginFormData = new FormData();

        loginFormData.set("email", email);
        loginFormData.set("password", password);

        const loginResult = await login(
            {
                success: false,
                message: "",
            },
            loginFormData,
        );

        if (!loginResult.success) {
            return {
                success: false,
                message:
                    "Account created successfully, but automatic login failed. Please login manually.",
            };
        }

        return {
            success: true,
            message: "Account created successfully",
            redirectTo: "/feed",
        };
    } catch (error: unknown) {
        unstable_rethrow(error);

        console.error("Register error:", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Registration failed",
        };
    }
};