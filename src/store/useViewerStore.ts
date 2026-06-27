import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CameraView, LoadedModel, ViewerState } from "@/types";

interface ViewerStore extends ViewerState {
  addModels: (files: File[]) => void;
  removeModel: (id: string) => void;
  toggleVisibility: (id: string) => void;
  setSelectedModel: (modelId: string | null) => void;
  setActiveView: (view: CameraView) => void;
  setLoading: (val: boolean) => void;
  clearAllModels: () => void;
}

const createPlaceholderFile = () => new File([""], "scene.glb", { type: "model/gltf-binary" });

const getModelFormat = (fileName: string): LoadedModel["format"] => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (ext === "stl") return "stl";
  if (ext === "gltf") return "gltf";
  return "glb";
};

const createModelFromFile = (file: File): LoadedModel => ({
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  name: file.name.replace(/\.(glb|gltf|stl)$/i, ""),
  file,
  url: URL.createObjectURL(file),
  visible: true,
  format: getModelFormat(file.name),
});

const initialModels: LoadedModel[] = [
  {
    id: "model-a",
    name: "Base mesh",
    file: createPlaceholderFile(),
    url: "",
    visible: true,
    format: "glb",
  },
  {
    id: "model-b",
    name: "Environment kit",
    file: createPlaceholderFile(),
    url: "",
    visible: true,
    format: "glb",
  },
];

export const useViewerStore = create<ViewerStore>()(
  immer((set) => ({
    models: initialModels,
    selectedModelId: initialModels[0]?.id ?? null,
    activeView: "front",
    isLoading: false,
    addModels: (files) =>
      set((state) => {
        files.forEach((file) => {
          state.models.push(createModelFromFile(file));
        });

        if (!state.selectedModelId && state.models.length > 0) {
          state.selectedModelId = state.models[0]?.id ?? null;
        }
      }),
    removeModel: (id) =>
      set((state) => {
        const target = state.models.find((model) => model.id === id);
        if (target?.url) {
          URL.revokeObjectURL(target.url);
        }

        state.models = state.models.filter((model) => model.id !== id);

        if (state.selectedModelId === id) {
          state.selectedModelId = state.models[0]?.id ?? null;
        }
      }),
    toggleVisibility: (id) =>
      set((state) => {
        const target = state.models.find((model) => model.id === id);
        if (target) {
          target.visible = !target.visible;
        }
      }),
    setSelectedModel: (modelId) =>
      set((state) => {
        state.selectedModelId = modelId;
      }),
    setActiveView: (view) =>
      set((state) => {
        state.activeView = view;
      }),
    setLoading: (val) =>
      set((state) => {
        state.isLoading = val;
      }),
    clearAllModels: () =>
      set((state) => {
        state.models.forEach((model) => {
          if (model.url) {
            URL.revokeObjectURL(model.url);
          }
        });

        state.models = [];
        state.selectedModelId = null;
      }),
  }))
);
