"use client";

import { cn } from "@/libs/utils";

type FilterChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[30px] items-center justify-center rounded-[12px] px-3 transition-colors",
        isActive
          ? "bg-primary text-neutral-light-30"
          : "bg-neutral-light-10 text-neutral-dark-30"
      )}
    >
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}
