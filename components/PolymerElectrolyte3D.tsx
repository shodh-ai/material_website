"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const atomColors: Record<string, string> = {
  C: "#94a3b8",
  O: "#ef4444",
  N: "#3b82f6",
  H: "#e5e7eb",
  Li: "#a78bfa",
};

const atomRadii: Record<string, number> = {
  C: 0.36,
  O: 0.34,
  N: 0.34,
  H: 0.2,
  Li: 0.45,
};

type Atom = {
  position: [number, number, number];
  type: keyof typeof atomColors;
};

type BondDef = [number, number, number?];

function buildPolymer(): { atoms: Atom[]; bonds: BondDef[]; liIons: number[] } {
  const atoms: Atom[] = [];
  const bonds: BondDef[] = [];
  const liIons: number[] = [];
  let idx = 0;

  const addAtom = (pos: [number, number, number], type: keyof typeof atomColors): number => {
    const i = atoms.length;
    atoms.push({ position: pos, type });
    return i;
  };

  const bond = (a: number, b: number, order?: number) => bonds.push([a, b, order]);

  // Build PEG-carbamate backbone: -CH2-CH2-O-C(=O)-NH- repeating
  const spacing = 1.0;
  const zigzagY = 0.35;
  let dir = 1;

  // Start with Li+ ion near the chain
  const li1 = addAtom([-1.5, 0.8, 0.5], "Li");
  liIons.push(li1);

  let prevC = addAtom([0, 0, 0], "C"); // C1
  // H on C1
  const h1a = addAtom([0.3, 0.5, 0.2], "H");
  bond(prevC, h1a, 1);
  const h1b = addAtom([0.3, -0.5, -0.2], "H");
  bond(prevC, h1b, 1);

  // Repeat unit: CH2-CH2-O-CO-NH
  for (let unit = 0; unit < 3; unit++) {
    const baseX = (unit * 5 + 1) * spacing;

    // CH2
    const c1 = addAtom([baseX, dir * zigzagY, 0], "C");
    bond(prevC, c1, 1);
    addAtom([baseX + 0.3, dir * zigzagY + 0.5, 0.2], "H");
    bond(c1, atoms.length - 1, 1);
    addAtom([baseX + 0.3, dir * zigzagY - 0.5, -0.2], "H");
    bond(c1, atoms.length - 1, 1);
    prevC = c1;
    dir *= -1;

    // CH2
    const c2 = addAtom([baseX + spacing, dir * zigzagY, 0], "C");
    bond(prevC, c2, 1);
    addAtom([baseX + spacing + 0.3, dir * zigzagY + 0.5, 0.2], "H");
    bond(c2, atoms.length - 1, 1);
    addAtom([baseX + spacing + 0.3, dir * zigzagY - 0.5, -0.2], "H");
    bond(c2, atoms.length - 1, 1);
    prevC = c2;
    dir *= -1;

    // O (ether)
    const o1 = addAtom([baseX + 2 * spacing, dir * zigzagY, 0], "O");
    bond(prevC, o1, 1);
    prevC = o1;
    dir *= -1;

    // C=O (carbamate carbonyl)
    const cCarb = addAtom([baseX + 3 * spacing, dir * zigzagY, 0], "C");
    bond(prevC, cCarb, 1);
    const oDouble = addAtom([baseX + 3 * spacing + 0.3, dir * zigzagY + 0.7, 0], "O");
    bond(cCarb, oDouble, 2);
    prevC = cCarb;
    dir *= -1;

    // N-H (carbamate amide)
    const n1 = addAtom([baseX + 4 * spacing, dir * zigzagY, 0], "N");
    bond(prevC, n1, 1);
    addAtom([baseX + 4 * spacing + 0.3, dir * zigzagY + 0.5, 0.2], "H");
    bond(n1, atoms.length - 1, 1);
    prevC = n1;
    dir *= -1;

    // Add Li+ near the ether oxygen
    if (unit < 2) {
      const li = addAtom([baseX + 2 * spacing + 0.5, dir * zigzagY + 1.2, 0.8], "Li");
      liIons.push(li);
    }
  }

  // Final CH2-CH2-O-CH3 (PEG end cap)
  const baseX = 16 * spacing;
  const c1 = addAtom([baseX, dir * zigzagY, 0], "C");
  bond(prevC, c1, 1);
  addAtom([baseX + 0.3, dir * zigzagY + 0.5, 0.2], "H");
  bond(c1, atoms.length - 1, 1);
  addAtom([baseX + 0.3, dir * zigzagY - 0.5, -0.2], "H");
  bond(c1, atoms.length - 1, 1);
  prevC = c1;
  dir *= -1;

  const c2 = addAtom([baseX + spacing, dir * zigzagY, 0], "C");
  bond(prevC, c2, 1);
  addAtom([baseX + spacing + 0.3, dir * zigzagY + 0.5, 0.2], "H");
  bond(c2, atoms.length - 1, 1);
  addAtom([baseX + spacing + 0.3, dir * zigzagY - 0.5, -0.2], "H");
  bond(c2, atoms.length - 1, 1);
  prevC = c2;
  dir *= -1;

  const oEnd = addAtom([baseX + 2 * spacing, dir * zigzagY, 0], "O");
  bond(prevC, oEnd, 1);

  const cEnd = addAtom([baseX + 3 * spacing, dir * zigzagY, 0], "C");
  bond(oEnd, cEnd, 1);
  addAtom([baseX + 3 * spacing + 0.3, dir * zigzagY + 0.5, 0.2], "H");
  bond(cEnd, atoms.length - 1, 1);
  addAtom([baseX + 3 * spacing + 0.3, dir * zigzagY - 0.5, -0.2], "H");
  bond(cEnd, atoms.length - 1, 1);
  addAtom([baseX + 3 * spacing + 0.3, dir * zigzagY, -0.5], "H");
  bond(cEnd, atoms.length - 1, 1);

  return { atoms, bonds, liIons };
}

function AtomMesh({ atom }: { atom: Atom }) {
  const color = atomColors[atom.type];
  const radius = atomRadii[atom.type];
  const isLi = atom.type === "Li";
  return (
    <mesh position={atom.position} castShadow>
      <sphereGeometry args={[radius, isLi ? 32 : 24, isLi ? 32 : 24]} />
      <meshStandardMaterial
        color={color}
        roughness={isLi ? 0.1 : 0.25}
        metalness={isLi ? 0.6 : 0.15}
        emissive={isLi ? "#7c3aed" : "#000000"}
        emissiveIntensity={isLi ? 0.3 : 0}
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
    if (p.length() < 0.1) p = new THREE.Vector3(1, 0, 0).cross(dir);
    p.normalize();
    return { midpoint: mid, length: len, quaternion: quat, perp: p };
  }, [start, end]);

  const bondRadius = 0.05;

  if (order === 2) {
    const offset = 0.1;
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

function PolymerGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { atoms, bonds, liIons } = useMemo(() => buildPolymer(), []);

  const centroid = useMemo(() => {
    const sum = atoms.reduce(
      (acc, a) => [acc[0] + a.position[0], acc[1] + a.position[1], acc[2] + a.position[2]] as [number, number, number],
      [0, 0, 0] as [number, number, number]
    );
    return [sum[0] / atoms.length, sum[1] / atoms.length, sum[2] / atoms.length] as [number, number, number];
  }, [atoms]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
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
      {/* Glow halos around Li+ ions */}
      {liIons.map((liIdx, i) => (
        <mesh key={`li-glow-${i}`} position={atoms[liIdx].position}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function PolymerElectrolyte3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 16], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 8]} intensity={0.9} castShadow />
        <directionalLight position={[-5, -3, -5]} intensity={0.35} />
        <pointLight position={[0, 0, 10]} intensity={0.4} color="#a78bfa" />
        <pointLight position={[-8, 4, 2]} intensity={0.3} color="#f59e0b" />
        <PolymerGroup />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} minDistance={8} maxDistance={30} />
      </Canvas>
    </div>
  );
}
