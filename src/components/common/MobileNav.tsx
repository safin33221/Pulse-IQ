"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Compass,
  House,
  UserRound,
  Bookmark,
} from "lucide-react";

const navigation = [
  {
    label: "Home",
    href: "/feed",
    icon: House,
  },
  {
    label: "Explore",
    href: "/discover",
    icon: Compass,
  },
  {
    label: "Saved",
    href: "/saved",
    icon: Bookmark,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid h-[74px] max-w-md grid-cols-5">
        {navigation.map(
          ({ label, href, icon: Icon, badge }) => {
            const isActive =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center gap-1"
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute top-0 h-[2px] w-9 rounded-full bg-primary" />
                )}

                {/* Icon */}
                <span className="relative flex size-7 items-center justify-center">
                  <Icon
                    className={[
                      "size-[25px] transition-colors",
                      isActive
                        ? "text-primary stroke-[2.5]"
                        : "text-muted-foreground stroke-[1.8]",
                    ].join(" ")}
                  />

                  {/* Notification badge */}
                  {badge && badge > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold leading-none text-primary-foreground">
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </span>

                {/* Label */}
                <span
                  className={[
                    "text-[12px] font-medium leading-none transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {label}
                </span>
              </Link>
            );
          },
        )}
      </div>
    </nav>
  );
}