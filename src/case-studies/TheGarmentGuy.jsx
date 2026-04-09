// src/case-studies/TheGarmentGuy.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./the-garment-guy.css";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

/* ── HERO PRODUCT MOCKUP ── */
function StoreMockup() {
  return (
    <div className="gg-storeMockup">
      <div className="gg-storeTitlebar">
        <div className="gg-storeDot" style={{ background: "#FF5F56" }} />
        <div className="gg-storeDot" style={{ background: "#FFBD2E" }} />
        <div className="gg-storeDot" style={{ background: "#27C93F" }} />
        <span className="gg-storeUrl">thegarmentguy.in</span>
      </div>
      <div className="gg-storeBody">
        <div className="gg-storeNav">
          {["Home", "Shirts", "Denim", "Cargo", "About"].map((t, i) => (
            <span key={t} className={`gg-storeNavItem ${i === 0 ? "active" : ""}`}>{t}</span>
          ))}
        </div>
        <div className="gg-storeHero">
          <div className="gg-storeHeroText">
            <span className="gg-storeHeroBadge">NEW COLLECTION</span>
            <span className="gg-storeHeroTitle">Wear the Statement</span>
          </div>
        </div>
        <div className="gg-storeGrid">
          {[
            { name: "Classic Oxford", price: "₹1,499", color: "#D4C5B0" },
            { name: "Slim Denim", price: "₹2,199", color: "#6B7B8D" },
            { name: "Cargo Utility", price: "₹1,899", color: "#8B7D6B" },
            { name: "Linen Casual", price: "₹1,299", color: "#C9B99A" },
          ].map((p, i) => (
            <div key={i} className="gg-storeCard">
              <div className="gg-storeCardImg" style={{ background: p.color }} />
              <div className="gg-storeCardName">{p.name}</div>
              <div className="gg-storeCardPrice">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── INTERFACE VIEWS ── */
const interfaceViews = [
  {
    id: "homepage", label: "THE HOMEPAGE", title: "Clean hero, curated entry.", color: "#C9A96E",
    desc: "A focused hero with seasonal collections, minimal navigation, and clear entry points into each category. No clutter — just the garment and the story.",
    mockup: (
      <div className="gg-ifMockup">
        <div className="gg-ifMockupHeader">◈ HOMEPAGE EXPERIENCE</div>
        <div className="gg-ifHeroMock">
          <div className="gg-ifHeroMockOverlay">
            <span className="gg-ifHeroBadge">SS25 COLLECTION</span>
            <span className="gg-ifHeroHeadline">Effortless. Intentional.</span>
          </div>
        </div>
        <div className="gg-ifCategoryRow">
          {["Shirts", "Denim", "Cargo", "Linen"].map(c => (
            <div key={c} className="gg-ifCategoryChip">{c}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "listing", label: "THE COLLECTION", title: "Grid that breathes.", color: "#A68B5B",
    desc: "Product grids with generous spacing, clear pricing, and scannable layouts. Category separation lets users find what they want in seconds, not minutes.",
    mockup: (
      <div className="gg-ifMockup">
        <div className="gg-ifMockupHeader" style={{ color: "#A68B5B" }}>◈ PRODUCT LISTING — SHIRTS</div>
        <div className="gg-ifProductGrid">
          {[
            { name: "Oxford White", price: "₹1,499", color: "#E8E0D4" },
            { name: "Navy Slim Fit", price: "₹1,699", color: "#3D4A5C" },
            { name: "Sage Linen", price: "₹1,299", color: "#A4B08F" },
            { name: "Charcoal Twill", price: "₹1,599", color: "#5C5C5C" },
            { name: "Sand Casual", price: "₹1,399", color: "#C9B99A" },
            { name: "Dusty Rose", price: "₹1,499", color: "#C4A8A0" },
          ].map((p, i) => (
            <div key={i} className="gg-ifProdCard">
              <div className="gg-ifProdImg" style={{ background: p.color }} />
              <div className="gg-ifProdName">{p.name}</div>
              <div className="gg-ifProdPrice">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "detail", label: "THE PRODUCT", title: "Every detail, visible.", color: "#8B7355",
    desc: "Large product imagery dominates the viewport. Clear pricing, size selection, and a confident CTA — all above the fold. No guesswork, no friction.",
    mockup: (
      <div className="gg-ifMockup">
        <div className="gg-ifMockupHeader" style={{ color: "#8B7355" }}>◈ PRODUCT DETAIL</div>
        <div className="gg-ifDetailLayout">
          <div className="gg-ifDetailImg" />
          <div className="gg-ifDetailInfo">
            <div className="gg-ifDetailName">Classic Oxford Shirt</div>
            <div className="gg-ifDetailPrice">₹1,499</div>
            <div className="gg-ifSizeRow">
              {["S", "M", "L", "XL"].map((s, i) => (
                <span key={s} className={`gg-ifSizeChip ${i === 1 ? "active" : ""}`}>{s}</span>
              ))}
            </div>
            <div className="gg-ifCta">ADD TO CART</div>
            <div className="gg-ifDetailMeta">100% Cotton · Regular Fit · Machine Wash</div>
          </div>
        </div>
      </div>
    ),
  },
];

/* ── STRATEGY TAGS ── */
const strategyTags = [
  { icon: "📐", title: "Grid System", sub: "STRUCTURED LAYOUT" },
  { icon: "👁", title: "Visual Hierarchy", sub: "PRODUCT-FIRST DESIGN" },
  { icon: "🧭", title: "Clear Navigation", sub: "REDUCED FRICTION" },
  { icon: "📱", title: "Responsive", sub: "MOBILE-OPTIMIZED" },
  { icon: "⚡", title: "Fast Browsing", sub: "PERFORMANCE FIRST" },
];

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function TheGarmentGuy() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockupOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const copyOp = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.45], ["0px", "28px"]);
  const [activeIF, setActiveIF] = useState(0);

  useEffect(() => { document.body.classList.add("gg-no-navbar"); return () => document.body.classList.remove("gg-no-navbar"); }, []);

  return (
    <div className="gg-page">

      {/* ═══ HERO ═══ */}
      <section className="gg-hero" ref={heroRef}>
        <div className="gg-heroBg" aria-hidden="true"><div className="gg-bgBase" /><div className="gg-bgWarm" /><div className="gg-bgNoise" /></div>
        <a href="/" className="gg-anchor"><span className="gg-anchorIcon">←</span><span className="gg-anchorText">Back</span></a>
        <div className="gg-watermark" aria-hidden="true"><span className="gg-wm1">THE</span><span className="gg-wm2">GARMENT</span></div>
        <div className="gg-vignette" aria-hidden="true" />

        <motion.div className="gg-heroImageWrap" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} style={{ opacity: mockupOp, y: mockupY }}>
          <div className="gg-imageGlowOuter" aria-hidden="true" /><StoreMockup />
        </motion.div>

        <div className="gg-heroFadeBottom" aria-hidden="true" /><div className="gg-heroFadeLeft" aria-hidden="true" />

        <motion.div className="gg-heroContent" style={{ opacity: copyOp, y: copyY }} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.65 } } }}>
          <motion.div className="gg-heroBadge" variants={reveal}><span className="gg-heroBadgeDot" />Case Study</motion.div>
          <motion.h1 className="gg-heroTitle" variants={reveal}>The Garment<em className="gg-heroTitleAccent">Guy</em></motion.h1>
          <motion.p className="gg-heroSubtitle" variants={reveal}>A modern e-commerce experience designed for effortless fashion discovery — where clarity meets conversion and every garment tells a story.</motion.p>
          <motion.div className="gg-heroActions" variants={reveal}>
            <a className="gg-heroCta" href="https://www.thegarmentguy.in" target="_blank" rel="noreferrer">Visit the Store <span className="gg-heroCtaArrow">↗</span></a>
            <a className="gg-heroScroll" href="#gg-challenge">Scroll to explore ↓</a>
          </motion.div>
        </motion.div>

        <motion.div className="gg-heroDarkCard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}>
          {[{ l: "Role", v: "Design & Development" }, { l: "Type", v: "Client Project" }, { l: "Year", v: "2025" }].map((m, i) => (<div key={i} className="gg-darkCardItem"><div className="gg-darkCardLabel">{m.l}</div><div className="gg-darkCardValue">{m.v}</div></div>))}
        </motion.div>
      </section>

      {/* ═══ 01 CHALLENGE ═══ */}
      <motion.section className="gg-section gg-sectionAlt" id="gg-challenge" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        <div className="gg-container">
          <div className="gg-challengeLayout">
            <motion.div className="gg-challengeLeft" variants={reveal}>
              <div className="gg-sectionNumber">01</div>
              <div className="gg-sectionLabel">The Challenge</div>
              <p className="gg-challengeDesc">Understanding why fashion e-commerce feels overwhelming — and why most shoppers leave before they buy.</p>
            </motion.div>
            <motion.div className="gg-challengeRight" variants={reveal}>
              <div className="gg-pullQuote"><span className="gg-quoteOpen">"</span>Fashion is visual. <em>The website felt like a spreadsheet.</em></div>
              <p className="gg-challengeBody">The Garment Guy had a world-class product line, but their digital presence was stuck in template territory. Overcrowded product grids, confusing navigation, and a complete lack of visual hierarchy meant users were scanning endlessly without finding what they wanted. The clothes deserved better.</p>
            </motion.div>
          </div>
          <motion.div className="gg-briefWrap" variants={reveal}>
            <div className="gg-briefLabel">The Brief</div>
            <div className="gg-metrics">
              <div className="gg-metricCard">
                <div className="gg-metricCardLabel"><span className="gg-metricArrow">▹</span>The Friction</div>
                <p>Cluttered product grids and poor navigation cause decision fatigue — users bounce before they ever reach a product page.</p>
                <div className="gg-metricValue">73%</div><div className="gg-metricUnit">BOUNCE RATE</div>
              </div>
              <div className="gg-metricCard">
                <div className="gg-metricCardLabel"><span className="gg-metricArrow">▹</span>The Goal</div>
                <p>Build a fashion-forward browsing experience that turns casual visitors into confident buyers in under three clicks.</p>
                <div className="gg-metricValue">+340%</div><div className="gg-metricUnit">FIRST SESSION ENGAGEMENT</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ 02 STRATEGY ═══ */}
      <motion.section className="gg-section gg-strategySection" id="gg-strategy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        <div className="gg-container">
          <div className="gg-strategyLayout">
            <motion.div className="gg-strategyLeft" variants={reveal}>
              <div className="gg-sectionNumber">02</div>
              <div className="gg-sectionLabel">The Strategy</div>
              <h2 className="gg-sectionHeading">Clarity through<br /><em>Structure.</em></h2>
              <p className="gg-bodyText">We abandoned the overcrowded grid-of-everything approach for a <strong>category-first architecture</strong> — letting users discover collections the way they think: by intent, not by SKU.</p>
              <p className="gg-bodyText" style={{ marginTop: 14 }}>By shifting the focus from listing products to <strong>curating discovery</strong>, we turned a product catalog into a fashion experience. Hover over the profiles to see the precision.</p>
            </motion.div>
            <motion.div className="gg-orbitalWrap" variants={reveal}>
              <div className="gg-orbitalRing gg-orbitalRing1" />
              <div className="gg-orbitalRing gg-orbitalRing2" />
              {strategyTags.map((tag, i) => {
                const angle = (i / strategyTags.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 150;
                return (
                  <div key={i} className="gg-orbitalTag" style={{ transform: `translate(calc(-50% + ${Math.cos(rad) * r}px), calc(-50% + ${Math.sin(rad) * r}px))` }}>
                    <div className="gg-orbitalTagIcon">{tag.icon}</div>
                    <div><div className="gg-orbitalTagTitle">{tag.title}</div><div className="gg-orbitalTagSub">{tag.sub}</div></div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══ 03 INTERFACE ═══ */}
      <motion.section className="gg-section gg-sectionAlt" id="gg-interface" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
        <div className="gg-container">
          <motion.div variants={reveal}>
            <div className="gg-sectionNumber">03</div>
            <div className="gg-sectionLabel">The Interface</div>
            <h2 className="gg-sectionHeading">Distilling the<br /><em>Essence.</em></h2>
          </motion.div>
          <div className="gg-interfaceLayout">
            <motion.div className="gg-ifLeft" variants={reveal}>
              <p className="gg-bodyText" style={{ marginBottom: 24 }}>We stripped away the clutter of traditional e-commerce. Just the product, the story, and the white space needed to breathe.</p>
              <div className="gg-ifAccordion">
                {interfaceViews.map((view, i) => {
                  const active = activeIF === i;
                  return (
                    <div key={view.id} className={`gg-ifAccItem ${active ? "active" : ""}`} onClick={() => setActiveIF(i)}>
                      <div className="gg-ifAccDot" style={{ background: active ? view.color : "rgba(255,255,255,0.1)", boxShadow: active ? `0 0 8px ${view.color}60` : "none" }} />
                      <div className="gg-ifAccBody">
                        <div className="gg-ifAccLabel">{view.label}</div>
                        <div className="gg-ifAccTitle">{view.title}</div>
                        <AnimatePresence>
                          {active && <motion.p className="gg-ifAccDesc" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>{view.desc}</motion.p>}
                        </AnimatePresence>
                      </div>
                      {active && <span className="gg-ifAccArrow">→</span>}
                    </div>
                  );
                })}
              </div>
              <div className="gg-ifQuoteLine">Product imagery replaces product descriptions. Users see what they want — fabric, fit, form — and the experience responds like a stylist.</div>
              <div className="gg-divider" />
            </motion.div>
            <motion.div className="gg-ifRight" variants={reveal}>
              <div className="gg-ifMockupFrame">
                <div className="gg-ifMockupBar"><div className="gg-ifBarDot" /><div className="gg-ifBarDot" /><div className="gg-ifBarDot" /><span className="gg-ifBarUrl">thegarmentguy.in</span></div>
                <div className="gg-ifMockupBody">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeIF} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                      {interfaceViews[activeIF].mockup}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══ DESIGN SYSTEM ═══ */}
      <motion.section className="gg-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        <div className="gg-container">
          <motion.div variants={reveal} style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="gg-sectionLabel" style={{ justifyContent: "center" }}>The System</div>
            <h2 className="gg-sectionHeading">Built on<br /><em>Intention.</em></h2>
          </motion.div>
          <motion.div className="gg-systemGrid" variants={stagger}>
            {[
              { icon: "Aa", title: "Typography", desc: "Clean, readable type system. Display headings for impact, body text for clarity. Fashion-forward but functional." },
              { icon: "◻", title: "Color Palette", desc: "Warm neutrals — ivory, sand, charcoal — with strategic accent use. Minimal palette that lets the product be the color." },
              { icon: "⊞", title: "Grid System", desc: "8-point spacing grid with 12-column layout. Consistent rhythm across every page. Product imagery leads, UI follows." },
              { icon: "↔", title: "Responsive", desc: "Mobile-first approach. Every layout works from 320px to ultrawide. Touch targets, swipe gestures, and thumb-zone navigation." },
              { icon: "◫", title: "Hover States", desc: "Subtle product card lifts, image zoom on hover, smooth transitions between states. Micro-UX that feels premium." },
              { icon: "⚡", title: "Performance", desc: "Optimized images, lazy loading, minimal JavaScript. Fast first paint. Because a slow fashion site loses 53% of mobile users." },
            ].map((c, i) => (
              <motion.div key={i} className="gg-systemCard" variants={reveal}>
                <div className="gg-systemIcon">{c.icon}</div><h4>{c.title}</h4><p>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ QUOTE ═══ */}
      <motion.section className="gg-section gg-sectionAlt" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <div className="gg-container">
          <motion.div variants={reveal} className="gg-bigQuote">
            <blockquote>"We didn't redesign an e-commerce site. We designed a fitting room — one where every garment is already in your size, in your style, waiting."</blockquote>
            <cite>— Design Philosophy</cite>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ RESULTS ═══ */}
      <motion.section className="gg-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        <div className="gg-container">
          <motion.div variants={reveal} style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="gg-sectionLabel" style={{ justifyContent: "center" }}>The Results</div>
            <h2 className="gg-sectionHeading">Measured in<br /><em>Confidence.</em></h2>
          </motion.div>
          <motion.div className="gg-resultsGrid" variants={stagger}>
            {[
              { v: "+30%", l: "PRODUCT DISCOVERABILITY" },
              { v: "-25m", l: "AVG. TIME TO PURCHASE" },
              { v: "98%", l: "MOBILE RESPONSIVE" },
            ].map((r, i) => (
              <motion.div key={i} variants={reveal} style={{ textAlign: "center" }}>
                <div className="gg-resultNumber">{r.v}</div><div className="gg-resultLabel">{r.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ TECH + LEARNINGS ═══ */}
      <motion.section className="gg-section gg-sectionAlt" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
        <div className="gg-container">
          <div className="gg-twoCol">
            <motion.div variants={reveal}>
              <div className="gg-sectionLabel">Tech Stack</div>
              <div className="gg-techTags">
                {["HTML5", "CSS3", "JavaScript", "Responsive Design", "Performance Optimization"].map(t => (
                  <span key={t} className="gg-techTag">{t}</span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={reveal}>
              <div className="gg-sectionLabel">Learnings</div>
              <p className="gg-bodyText">Simplicity in e-commerce isn't about removing features — it's about removing friction. Every decision we made was measured against one question: <strong>does this help the shopper find what they want faster?</strong></p>
              <p className="gg-bodyText" style={{ marginTop: 12 }}>Grid systems matter. Small UX improvements — like consistent spacing and predictable navigation — compound into measurable conversion impact.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}