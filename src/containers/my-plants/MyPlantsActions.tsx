"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import Button from "@/components/ui/button/button";
import { MY_PLANTS_ACTIONS } from "@/constants/my-plants/content";
import {
  getMyPlantCardId,
  useMyPlantsCaptureStore,
} from "@/stores/useMyPlantsCaptureStore";

const waitForImages = async (root: HTMLElement) => {
  const images = root.getElementsByTagName("img");
  if (images.length === 0) return;

  const pending: Promise<void>[] = [];

  for (let i = 0; i < images.length; i += 1) {
    const img = images.item(i);
    if (!img) continue;

    if (img.complete && img.naturalWidth > 0) continue;

    if (typeof img.decode === "function") {
      pending.push(
        img.decode().catch(() => undefined).then(() => undefined),
      );
      continue;
    }

    pending.push(
      new Promise<void>((resolve) => {
        const finalize = () => {
          img.removeEventListener("load", finalize);
          img.removeEventListener("error", finalize);
          resolve();
        };

        img.addEventListener("load", finalize);
        img.addEventListener("error", finalize);
      }),
    );
  }

  await Promise.all(pending);
};

const waitForFonts = async () => {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
};

export default function MyPlantsActions() {
  const { isSelecting, selectedId, setIsSelecting, setSelectedId, reset } =
    useMyPlantsCaptureStore();
  const [isCapturing, setIsCapturing] = useState(false);

  const saveButtonText = isSelecting
    ? MY_PLANTS_ACTIONS.saveSelected
    : MY_PLANTS_ACTIONS.save;
  const isSaveDisabled = isCapturing || (isSelecting && !selectedId);

  const handleSaveImage = async () => {
    if (!isSelecting) {
      setSelectedId(null);
      setIsSelecting(true);
      return;
    }

    if (!selectedId || isCapturing) return;

    const target = document.getElementById(getMyPlantCardId(selectedId));
    if (!target) return;

    const targetElement = target as HTMLElement;

    setIsCapturing(true);
    try {
      targetElement.scrollIntoView({ behavior: "auto", block: "center" });
      await new Promise((resolve) => {
        requestAnimationFrame(() => resolve(null));
      });

      await waitForFonts();
      await waitForImages(targetElement);

      const rect = targetElement.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;

      const canvas = await html2canvas(targetElement, {
        backgroundColor: null,
        scale,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `my-plant-${selectedId}.png`;
      link.click();
      reset();
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <section className="flex w-full gap-1.5">
      <Button
        text={MY_PLANTS_ACTIONS.share}
        variant="variant4"
        className="flex-1 border-[#ad9a85]"
      />
      <Button
        text={saveButtonText}
        variant="default"
        className="flex-1"
        disabled={isSaveDisabled}
        onClick={handleSaveImage}
      />
    </section>
  );
}
