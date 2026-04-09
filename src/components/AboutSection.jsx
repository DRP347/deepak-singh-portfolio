// src/components/AboutSection.jsx
// REDESIGNED: Better timeline spacing, stronger "What's Next" CTA, improved visuals

import React from "react";
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
// TIMELINE DATA — Updated with icons
// ===============================================================
const aboutTimelineData = [
  {
    id: 1,
    icon: "🎨",
    number: "01",
    title: "Curious Beginner",
    description:
      "Started my journey with small projects, fueled by curiosity and a passion for turning ideas into reality.",
    year: "2020",
  },
  {
    id: 2,
    icon: "💻",
    number: "02",
    title: "Web Designer",
    description:
      "Learned to blend appealing visuals with clean, functional code, focusing on user experience.",
    year: "2021",
  },
  {
    id: 3,
    icon: "🚀",
    number: "03",
    title: "Creative Developer",
    description:
      "Now building immersive and interactive websites that tell a story and engage the senses.",
    year: "2023",
  },
  {
    id: 4,
    icon: "✨",
    number: "04",
    title: "What's Next",
    description:
      "Pushing deeper into 3D, WebGL, and storytelling to create unforgettable digital experiences.",
    year: "Now",
    isNext: true,
  },
];

const funFactsData = [
  { front: "Football Enthusiast", back: "Ronaldo over Messi, always.", icon: "⚽" },
  { front: "Chess Enthusiast", back: "Prefers the Queen's Gambit opening.", icon: "♟️" },
  { front: "Japanese Culture Enthusiast", back: "Believes in Wabi-sabi.", icon: "🎌" },
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

// ===============================================================
// TIMELINE ITEM COMPONENT
// ===============================================================
const TimelineItem = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className={`timeline-item-wrapper timeline-item-redesign ${
        item.isNext ? "timeline-item-next" : ""
      }`}
      initial={{
        opacity: 0,
        x: isMobile ? 0 : isEven ? -30 : 30,
        y: isMobile ? 30 : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Timeline Dot with Icon */}
      <div className="timeline-icon-redesign">
        <span className="timeline-emoji">{item.icon}</span>
      </div>

      {/* Card */}
      <article className={`timeline-item glass-card timeline-card-redesign ${
        item.isNext ? "timeline-card-next" : ""
      }`}>
        <div className="timeline-content">
          {/* Year Badge */}
          <span className="timeline-year-badge">{item.year}</span>
          
          <h3 className="timeline-title-new">{item.title}</h3>
          <p className="timeline-description-new">{item.description}</p>
        </div>
      </article>
    </motion.div>
  );
};

// ===============================================================
// ABOUT SECTION — REDESIGNED
// ===============================================================
const AboutSection = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.section
      id="about"
      className="about-section about-section-redesign section"
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

        {/* Timeline — Redesigned */}
        <div className="about-timeline about-timeline-redesign">
          <div className="timeline-line timeline-line-redesign" />

          {aboutTimelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* NEW: Forward-Looking CTA */}
        <motion.div
          className="timeline-cta-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="timeline-cta-card">
            <p className="timeline-cta-text">
              <strong>Now building immersive web experiences</strong> for brands 
              ready to stand out. Let's create something unforgettable together.
            </p>
            <a href="#contact" className="timeline-cta-button">
              Start a Project
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </motion.div>

        {/* Fun Facts — with icons */}
        <div className="fun-facts fun-facts-redesign">
          <h3 className="fun-facts-title">A few things about me</h3>
          <div className="facts-grid facts-grid-redesign">
            {funFactsData.map((fact, index) => (
              <motion.div
                key={index}
                className="flip-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front fact-card fact-card-redesign">
                    <span className="fact-icon">{fact.icon}</span>
                    <span className="fact-label">{fact.front}</span>
                  </div>
                  <div className="flip-card-back fact-card fact-card-back-redesign">
                    <p>{fact.back}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;