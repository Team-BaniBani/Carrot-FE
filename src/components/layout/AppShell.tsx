"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  // TODO: Header should be rendered here.
  return (
    <div className="flex flex-col h-dvh overflow-hidden items-center">
      <main className="flex-1 w-full flex flex-col min-h-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
