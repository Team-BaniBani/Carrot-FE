"use client";

import { Close } from "public/icons";
import { cn } from "@/libs/utils";
import Image from "next/image";

interface DiagnosisReadyProps {
  images: { id: string; url: string }[];
  onRemove: (id: string) => void;
  onAddMore: () => void;
  className?: string;
}

export default function DiagnosisReady({
  images,
  onRemove,
  onAddMore,
  className,
}: DiagnosisReadyProps) {
  const mainImage = images[0]?.url;

  return (
    <div className={cn("flex flex-col gap-[24px]", className)}>
      <div className="relative w-full h-[228px] rounded-card overflow-hidden bg-neutral-light-n30">
        {mainImage && (
          <img
            src={mainImage}
            alt="Main preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-[12px]">
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-medium text-neutral-dark-n10">
            {images.length}/3장
          </span>
        </div>

        <div className="flex gap-[12px]">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-[80px] h-[80px] rounded-[12px] overflow-hidden bg-white border border-neutral-light-10 shrink-0"
            >
              <img
                src={img.url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemove(img.id)}
                className="absolute top-[4px] right-[4px] w-[20px] h-[20px] flex items-center justify-center bg-black/40 rounded-full text-white"
              >
                <Close className="w-[12px] h-[12px]" />
              </button>
            </div>
          ))}

          {/* Empty Slots / Add Button */}
          {images.length < 3 && (
            <button
              onClick={onAddMore}
              className="flex items-center justify-center w-[80px] h-[80px] rounded-[12px] border border-dashed border-interactive-primary-default bg-interactive-primary-caption text-secondary shrink-0 active:scale-[0.95] transition-transform"
            >
              <span className="text-[24px] font-light">+</span>
            </button>
          )}

          {/* Placeholder slots to show 3 slots total if needed */}
          {Array.from({ length: Math.max(0, 2 - images.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-[80px] h-[80px] rounded-[12px] border border-neutral-light-10 bg-neutral-light-n30/30 shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
