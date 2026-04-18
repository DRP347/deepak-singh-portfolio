// src/pages/WorkPage.jsx
// Dedicated Work page with all projects, filtering, and premium interactions

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ===============================================================
// ALL PROJECTS DATA
// ===============================================================

const allProjects = [
  {
    id: 1,
    title: "Arabian Red Fox",
    category: "Development",
    description: "A sleek, responsive wildlife conservation website with immersive storytelling and sensory-driven exploration.",
    outcome: "Sommelier-style filtering system",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "img/proj2.webp",
    link: "/case-study/arabian-red-fox",
    color: "#7c2d12",
    featured: true,
  },
  {
    id: 2,
    title: "Kumo Kitchen",
    category: "Development",
    description: "Japanese restaurant website with 3D menu experience and seamless reservation system.",
    outcome: "+35% online reservations",
    tech: ["React", "Three.js", "Framer Motion"],
    image: "img/kumo-thumb.webp",
    link: "/case-study/kumo-kitchen",
    color: "#1e293b",
    featured: true,
  },
  {
    id: 3,
    title: "Pulse Studio",
    category: "Experimental",
    description: "Browser-based Digital Audio Workstation for music production with real-time synthesis.",
    outcome: "<5 min onboarding • 7 instruments",
    tech: ["Web Audio API", "Canvas", "React"],
    image: "img/pulse-thumb.webp",
    link: "/case-study/pulse-studio",
    color: "#312e81",
    featured: true,
  },
  {
    id: 4,
    title: "Finova Dashboard",
    category: "Design",
    description: "Real-time financial analytics platform with interactive data visualizations.",
    outcome: "60% faster data insights",
    tech: ["React", "D3.js", "TypeScript"],
    image: "img/proj2.webp",
    link: "#",
    color: "#065f46",
    featured: false,
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
    color: "#78350f",
    featured: false,
  },
  {
    id: 6,
    title: "Stride Health",
    category: "Design",
    description: "Fitness tracking app with gamification elements and health insights.",
    outcome: "4.8★ App Store rating",
    tech: ["React Native", "HealthKit"],
    image: "img/proj2.webp",
    link: "#",
    color: "#0f172a",
    featured: false,
  },
  {
    id: 7,
    title: "Web Alchemist",
    category: "Personal",
    description: "This portfolio — a 3D-enhanced creative experience showcasing my work.",
    outcome: "Awwwards-level design",
    tech: ["React", "Three.js", "Framer Motion"],
    image: "img/proj1.webp",
    link: "/case-study/portfolio",
    color: "#4f46e5",
    featured: false,
  },
];

// ===============================================================
// ANIMATION VARIANTS
// ===============================================================

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { opacity: 0 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  exit: { opacity: 0, scale: 0.95 }
};

// ===============================================================
// PROJECT CARD COMPONENT
// ===============================================================

const ProjectCard = ({ project, index, isLarge = false }) => {
  const CardWrapper = project.link.startsWith("/") ? Link : "a";
  const linkProps = project.link.startsWith("/") 
    ? { to: project.link }
    : { href: project.link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <motion.div
      className={`work-card ${isLarge ? 'work-card-large' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      layout
      whileHover={{ y: -8 }}
    >
      <CardWrapper {...linkProps} className="work-card-link">
        {/* Image */}
        <div 
          className="work-card-image"
          style={{ 
            backgroundImage: `url(${project.image})`,
            backgroundColor: project.color 
          }}
        >
          <div className="work-card-overlay">
            <span className="work-card-view">View Project →</span>
          </div>
          
          {/* Category Badge */}
          <span className="work-card-category">{project.category}</span>
        </div>

        {/* Content */}
        <div className="work-card-content">
          <h3 className="work-card-title">{project.title}</h3>
          
          {project.outcome && (
            <p className="work-card-outcome">{project.outcome}</p>
          )}
          
          <p className="work-card-description">{project.description}</p>

          <div className="work-card-tech">
            {project.tech.map((tag) => (
              <span key={tag} className="work-card-tag">{tag}</span>
            ))}
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
};

// ===============================================================
// WORK PAGE COMPONENT
// ===============================================================

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Development", "Design", "Experimental", "Personal"];

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  // Separate featured projects
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <motion.div 
      className="work-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Header */}
      <header className="work-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/" className="work-back-link">
            ← Back to Home
          </Link>
          
          <h1 className="work-title">Selected Work</h1>
          <p className="work-subtitle">
            A collection of projects I've crafted with passion, precision, and purpose.
          </p>

          {/* Stats */}
          <div className="work-stats">
            <div className="work-stat">
              <span className="work-stat-number">{allProjects.length}</span>
              <span className="work-stat-label">Projects</span>
            </div>
            <div className="work-stat">
              <span className="work-stat-number">4</span>
              <span className="work-stat-label">Categories</span>
            </div>
            <div className="work-stat">
              <span className="work-stat-number">100%</span>
              <span className="work-stat-label">Passion</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Filters */}
      <motion.div 
        className="work-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`work-filter-btn ${activeFilter === filter ? 'active' : ''}`}
          >
            {filter}
            {activeFilter === filter && (
              <motion.div 
                className="filter-indicator"
                layoutId="filterIndicator"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="work-container">
        {/* Featured Projects (larger cards) */}
        {featuredProjects.length > 0 && activeFilter === "All" && (
          <section className="work-section">
            <h2 className="work-section-title">Featured</h2>
            <div className="work-grid work-grid-featured">
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    isLarge={true}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* All/Other Projects */}
        <section className="work-section">
          {activeFilter === "All" && featuredProjects.length > 0 && (
            <h2 className="work-section-title">More Projects</h2>
          )}
          <div className="work-grid">
            <AnimatePresence mode="popLayout">
              {(activeFilter === "All" ? otherProjects : filteredProjects).map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="work-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No projects found in this category.</p>
            <button 
              onClick={() => setActiveFilter("All")}
              className="cta-button"
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <motion.section 
        className="work-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Have a project in mind?</h2>
        <p>Let's create something amazing together.</p>
        <a 
          href="https://cal.com/deepak-singh" 
          className="cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Call →
        </a>
      </motion.section>
    </motion.div>
  );
};

export default WorkPage;