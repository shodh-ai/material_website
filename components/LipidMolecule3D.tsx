"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const atomColors: Record<string, string> = {
  C: "#7782ac",
  O: "#ef4444",
  H: "#e5e7eb",
};

const atomRadii: Record<string, number> = {
  C: 0.38,
  O: 0.36,
  H: 0.2,
};

type Atom = {
  position: [number, number, number];
  type: keyof typeof atomColors;
};

type BondDef = [number, number, number?];

function buildLipidChain(): { atoms: Atom[]; bonds: BondDef[] } {
  const atoms: Atom[] = [];
  const bonds: BondDef[] = [];
  let idx = 0;

  const addAtom = (pos: [number, number, number], type: keyof typeof atomColors): number => {
    const i = atoms.length;
    atoms.push({ position: pos, type });
    return i;
  };

  const bond = (a: number, b: number, order?: number) => bonds.push([a, b, order]);

  // Build a zigzag long-chain lipid with two ester breakpoints
  // Chain 1: C16 tail (methyl end → first ester)
  const chainSpacing = 1.0;
  const zigzagY = 0.35;

  let prevC = addAtom([0, 0, 0], "C"); // C1 (methyl terminus)
  let dir = 1;

  for (let i = 0; i < 14; i++) {
    const x = (i + 1) * chainSpacing;
    const y = dir * zigzagY;
    const c = addAtom([x, y, 0], "C");
    bond(prevC, c, 1);
    // Add hydrogens on carbons
    addAtom([x + 0.3, y + 0.5, 0.2], "H");
    bond(c, atoms.length - 1, 1);
    addAtom([x + 0.3, y - 0.5, -0.2], "H");
    bond(c, atoms.length - 1, 1);
    prevC = c;
    dir *= -1;
  }

  // First ester breakpoint: -C(=O)-O-
  const esterX1 = 15 * chainSpacing;
  const esterY1 = dir * zigzagY;
  const cEster1 = addAtom([esterX1, esterY1, 0], "C");
  bond(prevC, cEster1, 1);
  const oDouble1 = addAtom([esterX1 + 0.3, esterY1 + 0.7, 0], "O");
  bond(cEster1, oDouble1, 2);
  const oBridge1 = addAtom([esterX1 + 0.8, esterY1 - 0.3, 0], "O");
  bond(cEster1, oBridge1, 1);

  // Continue chain after first ester (C8 segment)
  prevC = oBridge1;
  dir = -dir;
  for (let i = 0; i < 6; i++) {
    const x = esterX1 + (i + 1) * chainSpacing;
    const y = dir * zigzagY + esterY1 * 0.3;
    const c = addAtom([x, y, 0], "C");
    bond(prevC, c, 1);
    addAtom([x + 0.3, y + 0.5, 0.2], "H");
    bond(c, atoms.length - 1, 1);
    addAtom([x + 0.3, y - 0.5, -0.2], "H");
    bond(c, atoms.length - 1, 1);
    prevC = c;
    dir *= -1;
  }

  // Second ester breakpoint
  const esterX2 = esterX1 + 7 * chainSpacing;
  const esterY2 = dir * zigzagY + esterY1 * 0.3;
  const cEster2 = addAtom([esterX2, esterY2, 0], "C");
  bond(prevC, cEster2, 1);
  const oDouble2 = addAtom([esterX2 + 0.3, esterY2 + 0.7, 0], "O");
  bond(cEster2, oDouble2, 2);
  const oBridge2 = addAtom([esterX2 + 0.8, esterY2 - 0.3, 0], "O");
  bond(cEster2, oBridge2, 1);

  // Final C8 tail to methyl end
  prevC = oBridge2;
  dir = -dir;
  for (let i = 0; i < 6; i++) {
    const x = esterX2 + (i + 1) * chainSpacing;
    const y = dir * zigzagY + esterY2 * 0.3;
    const c = addAtom([x, y, 0], "C");
    bond(prevC, c, 1);
    if (i < 5) {
      addAtom([x + 0.3, y + 0.5, 0.2], "H");
      bond(c, atoms.length - 1, 1);
      addAtom([x + 0.3, y - 0.5, -0.2], "H");
      bond(c, atoms.length - 1, 1);
    }
    prevC = c;
    dir *= -1;
  }

  // Terminal methyl H's
  const lastC = atoms.length - 1;
  addAtom([lastC > 0 ? atoms[lastC].position[0] + 0.4 : 0, atoms[lastC].position[1] + 0.5, 0.2], "H");
  bond(lastC, atoms.length - 1, 1);
  addAtom([atoms[lastC].position[0] + 0.4, atoms[lastC].position[1] - 0.5, -0.2], "H");
  bond(lastC, atoms.length - 1, 1);

  return { atoms, bonds };
}

function AtomMesh({ atom }: { atom: Atom }) {
  const color = atomColors[atom.type];
  const radius = atomRadii[atom.type];
  return (
    <mesh position={atom.position} castShadow>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} envMapIntensity={0.8} />
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
    if (p.length() < 0.1) p = new THREE.Vector3(1, 0, 0).cross(dir);
    p.normalize();
    return { midpoint: mid, length: len, quaternion: quat, perp: p };
  }, [start, end]);

  const bondRadius = 0.06;

  if (order === 2) {
    const offset = 0.12;
    const pos1 = midpoint.clone().add(perp.clone().multiplyScalar(offset));
    const pos2 = midpoint.clone().add(perp.clone().multiplyScalar(-offset));
    return (
      <group>
        <mesh position={pos1} quaternion={quaternion}>
          <cylinderGeometry args={[bondRadius, bondRadius, length * 0.85, 8]} />
          <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={pos2} quaternion={quaternion}>
          <cylinderGeometry args={[bondRadius, bondRadius, length * 0.85, 8]} />
          <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[bondRadius, bondRadius, length, 8]} />
      <meshStandardMaterial color="#a0a0b0" roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

function LipidGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { atoms, bonds } = useMemo(() => buildLipidChain(), []);

  const centroid = useMemo(() => {
    const sum = atoms.reduce(
      (acc, a) => [acc[0] + a.position[0], acc[1] + a.position[1], acc[2] + a.position[2]] as [number, number, number],
      [0, 0, 0] as [number, number, number]
    );
    return [sum[0] / atoms.length, sum[1] / atoms.length, sum[2] / atoms.length] as [number, number, number];
  }, [atoms]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-centroid[0], -centroid[1], -centroid[2]]}>
      {bonds.map((bond, i) => (
        <BondMesh key={`bond-${i}`} start={atoms[bond[0]].position} end={atoms[bond[1]].position} order={bond[2] ?? 1} />
      ))}
      {atoms.map((atom, i) => (
        <AtomMesh key={`atom-${i}`} atom={atom} />
      ))}
    </group>
  );
}

export default function LipidMolecule3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 18], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 8]} intensity={0.9} castShadow />
        <directionalLight position={[-5, -3, -5]} intensity={0.35} />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#22c55e" />
        <pointLight position={[-8, 4, 2]} intensity={0.3} color="#38bdf8" />
        <LipidGroup />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} minDistance={8} maxDistance={30} />
      </Canvas>
    </div>
  );
}
