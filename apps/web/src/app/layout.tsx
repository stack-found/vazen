import type { Metadata, Viewport } from "next";
import "@/lib/orpc/server";
import "@/styles/globals.css";
import { cn } from "@repo/ui/lib/utils";
import { Providers } from "@/app/providers";
import { fontsVariable } from "@repo/ui/fonts";

export const metadata: Metadata = {
  title: "Vazen",
  description: "A production grade monorepo starter to build full-stack applications",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/favicon-dark.png",
        href: "/images/favicon-dark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/favicon-light.png",
        href: "/images/favicon-light.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", fontsVariable, "font-sans")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
