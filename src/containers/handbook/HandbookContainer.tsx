"use client";

import { useState } from "react";
import FilterChip from "./HandbookFilterChip";
import PlantCard from "./HandbookPlantCard";
import { Close } from "public/icons";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import type { PlantListItem } from "@/services/plants/plants";


const CATEGORIES = ["전체", "관리 쉬운", "공기 정화", "소형"];

type HandbookContainerProps = {
  plants: PlantListItem[];
};

export default function HandbookContainer({ plants }: HandbookContainerProps) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const { savedIds, toggleSaved } = useSavedPlants();

  return (
    <div className="flex-1 flex flex-col min-h-0 max-w-[600px] w-full mx-auto">
      <header className="flex h-[56px] items-center justify-center relative max-w-[600px] w-full px-[16px]">
       <Close className="absolute left-[16px]" />
        <h1 className="text-[16px] font-bold text-neutral-dark-0">식물 추천</h1>
      </header>

      <div className="flex flex-col gap-[8px] px-[16px] py-[24px]">
        <h2 className="text-[24px] font-bold leading-[36px] text-primary-0 whitespace-pre-line">
          {"생활 공간에 맞는\n식물을 찾았어요"}
        </h2>
        <p className="text-[14px] text-primary-10">
          햇빛이 풍부한 공간 · {plants.length}종 추천
        </p>
      </div>

      <div className="flex gap-[8px] px-[16px] pb-[16px] overflow-x-auto no-scrollbar shrink-0">
        {CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-scroll max-w-[600px] w-full no-scrollbar">
        <div className="flex flex-col gap-[16px] w-full px-[16px] pb-[80px]">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              englishName={plant.englishName}
              description={plant.description}
              badges={plant.badges}
              imageUrl={plant.imageUrl}
              isBookmarked={savedIds.includes(plant.id)}
              onBookmarkClick={() => toggleSaved({
                id: plant.id,
                name: plant.name,
                englishName: plant.englishName,
                imageUrl: plant.imageUrl ?? "/icons/plant.svg",
                tags: plant.badges,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
