import type { Metadata } from "next";
import OnboardingContainer from "@/containers/onboarding/OnboardingContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ONBOARDING_DONE_COOKIE_KEY = "onboarding-completed";
const DEFAULT_REDIRECT_PATH = "/home";

export const metadata: Metadata = {
  title: "Onboarding | Carrot",
  description: "Carrot onboarding flow",
};

type OnboardingPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\");
}

function resolveRedirectPath(nextPath: string | undefined) {
  if (!nextPath) return DEFAULT_REDIRECT_PATH;
  return isSafeInternalPath(nextPath) ? nextPath : DEFAULT_REDIRECT_PATH;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const resolvedSearchParams = await searchParams;
  const redirectPath = resolveRedirectPath(resolvedSearchParams?.next);
  const cookieStore = await cookies();
  const isOnboardingDone =
    cookieStore.get(ONBOARDING_DONE_COOKIE_KEY)?.value === "true";

  if (isOnboardingDone) {
    redirect(redirectPath);
  }

  return <OnboardingContainer />;
}
