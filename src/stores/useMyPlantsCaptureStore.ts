import { create } from "zustand";

export type MyPlantsSelectMode = "none" | "capture" | "share";

type MyPlantsCaptureState = {
  selectMode: MyPlantsSelectMode;
  selectedId: string | null;
  setSelectMode: (mode: MyPlantsSelectMode) => void;
  setSelectedId: (id: string | null) => void;
  reset: () => void;
};

export const getMyPlantCardId = (id: string) => `my-plant-card-${id}`;

export const useMyPlantsCaptureStore = create<MyPlantsCaptureState>((set) => ({
  selectMode: "none",
  selectedId: null,
  setSelectMode: (mode) => set({ selectMode: mode }),
  setSelectedId: (id) => set({ selectedId: id }),
  reset: () => set({ selectMode: "none", selectedId: null }),
}));
