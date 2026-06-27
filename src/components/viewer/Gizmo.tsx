"use client";

import { GizmoHelper, GizmoViewport } from "@react-three/drei";

export function Gizmo() {
  return (
    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
      <GizmoViewport axisColors={["#f43f5e", "#22c55e", "#3b82f6"]} labelColor="#e2e8f0" />
    </GizmoHelper>
  );
}
