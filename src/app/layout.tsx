import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoHeading = Roboto({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pulse IQ",
    template: "%s | Pulse IQ",
  },
  description:
    "Pulse IQ helps you discover, understand, and keep up with the stories that matter.",
  applicationName: "Pulse IQ",
  keywords: [
    "news",
    "technology news",
    "AI news",
    "business news",
    "personalized news",
  ],
  authors: [{ name: "Pulse IQ" }],
  creator: "Pulse IQ",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://pulse-iq-kohl.vercel.app/",
  ),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<LayoutProps<"/">>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        outfit.variable,
        robotoHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}