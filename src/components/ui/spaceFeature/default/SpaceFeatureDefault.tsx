"use client";

import type { MouseEvent } from "react";
import { cn } from "@/libs/utils";
import { Camera, ArrowGreen } from "../../../../../public/icons";

type SpaceFeatureDefaultProps = {
  title?: string;
  description?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function SpaceFeatureDefault({
  title = "사진 한 장으로 환경 분석!",
  description = "AI가 사진을 보고 딱 맞는 식물을 찾아드려요",
  className,
  onClick,
}: SpaceFeatureDefaultProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "space-feature-default flex h-[154px] w-full items-start justify-between rounded-[12px] px-6 py-6 text-left",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <Camera className="h-10 w-10" />
        <div className="space-y-0.5">
          <p className="text-[20px] font-bold leading-[30px] tracking-[0.8px] text-neutral-light-30">
            {title}
          </p>
          <p className="text-[12px] font-normal leading-[18px] text-neutral-light-n10">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-end self-stretch">
        <ArrowGreen className="h-8 w-8" />
      </div>
    </button>
  );
}
