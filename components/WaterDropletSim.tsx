"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function WaterDroplet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const dropletMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#38bdf8"),
        transmission: 0.85,
        opacity: 0.9,
        transparent: true,
        metalness: 0,
        roughness: 0.02,
        ior: 1.33,
        thickness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 1.2,
      }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      // Subtle wobble to simulate surface tension
      const wobble = 1 + Math.sin(t * 2) * 0.015;
      meshRef.current.scale.set(wobble, 1 - Math.sin(t * 2) * 0.01, wobble);
    }
  });

  // Flattened sphere = bead shape with high contact angle
  return (
    <mesh ref={meshRef} position={[0, 0.55, 0]} castShadow>
      <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      <primitive object={dropletMat} attach="material" />
    </mesh>
  );
}

function CoatingSurface() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial
        color="#1a2e1a"
        roughness={0.15}
        metalness={0.3}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

function WaterParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = 1.5 + Math.random() * 1.5;
      arr.push({
        pos: [Math.cos(angle) * r, 0.15 + Math.random() * 0.2, Math.sin(angle) * r],
        scale: 0.08 + Math.random() * 0.08,
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (p) {
        child.position.y = 0.15 + Math.abs(Math.sin(t * p.speed + p.phase)) * 0.3;
        child.position.x = p.pos[0] + Math.sin(t * 0.3 + p.phase) * 0.1;
        child.position.z = p.pos[2] + Math.cos(t * 0.3 + p.phase) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos} scale={p.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.8}
            transparent
            opacity={0.7}
            roughness={0.05}
            ior={1.33}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function WaterDropletSim() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3, 2.5, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 5, 3]} intensity={1.0} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#38bdf8" />
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#22c55e" />
        <CoatingSurface />
        <WaterDroplet />
        <WaterParticles />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} minDistance={3} maxDistance={12} />
      </Canvas>
    </div>
  );
}
