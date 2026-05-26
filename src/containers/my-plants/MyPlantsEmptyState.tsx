"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/button";
import { Plant } from "@/../public/icons/index";
import { MY_PLANTS_EMPTY } from "@/constants/my-plants/content";
import { useSavedPlants } from "@/hooks/useSavedPlants";

export default function MyPlantsEmptyState() {
  const router = useRouter();
  const { savedIds, isReady } = useSavedPlants();

  if (!isReady || savedIds.length > 0) return null;

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center">
          <Plant className="h-9 w-9 text-primary" />
        </div>
        <div className="space-y-1.5 text-center">
          <p className="text-heading-s text-primary">{MY_PLANTS_EMPTY.title}</p>
          <p className="whitespace-pre-line text-body-m text-primary-20">
            {MY_PLANTS_EMPTY.description}
          </p>
        </div>
      </div>
      <Button
        text={MY_PLANTS_EMPTY.action}
        variant="default"
        width="260px"
        onClick={() => router.push("/diagnosis")}
      />
    </section>
  );
}
