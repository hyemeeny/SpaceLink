import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers as QueryClientProvider } from "./providers";
import Header from "@/components/Layout/Header";

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
      <body>
        <QueryClientProvider>
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
