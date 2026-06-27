"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "./Environment";
import { CameraControls } from "./CameraControls";
import { Gizmo } from "./Gizmo";
import { ModelLoader } from "./ModelLoader";

export function Scene() {
  return (
    <div className="h-full min-h-[480px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }} shadows>
        <color attach="background" args={["#020617"]} />
        <Environment />
        <ModelLoader />
        <CameraControls />
        <OrbitControls enableDamping makeDefault />
        <Gizmo />
      </Canvas>
    </div>
  );
}
