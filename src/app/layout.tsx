import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Layout/header/Header";
import StarBackground from "@/components/StarBackground";

export const metadata: Metadata = {
  title: "Linkbrary",
  description: "나만의 링크를 관리하는 Linkbrary",
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const ToastProvider = () => {
  return <Toaster />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body>
        <StarBackground />
        <ToastProvider />
        <Header />
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
