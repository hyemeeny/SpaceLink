import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Layout/Header2/Header";
import StarBackground from "@/components/StarBackground";

export const metadata: Metadata = {
  title: "SPACELINK",
  description: "우주의 별처럼 반짝이는 링크를 한곳에 ✨ \n 나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀",
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
