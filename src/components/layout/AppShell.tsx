"use client";

import { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  // TODO: Header should be rendered here.
  return <>{children}</>;
}
