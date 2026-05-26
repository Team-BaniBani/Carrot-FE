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
  const { selectMode, selectedId, setSelectMode, setSelectedId, reset } =
    useMyPlantsCaptureStore();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const isCaptureMode = selectMode === "capture";
  const isShareMode = selectMode === "share";

  const saveButtonText = isCaptureMode
    ? MY_PLANTS_ACTIONS.saveSelected
    : MY_PLANTS_ACTIONS.save;
  const shareButtonText = isShareMode
    ? MY_PLANTS_ACTIONS.shareSelected
    : MY_PLANTS_ACTIONS.share;

  const isSaveDisabled = isCapturing || (isCaptureMode && !selectedId);
  const isShareDisabled = isSharing || (isShareMode && !selectedId);

  const startSelectMode = (mode: "capture" | "share") => {
    setSelectedId(null);
    setSelectMode(mode);
  };

  const handleSaveImage = async () => {
    if (!isCaptureMode) {
      startSelectMode("capture");
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

  const handleShare = async () => {
    if (!isShareMode) {
      startSelectMode("share");
      return;
    }

    if (!selectedId || isSharing) return;

    setIsSharing(true);
    try {
      const shareUrl = new URL(`/dictionary/${selectedId}`, window.location.origin).toString();
      const shareImageUrl = new URL("/icons/plant.svg", window.location.origin).toString();
      const kakao = (window as Window & {
        Kakao?: {
          Share?: { sendDefault?: (options: unknown) => void };
          init?: (key: string) => void;
          isInitialized?: () => boolean;
        };
      }).Kakao;
      const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

      if (kakao?.init && kakao?.isInitialized && kakaoKey && !kakao.isInitialized()) {
        kakao.init(kakaoKey);
      }

      if (kakao?.Share?.sendDefault) {
        kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "식물 정보",
            description: "식물 상세 보기",
            imageUrl: shareImageUrl,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          buttons: [
            {
              title: "식물 정보 보기",
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
          ],
        });
      } else if (navigator.share) {
        await navigator.share({ title: "식물 정보", url: shareUrl });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        window.location.href = shareUrl;
      }

      reset();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <section className="flex w-full gap-1.5">
      <Button
        text={shareButtonText}
        variant="variant4"
        className="flex-1 border-[#ad9a85]"
        disabled={isShareDisabled}
        onClick={handleShare}
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
