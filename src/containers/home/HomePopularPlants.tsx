import {
  HOME_POPULAR_PLANTS,
  HOME_POPULAR_SECTION_TITLE,
} from "@/constants/home/content";

export default function HomePopularPlants() {
  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-neutral-dark-0">
        {HOME_POPULAR_SECTION_TITLE}
      </h2>

      <div className="mt-[6px] flex gap-3 overflow-x-auto pb-1">
        {HOME_POPULAR_PLANTS.map((plant) => (
          <article
            key={plant.id}
            className="w-[clamp(96px,22vw,120px)] shrink-0 bg-card-bg p-3 shadow-[0_0_20px_rgba(42,31,19,0.1)]"
          >
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="aspect-square w-full object-cover"
            />
            <div className="mt-2 space-y-[2px]">
              <p className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-primary">
                {plant.name}
              </p>
              <p className="text-[12px] leading-[18px] text-primary-20">{plant.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
