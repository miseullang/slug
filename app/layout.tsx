import type { Metadata } from "next";
import "./globals.css";

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
      <body className="w-full h-screen overflow-auto">{children}</body>
    </html>
  );
}
