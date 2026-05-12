import React from "react";
import { cn } from "@/libs/utils";

interface EnvironmentDetailBarProps {
  icon: React.ReactNode;
  label: string;
  valueText: string;
  percentage: number;
  iconColorClass?: string;
}

export default function EnvironmentDetailBar({
  icon,
  label,
  valueText,
  percentage,
  iconColorClass = "text-primary-0",
}: EnvironmentDetailBarProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <div className={cn("flex items-center gap-[8px] font-medium", iconColorClass)}>
          {icon}
          <span className="text-neutral-dark-0">{label}</span>
        </div>
        <span className="text-[14px] font-bold text-primary-0">{valueText}</span>
      </div>
      <div className="w-full h-[6px] bg-neutral-light-n10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-0 transition-all duration-500" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}
