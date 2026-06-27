"use client";

import { useViewerStore } from "@/store/useViewerStore";
import { cameraPositions } from "@/utils/cameraPositions";
import type { CameraView } from "@/types";

export function CameraButtons() {
  const { activeView, setActiveView } = useViewerStore();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(cameraPositions).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveView(key as CameraView)}
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            activeView === key
              ? "border-sky-400 bg-sky-500/20 text-sky-300"
              : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
