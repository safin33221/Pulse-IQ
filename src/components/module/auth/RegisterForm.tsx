"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
    initialRegisterState,
    RegisterState,
} from "@/types/auth/auth.type";
import { register } from "@/services/auth/registration";

export function RegisterForm() {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<
        RegisterState,
        FormData
    >(
        register,
        initialRegisterState,
    );

    useEffect(() => {
        if (state.success && state.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state.success, state.redirectTo, router]);

    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <form action={formAction} className="space-y-5">
                {/* General Error */}
                {state.message && !state.success && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {state.message}
                    </div>
                )}

                {/* Name */}
                <div className="grid gap-5 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="space-y-2">
                        <Label htmlFor="firstName">
                            First name
                        </Label>

                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            autoComplete="given-name"
                            className="h-11"
                            disabled={isPending}
                            required
                        />

                        {state.errors?.firstName?.[0] && (
                            <p className="text-xs text-destructive">
                                {state.errors.firstName[0]}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <Label htmlFor="lastName">
                            Last name
                        </Label>

                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            autoComplete="family-name"
                            className="h-11"
                            disabled={isPending}
                            required
                        />

                        {state.errors?.lastName?.[0] && (
                            <p className="text-xs text-destructive">
                                {state.errors.lastName[0]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <Label htmlFor="username">
                        Username
                    </Label>

                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        autoComplete="username"
                        className="h-11"
                        disabled={isPending}
                        required
                    />

                    {state.errors?.username?.[0] && (
                        <p className="text-xs text-destructive">
                            {state.errors.username[0]}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">
                        Email address
                    </Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-11"
                        disabled={isPending}
                        required
                    />

                    {state.errors?.email?.[0] && (
                        <p className="text-xs text-destructive">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">
                        Password
                    </Label>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        className="h-11"
                        disabled={isPending}
                        required
                    />

                    <p className="text-xs text-muted-foreground">
                        Use at least 8 characters with a mix of
                        letters and numbers.
                    </p>

                    {state.errors?.password?.[0] && (
                        <p className="text-xs text-destructive">
                            {state.errors.password[0]}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        Confirm password
                    </Label>

                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="h-11"
                        disabled={isPending}
                        required
                    />

                    {state.errors?.confirmPassword?.[0] && (
                        <p className="text-xs text-destructive">
                            {state.errors.confirmPassword[0]}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={isPending}
                >
                    {isPending
                        ? "Creating account..."
                        : "Create account"}
                </Button>
            </form>

            {/* Social Login */}
            <div className="my-6 flex items-center gap-3">
                <Separator className="flex-1" />

                <span className="text-xs text-muted-foreground">
                    OR
                </span>

                <Separator className="flex-1" />
            </div>

            <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                disabled={isPending}
            >
                Continue with Google
            </Button>
        </div>
    );
}