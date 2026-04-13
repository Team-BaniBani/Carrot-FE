"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingActions from "@/containers/onboarding/OnboardingActions";
import OnboardingFrame from "@/containers/onboarding/OnboardingFrame";
import OnboardingStage from "@/containers/onboarding/OnboardingStage";
import { ONBOARDING_STEPS } from "@/constants/onboarding/content";

const STEP_STORAGE_KEY = "onboarding-step";
const DONE_STORAGE_KEY = "onboarding-completed";
const DONE_COOKIE_KEY = "onboarding-completed";

type OnboardingStep = 1 | 2 | 3;

function normalizeStep(value: number): OnboardingStep {
  if (value === 2 || value === 3) return value;
  return 1;
}

function markOnboardingDone() {
  localStorage.setItem(DONE_STORAGE_KEY, "true");
  localStorage.setItem(STEP_STORAGE_KEY, "3");
  document.cookie = `${DONE_COOKIE_KEY}=true; path=/; max-age=31536000; samesite=lax`;
}

export default function OnboardingContainer() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  useEffect(() => {
    const done = localStorage.getItem(DONE_STORAGE_KEY);

    if (done === "true") {
      router.replace("/home");
      return;
    }

    const storedStep = Number(localStorage.getItem(STEP_STORAGE_KEY));
    const normalizedStep = normalizeStep(storedStep);
    setCurrentStep(normalizedStep);
  }, [router]);

  const content = ONBOARDING_STEPS[currentStep - 1];

  const handleNext = () => {
    if (currentStep === 3) {
      markOnboardingDone();
      router.push("/home");
      return;
    }

    const nextStep = normalizeStep(currentStep + 1);
    setCurrentStep(nextStep);
    localStorage.setItem(STEP_STORAGE_KEY, String(nextStep));
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      markOnboardingDone();
      router.push("/home");
      return;
    }

    localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));
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
