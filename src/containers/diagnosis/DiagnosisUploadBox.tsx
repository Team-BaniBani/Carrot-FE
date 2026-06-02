import { Camera, Upload } from "public/icons";
import { cn } from "@/libs/utils";
import { useRef, ChangeEvent } from "react";

interface UploadBoxProps {
  onUpload: (files: FileList) => void;
  className?: string;
}

export default function UploadBox({ onUpload, className }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-[180px] bg-interactive-primary-caption rounded-card border border-dashed border-interactive-primary-default px-4",
        className
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      <div className="flex flex-col items-center gap-[12px]">
        <Camera className="w-[40px] h-[40px] text-primary-0 stroke-2" />
        
        <div className="flex flex-col items-center gap-[6px] text-center">
          <span className="text-[16px] font-bold text-primary-0 leading-[24px]">
            사진을 추가해주세요
          </span>
          <span className="text-[12px] text-primary-10 leading-[18px]">
            최대 3장 · JPG, PNG · 5MB 이하
          </span>
        </div>
      </div>

      <button
        onClick={handleUploadClick}
        className="flex items-center justify-center gap-[4px] w-[80px] h-[26px] py-[4px] mt-[16px] rounded-[4px] bg-primary-30 border border-primary-10 text-[12px] font-medium text-neutral-dark-10 active:scale-[0.98] transition-all"
      >
        <Upload className="w-[14px] h-[14px]" />
        업로드
      </button>
    </div>
  );
}
