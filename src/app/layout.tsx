import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";
import API_URL from "@/constants/config";
import Header from "@/components/Layout/Header/Header";
import StarBackground from "@/components/common/StarBackground";
import KakaoScript from "@/components/common/KakaoScript";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "SPACELINK",
  description: "우주의 별처럼 반짝이는 링크를 한곳에 ✨ 나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀",
  openGraph: {
    title: "SPACELINK",
    description: "우주의 별처럼 반짝이는 링크를 한곳에 ✨ 나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.jpg`,
        alt: "SPACELINK",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "SPACELINK",
    locale: "ko_KR",
    type: "website",
  },
};

const Pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-Pretendard",
});

const PyeongChangPeace = localFont({
  src: [
    { path: "../fonts/PyeongChangPeace-Light.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PyeongChangPeace-Bold.woff2", weight: "700", style: "bold" },
  ],
  display: "swap",
  variable: "--font-PyeongChangPeace",
});

const ToastProvider = () => {
  return <Toaster />;
};

const getUser = async () => {
  const token = cookies().get("accessToken")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="ko" className={`${Pretendard.variable} ${PyeongChangPeace.variable}`}>
      <body>
        <QueryProvider initialUser={user}>
          <StarBackground />
          <ToastProvider />
          <Header />
          {children}
        </QueryProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
