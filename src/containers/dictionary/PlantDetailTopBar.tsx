"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "@/../public/icons/index";
import { cn } from "@/libs/utils";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import { SavedPlantData } from "@/stores/useSavedPlantsStore";

type PlantDetailTopBarProps = {
  plantData: SavedPlantData;
  title: string;
};

export default function PlantDetailTopBar({ plantData, title }: PlantDetailTopBarProps) {
  const router = useRouter();
  const { savedIds, toggleSaved } = useSavedPlants();
  const isSaved = savedIds.includes(plantData.id);

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.back()}
        className="rounded-full p-1 transition-transform active:scale-90"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <span className="text-heading-xxs text-neutral-dark-0">
        {title}
      </span>
      <button
        type="button"
        aria-pressed={isSaved}
        aria-label="식물 저장 토글"
        onClick={() => toggleSaved(plantData)}
        className="rounded-full p-1 transition-transform active:scale-90"
      >
        <Heart
          className={cn(
            "h-6 w-6 heart-filter",
            isSaved && "heart-filter-active",
          )}
        />
      </button>
    </div>
  );
}
