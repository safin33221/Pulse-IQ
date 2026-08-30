import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <form className="space-y-5">
        {/* Name */}
        <div className="grid gap-5 sm:grid-cols-2">
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
              required
            />
          </div>

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
              required
            />
          </div>
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
            required
          />
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
            required
          />

          <p className="text-xs text-muted-foreground">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
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
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-11 w-full"
        >
          Create account
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
      >
        Continue with Google
      </Button>
    </div>
  );
}