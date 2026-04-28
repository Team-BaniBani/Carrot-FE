"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingActions from "@/containers/onboarding/OnboardingActions";
import OnboardingFrame from "@/containers/onboarding/OnboardingFrame";
import OnboardingStage from "@/containers/onboarding/OnboardingStage";
import { ONBOARDING_STEPS } from "@/constants/onboarding/content";

const DONE_COOKIE_KEY = "onboarding-completed";

type OnboardingStep = 1 | 2 | 3;

function normalizeStep(value: number): OnboardingStep {
  if (value === 2 || value === 3) return value;
  return 1;
}

function markOnboardingDone() {
  document.cookie = `${DONE_COOKIE_KEY}=true; path=/; max-age=31536000; samesite=lax`;
}

export default function OnboardingContainer() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  const content = ONBOARDING_STEPS[currentStep - 1];

  const handleNext = () => {
    if (currentStep === 3) {
      markOnboardingDone();
      router.push("/home");
      return;
    }

    const nextStep = normalizeStep(currentStep + 1);
    setCurrentStep(nextStep);
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      markOnboardingDone();
      router.push("/home");
      return;
    }

    router.push("/");
  };

  return (
    <OnboardingFrame>
      <OnboardingStage
        step={content.step}
        imageSrc={content.imageSrc}
        imageAlt={content.imageAlt}
        title={content.title}
        description={content.description}
      />

      <OnboardingActions
        actionText={content.actionText}
        skipText={content.skipText}
        onAction={handleNext}
        onSkip={handleSkip}
      />
    </OnboardingFrame>
  );
}
