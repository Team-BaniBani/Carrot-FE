"use client";

import { useEffect } from "react";
import { useLayoutStore } from "@/stores/useLayoutStore";

export function useHeaderVisibility(visible: boolean) {
  const setShowHeader = useLayoutStore((state) => state.setShowHeader);

  useEffect(() => {
    setShowHeader(visible);
  }, [visible, setShowHeader]);
}
