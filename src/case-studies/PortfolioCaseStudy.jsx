import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../index.css";

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Divider = () => <div className="cs-divider" />;

const PortfolioCaseStudy = ({ theme }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="cs-page" data-theme={theme || undefined}>
      {/* =================== HERO =================== */}
      <section ref={heroRef} className="cs-hero">
        <motion.div
          className="cs-hero-inner"
          style={{ scale: heroScale, opacity: heroOpacity, y: heroTranslateY }}
        >
          <div className="cs-hero-meta">
            <span className="cs-pill">Case Study</span>
            <span className="cs-pill subtle">Personal Brand · 2025</span>
          </div>

          <motion.p
            className="cs-eyebrow"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Deepak Singh — Web Alchemist
          </motion.p>

          <motion.h1
            className="cs-hero-title"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Portfolio Website
          </motion.h1>

          <motion.p
            className="cs-hero-subtitle"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            A cinematic, interaction-driven portfolio built to feel more like a
            story than a static resume.
          </motion.p>

          <motion.div
            className="cs-hero-tags"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <span>React</span>
            <span>React Three Fiber</span>
            <span>Framer Motion</span>
            <span>Web Alchemy Aesthetic</span>
          </motion.div>
        </motion.div>

        <div className="cs-hero-bg-gradient cs-hero-bg-portfolio" />
        <div className="cs-hero-noise" />
        <div className="cs-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="cs-scroll-line" />
        </div>
      </section>

      {/* =================== BODY =================== */}
      <main className="cs-body">
        {/* OVERVIEW */}
        <section className="cs-section">
          <div className="cs-section-label">01 — Overview</div>
          <Divider />
          <motion.h2
            className="cs-section-title"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            Turning a portfolio into a narrative experience.
          </motion.h2>
          <motion.p
            className="cs-section-text"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, amount: 0.35 }}
          >
            This portfolio isn’t just a gallery of projects — it’s a designed
            journey through how I think about interfaces, motion, and 3D on the
            web. The hero uses an R3F-powered 3D sculpture, scroll-tuned
            animation, and time-based theming to introduce me as a “Web
            Alchemist” rather than just another frontend developer.
          </motion.p>
        </section>

        {/* EXPERIENCE PILLARS */}
        <section className="cs-section cs-grid-two">
          <div>
            <div className="cs-section-label">02 — Experience Pillars</div>
            <Divider />
            <motion.h2
              className="cs-section-title"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              Three principles guide every interaction.
            </motion.h2>
          </div>

          <motion.div
            className="cs-pillars"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="cs-pillar">
              <h3>Story over screens</h3>
              <p>
                Sections are structured like chapters: introduction, evolution,
                tools, proof, and invitation. Animations are timed to these
                beats instead of being randomly scattered.
              </p>
            </div>
            <div className="cs-pillar">
              <h3>Motion as language</h3>
              <p>
                Framer Motion drives a consistent motion system: easing curves,
                durations, and stagger timings are reused, so the site feels
                choreographed, not chaotic.
              </p>
            </div>
            <div className="cs-pillar">
              <h3>3D with restraint</h3>
              <p>
                The R3F scene is intentionally minimal — a single sculpted form
                with subtle breathing movement — used as a character, not a
                distraction.
              </p>
            </div>
          </motion.div>
        </section>

        {/* TECH STACK */}
        <section className="cs-section">
          <div className="cs-section-label">03 — Stack & Architecture</div>
          <Divider />
          <motion.div
            className="cs-tech-grid"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div className="cs-tech-column">
              <h3>Frontend</h3>
              <ul>
                <li>React for component structure and state</li>
                <li>React Three Fiber for the hero 3D scene</li>
                <li>Framer Motion for page-level and micro interactions</li>
                <li>Custom CSS with utility-style helpers</li>
              </ul>
            </div>
            <div className="cs-tech-column">
              <h3>Experience Layer</h3>
              <ul>
                <li>Time-aware theme switching (day = light, night = dark)</li>
                <li>Smooth scroll feel paired with entry animations</li>
                <li>Scroll-based depth for background stars</li>
                <li>Analytics + performance insights via Vercel tooling</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* PROCESS */}
        <section className="cs-section">
          <div className="cs-section-label">04 — Process</div>
          <Divider />
          <motion.ol
            className="cs-steps"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <li>
              <span>01</span>
              <div>
                <h3>Discover the character</h3>
                <p>
                  Defined “Web Alchemist” as the core persona — someone who
                  blends code, design, and storytelling. Every copy line and
                  animation choice reflects that identity.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Design the flow</h3>
                <p>
                  Mapped the scroll journey from introduction to collaboration,
                  ensuring no dead sections — every scroll step either informs,
                  delights, or builds trust.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Build the engine</h3>
                <p>
                  Implemented the 3D scene, motion primitives, and layout
                  system, then tuned easing, distance, and delays until the site
                  felt smooth but responsive.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Polish & performance</h3>
                <p>
                  Reduced unnecessary re-renders, optimized 3D scale and
                  lighting, and ensured the experience stayed fluid on mid-range
                  hardware.
                </p>
              </div>
            </li>
          </motion.ol>
        </section>

        {/* OUTRO */}
        <section className="cs-section cs-outro">
          <Divider />
          <motion.p
            className="cs-outro-text"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            This portfolio is a living lab — a place where I keep experimenting
            with 3D, motion systems, and narrative interfaces. If you’d like an
            experience like this for your brand, the homepage is your best
            starting point.
          </motion.p>
          <motion.a
            href="/"
            className="cs-back-link"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
          >
            ← Back to Home
          </motion.a>
        </section>
      </main>
    </div>
  );
};

export default PortfolioCaseStudy;
