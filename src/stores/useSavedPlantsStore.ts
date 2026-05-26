import { create } from "zustand";

export const SAVED_PLANTS_KEY = "savedPlants";

export type SavedPlantData = {
  id: string;
  name: string;
  englishName: string;
  imageUrl: string;
  tags: string[];
};

const readSavedPlants = (): SavedPlantData[] => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(SAVED_PLANTS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    // 이전 형식(string[])이면 무시
    if (parsed.length > 0 && typeof parsed[0] === "string") return [];
    return parsed.filter(
      (item): item is SavedPlantData =>
        typeof item === "object" && item !== null && typeof item.id === "string",
    );
  } catch {
    return [];
  }
};

const writeSavedPlants = (plants: SavedPlantData[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_PLANTS_KEY, JSON.stringify(plants));
};

type SavedPlantsState = {
  savedPlants: SavedPlantData[];
  isReady: boolean;
  hydrate: () => void;
  toggleSaved: (data: SavedPlantData) => void;
};

export const useSavedPlantsStore = create<SavedPlantsState>((set, get) => ({
  savedPlants: [],
  isReady: false,
  hydrate: () => {
    const plants = readSavedPlants();
    set({ savedPlants: plants, isReady: true });
  },
  toggleSaved: (data) => {
    const { savedPlants } = get();
    const exists = savedPlants.some((p) => p.id === data.id);
    const updated = exists
      ? savedPlants.filter((p) => p.id !== data.id)
      : [...savedPlants, data];
    set({ savedPlants: updated });
    writeSavedPlants(updated);
  },
}));
