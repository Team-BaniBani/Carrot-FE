"use client";

import { Close } from "public/icons";
import UploadBox from "./UploadBox";
import TipsSection from "./TipsSection";
import DiagnosisReady from "./DiagnosisReady";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Button from "@/components/ui/button/button";

interface ImageItem {
  id: string;
  url: string;
}

export default function DiagnosisContainer() {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (files: FileList) => {
    const newImages: ImageItem[] = Array.from(files)
      .slice(0, 3 - images.length)
      .map((file) => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
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

  return (
    <div className="flex flex-col flex-1 w-full max-w-[600px] mx-auto min-h-0 bg-background text-neutral-dark-0 relative">
      <header className="flex items-center justify-between h-[56px] px-[16px] bg-background border-b border-neutral-light-10 shrink-0">
        <button onClick={() => router.back()} className="p-[4px]">
          <Close className="w-6 h-6 rotate-180" />
        </button>
        <h1 className="text-[16px] font-bold text-neutral-dark-0">사진 업로드</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-[32px] px-[16px] py-[24px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[24px] font-bold leading-[36px] text-neutral-dark-0 whitespace-pre-line">
              {isEmpty ? "내 공간을 보여주세요!" : "사진이 준비됐어요!"}
            </h2>
            <p className="text-[14px] text-neutral-dark-30 leading-[21px]">
              {isEmpty
                ? "실내 사진을 올리면 AI가 환경을 분석해드려요"
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
            <div className="mt-4">
              <Button
                text="분석하기"
                variant="default"
                width="100%"
                onClick={() => {}}
              />
            </div>
          )}


          {isEmpty && <TipsSection />}
        </div>
      </div>

      {!isEmpty && (
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
