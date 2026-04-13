import Image from "next/image";
import { cn } from "@/libs/utils";

const progressSteps = [1, 2, 3] as const;

export default function OnboardingStage({
  step,
  imageSrc,
  imageAlt,
  title,
  description,
}: {
  step: 1 | 2 | 3;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-1 flex-col items-center pt-6 text-center">
      <div className="fade-in-up fade-in-up-delay-1">
        <div className="flex h-[355px] w-[311px] items-center justify-center rounded-card bg-[#eddcba] shadow-[0_0_0_1px_rgba(42,31,19,0.04)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={193}
            height={288}
            className="h-auto w-[193px]"
            priority
          />
        </div>
      </div>

      <ol
        className="mt-6 flex items-center gap-2 fade-in-up fade-in-up-delay-2"
        aria-label="온보딩 진행도"
      >
        {progressSteps.map((item) => (
          <li key={item} className="flex items-center">
            <span
              className={cn(
                "rounded-full transition-colors",
                item === step ? "h-2 w-5 bg-primary" : "h-2 w-2 bg-primary-40",
              )}
              aria-current={item === step ? "step" : undefined}
            />
            <span className="sr-only">{`단계 ${item}`}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col items-center gap-3 px-1 fade-in-up fade-in-up-delay-3">
        <h1 className="whitespace-pre-line text-[24px] font-bold leading-[36px] tracking-[0.96px] text-primary">
          {title}
        </h1>
        <p className="whitespace-pre-line text-[12px] font-normal leading-[18px] text-primary-20">
          {description}
        </p>
      </div>
    </section>
  );
}
