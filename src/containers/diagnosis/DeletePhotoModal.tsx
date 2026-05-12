"use client";

import { Trash } from "public/icons";
import Button from "@/components/ui/button/button";

interface DeletePhotoModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeletePhotoModal({ onClose, onConfirm }: DeletePhotoModalProps) {
  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-[24px]">
      <div className="w-full max-w-[327px] bg-layer-canvas border border-border-subtle rounded-[12px] p-[12px] flex flex-col items-center gap-[24px]">
        
        <div className="flex flex-col items-center gap-[12px] w-full mt-[12px]">
          <div className="w-[48px] h-[48px] flex items-center justify-center">
            <Trash className="w-[36px] h-[40px] text-primary-0" />
          </div>
          
          <div className="flex flex-col items-center justify-center gap-[4px] text-center">
            <h3 className="text-[16px] font-bold text-text-default leading-[1.5]">
              정말 사진을 삭제할까요?
            </h3>
            <p className="text-[16px] font-regular text-text-caption leading-[1.5]">
              여러 장의 사진이 있으면 더 잘 분석할 수 있어요
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] w-full">
          <Button text="삭제" variant="default" width="100%" onClick={onConfirm} />
          <Button text="취소" variant="variant4" width="100%" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
