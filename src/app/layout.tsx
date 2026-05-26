import type { Metadata } from "next";
import Script from "next/script";
import AppShell from "@/components/layout/AppShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Carrot App",
  description: "Next.js + Tailwind + Zustand starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? "";

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full flex flex-col bg-background font-sans text-text">
        <AppShell>{children}</AppShell>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
          strategy="afterInteractive"
        />
        <Script id="kakao-init" strategy="afterInteractive">
          {`
            if (typeof window !== "undefined") {
              const key = "${kakaoJsKey}";
              if (key && window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init(key);
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
