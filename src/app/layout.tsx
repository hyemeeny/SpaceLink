import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Layout/header/Header";
import StarBackground from "@/components/StarBackground";

export const metadata: Metadata = {
  title: "우주링크",
  description: "나만의 링크를 보관하는 우주링크",
};

const Pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-Pretendard",
});

const PyeongChangPeace = localFont({
  src: [
    { path: "../fonts/PyeongChangPeace-Light.ttf", weight: "400", style: "normal" },
    { path: "../fonts/PyeongChangPeace-Bold.ttf", weight: "700", style: "bold" },
  ],
  display: "swap",
  variable: "--font-PyeongChangPeace",
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
    <html lang="ko" className={`${Pretendard.variable} ${PyeongChangPeace.variable}`}>
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
