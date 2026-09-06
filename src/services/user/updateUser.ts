"use server";

import { revalidatePath } from "next/cache";

import { serverFetch } from "@/lib/api/server-fetch";
import { IUser, UpdateUserInput } from "@/types/user/user.type";

type UpdateUserResult =
    | { success: true; data: IUser }
    | { success: false; message: string };

export async function updateUser(
    input: UpdateUserInput,
): Promise<UpdateUserResult> {
    try {
        const response = await serverFetch.patch("/users/me", {
            body: JSON.stringify(input),
        });
        const result = (await response.json()) as {
            success?: boolean;
            message?: string;
            data?: IUser;
        };

        if (!response.ok || !result.success || !result.data) {
            return { success: false, message: result.message ?? "Unable to update profile." };
        }

        revalidatePath("/profile");
        return { success: true, data: result.data };
    } catch {
        return { success: false, message: "Unable to update profile." };
    }
}
