"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "@/../public/icons/index";
import { cn } from "@/libs/utils";
import { MY_PLANTS_SAVED } from "@/constants/my-plants/content";

const CHIP_CLASS_NAME =
  "inline-flex items-center rounded-full bg-primary-40 px-2 py-[2px] text-body-s text-primary";

export default function MyPlantsSavedList() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState(() => new Set(MY_PLANTS_SAVED.map((plant) => plant.id)));

  const handleToggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="flex flex-1 flex-col gap-card">
      {MY_PLANTS_SAVED.map((plant) => {
        const isSaved = savedIds.has(plant.id);

        return (
          <article
            key={plant.id}
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/dictionary/${plant.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                router.push(`/dictionary/${plant.id}`);
              }
            }}
            className="cursor-pointer rounded-card bg-card-bg p-page shadow-[0_0_20px_rgba(42,31,19,0.1)]"
          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={plant.environmentIconUrl}
                  alt=""
                  className="h-6 w-6"
                />
                <span className="text-body-s text-neutral-dark-0 whitespace-nowrap">
                  {plant.environmentLabel}
                </span>
              </div>
              <button
                type="button"
                aria-pressed={isSaved}
                aria-label={`${plant.name} 저장 토글`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggleSaved(plant.id);
                }}
                className="rounded-full p-1 transition-transform active:scale-90"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 heart-filter",
                    isSaved && "heart-filter-active",
                  )}
                />
              </button>
            </header>

            <div className="mt-3 flex gap-card">
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-card bg-neutral-light-20">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="h-full w-full object-cover"
                />
                {plant.imageOverlayUrl ? (
                  <img
                    src={plant.imageOverlayUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="space-y-0.5">
                  <p className="text-heading-xxs text-primary">{plant.name}</p>
                  <p className="text-body-s text-primary-20">{plant.englishName}</p>
                </div>
                <div className="space-y-1">
                  <span className={CHIP_CLASS_NAME}>{plant.tags.primary}</span>
                  <div className="flex flex-wrap gap-1">
                    {plant.tags.secondary.map((tag) => (
                      <span key={tag} className={CHIP_CLASS_NAME}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
