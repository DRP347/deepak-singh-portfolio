// src/components/HeroSection.jsx
// REDESIGNED: Smaller 3D, headline above fold, scroll indicator

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Preload, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

// ===============================================================
// HOOKS
// ===============================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);

  return matches;
};

// ===============================================================
// Animated Text
// ===============================================================
const AnimatedText = ({ text, className, stagger = 0.05 }) => {
  const letters = Array.from(text);
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

// ===============================================================
// 3D MODEL — Repositioned for smaller footprint
// ===============================================================
function VrThinkerModel() {
  const modelRef = useRef();
  const { scene } = useGLTF("/vr_thinker.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const opacityRef = useRef(0);

  useFrame((_, delta) => {
    if (!modelRef.current) return;

    opacityRef.current = Math.min(opacityRef.current + delta * 0.8, 1);

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = opacityRef.current;
      }
    });

    const breathe = Math.sin(Date.now() * 0.0008) * 0.005 + 1;
    const floatY = Math.sin(Date.now() * 0.0005) * 0.05;

    // CHANGED: Smaller scale, pushed further right
    const scale = isMobile ? 0.0 : 0.095; // Reduced from 0.125
    const posX = isMobile ? 0 : 4.2; // Pushed more right (was 3.15)
    const posY = isMobile ? floatY - 2.5 : floatY - 2.8;

    modelRef.current.scale.set(scale * breathe, scale * breathe, scale * breathe);
    modelRef.current.position.set(posX, posY, 0);
  });

  return <primitive ref={modelRef} object={clonedScene} />;
}

const HeroSceneContent = ({ theme }) => (
  <>
    <ambientLight intensity={theme === "light" ? 1.0 : 0.6} />
    <directionalLight
      position={[10, 10, 5]}
      intensity={theme === "light" ? 1.5 : 1.2}
      castShadow
    />
    <Environment preset={theme === "light" ? "city" : "night"} />
    <VrThinkerModel />
  </>
);

// ===============================================================
// HERO SECTION — REDESIGNED
// ===============================================================
const HeroSection = ({ theme }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="home" className="hero-section hero-section-redesign">
      {/* 3D Canvas — now contained to right side */}
      {!isMobile && (
        <div className="hero-canvas-container hero-canvas-small">
          <Canvas
            camera={{ fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <HeroSceneContent theme={theme} />
              <Preload all />
            </Suspense>

            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>
      )}

      {isMobile && <div className="hero-gradient-fallback" />}

      {/* Hero Content — Now positioned for above-fold visibility */}
      <div className="hero-content hero-content-redesign">
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          UI/UX Designer & Creative Developer
        </motion.span>

        <h1>
          <AnimatedText text="Web Alchemist" className="hero-title-gradient" />
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Turning pixels and code into living, breathing experiences.
          <br />
          <span className="hero-subtitle-highlight">
            Crafting immersive web experiences with 3D, motion & meticulous detail.
          </span>
        </motion.p>

        <motion.div
          className="cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <a href="#projects" className="cta-button cta-primary-new">
            Explore Work
            <span className="cta-arrow">→</span>
          </a>
          <a href="#contact" className="cta-button secondary">
            Let's Collaborate
          </a>
        </motion.div>

        {/* NEW: Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <span className="scroll-arrow">↓</span>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;