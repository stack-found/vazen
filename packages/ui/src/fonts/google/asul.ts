import { Asul } from "next/font/google";

export const asul = Asul({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-asul",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
