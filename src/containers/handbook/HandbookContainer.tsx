"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterChip from "./HandbookFilterChip";
import PlantCard from "./HandbookPlantCard";
import { Close } from "public/icons";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import { getPlantList } from "@/services/plants/plants";
import { recommendPlants } from "@/services/diagnosis";
import type { PlantListItem } from "@/services/plants/plants";

const CATEGORIES = ["전체", "관리 쉬운", "공기 정화", "소형"];

export default function HandbookContainer() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [plants, setPlants] = useState<PlantListItem[]>([]);
  const [envName, setEnvName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { savedIds, toggleSaved } = useSavedPlants();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const envId = searchParams.get("env");

    const fetchPlants = async () => {
      try {
        setLoading(true);
        if (envId) {
          const result = await recommendPlants(envId);
          setEnvName(result.env_type.name);
          const allPlants = [...result.optimal, ...result.possible].map((p) => ({
            id: p.id,
            name: p.name_ko,
            englishName: p.name_en,
            description: p.explanation ?? "",
            badges: [p.management_difficulty, `공기정화 ${p.air_purification_effect}`, p.size].filter(Boolean),
            imageUrl: p.image_path ?? undefined,
          }));
          setPlants(allPlants);
        } else {
          const all = await getPlantList();
          setPlants(all);
        }
      } catch (err) {
        console.error("식물 목록 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [searchParams]);

  const filteredPlants = plants.filter((plant) => {
    if (activeCategory === "전체") return true;
    if (activeCategory === "관리 쉬운") return plant.badges.some((b) => b === "쉬움" || b === "매우 쉬움");
    if (activeCategory === "공기 정화") return plant.badges.some((b) => b.includes("공기정화"));
    if (activeCategory === "소형") return plant.badges.some((b) => b === "소형" || b.includes("소형"));
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 max-w-[600px] w-full mx-auto">
      <header className="flex h-[56px] items-center justify-center relative max-w-[600px] w-full px-[16px]">
        <button onClick={() => router.back()} className="absolute left-[16px]">
          <Close className="w-6 h-6" />
        </button>
        <h1 className="text-[16px] font-bold text-neutral-dark-0">식물 추천</h1>
      </header>

      <div className="flex flex-col gap-[8px] px-[16px] py-[24px]">
        <h2 className="text-[24px] font-bold leading-[36px] text-primary-0 whitespace-pre-line">
          {"생활 공간에 맞는\n식물을 찾았어요"}
        </h2>
        <p className="text-[14px] text-primary-10">
          {envName ? `${envName} · ` : ""}{loading ? "로딩 중..." : `${filteredPlants.length}종 추천`}
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
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[200px] gap-[8px]">
            <div className="w-8 h-8 rounded-full border-2 border-primary-0 border-t-transparent animate-spin" />
            <p className="text-[14px] text-primary-10">식물 정보를 불러오는 중...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px] w-full px-[16px] pb-[80px]">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => router.push(`/dictionary/${plant.id}`)}
                className="cursor-pointer w-full"
              >
                <PlantCard
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
              </div>
            ))}
            {filteredPlants.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[200px] gap-[8px]">
                <p className="text-[16px] text-primary-10">해당 조건의 식물이 없어요</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
