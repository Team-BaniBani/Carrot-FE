const CHIP_CLASS_NAME =
  "inline-flex items-center rounded-full bg-primary-40 px-2 py-[2px] text-body-s text-primary";

interface PlantDetailSummaryProps {
  name: string;
  englishName: string;
  description: string;
  tags: string[];
}

export default function PlantDetailSummary({ name, englishName, description, tags }: PlantDetailSummaryProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-0.5">
        <h1 className="text-heading-s text-primary">{name}</h1>
        <p className="text-body-m text-primary-20">{englishName}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className={CHIP_CLASS_NAME}>
            {tag}
          </span>
        ))}
      </div>

      <p className="text-body-s text-neutral-dark-0">
        {description}
      </p>
    </section>
  );
}
