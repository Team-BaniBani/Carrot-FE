import { PLANT_DETAIL } from "@/constants/dictionary/plantDetail";

const CHIP_CLASS_NAME =
  "inline-flex items-center rounded-full bg-primary-40 px-2 py-[2px] text-body-s text-primary";

export default function PlantDetailSummary() {
  return (
    <section className="space-y-3">
      <div className="space-y-0.5">
        <h1 className="text-heading-s text-primary">{PLANT_DETAIL.name}</h1>
        <p className="text-body-m text-primary-20">{PLANT_DETAIL.englishName}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {PLANT_DETAIL.tags.map((tag) => (
          <span key={tag} className={CHIP_CLASS_NAME}>
            {tag}
          </span>
        ))}
      </div>

      <p className="text-body-s text-neutral-dark-0">
        {PLANT_DETAIL.description}
      </p>
    </section>
  );
}
