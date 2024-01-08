import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title =
  "Just an Experiment";
const description =
  "AI, knowledge, and distribution experiments";
const image = "https://justanexperiment.com/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://justanexperiment.com/favicon.ico"], 
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@justanexperim",
  },
  metadataBase: new URL("https://justanexperiment.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
