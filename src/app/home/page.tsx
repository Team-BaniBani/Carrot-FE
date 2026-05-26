import getDiagnosisStatus from "@/services/home/getDiagnosisStatus";
import HomeHeader from "@/containers/home/HomeHeader";
import HomeSpaceFeature from "@/containers/home/HomeSpaceFeature";
import HomePopularPlants from "@/containers/home/HomePopularPlants";
import HomePlantTip from "@/containers/home/HomePlantTip";
import DiagnosedRediagnoseAction from "@/containers/home/DiagnosedRediagnoseAction";
import DiagnosedSavedPlantsSection from "@/containers/home/DiagnosedSavedPlantsSection";
import { getPopularPlants } from "@/services/plants/plants";

export default async function HomePage() {
  const isDiagnosed = await getDiagnosisStatus();
  const popularPlants = isDiagnosed ? [] : await getPopularPlants();

  return (
    <div className="mx-auto flex flex-1 w-full max-w-app flex-col overflow-auto bg-background px-4 pb-6 pt-6 min-h-0">
      <HomeHeader isDiagnosed={isDiagnosed} />
      <HomeSpaceFeature isDiagnosed={isDiagnosed} />
      {isDiagnosed ? (
        <>
          <DiagnosedRediagnoseAction />
          <DiagnosedSavedPlantsSection />
        </>
      ) : (
        <>
          <HomePopularPlants plants={popularPlants} />
          <HomePlantTip />
        </>
      )}
    </div>
  );
}
