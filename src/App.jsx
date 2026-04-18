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
    title: "Finova Dashboard",
    category: "Design",
    description: "Real-time financial analytics platform.",
    outcome: "60% faster insights",
    tech: ["React", "D3.js", "TypeScript"],
    image: "img/proj2.webp",
    link: "#",
    alt: "Finova Dashboard",
  },
  {
    id: 5,
    title: "The Garment Guy",
    category: "Development",
    description: "Premium e-commerce platform with immersive product experiences.",
    outcome: "+28% conversion rate",
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    image: "img/garment-thumb.webp",
    link: "/case-study/the-garment-guy",
    alt: "The Garment Guy",
  },
  {
    id: 6,
    title: "Stride Health",
    category: "Design",
    description: "Fitness tracking app with gamification.",
    outcome: "4.8★ App Store",
    tech: ["React Native", "HealthKit"],
    image: "img/proj2.webp",
    link: "#",
    alt: "Stride Health App",
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

const Footer = ({ navLinks }) => (
  <footer className="footer">
    <nav className="footer-links" aria-label="Footer navigation">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.title}
        </a>
      ))}
    </nav>

    <div className="footer-socials">
      <a href="https://github.com/DRP347" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span>/</span>
      <a href="https://www.linkedin.com/in/singh-deepak-wd" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span>/</span>
      <a href="https://x.com/DRajput37654" target="_blank" rel="noopener noreferrer">X</a>
      <span>/</span>
      <a href="https://dribbble.com/singh-deepak" target="_blank" rel="noopener noreferrer">Dribbble</a>
      <span>/</span>
      <a href="https://wa.me/7202809157" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>

    <p className="footer-credit">
      © {new Date().getFullYear()} Deepak Singh. All Rights Reserved.
    </p>
  </footer>
);


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
      <div style={{ display:"flex", gap:20, alignItems:"center" }}>
        {[
          { label:"GitHub", href:"https://github.com/DRP347" },
          { label:"LinkedIn", href:"https://www.linkedin.com/in/singh-deepak-wd" },
          { label:"Dribbble", href:"https://dribbble.com/singh-deepak" },
          { label:"WhatsApp", href:"https://wa.me/7202809157" },
        ].map(({ label, href }, i, arr) => (
          <React.Fragment key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize:11, color:"rgba(255,255,255,0.28)", textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase", transition:"color 220ms ease" }}
              onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.65)"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.28)"}
            >{label}</a>
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

const App = () => {
  const [theme, setTheme] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    </div>
  );
};

export default App;