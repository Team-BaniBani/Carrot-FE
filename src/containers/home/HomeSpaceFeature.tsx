"use client";

import { useRouter } from "next/navigation";
import SpaceFeatureDefault from "@/components/ui/spaceFeature/default/SpaceFeatureDefault";
import SpaceFeatureAnalysis from "@/components/ui/spaceFeature/analysis/SpaceFeatureAnalysis";

type Props = { isDiagnosed?: boolean };

export default function HomeSpaceFeature({ isDiagnosed = false }: Props) {
  const router = useRouter();

  return (
    <section className="mt-6 flex justify-center">
      <div className="w-full">
        {isDiagnosed ? (
          <SpaceFeatureAnalysis
            className="h-[178px] w-full shadow-[0_0_20px_rgba(42,31,19,0.1)]"
            onClick={() => router.push("/diagnosis")}
          />
        ) : (
          <SpaceFeatureDefault
            className="h-[154px] w-full shadow-[0_0_20px_rgba(42,31,19,0.1)]"
            onClick={() => router.push("/diagnosis")}
          />
        )}
      </div>
    </section>
  );
}
