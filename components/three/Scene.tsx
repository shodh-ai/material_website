"use client";

import { Suspense, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import { Model } from "./Model";

gsap.registerPlugin(ScrollTrigger);

export function Scene() {
  const containerRef = useRef<THREE.Group>(null);
  const petalsGroupRef = useRef<THREE.Group>(null);
  const sunGroupRef = useRef<THREE.Group>(null);
  const introPlayedRef = useRef(false);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5;

  const responsiveData = {
    scale: isMobile ? 0.62 : 1.15,
    pos: isMobile ? ([0, -0.4, 0] as const) : ([2.1, -1.6, 0] as const),
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current.position, {
        x: responsiveData.pos[0],
        y: responsiveData.pos[1],
        z: responsiveData.pos[2],
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(containerRef.current.scale, {
        x: responsiveData.scale,
        y: responsiveData.scale,
        z: responsiveData.scale,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { dependencies: [viewport.width] }
  );

  useGSAP(
    () => {
      let raf = 0;

      const play = () => {
        if (introPlayedRef.current) return;

        const petalsGroup = petalsGroupRef.current;
        const sunGroup = sunGroupRef.current;

        if (!petalsGroup || !sunGroup || petalsGroup.children.length === 0 || sunGroup.children.length === 0) {
          raf = window.requestAnimationFrame(play);
          return;
        }

        introPlayedRef.current = true;

        const petals = petalsGroup.children.filter((c) => (c as any).isMesh) as THREE.Mesh[];

        gsap.set(sunGroup.scale, { x: 0, y: 0, z: 0 });

        petals.forEach((p) => {
          gsap.from(p.position, {
            x: p.position.x + (Math.random() - 0.5) * 0.5,
            y: p.position.y + (Math.random() - 0.5) * 0.5,
            z: p.position.z + (Math.random() - 0.5) * 0.5,
            duration: 3,
            ease: "power2.out",
            delay: 0.1,
          });

          gsap.from(p.rotation, {
            x: p.rotation.x + (Math.random() - 0.5) * 0.5,
            y: p.rotation.y + (Math.random() - 0.5) * 0.5,
            duration: 3,
            ease: "power2.out",
            delay: 0.1,
          });
        });

        gsap.to(sunGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          delay: 1.5,
          ease: "back.out(1.2)",
        });
      };

      play();

      return () => {
        window.cancelAnimationFrame(raf);
      };
    },
    { dependencies: [] }
  );

  useGSAP(() => {
    const container = containerRef.current;
    const sunGroup = sunGroupRef.current;
    if (!container || !sunGroup) return;

    const baseSunPos = { x: sunGroup.position.x, y: sunGroup.position.y, z: sunGroup.position.z };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#html-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(container.rotation, { y: Math.PI * 2, ease: "none" }, 0);

    tl.to(
      sunGroup.position,
      {
        y: baseSunPos.y + (isMobile ? 1.5 : 2.0),
        z: baseSunPos.z + 0.5,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    const sunMeshes = sunGroup.children.filter((c) => (c as any).isMesh) as THREE.Mesh[];
    sunMeshes.forEach((m) => {
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat) {
        tl.to(mat, { emissiveIntensity: 3.5, duration: 1 }, 0);
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr"
        resolution={1024}
        environmentIntensity={1.0}
        blur={0.8}
      />

      <group ref={containerRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <Suspense fallback={null}>
            <Model petalsRef={petalsGroupRef} sunRef={sunGroupRef} />
          </Suspense>
        </Float>
      </group>
    </>
  );
}
