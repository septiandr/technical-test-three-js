import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface TransitionTarget {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

export function useCameraTransition() {
  const { camera, controls } = useThree();
  const targetRef = useRef<TransitionTarget | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!controls) return;

    const cancelAnimation = () => {
      isAnimating.current = false;
      targetRef.current = null;
    };

    (controls as any).addEventListener("start", cancelAnimation);

    return () => {
      (controls as any).removeEventListener("start", cancelAnimation);
    };
  }, [controls]);

  useFrame(() => {
    if (!isAnimating.current || !targetRef.current || !controls) return;

    const { position, target } = targetRef.current;
    const ctrl = controls as any;

    camera.position.lerp(position, 0.08);

    if (ctrl.target) {
      ctrl.target.lerp(target, 0.08);
    }

    camera.lookAt(target);

    if (ctrl.target) {
      if (ctrl.enabled === false) {
        ctrl.enabled = true;
      }
      ctrl.update();
    }

    if (camera.position.distanceTo(position) < 0.01) {
      camera.position.copy(position);
      if (ctrl.target) {
        ctrl.target.copy(target);
      }
      camera.lookAt(target);
      if (ctrl.update) {
        ctrl.update();
      }
      isAnimating.current = false;
      targetRef.current = null;
    }
  });

  const moveTo = (target: TransitionTarget) => {
    targetRef.current = target;
    isAnimating.current = true;
  };

  return { moveTo };
}
