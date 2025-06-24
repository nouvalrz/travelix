import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";

import { Providers } from "./providers";

import { fontGeist, fontManrope } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Travelix",
    template: `%s | Travelix`,
  },
  description:
    "Travelix is your ultimate travel companion for booking tours, attractions, and experiences around the world. Discover top destinations, compare prices, and reserve tickets in just a few clicks.",
  icons: {
    icon: "/travelix-icon.svg",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-manrope antialiased",
          fontManrope.variable,
          fontGeist.variable
        )}
      >
        <NextTopLoader />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
