"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoScript = () => {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (!window.Kakao?.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      }}
    />
  );
};

export default KakaoScript;
