"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { login } from "@/services/auth/login";
import {
    initialLoginState,
    LoginState,
} from "@/types/auth/auth.type";
import { useRouter } from "next/navigation";



export function LoginForm() {
    const router = useRouter();
    const [state, formAction, isPending] =
        useActionState<LoginState, FormData>(
            login,
            initialLoginState,
        );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (state.success) {
            router.push("/feed");
        }
    }, [state.success, router]);
    return (
        <div className="w-full">
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Welcome back
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Sign in to continue to Pulse IQ.
                    </p>
                </div>

                <form
                    action={formAction}
                    className="space-y-5"
                >
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
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            aria-invalid={!!state.errors?.email}
                            disabled={isPending}
                        />

                        {state.errors?.email && (
                            <p className="text-sm text-destructive">
                                {state.errors.email[0]}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="h-11"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            aria-invalid={!!state.errors?.password}
                            disabled={isPending}
                        />

                        {state.errors?.password && (
                            <p className="text-sm text-destructive">
                                {state.errors.password[0]}
                            </p>
                        )}
                    </div>

                    {/* General Error */}
                    {state.message && !state.success && (
                        <div
                            role="alert"
                            className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                        >
                            {state.message}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="h-11 w-full"
                        disabled={isPending}
                    >
                        {isPending
                            ? "Signing in..."
                            : "Sign in"}
                    </Button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <Separator className="flex-1" />

                    <span className="text-xs text-muted-foreground">
                        OR
                    </span>

                    <Separator className="flex-1" />
                </div>

                {/* Google */}
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full"
                    disabled={isPending}
                >
                    Continue with Google
                </Button>
            </div>
        </div>
    );
}