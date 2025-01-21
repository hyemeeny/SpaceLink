import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers as QueryClientProvider } from "./providers";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Layout/Header";

export const metadata: Metadata = {
  title: "Linkbrary",
  description: "나만의 링크를 관리하는 Linkbrary",
};

const ToastProvider = () => {
  return <Toaster />;
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
          <ToastProvider />
          <Header />
          {children}
        </QueryClientProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
