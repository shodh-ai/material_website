"use client";

import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import * as THREE from "three";

export default function CanvasLayer() {
  return (
    <div className="fixed inset-0 z-[1]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
