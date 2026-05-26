"use client";

import Button from "@/components/ui/button/button";
import { useState, useEffect } from "react";
import { DIAGNOSIS_QUESTIONS } from "@/libs/Diagnosisdata";
import { cn } from "@/libs/utils";
import { Search } from "public/icons";

interface QuestionStepProps {
  stepIndex: number;
  onNext: (answer: any) => void;
  onPrev: () => void;
}

export default function QuestionStep({ stepIndex, onNext, onPrev }: QuestionStepProps) {
  const question = DIAGNOSIS_QUESTIONS[stepIndex];
  const [choice, setChoice] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setChoice(null);
    setInputs({});
  }, [stepIndex]);

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (question.type === "choice") {
      if (stepIndex === 0) {
        onNext({ pet: choice === 0 ? "YES" : "NO" });
      } else if (stepIndex === 1) {
        onNext({ watering: question.options?.[choice!] });
      }
    } else {
      onNext({
        temperature: inputs["온도"],
        humidity: inputs["습도"],
      });
    }
  };

  const isNextDisabled =
    question.type === "choice"
      ? choice === null
      : question.inputs?.some((input) => !inputs[input] || inputs[input].trim() === "");

  return (
    <div className="flex flex-col flex-1 px-[24px] py-[32px] overflow-y-auto no-scrollbar relative">
      {/* Progress Bar */}
      <div className="flex gap-[8px] mb-[32px]">
        {DIAGNOSIS_QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "flex-1 h-[4px] rounded-full",
              idx <= stepIndex ? "bg-primary-0" : "bg-neutral-dark-n10 opacity-40"
            )}
          />
        ))}
      </div>

      <div className="mb-[40px]">
        <p className="text-[16px] text-primary-20 mb-[8px]">
          {stepIndex + 1}/{DIAGNOSIS_QUESTIONS.length}
        </p>
        <h2 className="text-[24px] font-bold text-primary-0 mb-[8px] whitespace-pre-line">
          {question.title}
        </h2>
        <p className="text-[14px] text-primary-10">
          {question.description}
        </p>
      </div>

      <div className="flex flex-col gap-[16px] mb-[40px]">
        {question.type === "choice" &&
          question.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setChoice(idx)}
              className={cn(
                "w-full h-[64px] rounded-[12px] border text-[18px] font-bold text-left px-[24px] transition-colors",
                choice === idx
                  ? "bg-[#A1B88B] border-primary-0 text-neutral-dark-0"
                  : "bg-neutral-light-n10 border-transparent text-neutral-dark-0 hover:bg-[#e4d3b0]"
              )}
            >
              {opt}
            </button>
          ))}

        {question.type === "input" &&
          question.inputs?.map((inputLabel, idx) => (
            <div key={idx} className="w-full h-[64px] rounded-[12px] border border-border-subtle bg-neutral-light-n10 px-[24px] flex items-center">
              <input
                type="text"
                placeholder={inputLabel}
                value={inputs[inputLabel] || ""}
                onChange={(e) => handleInputChange(inputLabel, e.target.value)}
                className="w-full bg-transparent outline-none text-[18px] font-medium text-neutral-dark-0 placeholder:text-neutral-dark-30"
              />
            </div>
          ))}
      </div>

      <div className="flex gap-[12px] mb-20 ">
        <Button text="이전" variant="variant4" style={{ flex: 1 }} onClick={onPrev} />
        {stepIndex === DIAGNOSIS_QUESTIONS.length - 1 ? (
          <Button
            text="환경 분석하기"
            variant="default"
            style={{ flex: 1 }}
            onClick={handleNext}
            disabled={isNextDisabled}
            leftIcon={<Search className="w-[20px] h-[20px]" />}
          />
        ) : (
          <Button
            text="다음"
            variant="default"
            style={{ flex: 1 }}
            onClick={handleNext}
            disabled={isNextDisabled}
          />
        )}
      </div>
    </div>
  );
}
