import MyPlantsHeader from "@/containers/my-plants/MyPlantsHeader";
import MyPlantsSavedList from "@/containers/my-plants/MyPlantsSavedList";
import MyPlantsActions from "@/containers/my-plants/MyPlantsActions";
import MyPlantsEmptyState from "@/containers/my-plants/MyPlantsEmptyState";
import { MY_PLANTS_SAVED } from "@/constants/my-plants/content";

export default function MyPlantsPage() {
  const hasSavedPlants = MY_PLANTS_SAVED.length > 0;

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col gap-section bg-background px-page py-page">
      {hasSavedPlants ? (
        <>
          <div className="flex min-h-0 flex-1 flex-col gap-section overflow-auto">
            <MyPlantsHeader />
            <MyPlantsSavedList />
          </div>
          <MyPlantsActions />
        </>
      ) : (
        <MyPlantsEmptyState />
      )}
    </div>
  );
}
