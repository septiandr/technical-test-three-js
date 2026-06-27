"use client";

import { Box, Eye, EyeOff, Trash2 } from "lucide-react";
import { useViewerStore } from "@/store/useViewerStore";
import type { LoadedModel } from "@/types";

interface ModelListItemProps {
  model: LoadedModel;
}

export function ModelListItem({ model }: ModelListItemProps) {
  const { selectedId, setSelectedId, toggleVisibility, removeModel } =
    useViewerStore();
  const isSelected = selectedId === model.id;

  const getFormatBadge = () => {
    switch (model.format) {
      case "glb":
        return <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-400">GLB</span>;
      case "gltf":
        return <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">GLTF</span>;
      case "stl":
        return <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">STL</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 transition cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-neutral-700"
          : "border-neutral-700 hover:border-neutral-600"
      }`}
      onClick={() => setSelectedId(model.id)}
    >
      <Box className="h-5 w-5 text-neutral-400" />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-neutral-200">{model.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {getFormatBadge()}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleVisibility(model.id);
          }}
          className="rounded p-1 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200"
        >
          {model.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this model?")) {
              removeModel(model.id);
            }
          }}
          className="rounded p-1 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
