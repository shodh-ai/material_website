"use client";

import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

type GLTFResult = GLTF & {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};

type ModelProps = {
  petalsRef: React.RefObject<THREE.Group>;
  sunRef: React.RefObject<THREE.Group>;
} & JSX.IntrinsicElements["group"];

export function Model({ petalsRef, sunRef, ...props }: ModelProps) {
  const { nodes } = useGLTF("/Untitled1.glb") as unknown as GLTFResult;

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#000000"),
        transmission: 1,
        opacity: 1,
        metalness: 0,
        roughness: 0.05,
        ior: 1.5,
        thickness: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1,
      }),
    []
  );

  const sunMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#48cae4"),
        emissive: new THREE.Color("#48cae4"),
        emissiveIntensity: 1.6,
        toneMapped: false,
      }),
    []
  );

  useEffect(() => {
    return () => {
      glassMaterial.dispose();
      sunMaterial.dispose();
    };
  }, [glassMaterial, sunMaterial]);

  const entries = Object.entries(nodes)
    .map(([name, node]) => ({ name, node: node as any }))
    .filter((e) => Boolean(e.node?.geometry));

  const petals = entries.filter((e) => (e.name || "").toLowerCase().startsWith("petals"));
  const sun = entries.filter((e) => {
    const n = (e.name || "").toLowerCase();
    return n === "sphere" || n === "sphere001";
  });
  const rest = entries.filter((e) => {
    const n = (e.name || "").toLowerCase();
    return !n.startsWith("petals") && n !== "sphere" && n !== "sphere001";
  });

  return (
    <group {...props} dispose={null}>
      <group ref={petalsRef}>
        {petals.map(({ name, node }) => (
          <mesh
            key={name}
            name={name}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={glassMaterial}
          />
        ))}
      </group>

      <group ref={sunRef}>
        {sun.map(({ name, node }) => (
          <mesh key={name} name={name} geometry={node.geometry} material={sunMaterial} castShadow receiveShadow />
        ))}
      </group>

      <group>
        {rest.map(({ name, node }) => (
          <mesh
            key={name}
            name={name}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={glassMaterial}
          />
        ))}
      </group>
    </group>
  );
}

useGLTF.preload("/Untitled1.glb");
