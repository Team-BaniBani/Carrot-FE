import type { ReactNode } from "react";

export default function OnboardingFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-layer-canvas">
      <div className="absolute inset-0 -z-10 bg-layer-canvas" />
      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-app flex-col px-4 pt-8">
        {children}
      </div>
    </main>
  );
}
