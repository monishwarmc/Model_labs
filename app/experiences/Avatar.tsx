import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { PresentationControls } from "@react-three/drei";
import { Leva } from "leva";
import { Monishwar } from "../models/Monishwar";
import { Light } from "../components/light";




export default function Avatar() {
  const avatarRef = useRef<THREE.Group>(null);
  const light = useRef<THREE.Light>(null);

  return (
    <>
      <Leva
        theme={{
          sizes: {
            controlWidth: "160px",
            rootWidth: "450px",
          },
          space: {
            rowGap: "6px",
            md: "10px",
          },
        }}
        
      />

      <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [1, 1, 2], fov: 50 }}>
        <Light/>
        <ambientLight intensity={Math.PI} />
        <directionalLight
          position={[10, 5, 3]}
          intensity={Math.PI}
          castShadow
          shadow-mapSize={2046}
          ref={light}
        />

        <group position={[-0.5, 0, 0]} scale={1.3} rotation={[-Math.PI / 21, Math.PI / 3.6, 0]}>
          <Suspense fallback={null}>
            <PresentationControls
              global
              cursor
              speed={2}
              polar={[-Infinity, Infinity]}
              azimuth={[-Infinity, Infinity]}
            >
              <Monishwar ref={avatarRef} position={[0, -1, 0]} />
            </PresentationControls>
          </Suspense>
        </group>

        <mesh
          rotation={[-Math.PI / 2, 0, Math.PI * 0.2]}
          position={[-1, -1.3, -1]}
          receiveShadow
        >
          <planeGeometry args={[10, 10, 1, 1]} />
          <shadowMaterial transparent opacity={0.5} />
        </mesh>
      </Canvas>
    </>
  );
}