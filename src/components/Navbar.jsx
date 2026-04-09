import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ navLinks, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let current = "#home";

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (!section) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        current = link.href;
      }
    });

    setActiveHash(current);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [navLinks]);


  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="navbar">
        <div className="navbar-content">
          <nav className="navbar-links">
            {navLinks.map((link) => {
  const isActive = activeHash === link.href;
  const isSkills = link.title === "Skills";

  return (
    <button
      key={`nav-${link.href}`}
      className={`navbar-link ${isActive ? "navbar-link-active" : ""}`}
      onClick={(e) => handleNavClick(e, link.href)}
    >
      <span className="nav-label">{link.title}</span>
      {isSkills && <span className="skills-indicator"></span>}
    </button>
  );
})}

          </nav>

          {/* THEME TOGGLE — INSIDE NAVBAR (THIS FIXES IMAGE 3) */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* MOBILE TOGGLE (unchanged) */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen((p) => !p)}
      >
        <div className="hamburger-container">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </div>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="mobile-menu-links">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  className="mobile-menu-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.title}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
