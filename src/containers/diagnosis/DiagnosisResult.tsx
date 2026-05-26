"use client";

import { Search, Sun, Wind, Thermometer, Droplet, Plant } from "public/icons";
import SpaceFeatureAnalysis from "@/components/ui/spaceFeature/analysis/SpaceFeatureAnalysis";
import Button from "@/components/ui/button/button";
import EnvironmentDetailBar from "./EnvironmentDetailBar";
import { ENV_TYPE_MAPPING } from "@/constants/diagnosis/envMapping";
import type { ImageAnalysisResponse, PlantRecommendResponse } from "@/services/diagnosis";
import { useRouter } from "next/navigation";

interface ImageItem {
  id: string;
  url: string;
}

interface DiagnosisResultProps {
  images: ImageItem[];
  resultData: {
    analysisResult: ImageAnalysisResponse;
    environmentId: string;
    recommendResult: PlantRecommendResponse;
  } | null;
  onRestart: () => void;
  onViewPlants: () => void;
}

export default function DiagnosisResult({ images, resultData, onRestart, onViewPlants }: DiagnosisResultProps) {
  const router = useRouter();
  const envDetail = resultData ? ENV_TYPE_MAPPING[resultData.environmentId] : null;
  const envType = resultData?.recommendResult?.env_type;
  const optimalPlants = resultData?.recommendResult?.optimal ?? [];
  const possiblePlants = resultData?.recommendResult?.possible ?? [];
  const allPlants = [...optimalPlants, ...possiblePlants];

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

      {/* 업로드된 사진 */}
      <div className="flex gap-[12px] z-10 overflow-x-auto no-scrollbar mb-[32px] shrink-0 min-h-[100px]">
        {images && images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className="relative w-[100px] h-[100px] rounded-[16px] overflow-hidden shrink-0 bg-neutral-light-10">
              <img src={img.url} alt="upload" className="w-full h-full object-cover" />
            </div>
          ))
        ) : (
          <div className="w-[100px] h-[100px] rounded-[16px] bg-neutral-light-10 flex items-center justify-center shrink-0">
            <span className="text-[12px] text-neutral-dark-30 text-center px-2">사진 없음</span>
          </div>
        )}
      </div>

      {/* 환경 유형 카드 */}
      <div className="mb-[40px]">
        <SpaceFeatureAnalysis
          badgeText="AI 분석"
          title={envType?.name ?? "환경 분석 완료"}
          description={`추천 식물 ${allPlants.length}종 보기`}
          sideLabel="나의 환경 유형"
          onClick={() => {
            if (resultData?.environmentId) {
              router.push(`/handbook?env=${resultData.environmentId}`);
            }
          }}
        />
      </div>

      {/* 환경 상세 바 */}
      {envDetail && (
        <div className="mb-[40px]">
          <h3 className="text-[18px] font-bold text-neutral-dark-0 mb-[24px]">환경 상세</h3>
          <div className="flex flex-col gap-[20px]">
            <EnvironmentDetailBar
              icon={<Sun className="w-[20px] h-[20px]" />}
              label="햇빛"
              valueText={envDetail.sunlight.text}
              percentage={envDetail.sunlight.percentage}
              iconColorClass="text-primary-0"
            />
            <EnvironmentDetailBar
              icon={<Wind className="w-[20px] h-[20px]" />}
              label="통풍"
              valueText={envDetail.ventilation.text}
              percentage={envDetail.ventilation.percentage}
              iconColorClass="text-[#4A80B4]"
            />
            <EnvironmentDetailBar
              icon={<Thermometer className="w-[20px] h-[20px]" />}
              label="온도"
              valueText={envDetail.temperature.text}
              percentage={envDetail.temperature.percentage}
              iconColorClass="text-[#D49836]"
            />
            <EnvironmentDetailBar
              icon={<Droplet className="w-[20px] h-[20px]" />}
              label="습도"
              valueText={envDetail.humidity.text}
              percentage={envDetail.humidity.percentage}
              iconColorClass="text-primary-0"
            />
          </div>
        </div>
      )}

      {/* 추천 식물 미리보기 */}
      {allPlants.length > 0 && (
        <div className="mb-[40px]">
          <h3 className="text-[18px] font-bold text-neutral-dark-0 mb-[16px]">추천 식물</h3>
          <div className="flex gap-[12px] overflow-x-auto no-scrollbar">
            {allPlants.slice(0, 5).map((plant) => (
              <button
                key={plant.id}
                onClick={() => router.push(`/dictionary/${plant.id}`)}
                className="flex flex-col items-center gap-[8px] shrink-0 w-[80px]"
              >
                <div className="w-[72px] h-[72px] rounded-[12px] bg-neutral-light-10 flex items-center justify-center overflow-hidden">
                  <Plant className="w-[32px] h-[32px] text-primary-20" />
                </div>
                <p className="text-[12px] font-medium text-primary-0 text-center leading-[1.3] w-full truncate">
                  {plant.name_ko}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-[12px] mt-auto mb-20 pb-[20px]">
        <Button
          text="내 공간에 맞는 식물 보기"
          variant="default"
          onClick={onViewPlants}
          leftIcon={<Plant className="w-[20px] h-[20px]" />}
        />
        <Button text="다시 진단하기" variant="variant4" onClick={onRestart} />
      </div>
    </div>
  );
}
