"use client";

import { useRouter } from "next/navigation";
import { DIAGNOSED_REDIAGNOSE_LABEL } from "@/constants/home/diagnosed";
import { Turn } from "@/../public/icons/index";

export default function DiagnosedRediagnoseAction() {
  const router = useRouter();

  return (
    <section className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => router.push("/diagnosis")}
        className="inline-flex items-center gap-[6px] text-[16px] leading-[24px] text-neutral-dark-0"
      >
        <span>{DIAGNOSED_REDIAGNOSE_LABEL}</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary p-1">
          <Turn className="h-6 w-6" />
        </span>
      </button>
    </section>
  );
}
