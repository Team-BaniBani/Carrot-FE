import { PLANT_DETAIL } from "@/constants/dictionary/plantDetail";

export default function PlantDetailHero() {
  return (
    <div className="w-full overflow-hidden rounded-[24px]">
      <img
        src={PLANT_DETAIL.imageUrl}
        alt={PLANT_DETAIL.name}
        className="w-full h-auto"
      />
    </div>
  );
}
