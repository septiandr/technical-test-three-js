import * as THREE from 'three'
import type { CameraView } from '@/types'

export interface CameraTarget {
  position: THREE.Vector3
  target: THREE.Vector3
}

const D = 6

export const CAMERA_VIEWS: Record<CameraView, CameraTarget> = {
  front: { position: new THREE.Vector3(0, 0, D), target: new THREE.Vector3(0, 0, 0) },
  back: { position: new THREE.Vector3(0, 0, -D), target: new THREE.Vector3(0, 0, 0) },
  left: { position: new THREE.Vector3(-D, 0, 0), target: new THREE.Vector3(0, 0, 0) },
  right: { position: new THREE.Vector3(D, 0, 0), target: new THREE.Vector3(0, 0, 0) },
  top: { position: new THREE.Vector3(0, D, 0), target: new THREE.Vector3(0, 0, 0) },
  bottom: { position: new THREE.Vector3(0, -D, 0), target: new THREE.Vector3(0, 0, 0) },
  isometric: { position: new THREE.Vector3(D, D, D), target: new THREE.Vector3(0, 0, 0) },
}
