import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "SLUG",
  description: "SLUG - seul log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="w-full h-full overflow-hidden">
      <body className="w-full h-screen overflow-auto">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              success:
                "bg-gray-900 text-gray-100 shadow-lg",
              error: "bg-red-100 text-red-900 border border-red-200 shadow-lg",
            },
          }}
          icons={{ success: <CheckBadgeIcon className="h-4 w-4 text-black" /> }}
        />
      </body>
    </html>
  );
}
