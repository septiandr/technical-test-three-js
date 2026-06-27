"use client";

export function FileUpload() {
  return (
    <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300">
      <span>Import model</span>
      <input type="file" className="sr-only" accept=".glb,.gltf,.obj,.fbx" />
    </label>
  );
}
