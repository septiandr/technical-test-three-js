export interface LoadedModel {
  id: string;
  name: string;
  file: File;
  url: string;
  visible: boolean;
  format: "stl" | "gltf" | "glb";
}

export type CameraView =
  | "front"
  | "back"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "isometric"
  | "reset";

export interface ViewerState {
  models: LoadedModel[];
  selectedModelId: string | null;
  activeView: CameraView;
  isLoading: boolean;
}
