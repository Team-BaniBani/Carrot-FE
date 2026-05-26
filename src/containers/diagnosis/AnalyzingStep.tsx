"use client";

import { useEffect, useState, useRef } from "react";
import { Plant, Search, CheckCircle, Circle } from "public/icons";
import {
  analyzeImage,
  diagnoseEnvironment,
  recommendPlants,
  type PlantRecommendResponse,
  type ImageAnalysisResponse,
} from "@/services/diagnosis";

interface ImageItem {
  id: string;
  url: string;
  file?: File;
}

interface AnalyzingStepProps {
  images: ImageItem[];
  answers: {
    pet?: string;
    watering?: string;
    temperature?: string;
    humidity?: string;
  };
  onComplete: (data: { analysisResult: ImageAnalysisResponse; environmentId: string; recommendResult: PlantRecommendResponse }) => void;
}

export default function AnalyzingStep({ images, answers, onComplete }: AnalyzingStepProps) {
  const [phase, setPhase] = useState(1);
  const [checkPhase, setCheckPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      try {
        // Phase 1: 이미지 분석 (3초 딜레이로 자연스럽게)
        const file = images.find((img) => img.file)?.file;
        if (!file) throw new Error("이미지 파일을 찾을 수 없어요.");

        const analysisResult = await analyzeImage(file);

        setPhase(2);
        setCheckPhase(0);

        // Phase 2: 환경 진단
        const temperature = parseFloat(answers.temperature || "22");
        const humidity = answers.humidity || "50%";
        const sunlight = analysisResult.sunlight;

        const diagnosisResult = await diagnoseEnvironment(sunlight, temperature, humidity);
        const environmentId = diagnosisResult.environment_id;

        setCheckPhase(1);

        // Phase 3: 식물 추천
        const recommendResult = await recommendPlants(environmentId);

        setCheckPhase(2);

        // 쿠키 저장
        document.cookie = "diagnosis-completed=true; path=/; max-age=31536000";
        document.cookie = `diagnosis-environment-id=${environmentId}; path=/; max-age=31536000`;

        // 완료 후 결과 전달 (UI가 보이도록 500ms 대기)
        setTimeout(() => {
          onComplete({ analysisResult, environmentId, recommendResult });
        }, 800);
      } catch (err: any) {
        console.error("Analysis error:", err);
        setError(err?.response?.data?.detail || err?.message || "분석 중 오류가 발생했어요.");
      }
    };

    run();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-[24px] gap-[16px]">
        <div className="w-[80px] h-[80px] rounded-full bg-neutral-light-10 flex items-center justify-center mb-[8px]">
          <Plant className="w-[40px] h-[40px] text-primary-0" />
        </div>
        <h2 className="text-[20px] font-bold text-primary-0 text-center">분석에 실패했어요</h2>
        <p className="text-[14px] text-primary-10 text-center leading-[1.6]">{error}</p>
        <p className="text-[12px] text-neutral-dark-30 text-center">백엔드 서버가 실행 중인지 확인해주세요</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-[24px]">
      <div className="w-[120px] h-[120px] rounded-full bg-neutral-light-10 flex items-center justify-center relative overflow-hidden mb-[32px]">
        <div
          className="absolute top-[50%] left-[-50%] w-[200%] h-[200%] bg-primary-50 opacity-60 rounded-[43%] animate-spin"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute top-[55%] left-[-50%] w-[200%] h-[200%] bg-primary-20 opacity-80 rounded-[40%] animate-spin"
          style={{ animationDuration: "7s", animationDirection: "reverse" }}
        />

        {phase === 1 ? (
          <Plant className="w-[48px] h-[48px] text-primary-0 z-10" />
        ) : (
          <Search className="w-[48px] h-[48px] text-primary-0 z-10" />
        )}
      </div>

      <h2 className="text-[24px] font-bold text-primary-0 mb-[16px] text-center">
        {phase === 1 ? "사진을 분석하고 있어요" : "환경 조건을 파악 중이에요"}
      </h2>

      <p className="text-[16px] text-primary-10 text-center leading-[1.5] mb-[40px]">
        {phase === 1 ? (
          <>
            AI가 공간의 햇빛, 통풍, 온도,<br />습도를 꼼꼼히 살펴보는 중이에요
          </>
        ) : (
          <>
            창문의 방향과 크기,<br />공간의 특성을 분석하고 있어요
          </>
        )}
      </p>

      {phase === 1 ? (
        <p className="text-[16px] text-primary-20 font-medium">잠시만 기다려주세요</p>
      ) : (
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[12px] text-primary-0">
            <CheckCircle className="w-[20px] h-[20px]" />
            <span className="text-[16px] font-medium">햇빛 분석 완료</span>
          </div>
          <div className={`flex items-center gap-[12px] ${checkPhase >= 1 ? "text-primary-0" : "text-neutral-dark-0"}`}>
            {checkPhase >= 1 ? <CheckCircle className="w-[20px] h-[20px]" /> : <Circle className="w-[20px] h-[20px]" />}
            <span className="text-[16px] font-medium">
              {checkPhase >= 1 ? "온도·습도 분석 완료" : "온도·습도 분석중"}
            </span>
          </div>
          <div className={`flex items-center gap-[12px] ${checkPhase >= 2 ? "text-primary-0" : "text-neutral-dark-30"}`}>
            {checkPhase >= 2 ? <CheckCircle className="w-[20px] h-[20px]" /> : <Circle className="w-[20px] h-[20px]" />}
            <span className="text-[16px] font-medium">
              {checkPhase >= 2 ? "식물 매칭 완료" : checkPhase === 1 ? "식물 매칭중" : "식물 매칭 대기"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
