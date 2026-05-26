"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "@/../public/icons/index";
import { cn } from "@/libs/utils";
import { useSavedPlants } from "@/hooks/useSavedPlants";
import {
  getMyPlantCardId,
  useMyPlantsCaptureStore,
} from "@/stores/useMyPlantsCaptureStore";

const CHIP_CLASS_NAME =
  "inline-flex items-center rounded-full bg-primary-40 px-2 py-[2px] text-body-s text-primary";

export default function MyPlantsSavedList() {
  const router = useRouter();
  const { savedPlants, savedIds, isReady, toggleSaved } = useSavedPlants();
  const { selectMode, selectedId, setSelectedId } = useMyPlantsCaptureStore();
  const isSelecting = selectMode !== "none";
  const selectionLabel =
    selectMode === "share"
      ? "공유할 식물을 선택하세요."
      : "저장할 식물을 선택하세요.";

  useEffect(() => {
    if (selectedId && !savedIds.includes(selectedId)) {
      setSelectedId(null);
    }
  }, [savedIds, selectedId, setSelectedId]);

  if (!isReady || savedPlants.length === 0) return null;

  return (
    <section className="flex flex-1 flex-col gap-card">
      {isSelecting ? (
        <p className="text-body-s text-primary-20">{selectionLabel}</p>
      ) : null}
      {savedPlants.map((plant) => {
        const isSaved = savedIds.includes(plant.id);
        const isSelected = selectedId === plant.id;
        const [primaryTag, ...secondaryTags] = plant.tags;

        return (
          <article
            key={plant.id}
            id={getMyPlantCardId(plant.id)}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => {
              if (isSelecting) {
                setSelectedId(isSelected ? null : plant.id);
                return;
              }
              router.push(`/dictionary/${plant.id}`);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (isSelecting) {
                  setSelectedId(isSelected ? null : plant.id);
                  return;
                }
                router.push(`/dictionary/${plant.id}`);
              }
            }}
            className={cn(
              "cursor-pointer rounded-card border border-transparent bg-card-bg p-page shadow-[0_0_20px_rgba(42,31,19,0.1)] transition-colors",
              isSelecting && "hover:border-border-subtle",
              isSelected && "border-border-highlight",
            )}
          >
            <header className="flex justify-end">
              <button
                type="button"
                aria-pressed={isSaved}
                aria-label={`${plant.name} 저장 토글`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSaved(plant);
                  if (isSelected) setSelectedId(null);
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

            <div className="flex gap-card">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-card bg-neutral-light-20">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="space-y-0.5">
                  <p className="text-heading-xxs text-primary">{plant.name}</p>
                  <p className="text-body-s text-primary-20">{plant.englishName}</p>
                </div>
                <div className="space-y-1">
                  {primaryTag && <span className={CHIP_CLASS_NAME}>{primaryTag}</span>}
                  {secondaryTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {secondaryTags.map((tag) => (
                        <span key={tag} className={CHIP_CLASS_NAME}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
