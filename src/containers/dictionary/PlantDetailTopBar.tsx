"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "@/../public/icons/index";
import { cn } from "@/libs/utils";

interface PlantDetailTopBarProps {
  plantId: string;
  plantName: string;
}

export default function PlantDetailTopBar({ plantId, plantName }: PlantDetailTopBarProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.back()}
        className="rounded-full p-1 transition-transform active:scale-90"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <span className="text-heading-xxs text-neutral-dark-0">식물 정보</span>
      <button
        type="button"
        aria-pressed={isSaved}
        aria-label={`${plantName} 저장 토글`}
        onClick={() => setIsSaved((prev) => !prev)}
        className="rounded-full p-1 transition-transform active:scale-90"
      >
        <Heart
          className={cn(
            "h-6 w-6 heart-filter",
            isSaved && "heart-filter-active",
          )}
        />
      </button>
    </div>
  );
}
