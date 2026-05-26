"use client";

import { useEffect } from "react";
import { SAVED_PLANTS_KEY, useSavedPlantsStore } from "@/stores/useSavedPlantsStore";

export const useSavedPlants = () => {
  const savedPlants = useSavedPlantsStore((state) => state.savedPlants);
  const isReady = useSavedPlantsStore((state) => state.isReady);
  const hydrate = useSavedPlantsStore((state) => state.hydrate);
  const toggleSaved = useSavedPlantsStore((state) => state.toggleSaved);

  const savedIds = savedPlants.map((p) => p.id);

  useEffect(() => {
    if (!isReady) hydrate();
  }, [hydrate, isReady]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SAVED_PLANTS_KEY) {
        hydrate();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [hydrate]);

  return { savedPlants, savedIds, isReady, toggleSaved };
};
