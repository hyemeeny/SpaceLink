import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";

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
      <body className="bg-gray01">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
