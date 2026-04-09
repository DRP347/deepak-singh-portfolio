// src/case-studies/KumoKitchen.jsx
import { useEffect, useRef, Suspense, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import KumoChallenge from "./KumoChallenge";
import KumoStrategy from "./KumoStrategy";
import KumoInterface from "./KumoInterface";
import "./kumo-kitchen.css";

/* ─────────────────────────────────
   3D RAMEN BOWL MODEL
   Uses the same .glb from kumokitchen.vercel.app
   Place the file at: public/models/ramen_bowl.glb
───────────────────────────────── */
function RamenBowlModel() {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/ramen_bowl.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const { pointer } = useThree();

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mats = Array.isArray(child.material)
            ? child.material
            : [child.material];
          mats.forEach((mat) => {
            if ("roughness" in mat) {
              mat.roughness = 0.4;
              mat.metalness = 0.1;
              mat.envMapIntensity = 1.2;
            }
          });
        }
      }
    });
  }, [clonedScene]);

  useFrame(() => {
    if (!modelRef.current) return;
    // Gentle idle float
    const floatY = Math.sin(Date.now() * 0.0006) * 0.04;
    const breathe = Math.sin(Date.now() * 0.0008) * 0.003 + 1;

    modelRef.current.position.y = -0.3 + floatY;
    modelRef.current.scale.setScalar(2.2 * breathe);

    // Subtle pointer follow
    const targetRotY = pointer.x * 0.15;
    const targetRotX = -pointer.y * 0.08;
    modelRef.current.rotation.y +=
      (targetRotY - modelRef.current.rotation.y) * 0.04;
    modelRef.current.rotation.x +=
      (targetRotX + 0.15 - modelRef.current.rotation.x) * 0.04;
  });

  return <primitive ref={modelRef} object={clonedScene} />;
}

// Preload the model
useGLTF.preload("/models/ramen_bowl.glb");

export default function KumoKitchen() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bowlY   = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const bowlOp  = useTransform(scrollYProgress, [0, 0.70], [1, 0]);
  const copyOp  = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const copyY   = useTransform(scrollYProgress, [0, 0.45], ["0px", "28px"]);

  useEffect(() => {
    document.body.classList.add("kk-no-navbar");
    return () => document.body.classList.remove("kk-no-navbar");
  }, []);

  return (
    <div className="kk-page">
      <section className="kk-hero" ref={heroRef}>
        {/* ── Layered Background ── */}
        <div className="kk-heroBg" aria-hidden="true">
          <div className="kk-bgBase" />
          <div className="kk-bgWarm" />
          <div className="kk-bgLeftShadow" />
          <div className="kk-bgNoise" />
          <div className="kk-bgSmoke" />
          <div className="kk-bgRadialLight" />
        </div>

        {/* ── Back Link ── */}
        <a href="/" className="kk-anchor">
          <span className="kk-anchorIcon">←</span>
          <span className="kk-anchorText">Back</span>
        </a>

        {/* ── Watermark ── */}
        <div className="kk-watermark" aria-hidden="true">
          <span className="kk-wm1">KUMO</span>
          <span className="kk-wm2">KITCHEN</span>
        </div>

        <div className="kk-vignette" aria-hidden="true" />

        {/* ── 3D Ramen Bowl ── */}
        <motion.div
          className="kk-heroImageWrap"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ opacity: bowlOp }}
        >
          <div className="kk-imageGlowOuter" aria-hidden="true" />
          <div className="kk-imageGlowInner" aria-hidden="true" />
          <div className="kk-hero3dCanvas">
            <Canvas
              camera={{ position: [0, 1.5, 4], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              style={{ pointerEvents: "auto" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} color="#ffe4c4" />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={1.4}
                  color="#ffd9a0"
                  castShadow
                />
                <directionalLight
                  position={[-3, 4, -2]}
                  intensity={0.3}
                  color="#c9a96e"
                />
                <pointLight
                  position={[0, -1, 3]}
                  intensity={0.4}
                  color="#ff9040"
                  distance={8}
                />
                <Environment preset="night" />
                <RamenBowlModel />
              </Suspense>
            </Canvas>
          </div>
          <div className="kk-imageFloor" aria-hidden="true" />
        </motion.div>

        {/* ── Fades ── */}
        <div className="kk-heroFadeBottom" aria-hidden="true" />
        <div className="kk-heroFadeTop" aria-hidden="true" />
        <div className="kk-heroFadeLeft" aria-hidden="true" />

        {/* ── Hero Copy ── */}
        <motion.div
          className="kk-heroContent"
          style={{ opacity: copyOp, y: copyY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.11, delayChildren: 0.65 },
            },
          }}
        >
          <motion.div
            className="kk-heroBadge"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span className="kk-heroBadgeDot" />
            Case Study
          </motion.div>

          <motion.h1
            className="kk-heroTitle"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            Kumo
            <em className="kk-heroTitleAccent">Kitchen</em>
          </motion.h1>

          <motion.p
            className="kk-heroSubtitle"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            A quiet celebration of Japanese fine dining in Daman — crafted
            through ritual, warmth, and precision. Every bowl is built with
            patience, intention, and respect for time.
          </motion.p>

          <motion.div
            className="kk-heroActions"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <a
              className="kk-heroCta"
              href="https://kumokitchen.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Enter the Kitchen{" "}
              <span className="kk-heroCtaArrow">↗</span>
            </a>
            <a className="kk-heroScroll" href="#kk-challenge">
              Scroll to explore ↓
            </a>
          </motion.div>
        </motion.div>

        {/* ── Meta Card ── */}
        <motion.div
          className="kk-heroDarkCard"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="kk-darkCardItem">
            <div className="kk-darkCardLabel">Role</div>
            <div className="kk-darkCardValue">Design &amp; Development</div>
          </div>
          <div className="kk-darkCardDivider" />
          <div className="kk-darkCardItem">
            <div className="kk-darkCardLabel">Type</div>
            <div className="kk-darkCardValue">Restaurant Experience</div>
          </div>
          <div className="kk-darkCardDivider" />
          <div className="kk-darkCardItem">
            <div className="kk-darkCardLabel">Year</div>
            <div className="kk-darkCardValue">2025</div>
          </div>
        </motion.div>
      </section>

      <KumoChallenge />
      <KumoStrategy />
      <KumoInterface />
    </div>
  );
}