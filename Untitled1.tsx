
import * as THREE from 'three'
import React from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    petals: THREE.Mesh
    Sphere: THREE.Mesh
    Sphere001: THREE.Mesh
    petals001: THREE.Mesh
    petals002: THREE.Mesh
    petals003: THREE.Mesh
    petals004: THREE.Mesh
    petals005: THREE.Mesh
    petals006: THREE.Mesh
    petals007: THREE.Mesh
    petals008: THREE.Mesh
    petals009: THREE.Mesh
    petals010: THREE.Mesh
    petals011: THREE.Mesh
  }
  materials: {}
  animations: THREE.AnimationClip[]
}

export function Model(props: ThreeElements['group']) {
  const { nodes } = useGLTF('/Untitled1.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.petals.geometry} material={nodes.petals.material} />
      <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} />
      <mesh geometry={nodes.Sphere001.geometry} material={nodes.Sphere001.material} />
      <mesh geometry={nodes.petals001.geometry} material={nodes.petals001.material} />
      <mesh geometry={nodes.petals002.geometry} material={nodes.petals002.material} />
      <mesh geometry={nodes.petals003.geometry} material={nodes.petals003.material} />
      <mesh geometry={nodes.petals004.geometry} material={nodes.petals004.material} />
      <mesh geometry={nodes.petals005.geometry} material={nodes.petals005.material} />
      <mesh geometry={nodes.petals006.geometry} material={nodes.petals006.material} />
      <mesh geometry={nodes.petals007.geometry} material={nodes.petals007.material} />
      <mesh geometry={nodes.petals008.geometry} material={nodes.petals008.material} />
      <mesh geometry={nodes.petals009.geometry} material={nodes.petals009.material} />
      <mesh geometry={nodes.petals010.geometry} material={nodes.petals010.material} />
      <mesh geometry={nodes.petals011.geometry} material={nodes.petals011.material} />
    </group>
  )
}

useGLTF.preload('/Untitled1.glb')
