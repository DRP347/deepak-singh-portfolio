import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ navLinks, theme, toggleTheme, isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    if (location.pathname === "/work") {
      setActiveHash("#projects");
      return;
    }

    if (location.pathname !== "/") {
      setActiveHash("#home");
      return;
    }

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
  }, [location.pathname, navLinks]);


  const handleNavClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const el = document.getElementById(sectionId);

    if (href === "#projects" && location.pathname === "/work") {
      if (setIsMenuOpen) setIsMenuOpen(false);
      return;
    }

    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
      if (setIsMenuOpen) setIsMenuOpen(false);
      return;
    }

    if (href === "#projects") {
      navigate("/work");
      if (setIsMenuOpen) setIsMenuOpen(false);
      return;
    }

    navigate({ pathname: "/", hash: href });
    if (setIsMenuOpen) setIsMenuOpen(false);

    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
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
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
