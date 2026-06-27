"use client";

import { FileUpload } from "./FileUpload";
import { ModelListItem } from "./ModelListItem";
import { useViewerStore } from "@/store/useViewerStore";
import type { CameraView } from "@/types";

const cameraViews: { label: string; view: CameraView; colSpan?: number }[] = [
  { label: "Front", view: "front" },
  { label: "Back", view: "back" },
  { label: "Left", view: "left" },
  { label: "Right", view: "right" },
  { label: "Top", view: "top" },
  { label: "Bottom", view: "bottom" },
  { label: "Isometric", view: "isometric", colSpan: 3 },
];

export function Sidebar() {
  const { models, activeView, setActiveView, triggerFitToView, clearAll } =
    useViewerStore();

  return (
    <aside className="flex w-72 flex-col gap-4 overflow-y-auto bg-neutral-900 text-neutral-100 p-4 h-full border-r border-neutral-700">
      <div>
        <h2 className="text-xl font-semibold">3D Viewer</h2>
        <p className="text-sm text-neutral-500">Interactive Model Viewer</p>
      </div>

      <FileUpload />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Models</h3>
          {models.length > 0 && (
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              {models.length}
            </span>
          )}
        </div>
        {models.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-700 p-6 text-center">
            <p className="text-sm text-neutral-500">No models loaded yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {models.map((model) => (
              <ModelListItem key={model.id} model={model} />
            ))}
          </div>
        )}
        {models.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Are you sure you want to clear all models?")) {
                clearAll();
              }
            }}
            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-400 hover:border-red-500/50 hover:text-red-400 transition"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Camera Views</h3>
        <div className="grid grid-cols-3 gap-2">
          {cameraViews.map(({ label, view, colSpan }) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded px-3 py-2 text-xs font-medium transition ${
                activeView === view
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              } ${colSpan ? `col-span-${colSpan}` : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Controls</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={triggerFitToView}
            className="flex-1 rounded bg-neutral-700 px-3 py-2 text-xs font-medium hover:bg-neutral-600 transition"
          >
            Fit to View
          </button>
          <button
            type="button"
            onClick={() => setActiveView("isometric")}
            className="flex-1 rounded bg-neutral-700 px-3 py-2 text-xs font-medium hover:bg-neutral-600 transition"
          >
            Reset Camera
          </button>
        </div>
      </div>

      <div className="mt-auto space-y-1 text-xs text-neutral-500">
        <p>🖱 Left drag: Rotate</p>
        <p>🖱 Right drag: Pan</p>
        <p>🖱 Scroll: Zoom</p>
      </div>
    </aside>
  );
}
