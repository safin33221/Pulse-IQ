import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
    return (
        <div className="w-full">

            {/* Login Card */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Welcome back
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Sign in to continue to Pulse IQ.
                    </p>
                </div>

                <form className="space-y-5">
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
                            required
                        />
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
                            required
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="h-11 w-full"
                    >
                        Sign in
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
                >
                    Continue with Google
                </Button>
            </div>


        </div>
    );
}