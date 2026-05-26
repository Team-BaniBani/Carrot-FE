import PlantDetailTopBar from "@/containers/dictionary/PlantDetailTopBar";
import PlantDetailHero from "@/containers/dictionary/PlantDetailHero";
import PlantDetailSummary from "@/containers/dictionary/PlantDetailSummary";
import PlantDetailEnvironment from "@/containers/dictionary/PlantDetailEnvironment";
import { PLANT_DETAIL_HEADER_TITLE } from "@/constants/dictionary/plantDetail";
import { getPlantDetail } from "@/services/plants/plants";
import { notFound } from "next/navigation";

type PlantDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PlantDetailPage({ params }: PlantDetailPageProps) {
  const { id } = await params;
  const plant = await getPlantDetail(id);

  if (!plant) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col gap-section overflow-auto bg-background px-page pb-[calc(64px+env(safe-area-inset-bottom))] pt-section">
      <PlantDetailTopBar
        plantData={{ id: plant.id, name: plant.name, englishName: plant.englishName, imageUrl: plant.imageUrl, tags: plant.tags }}
        title={PLANT_DETAIL_HEADER_TITLE}
      />
      <div className="-mx-page">
        <PlantDetailHero imageUrl={plant.imageUrl} name={plant.name} />
      </div>
      <PlantDetailSummary
        name={plant.name}
        englishName={plant.englishName}
        tags={plant.tags}
        description={plant.description}
      />
      <PlantDetailEnvironment environment={plant.environment} />
    </div>
  );
}
