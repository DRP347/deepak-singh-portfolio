// src/case-studies/ArabianRedFox.jsx
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProblemInsightSection from "./ProblemInsightSection";
import StrategySection from "./StrategySection";
import InterfaceSection from "../components/InterfaceSection";
import "./arabian-red-fox.css";

export default function ArabianRedFox() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const bottleY  = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const bottleOp = useTransform(scrollYProgress, [0, 0.70], [1, 0]);
  const copyOp   = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const copyY    = useTransform(scrollYProgress, [0, 0.45], ["0px", "28px"]);

  useEffect(() => {
    document.body.classList.add("arf-no-navbar");
    return () => document.body.classList.remove("arf-no-navbar");
  }, []);

  return (
    <div className="arf-page">
      <section className="arf-hero" ref={heroRef}>

        <div className="arf-heroBg" aria-hidden="true">
          <div className="arf-bgBase" />
          <div className="arf-bgAmber" />
          <div className="arf-bgLeftShadow" />
          <div className="arf-bgNoise" />
          <div className="arf-bgSmoke" />
          <div className="arf-bgRadialLight" />
        </div>

        <a href="/" className="arf-anchor">
          <span className="arf-anchorIcon">←</span>
          <span className="arf-anchorText">Back</span>
        </a>

        <div className="arf-watermark" aria-hidden="true">
          <span className="arf-wm1">ARABIAN</span>
          <span className="arf-wm2">RED FOX</span>
        </div>

        <div className="arf-vignette" aria-hidden="true" />

        <motion.div
          className="arf-heroBottleWrap"
          initial={{ opacity: 0, y: 70, scale: 0.96 }}
          animate={{ opacity: 1, y: 30, scale: 1 }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ y: bottleY, opacity: bottleOp }}
        >
          <div className="arf-bottleGlowOuter" aria-hidden="true" />
          <div className="arf-bottleGlowInner" aria-hidden="true" />
          <img src="/img/arf-bottle.png" alt="Arabian Red Fox Tennessee Whiskey" className="arf-bottleImg" draggable={false} />
          <div className="arf-bottleFloor" aria-hidden="true" />
        </motion.div>

        <div className="arf-heroFadeBottom" aria-hidden="true" />
        <div className="arf-heroFadeTop"    aria-hidden="true" />
        <div className="arf-heroFadeLeft"   aria-hidden="true" />

        <motion.div
          className="arf-heroContent"
          style={{ opacity: copyOp, y: copyY }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.65 } } }}
        >
          <motion.div className="arf-heroBadge" variants={{
            hidden:  { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } },
          }}>
            <span className="arf-heroBadgeDot" />
            Case Study
          </motion.div>

          <motion.h1 className="arf-heroTitle" variants={{
            hidden:  { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.80, ease: [0.22,1,0.36,1] } },
          }}>
            Arabian
            <em className="arf-heroTitleAccent">Red Fox</em>
          </motion.h1>

          <motion.p className="arf-heroSubtitle" variants={{
            hidden:  { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } },
          }}>
            A premium product-first experience designed
            to build desire, trust, and conversion.
          </motion.p>

          <motion.div className="arf-heroActions" variants={{
            hidden:  { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } },
          }}>
            <a className="arf-heroCta" href="https://redfo.netlify.app" target="_blank" rel="noreferrer">
              Enter the Distillery <span className="arf-heroCtaArrow">↗</span>
            </a>
            <a className="arf-heroScroll" href="#challenge">Scroll to explore ↓</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="arf-heroDarkCard"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="arf-darkCardItem">
            <div className="arf-darkCardLabel">Role</div>
            <div className="arf-darkCardValue">Design &amp; Development</div>
          </div>
          <div className="arf-darkCardDivider" />
          <div className="arf-darkCardItem">
            <div className="arf-darkCardLabel">Type</div>
            <div className="arf-darkCardValue">Client Project</div>
          </div>
          <div className="arf-darkCardDivider" />
          <div className="arf-darkCardItem">
            <div className="arf-darkCardLabel">Year</div>
            <div className="arf-darkCardValue">2024</div>
          </div>
        </motion.div>

      </section>

      <ProblemInsightSection />
      <StrategySection />
      <InterfaceSection />
      {/* Footer comes from App.jsx CaseStudyFooter — no duplicate here */}
    </div>
  );
}