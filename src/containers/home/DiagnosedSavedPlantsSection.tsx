import {
  DIAGNOSED_EMPTY_SAVED_PLANTS_DESCRIPTION,
  DIAGNOSED_EMPTY_SAVED_PLANTS_TITLE,
  DIAGNOSED_SAVED_PLANTS,
  DIAGNOSED_SAVED_PLANTS_TITLE,
} from "@/constants/home/diagnosed";
import { Plant } from "@/../public/icons/index";

export default function DiagnosedSavedPlantsSection() {
  const hasSavedPlants = DIAGNOSED_SAVED_PLANTS.length > 0;

  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-neutral-dark-0">
        {DIAGNOSED_SAVED_PLANTS_TITLE}
      </h2>

      {hasSavedPlants ? (
        <div className="mt-[6px] flex flex-col gap-2">
          {DIAGNOSED_SAVED_PLANTS.map((plant) => (
            <article
              key={plant.id}
              className="flex h-20 items-center gap-4 overflow-hidden rounded-[12px] bg-card-bg shadow-[0_0_20px_rgba(42,31,19,0.1)]"
            >
              <img src={plant.imageUrl} alt={plant.name} className="h-20 w-20 object-cover" />

              <div className="min-w-0 flex-1 space-y-[2px]">
                <p className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-primary">
                  {plant.name}
                </p>
                <p className="text-[12px] leading-[18px] text-primary-20">{plant.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-[6px] flex flex-col items-center gap-3 px-5 py-6 text-center">
          <Plant className="icon-filter-green h-10 w-10 text-neutral-dark-0" />
          <p className="text-[18px] font-bold leading-[28px] tracking-[0.72px] text-primary">
            {DIAGNOSED_EMPTY_SAVED_PLANTS_TITLE}
          </p>
          <p className="whitespace-pre-line text-[14px] leading-[20px] text-primary-20">
            {DIAGNOSED_EMPTY_SAVED_PLANTS_DESCRIPTION}
          </p>
        </div>
      )}
    </section>
  );
}
