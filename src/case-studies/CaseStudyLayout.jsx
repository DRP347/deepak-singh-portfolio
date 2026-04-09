import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CaseStudyLayout = ({
  title,
  subtitle,
  meta,
  liveLink,
  sections,
  cta,
}) => {
  return (
    <main className="case-study">
      {/* HERO */}
      <section className="case-hero section">
        <div className="section-container">
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>

          <div className="case-meta">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              View Live Project
            </a>
          )}
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      {sections.map((section) => (
        <motion.section
          key={section.title}
          className="section"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-container">
            <h2 className="section-title">{section.title}</h2>
            {section.content}
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <section className="section case-cta">
        <div className="section-container">
          <h2 className="section-title">{cta.title}</h2>
          <p className="section-subtitle">{cta.subtitle}</p>
          <a href={cta.href} className="cta-button">
            {cta.label}
          </a>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyLayout;
