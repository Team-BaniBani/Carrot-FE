"use client";

import Button from "@/components/ui/button/button";

export default function OnboardingActions({
  actionText,
  skipText,
  onAction,
  onSkip,
}: {
  actionText: string;
  skipText?: string;
  onAction?: () => void;
  onSkip?: () => void;
}) {
  return (
    <section className="mt-auto flex flex-col items-center gap-3 pb-6 pt-2 fade-in-up fade-in-up-delay-3">
      <Button
        text={actionText}
        variant="default"
        width="311px"
        className="shadow-sm"
        onClick={onAction}
      />
      <button
        type="button"
        onClick={onSkip}
        className="text-[16px] leading-[24px] text-primary-20 underline-offset-4 transition-colors hover:text-text hover:underline"
      >
        {skipText}
      </button>
    </section>
  );
}
