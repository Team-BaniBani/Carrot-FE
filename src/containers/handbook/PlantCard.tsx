"use client";

import Image from "next/image";
import { Bookmark } from "@/../public/icons";
import { cn } from "@/libs/utils";

type PlantCardProps = {
  name: string;
  englishName: string;
  description: string;
  badges: string[];
  imageUrl?: string;
  isBookmarked?: boolean;
  onBookmarkClick?: () => void;
};

export default function PlantCard({
  name,
  englishName,
  description,
  badges,
  imageUrl,
  isBookmarked,
  onBookmarkClick,
}: PlantCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[12px] bg-neutral-light-10 p-4 w-full max-w-[600px] ">
      <div className="flex gap-4">
        {/* Plant Image Placeholder */}
        <div className="relative h-[100px] overflow-hidden rounded-[12px] bg-neutral-light-20">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-dark-30 opacity-20 italic">
              image placeholder
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-neutral-dark-0">{name}</h3>
              <button
                type="button"
                onClick={onBookmarkClick}
                className={cn(
                  "transition-colors",
                  isBookmarked ? "text-primary" : "text-neutral-dark-30"
                )}
              >
                <Bookmark className="h-6 w-6" />
              </button>
            </div>
            <p className="text-[14px] text-neutral-dark-30">{englishName}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="flex h-[22px] items-center rounded-full bg-neutral-light-10 px-2 text-[10px] font-medium text-neutral-dark-30"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-[12px] leading-[18px] text-neutral-dark-30 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
