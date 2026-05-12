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
        "flex h-[32px] items-center justify-center rounded-full px-[16px] transition-colors border",
        isActive
          ? "bg-[#B7C4A1] border-[#657C3D] text-[#333333]"
          : "bg-transparent border-[#B2A590] text-[#333333] hover:bg-[#eddcba]"
      )}
    >
      <span className="text-[14px] font-medium">{label}</span>
    </button>
  );
}
