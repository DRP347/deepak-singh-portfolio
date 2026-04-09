// src/case-studies/KumoInterface.jsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  animate,
} from "framer-motion";

/* ─────────────────────────────────
   SCREEN DATA — Kumo Kitchen admin screens
───────────────────────────────── */
const screens = [
  {
    id: 0,
    label: "THE BOOKING",
    title: "Reserve with\nreverence.",
    body: "A minimal reservation flow that mirrors the calm of the restaurant. No clutter, no noise — just a date, a time, and a table waiting.",
    img: "/img/kumo-screen-booking.png", // PLACEHOLDER
    accent: "#c9a96e",
    accentGlow: "rgba(201, 169, 110, 0.18)",
  },
  {
    id: 1,
    label: "THE KOT SYSTEM",
    title: "Every order,\naccounted for.",
    body: "Kitchen Order Tickets flow seamlessly from front-of-house to the line. Real-time status, zero missed orders, full accountability.",
    img: "/img/kumo-screen-kot.png", // PLACEHOLDER
    accent: "#d97706",
    accentGlow: "rgba(217, 119, 6, 0.18)",
  },
  {
    id: 2,
    label: "THE DASHBOARD",
    title: "Manage with\nprecision.",
    body: "A consolidated admin view — reservations, guest counts, statuses — all in one dark, focused interface built for speed.",
    img: "/img/kumo-screen-dashboard.png", // PLACEHOLDER
    accent: "#ef4444",
    accentGlow: "rgba(239, 68, 68, 0.18)",
  },
];

/* ─────────────────────────────────
   MACBOOK COMPONENT (same as ARF)
───────────────────────────────── */
function RealisticMacbook({ screen }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const W = 540;
  const H = 356;
  const BX = 14;
  const BT = 14;
  const BB = 26;
  const SW = W - BX * 2;
  const SH = H - BT - BB;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1400, display: "inline-block", cursor: "default" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* LID */}
        <div
          style={{
            width: W,
            height: H,
            borderRadius: "16px 16px 4px 4px",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(175deg, #3a3a3c 0%, #1c1c1e 40%, #141416 100%)",
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.13),
              inset 0 -1px 0 rgba(0,0,0,0.5),
              0 0 0 1px rgba(0,0,0,0.7),
              0 40px 100px rgba(0,0,0,0.75),
              0 0 80px ${screen.accentGlow}
            `,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* SCREEN */}
          <div
            style={{
              position: "absolute",
              top: BT,
              left: BX,
              width: SW,
              height: SH,
              borderRadius: "3px 3px 2px 2px",
              background: "#000",
              overflow: "hidden",
            }}
          >
            <img
              src={screen.img}
              alt={screen.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
            />

            {/* Browser chrome */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 26,
                background: "rgba(22,22,24,0.97)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                paddingLeft: 10,
                gap: 6,
                zIndex: 4,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { c: "#ff5f57", s: "#e0443e" },
                { c: "#febc2e", s: "#d4a017" },
                { c: "#28c840", s: "#1aab2e" },
              ].map(({ c, s }, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${c}, ${s})`,
                    flexShrink: 0,
                  }}
                />
              ))}
              <div
                style={{
                  marginLeft: 10,
                  flex: 1,
                  maxWidth: 260,
                  height: 17,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 8 9"
                  fill="none"
                  style={{ opacity: 0.35 }}
                >
                  <rect x="1" y="4" width="6" height="5" rx="1" fill="white" />
                  <path
                    d="M2 4V3a2 2 0 014 0v1"
                    stroke="white"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "-apple-system, monospace",
                  }}
                >
                  kumokitchen.vercel.app
                </span>
              </div>
            </div>

            {/* Glass reflection */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          </div>

          {/* Camera dot */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #2a2a2c, #0a0a0c)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 7,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 6,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.10)",
              fontFamily: "-apple-system, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            MacBook Pro
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 80%, transparent 98%)",
            }}
          />
        </div>

        {/* HINGE */}
        <div
          style={{
            width: W,
            height: 5,
            background:
              "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 60%, #252525 100%)",
            boxShadow: "inset 0 2px 3px rgba(0,0,0,0.8)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[0.15, 0.85].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: `${pos * 100}%`,
                transform: "translate(-50%,-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #2a2a2a, #111)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>

        {/* BASE */}
        <div style={{ width: W + 26, marginLeft: -13, position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: 18,
              borderRadius: "0 0 10px 10px",
              background:
                "linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 50%, #141416 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: "none",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 40px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 80,
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          </div>
          {[0.08, 0.92].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: -2,
                left: `${pos * 100}%`,
                transform: "translateX(-50%)",
                width: 32,
                height: 3,
                borderRadius: "0 0 3px 3px",
                background: "#0a0a0a",
              }}
            />
          ))}
        </div>

        {/* Floor shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -22,
            left: "50%",
            transform: "translateX(-50%)",
            width: "78%",
            height: 16,
            background: "rgba(0,0,0,0.55)",
            filter: "blur(18px)",
            borderRadius: "999px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────
   MOBILE — auto-scrolling card
───────────────────────────────── */
function MobileInterfaceSection({ active, setActive, current }) {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % screens.length);
          }, 3800);
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [setActive]);

  return (
    <div
      ref={sectionRef}
      style={{ display: "flex", flexDirection: "column", gap: 0 }}
    >
      {/* ── Tab selectors FIRST — so user knows what they're looking at ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {screens.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setActive(i);
              // Reset auto-advance timer on manual tap
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = setInterval(() => {
                  setActive((prev) => (prev + 1) % screens.length);
                }, 3800);
              }
            }}
            style={{
              all: "unset",
              cursor: "pointer",
              flex: active === i ? 1.2 : 1,
              padding: "10px 12px",
              borderRadius: 10,
              background:
                active === i
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.02)",
              border: `1px solid ${
                active === i
                  ? `${s.accent}44`
                  : "rgba(255,255,255,0.06)"
              }`,
              transition: "all 260ms ease",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Active indicator bar */}
            {active === i && (
              <motion.div
                layoutId="kkMobileTab"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: s.accent,
                  borderRadius: "2px 2px 0 0",
                }}
              />
            )}
            <div
              style={{
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:
                  active === i
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.25)",
                transition: "color 260ms",
                lineHeight: 1.4,
              }}
            >
              {s.label.replace("THE ", "")}
            </div>
          </button>
        ))}
      </div>

      {/* ── Text info — reads before the screenshot ── */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: current.accent,
            marginBottom: 6,
          }}
        >
          {current.label}
        </div>
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 20,
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.90)",
            marginBottom: 8,
            whiteSpace: "pre-line",
          }}
        >
          {current.title}
        </div>
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: "rgba(200,200,200,0.5)",
            margin: 0,
          }}
        >
          {current.body}
        </motion.p>
      </div>

      {/* ── Screenshot card — full-width, rounded, with browser chrome ── */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${current.accentGlow}`,
        }}
      >
        {/* Mini browser bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "8px 12px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[{ c: "#ff5f57" }, { c: "#febc2e" }, { c: "#28c840" }].map(
            ({ c }, i) => (
              <div
                key={i}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.7,
                }}
              />
            )
          )}
          <div
            style={{
              marginLeft: 8,
              flex: 1,
              height: 16,
              borderRadius: 4,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
              }}
            >
              kumokitchen.vercel.app
            </span>
          </div>
        </div>

        {/* Screenshot image */}
        <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}>
          <img
            src={current.img}
            alt={current.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        </div>
      </motion.div>

      {/* ── Progress dots ── */}
      <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
        {screens.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              width: active === i ? 24 : 6,
              background:
                active === i ? s.accent : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: 4,
              borderRadius: 999,
              cursor: "pointer",
            }}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   ANIMATED COUNTER for metrics
───────────────────────────────── */
function AnimatedMetric({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.match(/^[+−-]/) ? value[0] : "";
    const suffix = value.replace(/^[+−\-]?[\d.]+/, "");
    animate(0, num, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(prefix + Math.round(v) + suffix),
    });
  }, [inView, value]);

  return (
    <div className="kk-metric" ref={ref}>
      <div className="kk-metricValue">{display}</div>
      <div className="kk-metricLabel">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────
   MAIN EXPORT
───────────────────────────────── */
export default function KumoInterface() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const current = screens[active];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
         SECTION 03 — THE INTERFACE
      ═══════════════════════════════════════ */}
      <section className="kk-interfaceSection">
        {/* Ambient glow */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="kk-interfaceGlow"
          style={{ background: current.accentGlow }}
        />

        <div className="kk-interfaceWrap">
          {/* HEADER */}
          <div className="kk-interfaceHeader">
            <div style={{ position: "relative" }}>
              <span
                aria-hidden="true"
                className="kk-interfaceNum"
              >
                03
              </span>
              <span className="kk-interfaceKicker">
                The Interface
              </span>
              <h2 className="kk-interfaceTitle">
                Orchestrating the{" "}
                <em>Silence.</em>
              </h2>
            </div>
            {!isMobile && (
              <p className="kk-interfaceDesc">
                We stripped away the clutter of traditional restaurant
                dashboards. The kitchen runs on calm. The admin panel should too.
              </p>
            )}
          </div>

          {/* MOBILE LAYOUT */}
          {isMobile ? (
            <MobileInterfaceSection
              active={active}
              setActive={setActive}
              current={current}
            />
          ) : (
            /* DESKTOP — equal columns */
            <div className="kk-interfaceDesktopGrid">
              {/* LEFT — clean tabs */}
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    marginBottom: 40,
                  }}
                >
                  {screens.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        padding: "16px 18px",
                        borderRadius: 10,
                        background:
                          active === i
                            ? "rgba(255,255,255,0.055)"
                            : "transparent",
                        border: `1px solid ${
                          active === i
                            ? "rgba(255,255,255,0.09)"
                            : "transparent"
                        }`,
                        transition: "all 260ms ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {active === i && (
                        <motion.div
                          layoutId="kkActiveBar"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            borderRadius: "3px 0 0 3px",
                            background: s.accent,
                            boxShadow: `0 0 10px ${s.accent}`,
                          }}
                        />
                      )}

                      <motion.div
                        animate={{
                          background:
                            active === i
                              ? s.accent
                              : "rgba(255,255,255,0.20)",
                          scale: active === i ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          marginTop: 5,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          flexShrink: 0,
                          boxShadow:
                            active === i
                              ? `0 0 10px ${s.accent}88`
                              : "none",
                        }}
                      />

                      <div>
                        <div
                          style={{
                            fontSize: 9.5,
                            fontWeight: 800,
                            letterSpacing: "0.26em",
                            textTransform: "uppercase",
                            color:
                              active === i
                                ? "rgba(255,255,255,0.50)"
                                : "rgba(255,255,255,0.22)",
                            marginBottom: 4,
                            transition: "color 260ms",
                          }}
                        >
                          {s.label}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: 19,
                            lineHeight: 1.25,
                            whiteSpace: "pre-line",
                            color:
                              active === i
                                ? "rgba(255,255,255,0.90)"
                                : "rgba(255,255,255,0.36)",
                            transition: "color 260ms",
                          }}
                        >
                          {s.title}
                        </div>
                      </div>

                      {active === i && (
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          style={{
                            marginLeft: "auto",
                            alignSelf: "center",
                            color: s.accent,
                            fontSize: 13,
                          }}
                        >
                          →
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Body text */}
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32 }}
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.9,
                    color: "rgba(200,200,200,0.58)",
                    margin: 0,
                    paddingLeft: 22,
                    borderLeft: `2px solid ${current.accent}55`,
                  }}
                >
                  {current.body}
                </motion.p>

                {/* Dots */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 28,
                    paddingLeft: 22,
                  }}
                >
                  {screens.map((s, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActive(i)}
                      animate={{ width: active === i ? 22 : 6 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      style={{
                        all: "unset",
                        cursor: "pointer",
                        height: 6,
                        borderRadius: 999,
                        background:
                          active === i
                            ? current.accent
                            : "rgba(255,255,255,0.14)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT MacBook */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 30,
                }}
              >
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RealisticMacbook screen={current} />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
         AMBIANCE BREAK
      ═══════════════════════════════════════ */}
      <section className="kk-ambiance">
        <div className="kk-ambianceGrain" aria-hidden="true" />
        {/* PLACEHOLDER — replace with restaurant interior image */}
        <div className="kk-ambianceImg">
          <img
            src="/img/kumo-ambiance.jpg"
            alt="Kumo Kitchen interior"
            loading="lazy"
          />
        </div>
        <div className="kk-ambianceFade" aria-hidden="true" />
        <div className="kk-ambianceContent">
          <span className="kk-ambianceKicker">THE AMBIANCE</span>
          <h2 className="kk-ambianceTitle">An Evening in Shadow</h2>
          <p className="kk-ambianceBody">
            Low light. Warm wood. Quiet corners. A space designed for
            unhurried moments — where the outside world dissolves, and the
            bowl becomes the center of attention.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         SECTION 04 — MEASURED IMPACT
      ═══════════════════════════════════════ */}
      <section className="kk-impact">
        <div className="kk-impactGlow" aria-hidden="true" />
        <div className="kk-impactWrap">
          <div className="kk-impactHeader">
            <span className="kk-impactKicker">THE RESULT</span>
            <h2 className="kk-impactTitle">Measured in Silence</h2>
          </div>

          <div className="kk-impactGrid">
            <AnimatedMetric value="+280%" label="First-Visit Reservation Rate" />
            <AnimatedMetric value="−25m" label="Avg. Table Turnaround Time" />
            <AnimatedMetric value="98%" label="Admin Order Accuracy" />
          </div>
        </div>
      </section>
    </>
  );
}