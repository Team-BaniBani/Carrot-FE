import { create } from "zustand";

type LayoutState = {
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
  toggleHeader: () => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  showHeader: true,
  setShowHeader: (value) => set({ showHeader: value }),
  toggleHeader: () => set((state) => ({ showHeader: !state.showHeader })),
}));
