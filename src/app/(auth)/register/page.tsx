import Link from "next/link";

import { RegisterForm } from "@/components/module/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left - Static Content */}
                <section className="hidden lg:flex">
                    <div className="mx-auto flex w-full max-w-xl flex-col justify-center px-12 xl:px-20">
                        {/* Brand */}
                        <Link
                            href="/"
                            className="mb-10 flex w-fit items-center gap-2"
                            aria-label="Pulse IQ"
                        >
                            <span className="flex size-10 items-center justify-center rounded-xl bg-foreground">
                                <span className="size-2 rounded-full bg-primary" />
                            </span>

                            <span className="text-2xl font-bold tracking-tight">
                                Pulse<span className="text-primary">IQ</span>
                            </span>
                        </Link>

                        {/* Content */}
                        <div className="max-w-lg">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                                Smarter news
                            </p>

                            <h1 className="text-4xl font-bold tracking-[-0.04em] xl:text-5xl">
                                Stay informed.
                                <br />
                                <span className="text-muted-foreground">
                                    Think deeper.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                                Pulse IQ brings the stories that matter to you
                                into one intelligent feed, helping you understand
                                what is happening without the noise.
                            </p>

                            {/* Features */}
                            <div className="mt-10 space-y-6">
                                <Feature
                                    title="Personalized news"
                                    description="Follow the topics and stories that matter to you."
                                />

                                <Feature
                                    title="AI-powered insights"
                                    description="Understand complex stories with concise summaries."
                                />

                                <Feature
                                    title="Less noise, more signal"
                                    description="Discover important stories without endless scrolling."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right - Registration */}
                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-md">

                        {/* Mobile Brand */}
                        <div className="mb-8 flex justify-center lg:hidden">
                            <Link
                                href="/"
                                className="flex items-center gap-2"
                                aria-label="Pulse IQ"
                            >
                                <span className="flex size-10 items-center justify-center rounded-xl bg-foreground">
                                    <span className="size-2 rounded-full bg-primary" />
                                </span>

                                <span className="text-2xl font-bold tracking-tight">
                                    Pulse<span className="text-primary">IQ</span>
                                </span>
                            </Link>
                        </div>

            
                        {/* Form */}
                        <RegisterForm />

                        {/* Login CTA */}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>

                        {/* Terms */}
                        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                            By creating an account, you agree to Pulse IQ&apos;s{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-2 hover:text-foreground"
                            >
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-2 hover:text-foreground"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

interface FeatureProps {
    title: string;
    description: string;
}

function Feature({ title, description }: FeatureProps) {
    return (
        <div className="flex gap-4">
            <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="size-2 rounded-full bg-primary" />
            </div>

            <div>
                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}