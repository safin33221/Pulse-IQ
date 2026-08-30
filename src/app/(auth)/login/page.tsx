import Link from "next/link";

import { LoginForm } from "@/components/module/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Static Brand Content */}
        <section className="hidden bg-muted/30 lg:flex">
          <div className="mx-auto flex w-full max-w-xl flex-col justify-center px-12 xl:px-20">
            {/* Logo */}
            <Link
              href="/"
              className="mb-12 flex w-fit items-center gap-2"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-foreground">
                <span className="size-2 rounded-full bg-primary" />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Pulse<span className="text-primary">IQ</span>
              </span>
            </Link>

            {/* Hero Content */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Smarter news
              </p>

              <h1 className="max-w-lg text-4xl font-bold tracking-[-0.04em] xl:text-5xl">
                Stay informed.
                <br />
                <span className="text-muted-foreground">
                  Think deeper.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                Pulse IQ brings the stories that matter to you into one
                intelligent feed, helping you understand what is happening
                without the noise.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold">
                    Personalized news
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Follow the topics and stories that matter to you.
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    AI-powered insights
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Understand complex stories with concise summaries.
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Less noise, more signal
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Discover important stories without endless scrolling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 flex justify-center lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-foreground">
                  <span className="size-2 rounded-full bg-primary" />
                </span>

                <span className="text-2xl font-bold tracking-tight">
                  Pulse<span className="text-primary">IQ</span>
                </span>
              </Link>
            </div>


            {/* Only interactive form */}
            <LoginForm />

            {/* Static Register CTA */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&lsquo;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>

            {/* Static Legal Content */}
            <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
              By continuing, you agree to Pulse IQ&apos;s{" "}
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