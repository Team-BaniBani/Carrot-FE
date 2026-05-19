import { create } from "zustand";

type MyPlantsCaptureState = {
  isSelecting: boolean;
  selectedId: string | null;
  setIsSelecting: (value: boolean) => void;
  setSelectedId: (id: string | null) => void;
  reset: () => void;
};

export const getMyPlantCardId = (id: string) => `my-plant-card-${id}`;

export const useMyPlantsCaptureStore = create<MyPlantsCaptureState>((set) => ({
  isSelecting: false,
  selectedId: null,
  setIsSelecting: (value) => set({ isSelecting: value }),
  setSelectedId: (id) => set({ selectedId: id }),
  reset: () => set({ isSelecting: false, selectedId: null }),
}));
