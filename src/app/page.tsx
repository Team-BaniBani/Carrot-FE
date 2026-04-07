import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const isOnboardingDone = cookieStore.get("onboarding-completed")?.value === "true";

  if (isOnboardingDone) {
    redirect("/home");
  }

  redirect("/onboarding");
}
