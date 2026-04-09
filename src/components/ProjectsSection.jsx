// src/components/ProjectsSection.jsx
// REDESIGNED: 6 projects, outcome metrics, Web Alchemist moved to experiments

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===============================================================
// UPDATED PROJECT DATA — 6 projects with outcomes
// ===============================================================
const projectsData = [
  {
    id: 1,
    title: "Arabian Red Fox",
    category: "Development",
    description: "Wildlife conservation website with immersive storytelling.",
    outcome: "Sommelier-style sensory filtering",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "img/proj2.webp",
    link: "/case-study/arabian-red-fox",
    alt: "Arabian Red Fox Website",
    color: "#7c2d12", // warm orange-brown
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
    color: "#1e293b", // slate
  },
  {
    id: 3,
    title: "Pulse Studio",
    category: "Experimental",
    description: "Browser-based DAW for music production.",
    outcome: "<5 min onboarding • 7 instruments",
    tech: ["Web Audio API", "Canvas", "React"],
    image: "img/pulse-thumb.webp",
    link: "/case-study/pulse-studio",
    alt: "Pulse Studio DAW",
    color: "#312e81", // indigo
  },
  {
    id: 4,
    title: "Finova Dashboard",
    category: "Design",
    description: "Real-time financial analytics platform.",
    outcome: "60% faster data insights",
    tech: ["React", "D3.js", "TypeScript"],
    image: "img/finova-thumb.webp",
    link: "#",
    alt: "Finova Dashboard",
    color: "#065f46", // emerald
  },
  {
    id: 5,
    title: "The Garment Guy",
    category: "Development",
    description: "Premium e-commerce platform with immersive product experiences.",
    outcome: "+28% conversion rate",
    tech: ["Next.js", "Tailwind CSS", "MongoDB"],
    image: "img/luxe-thumb.webp",
    link: "/case-study/pulse-studio",
    alt: "The Garment Guy Website",
    color: "#78350f", // amber
  },
  {
    id: 6,
    title: "Stride Health",
    category: "Design",
    description: "Fitness tracking app with gamification.",
    outcome: "4.8★ App Store rating",
    tech: ["React Native", "HealthKit"],
    image: "img/stride-thumb.webp",
    link: "#",
    alt: "Stride Health App",
    color: "#0f172a", // slate dark
  },
];

// Personal/Experimental projects (moved Web Alchemist here)
const experimentalProjects = [
  {
    id: 100,
    title: "Web Alchemist",
    category: "Personal",
    description: "This portfolio — a 3D-enhanced creative experience.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "img/proj1.webp",
    link: "/case-study/portfolio",
    alt: "Portfolio Website",
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

// ===============================================================
// PROJECT CARD COMPONENT
// ===============================================================
const ProjectCard = ({ project, index }) => {
  return (
    <motion.a
      href={project.link}
      className="project-card-wrapper"
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <article className="project-card project-card-redesign">
        {/* Thumbnail with gradient overlay */}
        <div
          className="project-image project-image-redesign"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundColor: project.color || "#1e293b",
          }}
        >
          <div className="project-image-overlay" />
        </div>

        {/* Content */}
        <div className="project-content project-content-redesign">
          <h3 className="project-title-new">{project.title}</h3>
          
          {/* NEW: Outcome metric */}
          {project.outcome && (
            <p className="project-outcome">{project.outcome}</p>
          )}
          
          <p className="project-description-new">{project.description}</p>

          <div className="project-tech-tags project-tech-tags-redesign">
            {project.tech.map((tag) => (
              <span key={tag} className="tech-tag-new">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </motion.a>
  );
};

// ===============================================================
// PROJECTS SECTION
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
      className="projects-section projects-section-redesign"
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

        {/* Projects Grid — Now 2x3 or 3x2 */}
        <motion.div layout className="projects-grid projects-grid-redesign">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <motion.div 
          className="projects-view-all"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a href="/work" className="view-all-link">
            View All Work
            <span className="view-all-arrow">→</span>
          </a>
        </motion.div>

        {/* Experiments Section (where Web Alchemist now lives) */}
        <div className="experiments-section">
          <h3 className="experiments-title">Experiments & Personal Work</h3>
          <div className="experiments-grid">
            {experimentalProjects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                className="experiment-card"
              >
                <div
                  className="experiment-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="experiment-content">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-tech-tags">
                    {project.tech.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;