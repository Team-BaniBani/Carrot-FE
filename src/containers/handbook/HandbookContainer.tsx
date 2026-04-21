"use client";

import { useState } from "react";
import FilterChip from "./FilterChip";
import PlantCard from "./PlantCard";
import { Close } from "public/icons";
import Image from "next/image";

const CATEGORIES = ["전체", "관리 쉬운", "공기 정화", "소형"];

const MOCK_PLANTS = [
  {
    id: 1,
    name: "스투키",
    englishName: "Stucky",
    description: "공기정화 효과가 뛰어나고 관리가 쉬운 다육식물입니다.",
    badges: ["관리 쉬움", "공기정화 높음", "중형"],
  },
  {
    id: 2,
    name: "고무나무",
    englishName: "Rubber Plant",
    description: "큰 잎이 매력적이며 실내 공기정화에 효과적입니다.",
    badges: ["관리 쉬움", "공기정화 높음", "대형"],
  },
  {
    id: 3,
    name: "파키라",
    englishName: "Pachira",
    description: "집들이 선물로 인기가 많으며 공기정화 능력이 탁월합니다.",
    badges: ["관리 보통", "공기정화 높음", "대형"],
  },
  {
    id: 4,
    name: "몬스테라",
    englishName: "Monstera",
    description: "독특한 잎 모양으로 인테리어 식물로 인기가 매우 높습니다.",
    badges: ["관리 보통", "공기정화 보통", "중형"],
  },
  {
    id: 5,
    name: "산세베리아",
    englishName: "Sansevieria",
    description: "밤에 산소를 배출하여 침실에 두기 좋은 식물입니다.",
    badges: ["관리 쉬움", "공기정화 높음", "소형"],
  },
];

export default function HandbookContainer() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div className="flex-1 flex flex-col min-h-0 max-w-[600px] w-full mx-auto">
      {/* Header */}
      <header className="flex h-14 items-center justify-center relative max-w-[600px] w-full px-4 border-b border-neutral-light-10">
       <Close className="absolute left-4" />
        <h1 className="text-[16px] font-bold text-neutral-dark-0">식물 추천</h1>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col gap-2 px-4 py-6">
        <h2 className="text-[24px] font-bold leading-[36px] text-neutral-dark-0 whitespace-pre-line">
          {"생활 공간에 맞는\n식물을 찾았어요"}
        </h2>
        <p className="text-[14px] text-neutral-dark-30 opacity-70">
          햇빛이 풍부한 공간 · {MOCK_PLANTS.length}종 추천
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* Plant List - Scrollable Area */}
      <div className="flex-1 min-h-0 overflow-y-scroll max-w-[600px] w-full no-scrollbar">
        <div className="flex flex-col gap-4 w-full px-4 pb-20">
          {MOCK_PLANTS.map((plant) => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              englishName={plant.englishName}
              description={plant.description}
              badges={plant.badges}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
