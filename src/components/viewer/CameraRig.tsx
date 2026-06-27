"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraTransition } from "@/hooks/useCameraTransition";
import { useViewerStore } from "@/store/useViewerStore";
import { CAMERA_VIEWS } from "@/utils/cameraViews";

export function CameraRig() {
  const { scene, camera, controls } = useThree();
  const { moveTo } = useCameraTransition();
  const activeView = useViewerStore((s) => s.activeView);
  const triggerFitView = useViewerStore((s) => s.triggerFitView);
  const models = useViewerStore((s) => s.models);
  const previousTrigger = useRef(triggerFitView);

  useEffect(() => {
    if (activeView) {
      moveTo(CAMERA_VIEWS[activeView]);
    }
  }, [activeView, moveTo]);
  useEffect(() => {
    if (triggerFitView === previousTrigger.current) return;
    previousTrigger.current = triggerFitView;

    const visibleModels = models.filter((m) => m.visible);
    if (visibleModels.length === 0) return;

    const box = new THREE.Box3();

    scene.traverse((obj) => {
      if (obj.userData.isModel) {
        box.expandByObject(obj);
      }
    });

    if (box.isEmpty()) return;

    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = (camera.fov * Math.PI) / 180;

    const distance = (maxDim / 2 / Math.tan(fov / 2)) * 1.5;

    const direction = new THREE.Vector3(1, 1, 1).normalize();

    const targetPosition = center
      .clone()
      .add(direction.multiplyScalar(distance));

    moveTo({
      position: targetPosition,
      target: center,
    });
  }, [triggerFitView, models, scene, camera, moveTo]);

  return null;
}
