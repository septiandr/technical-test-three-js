"use client";

import { useViewerStore } from "@/store/useViewerStore";

export function useCameraControls() {
  const { activeView, setActiveView } = useViewerStore();

  return {
    activeView,
    setActiveView,
  };
}
