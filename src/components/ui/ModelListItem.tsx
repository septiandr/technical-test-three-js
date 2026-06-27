"use client";

import { useViewerStore } from "@/store/useViewerStore";
import type { LoadedModel } from "@/types";

interface ModelListItemProps {
  model: LoadedModel;
}

export function ModelListItem({ model }: ModelListItemProps) {
  const { selectedModelId, setSelectedModel } = useViewerStore();
  const isActive = selectedModelId === model.id;

  return (
    <button
      type="button"
      onClick={() => setSelectedModel(model.id)}
      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
        isActive
          ? "border-sky-400 bg-sky-500/15 text-sky-200"
          : "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-600"
      }`}
    >
      <div className="font-medium">{model.name}</div>
      <div className="mt-1 text-xs text-slate-400">{model.file.name || "Ready to load"}</div>
    </button>
  );
}
