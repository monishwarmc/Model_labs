import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
    defaultMaterial001: THREE.Mesh
    defaultMaterial002: THREE.Mesh
    defaultMaterial003: THREE.Mesh
  }
  materials: {
    ['02___Default_1003.001']: THREE.MeshStandardMaterial
    ['02___Default_1002.001']: THREE.MeshStandardMaterial
    ['02___Default_1001.001']: THREE.MeshStandardMaterial
    ['02___Default_1004.001']: THREE.MeshStandardMaterial
  }
}

export function Glider(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('models/glider.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials['02___Default_1003.001']} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.defaultMaterial001.geometry} material={materials['02___Default_1002.001']} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.defaultMaterial002.geometry} material={materials['02___Default_1001.001']} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
      <mesh geometry={nodes.defaultMaterial003.geometry} material={materials['02___Default_1004.001']} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('models/glider.glb')
