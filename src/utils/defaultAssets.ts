export interface DefaultAsset {
  name: string
  path: string
  format: 'stl' | 'gltf' | 'glb'
}

// Anda dapat menambahkan asset default di sini
export const DEFAULT_ASSETS: DefaultAsset[] = []
