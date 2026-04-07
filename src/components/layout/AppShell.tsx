"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  // TODO: Header should be rendered here.
  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1 pb1-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
