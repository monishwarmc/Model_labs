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
      {isMobile ? (
  // 📱 Mobile: Locked to the bottom container, no dragging allowed
  <div className="fixed bottom-0 left-0 w-full z-10 max-h-[45vh] overflow-hidden">
    <Leva 
      fill={true} 
      collapsed={true} 
      theme={{ space: { rowGap: "4px" } }} 
      hideCopyButton={true}
      titleBar={{ drag: false }} 
    />
  </div>
) : (
  // 💻 Desktop: Floating panel with natural, glitch-free dragging
  <Leva 
    fill={false} // Lets Leva use its native desktop layout
    collapsed={false} 
    theme={{ 
      sizes: { rootWidth: '450px' }, // Make it wide/big on desktop seamlessly
      space: { rowGap: "6px" } 
    }} 
    titleBar={{ 
      drag: true,
      position: { x: 20, y: 20 } // Sets its starting coordinates safely on the screen
    }} 
  />
)}





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
