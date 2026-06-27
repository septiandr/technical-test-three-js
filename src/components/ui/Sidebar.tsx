"use client";

import { CameraButtons } from "./CameraButtons";
import { FileUpload } from "./FileUpload";
import { ModelListItem } from "./ModelListItem";
import { useViewerStore } from "@/store/useViewerStore";

export function Sidebar() {
  const { models } = useViewerStore();

  return (
    <aside className="flex w-full max-w-sm flex-col gap-4 border-r border-slate-800 bg-slate-950/95 p-5 text-slate-100">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Viewer</p>
        <h2 className="mt-2 text-2xl font-semibold">3D asset workspace</h2>
        <p className="mt-2 text-sm text-slate-400">
          Prepare your scene, import files, and switch camera presets.
        </p>
      </div>

      <FileUpload />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-200">Models</h3>
          <span className="text-xs text-slate-500">{models.length} item(s)</span>
        </div>
        <div className="space-y-2">
          {models.map((model) => (
            <ModelListItem key={model.id} model={model} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-200">Camera</h3>
        <CameraButtons />
      </div>
    </aside>
  );
}
