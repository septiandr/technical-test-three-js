import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CameraView, LoadedModel, ModelFormat } from "@/types";
import { DEFAULT_ASSETS } from "@/utils/defaultAssets";

interface ViewerStore {
  models: LoadedModel[];
  selectedId: string | null;
  activeView: CameraView | null;
  isLoading: boolean;
  triggerFitView: number;
  addModels: (files: File[]) => void;
  removeModel: (id: string) => void;
  toggleVisibility: (id: string) => void;
  setSelectedId: (id: string | null) => void;
  setActiveView: (view: CameraView) => void;
  triggerFitToView: () => void;
  clearAll: () => void;
  loadDefaultAssets: () => Promise<void>;
}

const getModelFormat = (fileName: string): ModelFormat => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "stl") return "stl";
  if (ext === "gltf") return "gltf";
  return "glb";
};

export const useViewerStore = create<ViewerStore>()(
  immer((set) => ({
    models: [],
    selectedId: null,
    activeView: null,
    isLoading: false,
    triggerFitView: 0,

    addModels: (files) =>
      set((state) => {
        files.forEach((file) => {
          const model: LoadedModel = {
            id:
              globalThis.crypto?.randomUUID?.() ??
              `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: file.name.replace(/\.(glb|gltf|stl)$/i, ""),
            url: URL.createObjectURL(file),
            format: getModelFormat(file.name),
            visible: true,
          };
          state.models.push(model);
        });
      }),

    removeModel: (id) =>
      set((state) => {
        const target = state.models.find((model) => model.id === id);
        if (target?.url) {
          URL.revokeObjectURL(target.url);
        }
        state.models = state.models.filter((model) => model.id !== id);
        if (state.selectedId === id) {
          state.selectedId = null;
        }
      }),

    toggleVisibility: (id) =>
      set((state) => {
        const target = state.models.find((model) => model.id === id);
        if (target) {
          target.visible = !target.visible;
        }
      }),

    setSelectedId: (id) =>
      set((state) => {
        state.selectedId = id;
      }),

    setActiveView: (view) =>
      set((state) => {
        state.activeView = view;
      }),

    triggerFitToView: () =>
      set((state) => {
        state.triggerFitView += 1;
      }),

    clearAll: () =>
      set((state) => {
        console.log("=== clearAll called ===");
        console.log("Revoking URLs for", state.models.length, "models");
        state.models.forEach((model) => {
          if (model.url) {
            URL.revokeObjectURL(model.url);
            console.log("Revoked URL:", model.url);
          }
        });
        state.models = [];
        state.selectedId = null;
        console.log("Models cleared, current length:", state.models.length);
      }),

    loadDefaultAssets: async () => {
      console.log("loadDefaultAssets starting");
      set({ isLoading: true });
      try {
        console.log("DEFAULT_ASSETS:", DEFAULT_ASSETS);
        const files = await Promise.all(
          DEFAULT_ASSETS.map(async (asset) => {
            console.log("Fetching asset:", asset);
            const res = await fetch(asset.path);
            console.log("Asset response:", res);
            const blob = await res.blob();
            console.log("Asset blob:", blob);
            const file = new File([blob], `${asset.name}.${asset.format}`, {
              type: blob.type,
            });
            console.log("Created file:", file);
            return file;
          }),
        );
        console.log("Calling addModels with files:", files);
        useViewerStore.getState().addModels(files);
      } catch (error) {
        console.error("Failed to load default assets:", error);
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
