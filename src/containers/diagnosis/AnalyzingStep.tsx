"use client";

import { useEffect, useState } from "react";
import { Plant, Search, CheckCircle, Circle } from "public/icons";

export default function AnalyzingStep({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);
  const [checkPhase, setCheckPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(2);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 2) {
      const timer1 = setTimeout(() => setCheckPhase(1), 1500); 
      const timer2 = setTimeout(() => setCheckPhase(2), 3000); 
      const finishTimer = setTimeout(() => onComplete(), 4500); 

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(finishTimer);
      };
    }
  }, [phase, onComplete]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-[24px]">
      <div className="w-[120px] h-[120px] rounded-full bg-neutral-light-10 flex items-center justify-center relative overflow-hidden mb-[32px]">
        <div className="absolute bottom-0 w-[150%] h-[40%] bg-primary-50 opacity-60 rounded-[50%]" style={{ transform: 'rotate(-5deg) translateY(20%)' }} />
        <div className="absolute bottom-0 w-[150%] h-[30%] bg-primary-20 opacity-80 rounded-[50%]" style={{ transform: 'rotate(5deg) translateY(10%)' }} />
        
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
        <p className="text-[16px] text-primary-20 font-medium">
          3~5초 소요
        </p>
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
