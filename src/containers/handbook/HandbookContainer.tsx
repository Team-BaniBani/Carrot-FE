"use client";

import { useState, useEffect } from "react";
import FilterChip from "./HandbookFilterChip";
import PlantCard from "./HandbookPlantCard";
import { Close } from "public/icons";
import { listPlants } from "@/services/dictionary";
import type { PlantResponse } from "@/services/diagnosis";
import { useRouter, useSearchParams } from "next/navigation";
import { recommendPlants } from "@/services/diagnosis";

const CATEGORIES = ["전체", "관리 쉬운", "공기 정화", "소형"];

function mapManagementLabel(val: string): string {
  if (val === "매우 쉬움" || val === "쉬움") return "관리 쉬움";
  if (val === "보통") return "관리 보통";
  return "관리 어려움";
}

function getPlantBadges(plant: PlantResponse): string[] {
  return [
    mapManagementLabel(plant.management_difficulty),
    `공기정화 ${plant.air_purification_effect}`,
    plant.size,
  ];
}

export default function HandbookContainer() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [plants, setPlants] = useState<PlantResponse[]>([]);
  const [envName, setEnvName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
          const allPlants = [...result.optimal, ...result.possible];
          setPlants(allPlants);
        } else {
          const all = await listPlants();
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
    if (activeCategory === "관리 쉬운") {
      return plant.management_difficulty === "쉬움" || plant.management_difficulty === "매우 쉬움";
    }
    if (activeCategory === "공기 정화") {
      return plant.air_purification_effect === "높음" || plant.air_purification_effect === "매우 높음";
    }
    if (activeCategory === "소형") {
      return plant.size === "소형" || plant.size === "소형~중형";
    }
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
              <button
                key={plant.id}
                onClick={() => router.push(`/dictionary/${plant.id}`)}
                className="text-left w-full"
              >
                <PlantCard
                  name={plant.name_ko}
                  englishName={plant.name_en}
                  description={plant.explanation ?? `${plant.watering} · ${plant.appropriate_temperature}`}
                  badges={getPlantBadges(plant)}
                />
              </button>
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
