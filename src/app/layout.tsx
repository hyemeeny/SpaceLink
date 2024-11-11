import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Linkbrary",
  description: "나만의 링크를 관리하는 Linkbrary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray01">{children}</body>
    </html>
  );
}
