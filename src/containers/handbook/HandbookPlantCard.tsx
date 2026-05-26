"use client";

import Image from "next/image";
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

function HeartIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#DD805F" : "none"} stroke={filled ? "#DD805F" : "#B2A590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}

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
    <div className="flex flex-col gap-[16px] rounded-[16px] bg-neutral-light-20 p-[16px] w-full max-w-[600px]">
      <div className="flex gap-[16px]">
        {/* Plant Image Placeholder */}
        <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[12px] bg-neutral-light-20">
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
              <h3 className="text-[18px] font-bold text-primary-0 leading-[1.2]">{name}</h3>
              <button
                type="button"
                onClick={onBookmarkClick}
                aria-pressed={isBookmarked}
                aria-label={`${name} 저장 토글`}
                className="transition-colors mt-[-4px] mr-[-4px] p-[4px]"
              >
                <HeartIcon filled={isBookmarked} className="w-[24px] h-[24px]" />
              </button>
            </div>
            <p className="text-[12px] text-primary-10 mt-[4px] leading-[1.2]">{englishName}</p>
          </div>

          <div className="flex flex-wrap gap-[6px] mt-auto">
            {badges.map((badge) => (
              <span
                key={badge}
                className="flex h-[22px] items-center rounded-full bg-[#B7C4A1] px-[8px] text-[11px] font-medium text-[#4A5D2A]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-[14px] leading-[21px] text-primary-10">
        {description}
      </p>
    </div>
  );
}
