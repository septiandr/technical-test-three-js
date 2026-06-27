"use client";

export function ModelLoader() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.2} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}
