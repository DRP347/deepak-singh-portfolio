// src/components/TestimonialsSection.jsx
// REDESIGNED: Large cards, specific metrics, highlighted outcomes, better author info

import React from "react";
import { motion } from "framer-motion";

// ===============================================================
// UPDATED TESTIMONIALS — With specific metrics and impact
// ===============================================================
const testimonials = [
  {
    id: 1,
    author: "Sophie M.",
    role: "International Client",
    location: "Europe",
    avatar: "SM",
    text: "Deepak didn't just build our website — he made it come alive. The attention to micro-interactions and 3D elements resulted in a",
    highlight: "47% increase in user engagement",
    textAfter: ". He doesn't just design — he engineers experiences.",
    accentColor: "#3b82f6",
  },
  {
    id: 2,
    author: "Aarav P.",
    role: "Startup Founder",
    location: "India",
    avatar: "AP",
    text: "Working with Deepak transformed our digital presence. Users now spend",
    highlight: "2x more time on site",
    textAfter: ", and our bounce rate dropped significantly. Highly recommend!",
    accentColor: "#8b5cf6",
  },
  {
    id: 3,
    author: "Priya S.",
    role: "Freelance Collaborator",
    location: "India",
    avatar: "PS",
    text: "His design eye is sharp and he's incredibly easy to collaborate with. Delivered the project",
    highlight: "ahead of schedule",
    textAfter: " with exceptional attention to detail.",
    accentColor: "#10b981",
  },
  {
    id: 4,
    author: "Rohan K.",
    role: "Local Business Owner",
    location: "India",
    avatar: "RK",
    text: "Explained everything simply and delivered a clean, fast website. Our online inquiries went up by",
    highlight: "35% in the first month",
    textAfter: ".",
    accentColor: "#f59e0b",
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// ===============================================================
// TESTIMONIAL CARD COMPONENT
// ===============================================================
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.article
      className="testimonial-card testimonial-card-redesign"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Quote */}
      <div className="testimonial-quote-redesign">
        <span className="quote-mark">"</span>
        <p>
          {testimonial.text}
          <span
            className="testimonial-highlight"
            style={{ 
              background: `linear-gradient(90deg, ${testimonial.accentColor}22 0%, transparent 100%)`,
              borderLeft: `3px solid ${testimonial.accentColor}`
            }}
          >
            {testimonial.highlight}
          </span>
          {testimonial.textAfter}
        </p>
      </div>

      {/* Author */}
      <div className="testimonial-author testimonial-author-redesign">
        <div
          className="testimonial-avatar testimonial-avatar-redesign"
          style={{
            background: `linear-gradient(135deg, ${testimonial.accentColor}, ${testimonial.accentColor}88)`,
          }}
        >
          {testimonial.avatar}
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.author}</h4>
          <p className="testimonial-role">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

// ===============================================================
// TESTIMONIALS SECTION — REDESIGNED
// ===============================================================
const TestimonialsSection = () => {
  return (
    <motion.section
      id="testimonials"
      className="testimonials-section testimonials-section-redesign section"
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

        {/* Testimonials Grid — Large Cards */}
        <div className="testimonials-grid testimonials-grid-redesign">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Optional: Trust indicators */}
        <motion.div
          className="trust-indicators"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="trust-item">
            <span className="trust-number">10+</span>
            <span className="trust-label">Projects Delivered</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-number">100%</span>
            <span className="trust-label">Client Satisfaction</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-number">4</span>
            <span className="trust-label">Countries Served</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;