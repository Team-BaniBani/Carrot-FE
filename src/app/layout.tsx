import type { Metadata } from "next";
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
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="h-full flex flex-col bg-background font-sans text-text">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
