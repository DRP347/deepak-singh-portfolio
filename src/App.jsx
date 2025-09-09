import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, Preload, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { Analytics } from "@vercel/analytics/next"

// Import the external CSS file
import './index.css';

// ============================================================================
// DATA ARRAYS
// ============================================================================
const aboutTimelineData = [
    { id: 1, icon: "01", title: "Curious Beginner", description: "Started my journey with small projects, fueled by curiosity and a passion for turning ideas into reality." },
    { id: 2, icon: "02", title: "Web Designer", description: "Learned to blend appealing visuals with clean, functional code, focusing on user experience." },
    { id: 3, icon: "03", title: "Creative Developer", description: "Now building immersive and interactive websites that tell a story and engage the senses." },
    { id: 4, icon: "04", title: "What’s Next", description: "I’m chasing bigger challenges — pushing deeper into 3D, motion, and storytelling. I don’t just want people to use my sites, I want them to remember them." }
];
const funFactsData = [
    { front: "Football Enthusiast", back: "Ronaldo over Messi, always." },
    { front: "Chess Enthusiast", back: "Prefers the Queen's Gambit opening." },
    { front: "Japanese Culture Enthusiast", back: "Believes in the beauty of Wabi-sabi (侘寂)." }
];
const skillsData = [
    {
        category: "Frontend Development",
        skills: [ { name: "React & Next.js", level: 80 }, { name: "HTML5 & CSS3", level: 90 }, { name: "JavaScript", level: 85 } ]
    },
    {
        category: "Creative Technology",
        skills: [ { name: "Three.js / R3F", level: 60 }, { name: "Framer Motion", level: 50 }, { name: "WebGL / Shaders", level: 30 } ]
    },
    {
        category: "Design & Tools",
        skills: [ { name: "UI/UX Design", level: 75 }, { name: "Blender / 3D", level: 40 }, { name: "Git & Workflow", level: 85 } ]
    }
];
const testimonials = [
    { id: 1, author: "Aarav P.", role: "Startup Founder – India", text: "Deepak didn’t just build our website — he made it feel alive. Every section flows like a story, and the little animations he added make people actually stay on the site. We had a tight deadline, but he kept it chill and delivered on time. Highly recommend working with him if you want something beyond the usual template look." },
    { id: 2, author: "Priya S.", role: "Freelance Collaborator – India", text: "I teamed up with Deepak on a client project, and honestly, his eye for design is sharp. I was handling backend, and he made sure the frontend looked slick and smooth. He’s the kind of guy who notices the tiny details that most devs ignore. Super easy to collaborate with." },
    { id: 3, author: "Rohan K.", role: "Local Business Owner – India", text: "I run a small business and needed a proper online presence. Deepak explained everything in simple terms, no jargon. The site turned out clean, fast, and mobile-friendly — my customers love it. For someone like me who’s not tech-savvy, he made the process stress-free." },
    { id: 4, author: "Sophie M.", role: "International Client – Europe", text: "Working with Deepak was refreshing. He brought in ideas I hadn’t even considered, especially with interactive elements that made my portfolio stand out. Communication was smooth despite the time difference, and he was proactive in suggesting improvements. Felt more like a creative partner than just a developer." }
];
const projectsData = [
    { id: 1, title: "Arabian Red Fox", category: "Development", description: "A sleek, responsive website dedicated to the Arabian Red Fox, featuring elegant design, smooth animations, and conservation information.", tech: ["HTML", "CSS", "JavaScript"], image: "img/proj2.webp", link: "https://redfo.netlify.app", alt: "A website about the Arabian Red Fox" },
    { id: 2, title: "Personal Portfolio", category: "Development", description: "An interactive personal portfolio built with React and Three.js, featuring a 3D hero model, scroll animations, and a dynamic theme.", tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"], image: "img/proj1.webp", link: "https://www.deepakksingh.com/", alt: "This portfolio website" },
    /*{ id: 3, title: "Brand Identity System", category: "Design", description: "A comprehensive brand transformation for a tech startup, including logo, color systems, and a responsive website.", tech: ["Figma", "Design Systems", "Branding"], image: "/project-three.jpg", link: "#", alt: "Stationery showing a modern brand identity design" },
    { id: 4, title: "Data Visualization Dashboard", category: "Development", description: "Real-time data dashboard with custom D3.js visualizations and WebGL-accelerated particle systems.", tech: ["D3.js", "WebGL", "Node.js", "Socket.io"], image: "/project-four.jpg", link: "#", alt: "Laptop screen showing an interactive data dashboard" }*/
];

// ============================================================================
// Reusable Animation Variants
// ============================================================================
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
};
const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// ============================================================================
// HELPER HOOKS & COMPONENTS
// ============================================================================
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

const AnimatedText = ({ text, className, stagger = 0.05 }) => {
    const letters = Array.from(text);
    return (
        <span className={className}>
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * stagger, ease: [0.22, 1, 0.36, 1] }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </span>
    );
};

// ============================================================================
// 3D SCENE COMPONENTS
// ============================================================================
function VrThinkerModel() {
    const modelRef = useRef();
    const { scene } = useGLTF('/vr_thinker.glb');
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useFrame(() => {
        if (modelRef.current) {
            const breathe = Math.sin(Date.now() * 0.0008) * 0.005 + 1;
            const floatY = Math.sin(Date.now() * 0.0005) * 0.05;
            const scale = isMobile ? 0.0 : 0.125; 
            const positionX = isMobile ? 0 : 3.15;
            const positionY = isMobile ? floatY - 2.5 : floatY - 3.25; 
            modelRef.current.scale.set(scale * breathe, scale * breathe, scale * breathe);
            modelRef.current.position.set(positionX, positionY, 0);
            modelRef.current.rotation.y = Math.PI * 0.0;
        }
    });

    return ( <primitive ref={modelRef} object={clonedScene} /> );
}

const HeroSceneContent = ({ theme }) => (
    <>
        <ambientLight intensity={theme === 'light' ? 1.0 : 0.6} />
        <directionalLight position={[10, 10, 5]} intensity={theme === 'light' ? 1.5 : 1.2} castShadow/>
        <Environment preset={theme === 'light' ? 'city' : 'night'} />
        <VrThinkerModel />
    </>
);

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================
const DesktopNavbar = ({ navLinks, theme, toggleTheme }) => (
    <header className="navbar">
        <nav className="navbar-content" aria-label="Main navigation">
            <div className="navbar-links">
                {navLinks.map(link => <a key={link.href} href={link.href}>{link.title}</a>)}
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </nav>
    </header>
);

const MobileMenu = ({ navLinks, isMenuOpen, setIsMenuOpen }) => {
    const menuVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
        exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
    };

    return (
        <>
            <button className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                <div className="hamburger-container">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </div>
            </button>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <nav className="mobile-menu-links" aria-label="Mobile navigation">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="link-number">0{index + 1}</span>
                                    {link.title}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ============================================================================
// PAGE SECTIONS
// ============================================================================
const HeroSection = ({ theme }) => (
    <section id="home" className="hero-section">
        <div className="hero-canvas-container">
            <Canvas camera={{ fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                <Suspense fallback={<Html center><div className="canvas-loader">Loading...</div></Html>}>
                    <HeroSceneContent theme={theme} />
                    <Preload all />
                </Suspense>
                <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3}/>
            </Canvas>
        </div>
        <div className="hero-content">
            <h1>
                <AnimatedText text="Web Alchemist" className="hero-title-gradient" />
            </h1>
            <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                Turning pixels and code into living, breathing experiences.
            </motion.p>
            <motion.div className="cta-group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}>
                <a href="#projects" className="cta-button">Explore Work</a>
                <a href="#contact" className="cta-button secondary">Let’s Collaborate</a>
            </motion.div>
        </div>
    </section>
);

const AboutSection = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <motion.section id="about" className="about-section section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="section-container">
                <header className="section-header">
                    <h2 className="section-title">From Curiosity to Craft</h2>
                    <p className="section-subtitle">A path shaped by curiosity, design, and the code that brings it all to life.</p>
                </header>
                <div className="about-timeline">
                    <div className="timeline-line"></div>
                    {aboutTimelineData.map((item, index) => (
                        <motion.div
                            className="timeline-item-wrapper"
                            key={item.id}
                            initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -50 : 50), y: isMobile ? 50 : 0 }}
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
                <div className="fun-facts">
                    <div className="facts-grid">
                        {funFactsData.map((fact, index) => (
                            <div key={index} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front fact-card"><span>{fact.front}</span></div>
                                    <div className="flip-card-back fact-card"><p>{fact.back}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

// UPDATED RadialSkillChart COMPONENT
const RadialSkillChart = ({ skill }) => {
    const ref = useRef(null);
    const circleRef = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [animatedLevel, setAnimatedLevel] = useState(0);

    const radius = 45, strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    useEffect(() => {
        if (isInView) {
            animate(0, skill.level, {
                duration: 1.5,
                ease: "easeOut",
                onUpdate: (latest) => {
                    // Update the number in the center
                    setAnimatedLevel(Math.round(latest));

                    // Update the SVG circle progress
                    if (circleRef.current) {
                        circleRef.current.style.strokeDashoffset = circumference - (latest / 100) * circumference;
                    }
                }
            });
        }
    }, [isInView, skill.level, circumference]);

    return (
        <div className="skill-chart-item" ref={ref}>
            <div className="skill-chart-visual">
                <svg height={radius * 2} width={radius * 2} className="skill-chart-svg">
                    <circle className="skill-chart-bg" strokeWidth={strokeWidth} r={normalizedRadius} cx={radius} cy={radius} />
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
                <div className="skill-chart-percent">{animatedLevel}%</div>
            </div>
            <div className="skill-chart-info"><h4>{skill.name}</h4></div>
        </div>
    );
};

const SkillsSection = () => (
    <motion.section id="skills" className="skills-section section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="section-container">
            <header className="section-header">
                <h2 className="section-title">Tools in My Kit</h2>
                <p className="section-subtitle">A mix of design, code, and creative tech that I use to bring ideas to life.</p>
            </header>
            <motion.div className="skills-grid" variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {skillsData.map(category => (
                    <motion.article key={category.category} className="skill-category" variants={staggerItemVariants}>
                        <h3>{category.category}</h3>
                        <div className="skills-list">
                            {category.skills.map(skill => <RadialSkillChart key={skill.name} skill={skill} />)}
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Development', 'Design', 'Experimental'];
    const filteredProjects = activeFilter === 'All' ? projectsData : projectsData.filter(project => project.category === activeFilter);

    return (
        <motion.section id="projects" className="projects-section section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="section-container">
                <header className="section-header">
                    <h2 className="section-title">Selected Creative Work</h2>
                    <p className="section-subtitle">A showcase of projects built with cutting-edge technologies.</p>
                    <div className="project-filters">
                        {filters.map(filter => (
                            <button key={filter} onClick={() => setActiveFilter(filter)} className={`filter-button ${activeFilter === filter ? 'active' : ''}`}>{filter}</button>
                        ))}
                    </div>
                </header>
                <motion.div layout className="projects-grid">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                             <motion.a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card-wrapper"
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <motion.div className="project-card" variants={{ hover: { y: -8, transition: { duration: 0.3 } } }}>
                                    <div className="project-image" style={{backgroundImage: `url(${project.image})`}} role="img" aria-label={project.alt} />
                                    <div className="project-content">
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                        <div className="project-tech-tags">{project.tech.map(tag => <span key={tag}>{tag}</span>)}</div>
                                    </div>
                                </motion.div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
};

const TestimonialsSection = () => {
    const duplicatedTestimonials = [...testimonials, ...testimonials];
    return (
        <motion.section id="testimonials" className="testimonials-section section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <header className="section-header">
                <h2 className="section-title">What People Say</h2>
            </header>
            <div className="testimonial-marquee">
                <motion.div className="testimonial-track" animate={{ x: [0, -1792] }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <article className="testimonial-card" key={`${testimonial.id}-${index}`}>
                            <p>"{testimonial.text}"</p>
                            <span>- {testimonial.author}, {testimonial.role}</span>
                        </article>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

const ContactSection = () => (
    <motion.section id="contact" className="contact-section section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="contact-background"></div>
        <div className="section-container contact-container">
            <h2 className="section-title">Let’s Create Something Amazing</h2>
            <p className="section-subtitle">Ready to bring your ideas to life? Let's discuss your next project.</p>
            <br />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=xinghdeepak209@gmail.com&su=Inquiry%20from%20your%20Portfolio" className="contact-button" target="_blank" rel="noopener noreferrer">Get In Touch</a>
        </div>
    </motion.section>
);

const Footer = ({ navLinks }) => (
    <footer className="footer">
        <nav className="footer-links" aria-label="Footer navigation">
            {navLinks.map(link => <a key={link.href} href={link.href}>{link.title}</a>)}
        </nav>
        <div className="footer-socials">
            <a href="https://github.com/DRP347" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">GitHub</a><span>/</span>
            <a href="https://www.linkedin.com/in/singh-deepak-wd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">LinkedIn</a><span>/</span>
            <a href="https://x.com/Deepak__Singh4" target="_blank" rel="noopener noreferrer" aria-label="X Profile">X</a><span>/</span>
            <a href="https://dribbble.com/singh-deepak" target="_blank" rel="noopener noreferrer" aria-label="Dribbble Profile">Dribbble</a><span>/</span>
            <a href="https://wa.me/7202809157" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
        </div>
        <p className="footer-credit">© {new Date().getFullYear()} Deepak Singh. All Rights Reserved.</p>
    </footer>
);

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App = () => {
    const [theme, setTheme] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        setTheme(currentHour >= 18 || currentHour < 6 ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [theme, isMenuOpen]);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const navLinks = [
        { href: '#home', title: 'Home' },
        { href: '#about', title: 'About' },
        { href: '#skills', title: 'Skills' },
        { href: '#projects', title: 'Work' },
        { href: '#contact', title: 'Contact' },
    ];
    
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };
    
    if (!theme) {
        return null; 
    }

    return (
        <div className={`app ${isLoaded ? 'loaded' : ''}`}>
            <div id="stars1"></div>
            <div id="stars2"></div>
            <button className="mobile-theme-toggle-header" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '🌙' : '☀️'}</button>
            <DesktopNavbar navLinks={navLinks} theme={theme} toggleTheme={toggleTheme} />
            <MobileMenu navLinks={navLinks} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main>
                <HeroSection theme={theme} />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer navLinks={navLinks} />
        </div>
    );
}

export default App;