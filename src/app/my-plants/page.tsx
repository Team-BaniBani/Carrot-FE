import MyPlantsSavedSection from "@/containers/my-plants/MyPlantsSavedSection";
import MyPlantsEmptyState from "@/containers/my-plants/MyPlantsEmptyState";

export default function MyPlantsPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-app flex-1 flex-col gap-section bg-background px-page py-page">
      <MyPlantsSavedSection />
      <MyPlantsEmptyState />
    </div>
  );
}
