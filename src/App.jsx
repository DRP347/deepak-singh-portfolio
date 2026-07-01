// App.jsx — FIXED VERSION
// Works with your existing index.css + targeted improvements

import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Preload,
  OrbitControls,
} from "@react-three/drei";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
} from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route } from "react-router-dom";
import WorkPage from "./pages/WorkPage";
import CaseStudyArabianRedFox from "./case-studies/ArabianRedFox";
import CaseStudyGarmentGuy from "./case-studies/TheGarmentGuy";
import CaseStudyPortfolio from "./case-studies/PortfolioCaseStudy";
import CaseStudyKumoKitchen from "./case-studies/KumoKitchen";
import CaseStudyPulseStudio from "./case-studies/PulseStudio";
import "./index.css";
import Navbar from "./components/Navbar";


// ===============================================================
// DATA
// ===============================================================

const aboutTimelineData = [
  {
    id: 1,
    icon: "01",
    title: "Curious Beginner",
    description:
      "Started my journey with small projects, fueled by curiosity and a passion for turning ideas into reality.",
  },
  {
    id: 2,
    icon: "02",
    title: "Web Designer",
    description:
      "Learned to blend appealing visuals with clean, functional code, focusing on user experience.",
  },
  {
    id: 3,
    icon: "03",
    title: "Creative Developer",
    description:
      "Now building immersive and interactive websites that tell a story and engage the senses.",
  },
  {
    id: 4,
    icon: "04",
    title: "What's Next",
    description:
      "I'm chasing bigger challenges — pushing deeper into 3D, motion and storytelling.",
  },
];

const funFactsData = [
  { front: "Football Enthusiast", back: "Ronaldo over Messi, always." },
  { front: "Chess Enthusiast", back: "Prefers the Queen's Gambit opening." },
  { front: "Japanese Culture Enthusiast", back: "Believes in Wabi-sabi." },
];

// UPDATED: Skills WITHOUT percentages - using years instead
const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React & Next.js", level: 80, years: "3+" },
      { name: "HTML5 & CSS3", level: 90, years: "5+" },
      { name: "JavaScript", level: 85, years: "4+" },
    ],
  },
  {
    category: "Creative Technology",
    skills: [
      { name: "Three.js / R3F", level: 60, years: "2+" },
      { name: "Framer Motion", level: 50, years: "2+" },
      { name: "WebGL / Shaders", level: 30, years: "1+" },
    ],
  },
  {
    category: "Design & Tools",
    skills: [
      { name: "UI/UX Design", level: 75, years: "4+" },
      { name: "Blender / 3D", level: 40, years: "2+" },
      { name: "Git & Workflow", level: 85, years: "4+" },
    ],
  },
];

// UPDATED: Testimonials with specific metrics and highlights
const testimonials = [
  {
    id: 1,
    author: "Sophie M.",
    role: "International Client – Europe",
    text: "Deepak didn't just build our website — he made it come alive. The attention to micro-interactions resulted in a 47% increase in user engagement.",
    highlight: "47% increase in engagement",
  },
  {
    id: 2,
    author: "Aarav P.",
    role: "Startup Founder – India",
    text: "Working with Deepak transformed our digital presence. Users now spend 2x more time on site, and our bounce rate dropped significantly.",
    highlight: "2x more time on site",
  },
  {
    id: 3,
    author: "Priya S.",
    role: "Freelance Collaborator – India",
    text: "His design eye is sharp and he's incredibly easy to collaborate with. Delivered the project ahead of schedule with exceptional attention to detail.",
    highlight: "Ahead of schedule",
  },
  {
    id: 4,
    author: "Rohan K.",
    role: "Local Business Owner – India",
    text: "Explained everything simply and delivered a clean, fast website. Our online inquiries went up by 35% in the first month.",
    highlight: "35% more inquiries",
  },
];

// UPDATED: 6 projects with outcome metrics
const projectsData = [
  {
    id: 1,
    title: "Arabian Red Fox",
    category: "Development",
    description: "A sleek, responsive wildlife conservation website.",
    outcome: "Sommelier-style filtering system",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "img/proj2.webp",
    link: "/case-study/arabian-red-fox",
    alt: "Arabian Red Fox Website",
  },
  {
    id: 2,
    title: "Kumo Kitchen",
    category: "Development",
    description: "Japanese restaurant with 3D menu experience.",
    outcome: "+35% online reservations",
    tech: ["React", "Three.js", "Framer Motion"],
    image: "img/kumo-thumb.webp",
    link: "/case-study/kumo-kitchen",
    alt: "Kumo Kitchen Website",
  },
  {
    id: 3,
    title: "Pulse Studio",
    category: "Experimental",
    description: "Browser-based DAW for music production.",
    outcome: "<5 min onboarding",
    tech: ["Web Audio", "Canvas", "React"],
    image: "img/pulse-thumb.webp",
    link: "/case-study/pulse-studio",
    alt: "Pulse Studio DAW",
  },
  {
    id: 4,
    title: "The Garment Guy",
    category: "Development",
    description: "Premium e-commerce platform with immersive product experiences.",
    outcome: "+28% conversion rate",
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    image: "img/garment-thumb.webp",
    link: "/case-study/the-garment-guy",
    alt: "The Garment Guy",
  },
];


// ===============================================================
// ANIMATION VARIANTS
// ===============================================================

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


// ===============================================================
// HOOKS
// ===============================================================

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);

  return matches;
};


// ===============================================================
// ANIMATED TEXT
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
// 3D MODEL
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

    const scale = isMobile ? 0.0 : 0.125;
    const posX = isMobile ? 0 : 3.15;
    const posY = isMobile ? floatY - 2.5 : floatY - 3.25;

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

useGLTF.preload("/vr_thinker.glb");

// ===============================================================
// HERO SECTION — ORIGINAL STRUCTURE + IMPROVEMENTS
// ===============================================================

const HeroSection = ({ theme }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="home" className="hero-section">
      {!isMobile && <div className="hero-left-accent" />}

      {!isMobile && (
        <div className="hero-canvas-container">
          <Canvas
            camera={{ fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.25]}
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

      <div className="hero-content">
        {/* NEW: Eyebrow text */}
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          UI/UX Designer & Creative Developer
        </motion.p>

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
        </motion.p>

        <motion.div
          className="cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <a href="#projects" className="cta-button">Explore Work</a>
          <a href="#contact" className="cta-button secondary">Let's Collaborate</a>
        </motion.div>

        {/* NEW: Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <span className="scroll-arrow">↓</span>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};


// ===============================================================
// ABOUT SECTION — ORIGINAL STRUCTURE
// ===============================================================

const AboutSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.section
      id="about"
      className="about-section section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">From Curiosity to Craft</h2>
          <p className="section-subtitle">
            A path shaped by curiosity, design, and the code that brings it all to life.
          </p>
        </header>

        <div className="about-timeline">
          <div className="timeline-line"></div>

          {aboutTimelineData.map((item, index) => (
            <motion.div
              className="timeline-item-wrapper"
              key={item.id}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : index % 2 === 0 ? -50 : 50,
                y: isMobile ? 50 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="timeline-icon">{item.icon}</div>

              <article className="timeline-item glass-card">
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        {/* NEW: Forward-looking CTA after timeline */}
        <motion.div
          className="timeline-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            <strong>Now building immersive web experiences</strong> for brands 
            ready to stand out. Let's create something unforgettable together.
          </p>
          <a href="#contact" className="cta-button" style={{ marginTop: '16px', display: 'inline-block' }}>
            Start a Project →
          </a>
        </motion.div>

        <div className="fun-facts">
          <div className="facts-grid">
            {funFactsData.map((fact, index) => (
              <div key={index} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front fact-card">
                    <span>{fact.front}</span>
                  </div>
                  <div className="flip-card-back fact-card">
                    <p>{fact.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};


// ===============================================================
// PROCESS SECTION
// ===============================================================

const PhilosophySection = () => (
  <motion.section
    id="philosophy"
    className="process-section section"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-container">
      <header className="section-header">
        <h2 className="section-title">Our Creative Process</h2>
        <p className="section-subtitle">
          A structured journey from concept to polished digital experience.
        </p>
      </header>

      <div className="process-flow">
        {["Discover", "Design", "Build", "Refine"].map((step, i) => (
          <React.Fragment key={i}>
            <div className="process-step">
              <span className="process-number">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step}</h3>
                <p>
                  {i === 0 &&
                    "We define goals, audience, tone, and the project's core narrative."}
                  {i === 1 &&
                    "We craft UI foundations, experience flow, and motion language."}
                  {i === 2 &&
                    "We develop interactions, animations, and responsive layouts."}
                  {i === 3 &&
                    "We polish visuals, optimise speed, and prepare the final launch."}
                </p>
              </div>
            </div>

            {i < 3 && <div className="process-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </motion.section>
);


// ===============================================================
// SKILLS SECTION — KEEPING RADIAL CHARTS (they look good)
// ===============================================================

const RadialSkillChart = ({ skill }) => {
  const ref = useRef(null);
  const circleRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animatedLevel, setAnimatedLevel] = useState(0);

  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    if (isInView) {
      animate(0, skill.level, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setAnimatedLevel(Math.round(latest));
          if (circleRef.current) {
            circleRef.current.style.strokeDashoffset =
              circumference - (latest / 100) * circumference;
          }
        },
      });
    }
  }, [isInView, skill.level, circumference]);

  return (
    <div className="skill-chart-item" ref={ref}>
      <div className="skill-chart-visual">
        <svg height={radius * 2} width={radius * 2} className="skill-chart-svg">
          <circle
            className="skill-chart-bg"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            ref={circleRef}
            className="skill-chart-fg"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: circumference }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        {/* Show years instead of percentage */}
        <div className="skill-chart-percent">{skill.years}</div>
      </div>

      <div className="skill-chart-info">
        <h4>{skill.name}</h4>
      </div>
    </div>
  );
};

const SkillsSection = () => (
  <motion.section
    id="skills"
    className="skills-section section"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="section-container">
      <header className="section-header">
        <h2 className="section-title">Tools in Our Kit</h2>
        <p className="section-subtitle">
          A mix of design, code, and creative tech that I use to bring ideas to life.
        </p>
      </header>

      <motion.div
        className="skills-grid"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((category) => (
          <motion.article key={category.category} className="skill-category" variants={staggerItemVariants}>
            <h3>{category.category}</h3>

            <div className="skills-list">
              {category.skills.map((skill) => (
                <RadialSkillChart key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </motion.section>
);


// ===============================================================
// PROJECTS SECTION — 6 PROJECTS WITH OUTCOMES
// ===============================================================

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Development", "Design", "Experimental"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <motion.section
      id="projects"
      className="projects-section section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">Selected Creative Work</h2>
          <p className="section-subtitle">
            A showcase of projects built with cutting-edge technologies.
          </p>

          <div className="project-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-button ${
                  activeFilter === filter ? "active" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="project-card-wrapper"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="project-card">
                  <div
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                    role="img"
                    aria-label={project.alt}
                  />

                  <div className="project-content">
                    <h3>{project.title}</h3>
                    
                    {/* NEW: Outcome metric */}
                    {project.outcome && (
                      <p className="project-outcome">{project.outcome}</p>
                    )}
                    
                    <p>{project.description}</p>

                    <div className="project-tech-tags">
                      {project.tech.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/work" className="cta-button secondary">
            View All Work →
          </a>
        </div>
      </div>
    </motion.section>
  );
};


// ===============================================================
// TESTIMONIALS SECTION — LARGE CARDS WITH METRICS
// ===============================================================

const TestimonialsSection = () => {
  return (
    <motion.section
      id="testimonials"
      className="testimonials-section section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Feedback from clients and collaborators I've had the pleasure of working with.
          </p>
        </header>

        {/* Trust Stats ABOVE testimonials */}
        <div className="trust-stats">
          <div className="trust-stat">
            <span className="trust-number">10+</span>
            <span className="trust-label">Projects</span>
          </div>
          <div className="trust-stat">
            <span className="trust-number">100%</span>
            <span className="trust-label">Satisfaction</span>
          </div>
          <div className="trust-stat">
            <span className="trust-number">4</span>
            <span className="trust-label">Countries</span>
          </div>
        </div>

        {/* Testimonials Grid (not marquee) */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.article 
              className="testimonial-card-large" 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-highlight-badge">
                {t.highlight}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author-info">
                <div className="testimonial-avatar">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="testimonial-name">{t.author}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};


// ===============================================================
// CONTACT SECTION
// ===============================================================

const ContactSection = () => (
  <motion.section
    id="contact"
    className="contact-section section"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="contact-background" />

    <div className="section-container contact-container">
      <h2 className="section-title">Let's Create Something Amazing</h2>
      <p className="section-subtitle">
        Ready to bring your ideas to life? Let's discuss your next project.
      </p>

      <a
        href="https://cal.com/deepak-singh"
        className="contact-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Book a Call
      </a>
    </div>
  </motion.section>
);


// ===============================================================
// FOOTER
// ===============================================================

const Footer = ({ navLinks }) => {
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/DRP347",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.287-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.837 2.807 1.307 3.492.998.108-.775.418-1.308.76-1.608-2.665-.303-5.467-1.334-5.467-5.934 0-1.31.47-2.382 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3.005-.403c1.02.005 2.045.138 3.005.403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.245 2.873.12 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.923.43.37.815 1.102.815 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.215.7.825.58C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/singh-deepak-wd",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 5.43 3.42 7 1.5 7S-2 5.43-2 3.5 0.56 0 2.48 0s2.5 1.57 2.5 3.5zm.02 4.5H0V24h5V8h-.01zM8 8h4.8v2.16h.07c.67-1.27 2.3-2.6 4.74-2.6C23 7.56 24 10.3 24 14.35V24h-5v-9.05c0-2.16-.04-4.94-3.01-4.94-3.01 0-3.47 2.34-3.47 4.78V24H8V8z"/></svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/DRajput37654",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.5 3 12 11.5 20.5 3 22 4.5 13.5 13 22 21.5 20.5 23 12 14.5 3.5 23 2 21.5 10.5 13 2 4.5Z"/></svg>
      ),
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/singh-deepak",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm5.96 6.178c1.94 1.68 2.73 4.32 2.005 6.84-1.29-.27-3.03-.55-4.87-.28-.2-.55-.42-1.05-.7-1.57 1.88-1.03 3.24-2.49 3.56-4.1zM12 2.4c2.79 0 5.3 1.1 7.12 2.88-.34 1.44-1.56 2.81-3.3 3.78-1.33-2.36-2.88-4.37-3.98-5.43.47-.16.98-.23 1.76-.23zm-3.25.54c1.06 1.14 2.71 3.21 4.08 5.6-1.6.8-3.37 1.12-4.91 1.22-.74-1.82-.79-3.67-.28-5.6zm-2.87.82c-.4 1.7-.34 3.47.3 5.14-2.04.45-3.84.27-4.76.17.58-2.16 2.12-3.97 4.16-5.31zM2.4 12.82c.93.14 2.88.25 5.06-.18.26.48.56.95.86 1.42-2.15.96-4.14 1.29-5.22 1.09-.26-.01-.49-.04-.7-.08.13-.86.36-1.7.69-2.25zm2.87 4.45c1.03-.25 2.93-.82 5.1-1.8.64 1.06 1.32 2 2.09 2.74-2.06.97-4.42 1.13-6.66.45-.17-.3-.31-.63-.53-.94zm7.14 2.27c-1.18-1.41-2.1-3.25-2.79-5.24 2.07-.2 4.35.05 6.43.75-.43 2.06-1.53 3.94-3.64 4.49zM18.44 7.7c.59 1.46.26 3.1-.75 4.37-1.92-.28-3.9-.15-5.6.26-.27-.55-.53-1.1-.81-1.65 1.4-1.47 3.33-2.61 5.16-3.18.48.02.95.04 1.2.2z"/></svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/7202809157",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.12.56 4.1 1.54 5.81L0 24l6.38-1.68A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.2-1.24-6.16-3.48-8.52zM12 21.6c-1.84 0-3.63-.5-5.18-1.4l-.37-.22-3.79 1 1-3.7-.24-.38A9.4 9.4 0 0 1 2.4 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.92.99 6.72 2.8a9.45 9.45 0 0 1 2.8 6.72c0 5.24-4.26 9.5-9.5 9.5zm5.2-7.35c-.28-.14-1.64-.8-1.9-.9-.26-.1-.46-.14-.66.14s-.76.9-.94 1.08c-.17.17-.33.19-.61.07-.28-.12-1.2-.44-2.28-1.4-.84-.74-1.4-1.66-1.57-1.94-.17-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.15.19-.26.28-.44.09-.17.05-.33-.02-.46-.07-.12-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.51-.17-.01-.37-.01-.57-.01-.19 0-.5.07-.77.33-.27.27-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.22 3.08.14.2 2.1 3.2 5.1 4.48.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.64-.67 1.88-1.31.24-.64.24-1.19.17-1.31-.06-.11-.22-.18-.46-.32z"/></svg>
      ),
    },
  ];

  return (
    <footer className="footer">
      <nav className="footer-links" aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.title}
          </a>
        ))}
        <a href="/terms">Terms & Conditions</a>
        <a href="/cookies">Cookies</a>
      </nav>

      <div className="footer-socials">
        {socialLinks.map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social-link">
            <span className="footer-social-icon">{icon}</span>
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="footer-legal">
        <a href="/terms">Terms & Conditions</a>
        <a href="/cookies">Cookies</a>
      </div>

      <p className="footer-credit">
        © {new Date().getFullYear()} Deepak Singh. All Rights Reserved.
      </p>
    </footer>
  );
};
// ===============================================================
// CASE STUDY FOOTER
// ===============================================================

const CaseStudyFooter = () => (
  <footer style={{
    background: "#080808",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "48px 40px 36px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
      <a href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", textDecoration:"none", color:"rgba(255,255,255,0.32)", transition:"color 220ms ease" }}
        onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.72)"}
        onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.32)"}
      >← Back to Portfolio</a>
    </div>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, paddingTop:4, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
        {[
          { label:"GitHub", href:"https://github.com/DRP347", icon: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.287-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.837 2.807 1.307 3.492.998.108-.775.418-1.308.76-1.608-2.665-.303-5.467-1.334-5.467-5.934 0-1.31.47-2.382 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3.005-.403c1.02.005 2.045.138 3.005.403 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.245 2.873.12 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.923.43.37.815 1.102.815 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.215.7.825.58C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" },
          { label:"LinkedIn", href:"https://www.linkedin.com/in/singh-deepak-wd", icon: "M4.98 3.5C4.98 5.43 3.42 7 1.5 7S-2 5.43-2 3.5 0.56 0 2.48 0s2.5 1.57 2.5 3.5zm.02 4.5H0V24h5V8h-.01zM8 8h4.8v2.16h.07c.67-1.27 2.3-2.6 4.74-2.6C23 7.56 24 10.3 24 14.35V24h-5v-9.05c0-2.16-.04-4.94-3.01-4.94-3.01 0-3.47 2.34-3.47 4.78V24H8V8z" },
          { label:"X", href:"https://x.com/DRajput37654", icon: "M21.8 7.3c-.2.4-.4.7-.7 1l-3 4.8c-.3.5-.6.8-.9 1.1.5.1 1 .3 1.5.5.7.3 1.3.7 1.8 1.2.5.5.9 1.2 1.1 2 .2.8.2 1.7 0 2.6 0 .1-.1.3-.2.5-.1.1-.2.1-.3.2-.5.3-1.1.4-1.7.4-.7 0-1.4-.2-2-.6-.5-.3-.9-.7-1.3-1.1-.4-.4-.7-.8-1-1.4-.3-.5-.5-1-.7-1.5 0 .1-.1.2-.1.2-.2.5-.5 1-.8 1.5-.4.5-.8.9-1.2 1.3-.8.8-1.8 1.4-2.8 1.7-.6.2-1.2.3-1.8.3-.7 0-1.4-.1-2-.3-.6-.2-1.2-.5-1.7-.9-.5-.4-.9-.8-1.2-1.4-.3-.5-.5-1.1-.6-1.7-.1-.7 0-1.4.2-2.1.2-.6.5-1.2.9-1.6.4-.5.9-.9 1.5-1.3.5-.3 1-.5 1.6-.7.6-.2 1.1-.4 1.7-.5l3.6-6.1c.2-.4.3-.9.3-1.4 0-.9-.4-1.7-1.1-2.3-.7-.6-1.6-.9-2.6-.9-.5 0-1 .1-1.5.2-.5.1-1 .3-1.5.5l-4.8 2.2c-.1.1-.2.2-.3.4-.1.2-.1.4-.1.6s.1.4.2.5c.2.3.6.4.9.4h.1c.3 0 .6-.1.8-.3l4.5-2c.2-.1.5-.2.8-.2.3 0 .6.1.8.2.2.1.4.3.5.5s.2.4.2.6c0 .3-.1.6-.3.8l-2.9 4.9c-1.1.2-2.1.5-3.1 1-.8.4-1.5 1-2 1.7-.6.7-1 1.5-1.3 2.4-.2.8-.2 1.7 0 2.6.2.8.6 1.5 1.2 2.1.6.6 1.3 1.1 2.1 1.4.8.3 1.7.5 2.6.5.6 0 1.3-.1 1.9-.3 1-.3 2-.8 2.9-1.5.9-.7 1.6-1.5 2.2-2.4.6-.9 1-1.8 1.2-2.8.1-.4.1-.9 0-1.3-.1-.6-.3-1.1-.5-1.6z" },
          { label:"Dribbble", href:"https://dribbble.com/singh-deepak", icon: "M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 0 0 0 12 0zm5.96 6.178c1.94 1.68 2.73 4.32 2.005 6.84-1.29-.27-3.03-.55-4.87-.28-.2-.55-.42-1.05-.7-1.57 1.88-1.03 3.24-2.49 3.56-4.1zM12 2.4c2.79 0 5.3 1.1 7.12 2.88-.34 1.44-1.56 2.81-3.3 3.78-1.33-2.36-2.88-4.37-3.98-5.43.47-.16.98-.23 1.76-.23zm-3.25.54c1.06 1.14 2.71 3.21 4.08 5.6-1.6.8-3.37 1.12-4.91 1.22-.74-1.82-.79-3.67-.28-5.6zm-2.87.82c-.4 1.7-.34 3.47.3 5.14-2.04.45-3.84.27-4.76.17.58-2.16 2.12-3.97 4.16-5.31zM2.4 12.82c.93.14 2.88.25 5.06-.18.26.48.56.95.86 1.42-2.15.96-4.14 1.29-5.22 1.09-.26-.01-.49-.04-.7-.08.13-.86.36-1.7.69-2.25zm2.87 4.45c1.03-.25 2.93-.82 5.1-1.8.64 1.06 1.32 2 2.09 2.74-2.06.97-4.42 1.13-6.66.45-.17-.3-.31-.63-.53-.94zm7.14 2.27c-1.18-1.41-2.1-3.25-2.79-5.24 2.07-.2 4.35.05 6.43.75-.43 2.06-1.53 3.94-3.64 4.49zM18.44 7.7c.59 1.46.26 3.1-.75 4.37-1.92-.28-3.9-.15-5.6.26-.27-.55-.53-1.1-.81-1.65 1.4-1.47 3.33-2.61 5.16-3.18.48.02.95.04 1.2.2z" },
          { label:"WhatsApp", href:"https://wa.me/7202809157", icon: "M20.52 3.48A11.87 11.87 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.12.56 4.1 1.54 5.81L0 24l6.38-1.68A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.2-1.24-6.16-3.48-8.52zM12 21.6c-1.84 0-3.63-.5-5.18-1.4l-.37-.22-3.79 1 1-3.7-.24-.38A9.4 9.4 0 0 1 2.4 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.92.99 6.72 2.8a9.45 9.45 0 0 1 2.8 6.72c0 5.24-4.26 9.5-9.5 9.5zm5.2-7.35c-.28-.14-1.64-.8-1.9-.9-.26-.1-.46-.14-.66.14s-.76.9-.94 1.08c-.17.17-.33.19-.61.07-.28-.12-1.2-.44-2.28-1.4-.84-.74-1.4-1.66-1.57-1.94-.17-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.15.19-.26.28-.44.09-.17.05-.33-.02-.46-.07-.12-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.51-.17-.01-.37-.01-.57-.01-.19 0-.5.07-.77.33-.27.27-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.22 3.08.14.2 2.1 3.2 5.1 4.48.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.64-.67 1.88-1.31.24-.64.24-1.19.17-1.31-.06-.11-.22-.18-.46-.32z" },
        ].map(({ label, href, icon }, i, arr) => (
          <React.Fragment key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, color:"rgba(255,255,255,0.28)", textDecoration:"none", letterSpacing:"0.04em", textTransform:"uppercase", transition:"color 220ms ease" }}
              onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.65)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.28)"}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" style={{ flexShrink:0 }}><path fill="currentColor" d={icon} /></svg>
              {label}
            </a>
            {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.10)", fontSize:10 }}>·</span>}
          </React.Fragment>
        ))}
      </div>
      <p style={{ fontSize:11, color:"rgba(255,255,255,0.18)", margin:0, letterSpacing:"0.04em" }}>
        © {new Date().getFullYear()} Deepak Singh. All Rights Reserved.
      </p>
    </div>
  </footer>
);

// ===============================================================
// MAIN APP
// ===============================================================

const TermsPage = () => (
  <section className="legal-page">
    <div className="section-container">
      <h1>Terms & Conditions</h1>
      <p>This website is owned and operated by Deepak Singh. By using the site, you agree to these terms, which govern your access to all public pages and interactive features.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>These terms apply to every visitor, user, or client who interacts with the website. Continued use indicates acceptance of these terms, as well as any updated terms published here.</p>

      <h2>2. Site Use and Access</h2>
      <p>The content provided on this website is intended for portfolio presentation, design showcase, and informational purposes only. You may view and share content for personal use, but reproduction, redistribution, or commercial use of any site content—including visuals, text, and source code—is prohibited unless expressly authorized.</p>

      <h2>3. Intellectual Property</h2>
      <p>All design assets, layout structures, interface components, copy, and code are owned or licensed by Deepak Singh unless otherwise noted. Unauthorized use of the website’s intellectual property may violate copyright, trademark, and other laws.</p>

      <h2>4. Accuracy and Updates</h2>
      <p>Every effort is made to ensure that the information presented on the website is accurate and up to date. However, the website is provided “as is,” and no warranty is made regarding the completeness, accuracy, or availability of content.</p>

      <h2>5. External Links</h2>
      <p>The website may include links to third-party services, project platforms, or social profiles. These linked sites are not controlled by this website, and inclusion of such links does not imply endorsement. Visitors are responsible for evaluating the privacy and terms of any external services.</p>

      <h2>6. Limitation of Liability</h2>
      <p>To the fullest extent permitted by applicable law, Deepak Singh is not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website.</p>

      <h2>7. Cookies and Data</h2>
      <p>The website uses cookies and local storage to improve functionality and remember preferences such as theme selection. These technologies do not store personal data unless you voluntarily provide it through project inquiries or contact forms.</p>

      <h2>8. Changes to Terms</h2>
      <p>These terms may be updated at any time. The current version is posted on this page and takes effect as soon as it is published. Your continued use of the website after updates constitutes acceptance of the revised terms.</p>

      <h2>9. Contact</h2>
      <p>If you have questions about these terms, please use the contact details provided on the website or reach out through the portfolio’s messaging or booking channels.</p>
    </div>
  </section>
);

const CookiesPage = () => (
  <section className="legal-page">
    <div className="section-container">
      <h1>Cookies Policy</h1>
      <p>This Cookies Policy explains how cookies and similar technologies are used on this website, including what information is collected, why it is needed, and how to manage your preferences.</p>

      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your browser or device that help websites remember preferences, improve functionality, and collect anonymous performance data.</p>

      <h2>How This Site Uses Cookies</h2>
      <ul>
        <li><strong>Essential functionality:</strong> to remember your theme preference or site settings so the site behaves consistently between visits.</li>
        <li><strong>Analytics:</strong> to gather anonymous usage data about how visitors navigate the site so the website can be optimized for performance and usability.</li>
        <li><strong>Third-party services:</strong> external links, embedded content, or social icons may be supported by third-party cookies managed by those services.</li>
      </ul>

      <h2>Cookie Consent</h2>
      <p>When you first visit the website, a cookie consent banner appears. You can choose to accept or decline optional cookies. If you accept, the website records your preference and may use cookies for analytics and improved performance. If you decline, the website will avoid non-essential analytics cookies while still providing core functionality.</p>

      <h2>Local Storage</h2>
      <p>In addition to cookies, the site uses local storage to remember theme choice and other interface preferences. Local storage stays on your device and is not shared with advertisers.</p>

      <h2>Analytics Services</h2>
      <p>Vercel Analytics and Speed Insights may run in debug mode during development. In production, anonymous pageview and performance data may be collected only to help improve the website experience.</p>

      <h2>Managing Cookies</h2>
      <p>You can manage cookies through your browser settings. Disabling cookies may affect some features and visual preferences, but the website remains usable for core portfolio browsing.</p>

      <h2>Data Safety</h2>
      <p>The website does not sell personal data or serve targeted advertising. Cookies are used only for functional and anonymous performance purposes.</p>
    </div>
  </section>
);

const App = () => {
  const [theme, setTheme] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 18 || hour < 6 ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    document.body.classList.toggle("no-scroll", isMenuOpen);
  }, [theme, isMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("cookieConsent");
    if (stored === "accepted" || stored === "declined") {
      setCookieConsent(stored);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("cookieConsent", "accepted");
    setCookieConsent("accepted");
    setShowCookieBanner(false);
  };

  const declineCookies = () => {
    window.localStorage.setItem("cookieConsent", "declined");
    setCookieConsent("declined");
    setShowCookieBanner(false);
  };

  const navLinks = [
    { href: "#home", title: "Home" },
    { href: "#about", title: "About" },
    { href: "#skills", title: "Skills" },
    { href: "#projects", title: "Work" },
    { href: "#contact", title: "Contact" },
  ];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!theme) return null;

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Analytics />
      <SpeedInsights />

      <div id="stars1" />
      <div id="stars2" />

      <Routes>
        {/* HOME PAGE */}
        <Route
          index
          element={
            <>
              <Navbar
                navLinks={navLinks}
                theme={theme}
                toggleTheme={toggleTheme}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <main>
                <HeroSection theme={theme} />
                <AboutSection />
                <PhilosophySection />
                <SkillsSection />
                <ProjectsSection />
                <TestimonialsSection />
                <ContactSection />
              </main>
              <Footer navLinks={navLinks} />
            </>
          }
        />

        {/* CASE STUDIES */}
        <Route path="/case-study/arabian-red-fox" element={<><main><CaseStudyArabianRedFox theme={theme} /></main><CaseStudyFooter /></>} />
        <Route path="/case-study/portfolio" element={<><main><CaseStudyPortfolio theme={theme} /></main><CaseStudyFooter /></>} />
        <Route path="/case-study/kumo-kitchen" element={<><main><CaseStudyKumoKitchen /></main><CaseStudyFooter /></>} />
        <Route path="/case-study/pulse-studio" element={<><main><CaseStudyPulseStudio /></main><CaseStudyFooter /></>} />
{/* WORK PAGE */}
<Route
  path="/work"
  element={
    <>
      <Navbar
        navLinks={navLinks}
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <WorkPage />
      </main>
      <Footer navLinks={navLinks} />
    </>
  }
/>
<Route
  path="/terms"
  element={
    <>
      <Navbar
        navLinks={navLinks}
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <TermsPage />
      </main>
      <Footer navLinks={navLinks} />
    </>
  }
/>
<Route
  path="/cookies"
  element={
    <>
      <Navbar
        navLinks={navLinks}
        theme={theme}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <CookiesPage />
      </main>
      <Footer navLinks={navLinks} />
    </>
  }
/>
<Route path="/case-study/the-garment-guy" element={<><main><CaseStudyGarmentGuy /></main><CaseStudyFooter /></>} />
Place holders for future case studies:
        {/* 404 */}
        <Route
          path="*"
          element={
            <>
              <Navbar navLinks={navLinks} theme={theme} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              <main style={{ padding: "140px 24px", textAlign: "center" }}>
                <h1>404 — Page Not Found</h1>
              </main>
              <Footer navLinks={navLinks} />
            </>
          }
        />
      </Routes>
      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="cookie-banner-copy">
            <p><strong>Cookie consent:</strong> We use cookies for essential site functionality, theme preference, and anonymous analytics. Accepting cookies helps us improve performance while keeping your data anonymous.</p>
          </div>
          <div className="cookie-banner-actions">
            <button className="cookie-button accept" onClick={acceptCookies}>Accept cookies</button>
            <button className="cookie-button decline" onClick={declineCookies}>Decline cookies</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;