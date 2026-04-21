import { Sun } from "public/icons";
import { cn } from "@/libs/utils";

interface TipsSectionProps {
  className?: string;
}

export default function TipsSection({ className }: TipsSectionProps) {
  const tips = [
    "식물을 놓을 공간 전체가 보이게 찍어주세요",
    "창문이 보이면 햇빛 분석이 더 정확해요",
    "낮 시간대에 촬영하면 좋아요",
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-[16px] p-[16px] bg-layer-elevated rounded-card shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-[12px]">
        <Sun className="w-6 h-6 text-[#DD805F]" />
        <h3 className="text-[14px] font-bold text-neutral-dark-0 leading-[21px]">
          좋은 사진 팁
        </h3>
      </div>
      <ul className="flex flex-col gap-[8px]">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="text-[12px] text-neutral-dark-20 leading-[18px] flex items-start gap-[8px]"
          >
            <span className="w-[4px] h-[4px] rounded-full bg-neutral-light-10 mt-[7px] shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
