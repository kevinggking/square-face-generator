import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Square Face Icon Generator",
  description: "Create cute square avatars instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}