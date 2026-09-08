// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

export const Light = () => {
//   const lightRef = useRef<THREE.DirectionalLight>(null);

//   useFrame(() => {
//     const light = lightRef.current;
//     if (!light) return;

//     // Browser performance timer in seconds
//     const time = performance.now() * 0.001;

//     // 1. Cycle color hue
//     const hue = (time * 0.2) % 1;
//     light.color.setHSL(hue, 1, 0.5);

//     // 2. Pulse light intensity
//     light.intensity = Math.PI + Math.sin(time * 3) * 2;
//   });

  return (
    <>
    <ambientLight intensity={0.5}/>
    <directionalLight
    //   ref={lightRef}
      position={[10, 5, 3]}
      castShadow
      shadow-mapSize={2048}
    />
    </>
  );
};