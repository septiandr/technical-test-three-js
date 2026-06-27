"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, GizmoHelper, GizmoViewcube } from "@react-three/drei";
import * as THREE from "three";
import { SceneModels } from "./SceneModels";
import { useEffect } from "react";

function ThreeSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;
  }, [gl]);
  return null;
}

export function Scene() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        shadows={false}
        camera={{ position: [6, 6, 6], fov: 50, near: 0.01, far: 1000 }}
        gl={{ antialias: true }}
        style={{ background: "#1a1a2e", height: "100%", width: "100%" }}
      >
        <ThreeSetup />
        {/* Pencahayaan */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
        />

        {/* Lingkungan */}
        <Environment preset="studio" />
        <Grid 
          args={[20, 20]} 
          cellColor="#444466" 
          sectionColor="#666688" 
          fadeDistance={30} 
          infiniteGrid 
        />

        {/* Model Kubus Dasar */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Tanah/Plane */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#2a2a4a" />
        </mesh>

        {/* Semua Model yang Dimuat */}
        <SceneModels />

        {/* Kontrol Kamera */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
          zoomSpeed={1.2}
          panSpeed={0.8}
          minDistance={0.5}
          maxDistance={100}
        />

        {/* Gizmo Kamera */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube opacity={0.9} />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}