"use client";

import Image from "next/image";
import { Search, Sun, Wind, Thermometer, Droplet, Plant } from "public/icons";
import SpaceFeatureAnalysis from "@/components/ui/spaceFeature/analysis/SpaceFeatureAnalysis";
import Button from "@/components/ui/button/button";
import EnvironmentDetailBar from "./EnvironmentDetailBar";

interface ImageItem {
  id: string;
  url: string;
}

interface DiagnosisResultProps {
  images: ImageItem[];
  onRestart: () => void;
  onViewPlants: () => void;
}

export default function DiagnosisResult({ images, onRestart, onViewPlants }: DiagnosisResultProps) {
  return (
    <div className="flex flex-col flex-1 px-[24px] py-[32px] overflow-y-auto no-scrollbar relative">
      <div className="flex items-center gap-[12px] mb-[24px]">
        <div className="w-[48px] h-[48px] rounded-full border-[2px] border-primary-0 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[20px] h-[20px] rounded-full border-[2px] border-primary-0" />
          </div>
          <Search className="w-[20px] h-[20px] text-primary-0 absolute bottom-[-4px] right-[-4px] bg-background" />
        </div>
        <div>
          <p className="text-[14px] text-primary-10 font-medium">AI가 분석한</p>
          <h2 className="text-[24px] font-bold text-primary-0 leading-[1.2]">당신의 환경은?</h2>
        </div>
      </div>

      <div className="flex gap-[12px] overflow-x-auto no-scrollbar mb-[32px]">
        {images.map((img) => (
          <div key={img.id} className="relative w-[100px] h-[100px] rounded-[16px] overflow-hidden shrink-0">
            <Image src={img.url} alt="upload" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mb-[40px]">
        <SpaceFeatureAnalysis
          badgeText="AI 분석"
          title="햇빛이 풍부한 공간"
          description="추천 식물 5종 보기"
          sideLabel="나의 환경 유형"
          onClick={() => {}}
        />
      </div>

      <div className="mb-[40px]">
        <h3 className="text-[18px] font-bold text-neutral-dark-0 mb-[24px]">환경 상세</h3>
        
        <div className="flex flex-col gap-[20px]">
          <EnvironmentDetailBar
            icon={<Sun className="w-[20px] h-[20px]" />}
            label="햇빛"
            valueText="매우 높음"
            percentage={80}
            iconColorClass="text-primary-0"
          />
          <EnvironmentDetailBar
            icon={<Wind className="w-[20px] h-[20px]" />}
            label="통풍"
            valueText="보통"
            percentage={50}
            iconColorClass="text-[#4A80B4]"
          />
          <EnvironmentDetailBar
            icon={<Thermometer className="w-[20px] h-[20px]" />}
            label="온도"
            valueText="보통 ~ 높음"
            percentage={60}
            iconColorClass="text-[#D49836]"
          />
          <EnvironmentDetailBar
            icon={<Droplet className="w-[20px] h-[20px]" />}
            label="습도"
            valueText="보통"
            percentage={50}
            iconColorClass="text-primary-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[12px] mt-auto mb-20 pb-[20px]">
        <Button text="내 공간에 맞는 식물 보기" variant="default" onClick={onViewPlants} leftIcon={<Plant className="w-[20px] h-[20px]" />} />
        <Button text="다시 진단하기" variant="variant4" onClick={onRestart} />
      </div>
    </div>
  );
}
