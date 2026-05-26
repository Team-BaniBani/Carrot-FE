"use client";

import { Close } from "public/icons";
import UploadBox from "./DiagnosisUploadBox";
import TipsSection from "./DiagnosisTipsSection";
import DiagnosisReady from "./DiagnosisReady";
import QuestionStep from "./QuestionStep";
import AnalyzingStep from "./AnalyzingStep";
import DiagnosisResult from "./DiagnosisResult";
import { DIAGNOSIS_QUESTIONS } from "../../libs/Diagnosisdata";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Button from "@/components/ui/button/button";

interface ImageItem {
  id: string;
  url: string;
  file?: File;
}

export default function DiagnosisContainer() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [resultData, setResultData] = useState<any>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (files: FileList) => {
    const newImages: ImageItem[] = Array.from(files)
      .slice(0, 3 - images.length)
      .map((file) => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        file: file,
      }));

    setImages((prev) => [...prev, ...newImages]);
  };


  const handleRemove = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const isEmpty = images.length === 0;

  const handleNextStep = (answer: any) => {
    setAnswers((prev: any) => ({ ...prev, ...answer }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-[600px] mx-auto min-h-0 bg-background text-neutral-dark-0 relative">
      <header className="flex items-center justify-center h-[56px] px-[16px] bg-background border-b border-neutral-light-10 shrink-0 relative">
        <button onClick={() => step === 0 ? router.back() : setStep(0)} className="p-[4px] absolute left-[16px]">
          <Close className="w-6 h-6" />
        </button>
        <h1 className="text-[16px] font-regular text-neutral-dark-0">
          {step === 0 ? "사진 업로드" : step === DIAGNOSIS_QUESTIONS.length + 1 ? "환경 분석" : "환경 진단"}
        </h1>
      </header>

      {step === 0 ? (
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-[32px] px-[16px] py-[24px]">
            <div className="flex flex-col gap-[8px] justify-center items-center">
              <h2 className="text-[24px] font-bold leading-[36px] text-primary-0 whitespace-pre-line">
                {isEmpty ? "내 공간을 보여주세요!" : "사진이 준비됐어요!"}
              </h2>
              <p className="text-[14px] text-primary-10 leading-[21px]">
                {isEmpty
                  ? "실내 사진을 올리면 AI가 환경을 분석해드려요"
                  : images.length >= 3
                    ? "아래 사진으로 환경을 분석할게요"
                    : "여러 장이면 분석이 더 정확해요"}
              </p>
            </div>

            {isEmpty ? (
              <UploadBox onUpload={handleUpload} />
            ) : (
              <DiagnosisReady
                images={images}
                onRemove={handleRemove}
                onAddMore={() => hiddenInputRef.current?.click()}
              />
            )}

            {!isEmpty && (
              <div className="mt-4 mb-20">
                <Button
                  text="다음"
                  variant="default"
                  width="100%"
                  onClick={() => setStep(1)}
                />
              </div>
            )}


            {isEmpty && <TipsSection />}
          </div>
        </div>
      ) : step > 0 && step <= DIAGNOSIS_QUESTIONS.length ? (
        <QuestionStep
          stepIndex={step - 1}
          onPrev={() => setStep((prev) => prev - 1)}
          onNext={(answer) => handleNextStep(answer)}
        />
      ) : step === DIAGNOSIS_QUESTIONS.length + 1 ? (
        <AnalyzingStep 
          images={images}
          answers={answers}
          onComplete={(data) => {
            setResultData(data);
            setStep(step + 1);
          }} 
        />
      ) : step === DIAGNOSIS_QUESTIONS.length + 2 ? (
        <DiagnosisResult 
          images={images} 
          resultData={resultData}
          onRestart={() => {
            setStep(0);
            setImages([]);
            setAnswers({});
            setResultData(null);
            document.cookie = "diagnosis-completed=; path=/; max-age=0";
            document.cookie = "diagnosis-environment-id=; path=/; max-age=0";
          }}
          onViewPlants={() => {
            router.push("/home");
          }} 
        />
      ) : null}

      {!isEmpty && step === 0 && (
        <input
          type="file"
          ref={hiddenInputRef}
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          accept="image/*"
          multiple
          className="hidden"
        />
      )}
    </div>
  );
}

