import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Header from "@/components/layout/header/Header";

const siteUrl = "https://seulslug.vercel.app";

export const metadata: Metadata = {
  title: "SLUG",
  description: "SLUG - seul log",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "SLUG",
    description: "SLUG - seul log",
    url: siteUrl,
    siteName: "SLUG",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/assets/images/BG.jpg",
        width: 1200,
        height: 630,
        alt: "SLUG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLUG",
    description: "SLUG - seul log",
    images: ["/assets/images/BG.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="w-full h-full overflow-hidden">
      <body className="w-full h-screen overflow-auto">
        <Header />
        {children}
        <Analytics />
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              success: "bg-gray-900 text-gray-100 shadow-lg",
              error: "bg-red-100 text-red-900 border border-red-200 shadow-lg",
            },
          }}
          icons={{ success: <CheckBadgeIcon className="h-4 w-4 text-black" /> }}
        />
      </body>
    </html>
  );
}
