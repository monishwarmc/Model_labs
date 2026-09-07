import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: { mug: THREE.Mesh }
  materials: { mug: THREE.MeshStandardMaterial }
}

export function Mug(props: React.ComponentPropsWithoutRef<'group'>) {
  const { nodes, materials } = useGLTF('/models/mug.glb') as unknown as GLTFResult

  // Pass a configuration callback directly inside the loader execution sequence
  const texture = useTexture('textures/mug.jpg', (tex) => {
    if (Array.isArray(tex)) {
      tex.forEach((t) => (t.flipY = false))
    } else {
      tex.flipY = false
    }
  })

  return (
    <group {...props} dispose={null}>
      <mesh name="mug" geometry={nodes.mug.geometry}>
        <meshStandardMaterial
          map={texture}
          roughness={materials.mug.roughness}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/mug.glb')
