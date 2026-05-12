"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const shouldHideBottomNav = pathname.startsWith("/onboarding");

  return (
    <div className="flex w-full flex-col items-center h-full">
      <main className="w-full flex-1 min-h-0">
        {children}
      </main>
      {!shouldHideBottomNav ? <BottomNav /> : null}
    </div>
  );
}
