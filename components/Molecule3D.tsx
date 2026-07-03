"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const atomColors: Record<string, string> = {
  C: "#7782ac",
  N: "#3b82f6",
  O: "#ef4444",
  F: "#22c55e",
  S: "#eab308",
  H: "#e5e7eb",
};

const atomRadii: Record<string, number> = {
  C: 0.38,
  N: 0.36,
  O: 0.36,
  F: 0.33,
  S: 0.44,
  H: 0.2,
};

type Atom = {
  position: [number, number, number];
  type: keyof typeof atomColors;
};

type BondDef = [number, number, number?];

const atoms: Atom[] = [
  { position: [0.4, 0.0, 0.2], type: "C" },
  { position: [-0.3, 1.21, -0.1], type: "C" },
  { position: [-1.7, 1.21, 0.1], type: "C" },
  { position: [-2.4, 0.0, -0.2], type: "N" },
  { position: [-1.7, -1.21, 0.1], type: "C" },
  { position: [-0.3, -1.21, -0.1], type: "C" },
  { position: [0.3, -2.3, 0.2], type: "C" },
  { position: [-0.5, -3.0, -0.1], type: "N" },
  { position: [-1.5, -2.3, 0.1], type: "C" },
  { position: [-0.5, 2.3, 0.3], type: "F" },
  { position: [-2.5, 2.1, 0.0], type: "C" },
  { position: [-3.3, 1.7, 0.7], type: "F" },
  { position: [-3.0, 2.8, -0.6], type: "F" },
  { position: [-2.2, 2.9, 0.8], type: "F" },
  { position: [1.2, -3.0, 0.3], type: "O" },
  { position: [1.8, -2.2, 0.8], type: "C" },
  { position: [2.5, -1.3, 0.3], type: "C" },
  { position: [3.2, -0.5, 0.8], type: "N" },
  { position: [3.8, 0.3, 0.3], type: "S" },
  { position: [3.4, 1.1, 1.0], type: "O" },
  { position: [4.6, 0.8, -0.5], type: "O" },
  { position: [4.5, -0.3, 1.0], type: "C" },
  { position: [4.8, -1.2, 0.5], type: "C" },
  { position: [4.3, -2.0, 0.0], type: "C" },
  { position: [3.5, -2.5, -0.5], type: "C" },
  { position: [-0.5, -3.8, 0.0], type: "H" },
];

const bonds: BondDef[] = [
  [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
  [5, 6, 1], [6, 7, 2], [7, 8, 1], [8, 4, 2],
  [1, 9, 1],
  [2, 10, 1], [10, 11, 1], [10, 12, 1], [10, 13, 1],
  [6, 14, 1], [14, 15, 1], [15, 16, 1], [16, 17, 1], [17, 18, 1],
  [18, 19, 2], [18, 20, 2], [18, 21, 1], [21, 22, 1], [22, 23, 1], [23, 24, 1],
  [7, 25, 1],
];

function AtomMesh({ atom }: { atom: Atom }) {
  const color = atomColors[atom.type];
  const radius = atomRadii[atom.type];
  return (
    <mesh position={atom.position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.15}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function BondMesh({ start, end, order }: { start: [number, number, number]; end: [number, number, number]; order: number }) {
  const { midpoint, length, quaternion, perp } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const dir = e.clone().sub(s);
    const len = dir.length();
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

    let p = new THREE.Vector3(0, 0, 1).cross(dir);
    if (p.length() < 0.1) {
      p = new THREE.Vector3(1, 0, 0).cross(dir);
    }
    p.normalize();

    return { midpoint: mid, length: len, quaternion: quat, perp: p };
  }, [start, end]);

  const offset = 0.14;
  const bondRadius = 0.07;

  if (order === 2) {
    const pos1 = midpoint.clone().add(perp.clone().multiplyScalar(offset));
    const pos2 = midpoint.clone().add(perp.clone().multiplyScalar(-offset));
    return (
      <group>
        <mesh position={pos1} quaternion={quaternion}>
          <cylinderGeometry args={[bondRadius, bondRadius, length * 0.85, 12]} />
          <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={pos2} quaternion={quaternion}>
          <cylinderGeometry args={[bondRadius, bondRadius, length * 0.85, 12]} />
          <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[bondRadius, bondRadius, length, 12]} />
      <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

function MoleculeGroup() {
  const groupRef = useRef<THREE.Group>(null);

  const centroid = useMemo(() => {
    const sum = atoms.reduce(
      (acc, a) => [acc[0] + a.position[0], acc[1] + a.position[1], acc[2] + a.position[2]] as [number, number, number],
      [0, 0, 0] as [number, number, number]
    );
    return [sum[0] / atoms.length, sum[1] / atoms.length, sum[2] / atoms.length] as [number, number, number];
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[-centroid[0], -centroid[1], -centroid[2]]}>
      {bonds.map((bond, i) => (
        <BondMesh
          key={`bond-${i}`}
          start={atoms[bond[0]].position}
          end={atoms[bond[1]].position}
          order={bond[2] ?? 1}
        />
      ))}
      {atoms.map((atom, i) => (
        <AtomMesh key={`atom-${i}`} atom={atom} />
      ))}
    </group>
  );
}

export default function Molecule3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 13], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 8]} intensity={0.9} castShadow />
        <directionalLight position={[-5, -3, -5]} intensity={0.35} />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#48cae4" />
        <pointLight position={[-8, 4, 2]} intensity={0.3} color="#a78bfa" />
        <MoleculeGroup />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          minDistance={6}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}
