interface PlantDetailHeroProps {
  imageUrl: string;
  altText: string;
}

export default function PlantDetailHero({ imageUrl, altText }: PlantDetailHeroProps) {
  return (
    <div className="w-full overflow-hidden rounded-[24px]">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto"
      />
    </div>
  );
}
