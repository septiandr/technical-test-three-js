"use client";

import { useViewerStore } from "@/store/useViewerStore";
import { ModelMesh } from "./ModelMesh";

export function SceneModels() {
  const models = useViewerStore((s) => s.models);
  return (
    <>
      {models.map((model) => (
        <ModelMesh key={model.id} model={model} />
      ))}
    </>
  );
}
