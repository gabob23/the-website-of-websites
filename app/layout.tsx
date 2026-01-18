import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projects Dashboard",
  description: "Manage all your projects in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
