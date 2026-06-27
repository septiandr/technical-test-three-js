"use client";

import { Suspense, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import type { LoadedModel } from "@/types";

function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="orange" wireframe />
    </mesh>
  );
}

interface ModelMeshProps {
  model: LoadedModel;
}

export function ModelMesh({ model }: ModelMeshProps) {
  return (
    <group visible={model.visible} userData={{ isModel: true }}>
      <Suspense fallback={<LoadingBox />}>
        {model.format === "stl" ? <STLModel url={model.url} /> : <GLTFModel url={model.url} />}
      </Suspense>
    </group>
  );
}

interface ModelUrlProps {
  url: string;
}

function STLModel({ url }: ModelUrlProps) {
  const geometry = useLoader(STLLoader, url);

  const processedGeometry = useMemo(() => {
    const geom = geometry.clone();
    geom.center();
    const tempMesh = new THREE.Mesh(geom);
    const box = new THREE.Box3().setFromObject(tempMesh);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    geom.scale(scale, scale, scale);
    return geom;
  }, [geometry]);

  return (
    <mesh castShadow receiveShadow geometry={processedGeometry}>
      <meshStandardMaterial color="#8888aa" roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

function GLTFModel({ url }: ModelUrlProps) {
  const { scene } = useGLTF(url);

  const processedScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    cloned.position.sub(center);
    cloned.scale.multiplyScalar(scale);
    
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;
      }
    });
    
    return cloned;
  }, [scene]);

  return <primitive object={processedScene} />;
}
