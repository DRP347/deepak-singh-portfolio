import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Preload, OrbitControls } from "@react-three/drei";

function VrThinkerModel({ isMobile }) {
  const modelRef = useRef();
  const { scene } = useGLTF("/vr_thinker.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const meshList = useMemo(() => {
    const list = [];
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = 0;
        list.push(child);
      }
    });
    return list;
  }, [clonedScene]);

  useFrame((_, delta) => {
    if (!modelRef.current) return;

    const nextOpacity = Math.min((modelRef.current.userData.opacity || 0) + delta * 0.8, 1);
    modelRef.current.userData.opacity = nextOpacity;
    for (const mesh of meshList) {
      mesh.material.opacity = nextOpacity;
    }

    const time = performance.now();
    const breathe = Math.sin(time * 0.0008) * 0.005 + 1;
    const floatY = Math.sin(time * 0.0005) * 0.05;
    const scale = isMobile ? 0.0 : 0.125;
    const posX = isMobile ? 0 : 3.15;
    const posY = isMobile ? floatY - 2.5 : floatY - 3.25;

    modelRef.current.scale.set(scale * breathe, scale * breathe, scale * breathe);
    modelRef.current.position.set(posX, posY, 0);
  });

  return <primitive ref={modelRef} object={clonedScene} />;
}

const HeroSceneContent = ({ theme, isMobile }) => (
  <>
    <ambientLight intensity={theme === "light" ? 1.0 : 0.6} />
    <directionalLight position={[10, 10, 5]} intensity={theme === "light" ? 1.5 : 1.2} />
    <VrThinkerModel isMobile={isMobile} />
  </>
);

export default function HeroCanvas({ theme, isMobile }) {
  return (
    <Canvas
      camera={{ fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1]}
      performance={{ min: 0.5, max: 0.75, debounce: 100 }}
      shadows={false}
    >
      <HeroSceneContent theme={theme} isMobile={isMobile} />
      <Preload all />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

useGLTF.preload("/vr_thinker.glb");
