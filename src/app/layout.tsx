import type { Metadata } from "next";
import { Kalam } from "next/font/google";
import "./globals.css";

const kalam = Kalam({ weight: "300", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "021@msu",
  description: "a community of builders and creators at Michigan State University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={kalam.className}>{children}</body>
    </html>
  );
}
