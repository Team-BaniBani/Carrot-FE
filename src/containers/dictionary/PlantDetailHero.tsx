type PlantDetailHeroProps = {
  imageUrl: string;
  name: string;
};

export default function PlantDetailHero({ imageUrl, name }: PlantDetailHeroProps) {
  return (
    <div className="w-full overflow-hidden rounded-[24px]">
      <img
        src={imageUrl}
        alt={name}
        className="h-auto w-full"
      />
    </div>
  );
}
