import localFont from "next/font/local";

export const commitMonoVazen = localFont({
  src: [
    {
      path: "./CommitMonoVazen.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-commitmono",
  preload: true,
});
