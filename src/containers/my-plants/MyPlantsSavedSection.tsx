"use client";

import MyPlantsHeader from "@/containers/my-plants/MyPlantsHeader";
import MyPlantsSavedList from "@/containers/my-plants/MyPlantsSavedList";
import MyPlantsActions from "@/containers/my-plants/MyPlantsActions";
import { useSavedPlants } from "@/hooks/useSavedPlants";

export default function MyPlantsSavedSection() {
  const { savedIds, isReady } = useSavedPlants();

  if (!isReady || savedIds.length === 0) return null;

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-section overflow-auto">
        <MyPlantsHeader />
        <MyPlantsSavedList />
      </div>
      <MyPlantsActions />
    </>
  );
}
