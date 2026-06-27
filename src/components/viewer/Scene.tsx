"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, GizmoHelper, GizmoViewcube } from "@react-three/drei";
import * as THREE from "three";
import { SceneModels } from "./SceneModels";
import { CameraRig } from "./CameraRig";
import { useEffect } from "react";
import { useViewerStore } from "@/store/useViewerStore";

function ThreeSetup() {
  const { gl } = useThree();
  
  useEffect(() => {
    // Atur shadow map secara eksplisit
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;
    
    // Handle context lost
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.log("WebGL Context Lost, attempting to restore...");
    };
    
    const handleContextRestored = () => {
      console.log("WebGL Context Restored");
    };
    
    gl.domElement.addEventListener("webglcontextlost", handleContextLost);
    gl.domElement.addEventListener("webglcontextrestored", handleContextRestored);
    
    return () => {
      gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
      gl.domElement.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  return null;
}

export function Scene() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        shadows={false}
        camera={{ position: [6, 6, 6], fov: 50, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: false
        }}
        dpr={[1, 2]}
        style={{ background: "#1a1a2e", height: "100%", width: "100%" }}
      >
        <ThreeSetup />
        
        {/* Pencahayaan yang ringkas */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
        />

        {/* Lingkungan tanpa jaringan */}
        <Grid 
          args={[10, 10]} 
          cellColor="#444466" 
          sectionColor="#666688" 
          fadeDistance={15} 
          infiniteGrid 
        />
        
        {/* Background warna solid untuk material */}
        <color attach="background" args={["#fff"]} />

        {/* Semua Model yang Dimuat */}
        <SceneModels />

        {/* Kontrol Kamera yang ringkas */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
          zoomSpeed={1.2}
          panSpeed={0.8}
          minDistance={0.5}
          maxDistance={50}
        />

        {/* Camera Rig untuk transisi dan fit to view */}
        <CameraRig />

        {/* Gizmo Kamera */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube opacity={0.9} />
        </GizmoHelper>
      </Canvas>
    </div>
  );
}
