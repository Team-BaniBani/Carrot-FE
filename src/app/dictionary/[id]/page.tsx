import PlantDetailTopBar from "@/containers/dictionary/PlantDetailTopBar";
import PlantDetailHero from "@/containers/dictionary/PlantDetailHero";
import PlantDetailSummary from "@/containers/dictionary/PlantDetailSummary";
import PlantDetailEnvironment from "@/containers/dictionary/PlantDetailEnvironment";

export default function PlantDetailPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col gap-section overflow-auto bg-background px-page pb-[calc(64px+env(safe-area-inset-bottom))] pt-section">
      <PlantDetailTopBar />
      <div className="-mx-page">
        <PlantDetailHero />
      </div>
      <PlantDetailSummary />
      <PlantDetailEnvironment />
    </div>
  );
}
