export type ModelFormat = 'stl' | 'gltf' | 'glb';

export type CameraView = 
  | 'front' | 'back' | 'left' | 'right' 
  | 'top' | 'bottom' | 'isometric';

export interface LoadedModel {
  id: string;
  name: string;
  url: string;
  format: ModelFormat;
  visible: boolean;
}
