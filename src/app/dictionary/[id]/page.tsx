import { getPlantDetail } from "@/services/dictionary";
import PlantDetailTopBar from "@/containers/dictionary/PlantDetailTopBar";
import PlantDetailHero from "@/containers/dictionary/PlantDetailHero";
import PlantDetailSummary from "@/containers/dictionary/PlantDetailSummary";
import PlantDetailEnvironment from "@/containers/dictionary/PlantDetailEnvironment";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const plant = await getPlantDetail(id);
    return {
      title: `${plant.name_ko} | Carrot`,
      description: plant.explanation ?? `${plant.name_ko} 식물 정보`,
    };
  } catch {
    return { title: "식물 정보 | Carrot" };
  }
}

export default async function PlantDetailPage({ params }: Props) {
  const { id } = await params;

  let plant;
  try {
    plant = await getPlantDetail(id);
  } catch {
    plant = null;
  }

  if (!plant) {
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col items-center justify-center gap-4 bg-background">
        <p className="text-[18px] font-bold text-primary-0">식물 정보를 불러올 수 없어요</p>
        <p className="text-[14px] text-primary-10">잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  const tags: string[] = [
    plant.management_difficulty,
    `공기정화 ${plant.air_purification_effect}`,
    plant.size,
    plant.pet_stability,
  ];

  const environment = [
    { id: "water" as const, label: "물주기", value: plant.watering },
    { id: "temperature" as const, label: "적정 온도", value: plant.appropriate_temperature },
    { id: "humidity" as const, label: "적정 습도", value: plant.appropriate_humidity },
    { id: "sunlight" as const, label: "햇빛", value: plant.sunlight_requirements },
  ];

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col gap-section overflow-auto bg-background px-page pb-[calc(64px+env(safe-area-inset-bottom))] pt-section">
      <PlantDetailTopBar plantId={plant.id} plantName={plant.name_ko} />
      <div className="-mx-page">
        <PlantDetailHero imageUrl="/icons/plant.svg" altText={plant.name_ko} />
      </div>
      <PlantDetailSummary
        name={plant.name_ko}
        englishName={plant.name_en}
        description={plant.explanation ?? `${plant.watering} · ${plant.appropriate_temperature}`}
        tags={tags}
      />
      <PlantDetailEnvironment environment={environment} />
    </div>
  );
}
