"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Home",
    href: "/feed",
  },
  {
    label: "Explore",
    href: "/discover",
  },
  {
    label: "Saved",
    href: "/saved",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo + Navigation */}
        <div className="flex h-full items-center gap-6">
          <Link
            href="/feed"
            className="flex items-center gap-2"
            aria-label="Pulse IQ Home"
          >
            {/* Logo mark */}
            <span className="flex size-6 items-center justify-center rounded-[6px] bg-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
            </span>

            {/* Logo text */}
            <span className="text-[20px] font-semibold tracking-[-0.04em]">
              Pulse<span className="text-primary">IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            type="button"
            className="hidden h-9 w-[328px] items-center gap-2 rounded-full border border-border bg-background px-3.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/40 md:flex"
            aria-label="Search news"
          >
            <Search className="size-4 shrink-0" />

            <span className="truncate">
              Search news, topics, sources
            </span>
          </button>

          {/* Mobile Search */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Search"
          >
            <Search className="size-[18px]" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-[19px]" />

            {/* Notification indicator */}
            <span className="absolute right-[7px] top-[6px] size-1.5 rounded-full bg-primary" />
          </button>

          {/* Avatar */}
          <button
            type="button"
            className="flex max-md:hidden size-8 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background transition-opacity hover:opacity-80"
            aria-label="Open profile"
          >
            AR
          </button>
        </div>
      </div>
    </header>
  );
}