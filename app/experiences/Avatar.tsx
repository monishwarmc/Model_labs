import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { PresentationControls } from "@react-three/drei";
import { Leva } from "leva";
import { Monishwar } from "../models/Monishwar";
import { Light } from "../components/light";

export default function Avatar() {
  const avatarRef = useRef<THREE.Group>(null);
  const light = useRef<THREE.Light>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
<div className={isMobile 
  ? "fixed bottom-0 left-0 w-full z-1 overflow-hidden pointer-events-none" 
  : "absolute top-4 right-4 z-10 w-[600px] overflow-hidden"
}> 
  <div className="pointer-events-auto w-full h-full">
    <Leva 
      fill={true} 
      collapsed={isMobile} 
      theme={{ 
        sizes: { rootWidth: '100%' },
        space: { rowGap: "4px" } 
      }} 
      hideCopyButton={true} // Removes extra UI clutter that causes overflow
      titleBar={{ drag: !isMobile }} 
    /> 
  </div>
</div>




      <Canvas
        dpr={[1, 1.5]}
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{
          position: isMobile ? [0, 0.8, 3] : [1, 1, 2],
          fov: isMobile ? 45 : 50,
        }}
        className="touch-none h-dvh"
      >
        <Light />
        <ambientLight intensity={Math.PI} />
        <directionalLight
          position={[10, 5, 3]}
          intensity={Math.PI}
          castShadow
          shadow-mapSize={2046}
          ref={light}
        />

        <group
          position={isMobile ? [0, 0.5, 0] : [-0.5, 0, 0]}
          scale={isMobile ? 0.9 : 1.3}
          rotation={
            isMobile
              ? [0, 0, 0]
              : [-Math.PI / 21, Math.PI / 3.6, 0]
          }
        >
          <Suspense fallback={null}>
            <PresentationControls
              global
              cursor
              speed={2}
              polar={[-Infinity, Infinity]}
              azimuth={[-Infinity, Infinity]}
            >
              <Monishwar
                ref={avatarRef}
                position={isMobile ? [0, -1.1, 0] : [0, -1, 0]}
              />
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
