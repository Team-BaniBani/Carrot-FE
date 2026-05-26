"use client";

import { useEffect, useState } from "react";
import { HOME_POPULAR_SECTION_TITLE } from "@/constants/home/content";
import { useRouter } from "next/navigation";
import { listPlants } from "@/services/dictionary";
import type { PlantResponse } from "@/services/diagnosis";
import { Plant } from "public/icons";

export default function HomePopularPlants() {
  const router = useRouter();
  const [plants, setPlants] = useState<PlantResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPlants()
      .then((data) => setPlants(data.slice(0, 6)))
      .catch(() => setPlants([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mt-6">
      <h2 className="text-[16px] font-bold leading-[24px] tracking-[0.64px] text-neutral-dark-0">
        {HOME_POPULAR_SECTION_TITLE}
      </h2>

      <div className="mt-[6px] flex gap-3 overflow-x-auto pb-1">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[clamp(96px,22vw,120px)] shrink-0 bg-card-bg p-3 animate-pulse shadow-[0_0_20px_rgba(42,31,19,0.1)]">
              <div className="aspect-square w-full bg-neutral-light-10 rounded-[8px]" />
              <div className="mt-2 h-4 bg-neutral-light-10 rounded w-3/4" />
            </div>
          ))
        ) : plants.length > 0 ? (
          plants.map((plant) => (
            <article
              key={plant.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/dictionary/${plant.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/dictionary/${plant.id}`);
              }}
              className="cursor-pointer w-[clamp(96px,22vw,120px)] shrink-0 bg-card-bg p-3 shadow-[0_0_20px_rgba(42,31,19,0.1)] rounded-[12px]"
            >
              <div className="aspect-square w-full bg-neutral-light-10 rounded-[8px] flex items-center justify-center">
                <Plant className="w-[40px] h-[40px] text-primary-20" />
              </div>
              <div className="mt-2 space-y-[2px]">
                <p className="text-[14px] font-bold leading-[20px] tracking-[0.56px] text-primary truncate">
                  {plant.name_ko}
                </p>
                <p className="text-[11px] leading-[16px] text-primary-20 truncate">{plant.management_difficulty}</p>
              </div>
            </article>
          ))
        ) : null}
      </div>
    </section>
  );
}
