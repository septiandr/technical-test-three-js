"use client";

import { Environment as DreiEnvironment, Grid, Stars } from "@react-three/drei";

export function Environment() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 6, 4]} intensity={1.1} castShadow />
      <DreiEnvironment preset="city" />
      <Grid
        args={[24, 24]}
        position={[0, -0.76, 0]}
        cellColor="#64748b"
        sectionColor="#475569"
        fadeDistance={24}
        fadeStrength={2}
        followCamera={false}
      />
      <Stars radius={40} depth={30} count={3000} factor={3} saturation={0} fade speed={1} />
    </>
  );
}
