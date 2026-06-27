import type { CameraView } from "@/types";
import * as THREE from "three";

export interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_VIEWS: Record<CameraView, CameraPosition> = {
  front: { position: [0, 0, 5], target: [0, 0, 0] },
  back: { position: [0, 0, -5], target: [0, 0, 0] },
  left: { position: [-5, 0, 0], target: [0, 0, 0] },
  right: { position: [5, 0, 0], target: [0, 0, 0] },
  top: { position: [0, 5, 0], target: [0, 0, 0] },
  bottom: { position: [0, -5, 0], target: [0, 0, 0] },
  isometric: { position: [3.5, 3.5, 3.5], target: [0, 0, 0] },
  reset: { position: [3.5, 3.5, 3.5], target: [0, 0, 0] },
};

export const cameraPositions: Record<CameraView, string> = {
  front: "Front",
  back: "Back",
  left: "Left",
  right: "Right",
  top: "Top",
  bottom: "Bottom",
  isometric: "Isometric",
  reset: "Reset",
};

export function fitCameraToModels(
  camera: THREE.PerspectiveCamera,
  controls: { update: () => void },
  box: THREE.Box3,
): void {
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const distance = Math.max((maxDim / 2) / Math.tan(fov / 2), 5);

  const direction = new THREE.Vector3(0, 0, 1).normalize();
  const newPosition = center.clone().add(direction.multiplyScalar(distance));

  camera.position.copy(newPosition);
  camera.lookAt(center);
  camera.updateProjectionMatrix();
  controls.update();
}
