// src/components/BottleHero.tsx
import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

type BottleHeroProps = {
  className?: string;
  modelUrl?: string;
  scale?: number;
  rotation?: Vec3;
  position?: Vec3;
  targetHeight?: number;
  enableControls?: boolean;
  /**
   * < 1.0 = closer camera = bigger bottle.
   * 0.52 = full bottle visible, large and readable.
   * 0.38 = tight crop, body only.
   */
  zoomFactor?: number;
  /** Enable slow auto-rotate on Y axis */
  autoRotate?: boolean;
  /** Seconds per full revolution. Default 14. */
  rotateDuration?: number;
  /**
   * Scroll progress (0–1) passed in from parent.
   * Used to tilt bottle forward as user scrolls.
   */
  scrollProgress?: number;
};

/* ─────────────────────────────────────────────
   CAMERA FIT
───────────────────────────────────────────── */
function FitCamera({
  objectRef,
  zoomFactor = 1.0,
}: {
  objectRef: React.RefObject<THREE.Object3D>;
  zoomFactor?: number;
}) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const obj = objectRef.current;
    if (!obj) return;

    const box    = new THREE.Box3().setFromObject(obj);
    const sizeV  = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(sizeV);
    box.getCenter(center);

    if (!isFinite(sizeV.x) || !isFinite(sizeV.y) || !isFinite(sizeV.z)) return;

    const radius     = 0.5 * Math.max(sizeV.x, sizeV.y, sizeV.z);
    const safeRadius = Math.max(radius, 0.001);
    const fov        = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const aspect     = size.width / Math.max(size.height, 1);

    const fitH = safeRadius / Math.sin(fov / 2);
    const fitW = safeRadius / Math.sin(Math.atan(Math.tan(fov / 2) * aspect));

    const distance = Math.max(fitH, fitW) * zoomFactor;

    camera.position.set(center.x, center.y + safeRadius * 0.06, center.z + distance);
    camera.near = Math.max(0.01, distance / 100);
    camera.far  = Math.max(200, distance * 10);
    camera.updateProjectionMatrix();
    camera.lookAt(center.x, center.y, center.z);
  }, [camera, size.width, size.height, objectRef, zoomFactor]);

  return null;
}

/* ─────────────────────────────────────────────
   ANIMATED BOTTLE — auto-rotate + scroll tilt
───────────────────────────────────────────── */
function AnimatedBottle({
  url,
  targetHeight   = 2.8,
  scale          = 1.0,
  baseRotation   = [0, 0.14, 0.03] as Vec3,
  position       = [0, 0.3, 0]     as Vec3,
  autoRotate     = true,
  rotateDuration = 14,
  scrollProgress = 0,
}: {
  url: string;
  targetHeight?: number;
  scale?: number;
  baseRotation?: Vec3;
  position?: Vec3;
  autoRotate?: boolean;
  rotateDuration?: number;
  scrollProgress?: number;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const bottle    = useMemo(() => scene.clone(true), [scene]);

  // Normalize model size
  useLayoutEffect(() => {
    bottle.traverse((obj: any) => {
      if (obj?.isMesh) {
        obj.castShadow     = true;
        obj.receiveShadow  = true;
        if (obj.material) {
          obj.material.side        = THREE.FrontSide;
          obj.material.depthWrite  = true;
          obj.material.needsUpdate = true;
        }
      }
    });

    const box    = new THREE.Box3().setFromObject(bottle);
    const sizeV  = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(sizeV);
    box.getCenter(center);
    bottle.position.sub(center);

    const normalize = targetHeight / Math.max(sizeV.y, 0.0001);
    bottle.scale.setScalar(normalize);
  }, [bottle, targetHeight]);

  const rotateSpeed = (Math.PI * 2) / rotateDuration;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // 1. Auto-rotate — smooth Y spin
    if (autoRotate) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }

    // 2. Scroll tilt — lerp toward tilted-forward pose as scroll increases
    //    At scroll=0: upright. At scroll=1: tilted ~25° forward + scale down.
    const targetTiltX  = baseRotation[0] - scrollProgress * 0.44; // tilt forward
    const targetScaleV = scale * (1 - scrollProgress * 0.18);     // shrink slightly

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTiltX,
      0.06
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScaleV, 0.06)
    );
  });

  return (
    <group
      ref={groupRef}
      rotation={baseRotation}
      position={position}
      scale={scale}
    >
      <primitive object={bottle} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   SCENE
───────────────────────────────────────────── */
function Scene({
  modelUrl,
  scale,
  rotation,
  position,
  targetHeight,
  enableControls,
  zoomFactor,
  autoRotate,
  rotateDuration,
  scrollProgress,
}: Required<Omit<BottleHeroProps, "className">>) {
  const wrapperRef = useRef<THREE.Group>(null);

  return (
    <>
      {/* Cinematic dark lighting */}
      <ambientLight intensity={0.20} />

      {/* Key — warm upper right */}
      <directionalLight
        position={[4, 10, 5]}
        intensity={2.0}
        castShadow
        color="#fff5ee"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Rim — cool back left */}
      <directionalLight
        position={[-5, 4, -6]}
        intensity={0.55}
        color="#b0c4ff"
      />

      {/* Red under-glow */}
      <pointLight
        position={[0, -2, 2]}
        intensity={1.0}
        color="#7f1d1d"
        distance={9}
      />

      {/* Subtle front fill so label is legible */}
      <directionalLight
        position={[0, 0, 8]}
        intensity={0.30}
        color="#ffe8d6"
      />

      <Environment preset="night" />

      <group ref={wrapperRef}>
        <Suspense fallback={null}>
          <AnimatedBottle
            url={modelUrl}
            targetHeight={targetHeight}
            scale={scale}
            baseRotation={rotation}
            position={position}
            autoRotate={autoRotate}
            rotateDuration={rotateDuration}
            scrollProgress={scrollProgress}
          />

          <ContactShadows
            opacity={0.30}
            scale={10}
            blur={3.5}
            far={10}
            resolution={512}
            position={[0, -1.4, 0]}
            color="#1a0000"
          />
        </Suspense>
      </group>

      <FitCamera objectRef={wrapperRef} zoomFactor={zoomFactor} />

      {enableControls && <OrbitControls enablePan={false} enableZoom={false} />}
    </>
  );
}

/* ─────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────── */
export default function BottleHero({
  className,
  modelUrl       = "/models/wine_bottle.glb",
  scale          = 1.0,
  rotation       = [0, 0.14, 0.03],
  position       = [0, 0.3, 0],
  targetHeight   = 3.8,
  enableControls = false,
  zoomFactor     = 0.52,
  autoRotate     = true,
  rotateDuration = 14,
  scrollProgress = 0,
}: BottleHeroProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 6], fov: 35, near: 0.1, far: 300 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene
          modelUrl={modelUrl}
          scale={scale}
          rotation={rotation}
          position={position}
          targetHeight={targetHeight}
          enableControls={enableControls}
          zoomFactor={zoomFactor}
          autoRotate={autoRotate}
          rotateDuration={rotateDuration}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/wine_bottle.glb");