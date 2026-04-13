import type { ReactNode } from "react";

export default function OnboardingFrame({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-layer-canvas">
      <div className="absolute inset-0 -z-10 bg-layer-canvas" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[375px] flex-col px-4 pt-8">
        {children}
      </div>
    </main>
  );
}
