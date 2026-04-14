"use client";

import type { MouseEvent } from "react";
import { cn } from "@/libs/utils";
import { Sun, ArrowOrange } from "../../../../../public/icons";

type SpaceFeatureAnalysisProps = {
  badgeText?: string;
  title?: string;
  description?: string;
  sideLabel?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function SpaceFeatureAnalysis({
  badgeText = "AI 분석",
  title = "햇빛이 풍부한 공간",
  description = "추천 식물 5종 보기",
  sideLabel = "나의 환경 유형",
  className,
  onClick,
}: SpaceFeatureAnalysisProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "space-feature-analysis flex h-[178px] w-[343px] items-start justify-between rounded-[12px] px-6 py-6 text-left",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <Sun className="h-10 w-10" />

        <div className="space-y-0.5">
          <span className="inline-flex h-[22px] items-center rounded-full bg-secondary-40 px-2 text-[12px] font-normal leading-[18px] text-secondary">
            {badgeText}
          </span>
          <p className="mt-1 text-[20px] font-bold leading-[30px] tracking-[0.8px] text-neutral-light-30">
            {title}
          </p>
          <p className="text-[12px] font-normal leading-[18px] text-neutral-light-n10">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch">
        <p className="text-[12px] font-normal leading-[18px] text-neutral-light-n10">
          {sideLabel}
        </p>
        <ArrowOrange className="h-8 w-8" />
      </div>
    </button>
  );
}
