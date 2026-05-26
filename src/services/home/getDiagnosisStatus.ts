import { cookies } from "next/headers";

export default async function getDiagnosisStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("diagnosis-completed")?.value === "true";
}
