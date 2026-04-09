"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const screens = [
  {
    id: 0,
    label: "THE DISCOVERY",
    title: "Find your wine\nby feeling.",
    body: "Sensory tags replace spec sheets. Users describe what they want — silky, bold, citrus-bright — and the experience responds like a sommelier.",
    img: "/img/discovery-screen.png",
    accent: "#b45309",
    accentGlow: "rgba(180, 83, 9, 0.18)",
  },
  {
    id: 1,
    label: "THE NARRATIVE",
    title: "Every bottle\nhas a story.",
    body: "Rich editorial pages replace product sheets. Origin, terroir, and tasting notes unfold like a magazine spread — not a database row.",
    img: "/img/narrative-screen.png",
    accent: "#be123c",
    accentGlow: "rgba(190, 18, 60, 0.18)",
  },
  {
    id: 2,
    label: "THE ACQUISITION",
    title: "Purchase with\nconfidence.",
    body: "A frictionless checkout built around trust — clear provenance, delivery guarantees, and zero noise. The bottle earns its place in the cart.",
    img: "/img/acquisition-screen.png",
    accent: "#7c3aed",
    accentGlow: "rgba(124, 58, 237, 0.18)",
  },
];

/* ─────────────────────────────────
   MACBOOK COMPONENT
───────────────────────────────── */
function RealisticMacbook({ screen }: { screen: typeof screens[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() { x.set(0); y.set(0); }

  const W = 540; const H = 356;
  const BX = 14; const BT = 14; const BB = 26;
  const SW = W - BX * 2; const SH = H - BT - BB;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1400, display: "inline-block", cursor: "default" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>

        {/* LID */}
        <div style={{
          width: W, height: H,
          borderRadius: "16px 16px 4px 4px",
          position: "relative", overflow: "hidden",
          background: "linear-gradient(175deg, #3a3a3c 0%, #1c1c1e 40%, #141416 100%)",
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.13),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            0 0 0 1px rgba(0,0,0,0.7),
            0 40px 100px rgba(0,0,0,0.75),
            0 0 80px ${screen.accentGlow}
          `,
        }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

          {/* SCREEN */}
          <div style={{ position:"absolute", top:BT, left:BX, width:SW, height:SH, borderRadius:"3px 3px 2px 2px", background:"#000", overflow:"hidden" }}>
            <img src={screen.img} alt={screen.label} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />

            {/* Browser chrome */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:26, background:"rgba(22,22,24,0.97)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", paddingLeft:10, gap:6, zIndex:4, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              {[{ c:"#ff5f57",s:"#e0443e" },{ c:"#febc2e",s:"#d4a017" },{ c:"#28c840",s:"#1aab2e" }].map(({ c, s }, i) => (
                <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:`radial-gradient(circle at 35% 35%, ${c}, ${s})`, flexShrink:0 }} />
              ))}
              <div style={{ marginLeft:10, flex:1, maxWidth:260, height:17, borderRadius:4, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                <svg width="7" height="8" viewBox="0 0 8 9" fill="none" style={{ opacity:0.35 }}>
                  <rect x="1" y="4" width="6" height="5" rx="1" fill="white"/>
                  <path d="M2 4V3a2 2 0 014 0v1" stroke="white" strokeWidth="1.2" fill="none"/>
                </svg>
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.38)", fontFamily:"-apple-system, monospace" }}>arabianredfox.com</span>
              </div>
            </div>

            {/* Glass reflection — top-left to bottom-right */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)", pointerEvents:"none", zIndex:5 }} />
          </div>

          {/* Camera dot */}
          <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, #2a2a2c, #0a0a0c)", border:"1px solid rgba(255,255,255,0.07)" }} />
          </div>

          <div style={{ position:"absolute", bottom:7, left:"50%", transform:"translateX(-50%)", fontSize:6, letterSpacing:"0.12em", color:"rgba(255,255,255,0.10)", fontFamily:"-apple-system, sans-serif", whiteSpace:"nowrap" }}>MacBook Pro</div>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 80%, transparent 98%)" }} />
        </div>

        {/* HINGE */}
        <div style={{ width:W, height:5, background:"linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 60%, #252525 100%)", boxShadow:"inset 0 2px 3px rgba(0,0,0,0.8)", position:"relative", zIndex:2 }}>
          {[0.15, 0.85].map((pos,i) => (
            <div key={i} style={{ position:"absolute", top:"50%", left:`${pos*100}%`, transform:"translate(-50%,-50%)", width:4, height:4, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, #2a2a2a, #111)", border:"1px solid rgba(255,255,255,0.06)" }} />
          ))}
        </div>

        {/* BASE */}
        <div style={{ width:W+26, marginLeft:-13, position:"relative" }}>
          <div style={{ width:"100%", height:18, borderRadius:"0 0 10px 10px", background:"linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 50%, #141416 100%)", border:"1px solid rgba(255,255,255,0.07)", borderTop:"none", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 40px rgba(0,0,0,0.6)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:80, height:8, borderRadius:4, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }} />
          </div>
          {[0.08,0.92].map((pos,i) => (
            <div key={i} style={{ position:"absolute", bottom:-2, left:`${pos*100}%`, transform:"translateX(-50%)", width:32, height:3, borderRadius:"0 0 3px 3px", background:"#0a0a0a" }} />
          ))}
        </div>

        {/* FLOOR SHADOW */}
        <div style={{ position:"absolute", bottom:-22, left:"50%", transform:"translateX(-50%)", width:"78%", height:16, background:"rgba(0,0,0,0.55)", filter:"blur(18px)", borderRadius:"999px" }} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────
   MOBILE CARD — shown on mobile, auto-scrolls
───────────────────────────────── */
function MobileInterfaceSection({ active, setActive, current }: { active: number; setActive: React.Dispatch<React.SetStateAction<number>>; current: typeof screens[0] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance when section is in view — no tap needed
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setInterval(() => {
            setActive(prev => (prev + 1) % screens.length);
          }, 3200);
        } else {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
  }, [setActive]);

  return (
    <div ref={sectionRef} style={{ display:"flex", flexDirection:"column", gap:28 }}>

      {/* MacBook — scale-contained inside overflow:hidden wrapper */}
      <motion.div
        key={active}
        initial={{ opacity:0, y:12 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 12,
          /* We scale the MacBook down to fit the viewport width */
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Container that scales MacBook to fit without overflow */}
        <div style={{
          /* MacBook W=540. Container is 100vw-40px. Scale = containerW / 540 */
          transformOrigin: "top center",
          transform: `scale(${Math.min(1, (window.innerWidth - 40) / 540)})`,
          /* Make the outer take only the scaled height so no gap below */
          marginBottom: `calc((${Math.min(1, (window.innerWidth - 40) / 540)} - 1) * 356px)`,
        }}>
          <RealisticMacbook screen={current} />
        </div>
      </motion.div>

      {/* Active screen info */}
      <div>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", color:current.accent, marginBottom:8 }}>
          {current.label}
        </div>
        <div style={{ fontFamily:'"Playfair Display", serif', fontSize:21, lineHeight:1.22, color:"rgba(255,255,255,0.88)", marginBottom:12, whiteSpace:"pre-line" }}>
          {current.title}
        </div>
        <motion.p
          key={active}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.35 }}
          style={{ fontSize:14, lineHeight:1.85, color:"rgba(200,200,200,0.55)", margin:0 }}
        >
          {current.body}
        </motion.p>
      </div>

      {/* Progress dots — tap to jump */}
      <div style={{ display:"flex", gap:7 }}>
        {screens.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{ width: active === i ? 22 : 6, background: active === i ? s.accent : "rgba(255,255,255,0.18)" }}
            transition={{ duration:0.28 }}
            style={{ all:"unset", cursor:"pointer", height:6, borderRadius:999 }}
          />
        ))}
      </div>

    </div>
  );
}

/* ─────────────────────────────────
   MAIN EXPORT
───────────────────────────────── */
export default function InterfaceSection() {
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
    <section style={{ position:"relative", background:"#080808", color:"#fff", padding: isMobile ? "80px 0 100px" : "130px 0 180px", overflow:"hidden" }}>

      {/* Ambient glow */}
      <motion.div
        key={current.id}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration:0.9 }}
        style={{ position:"absolute", top:"8%", right:"-4%", width:640, height:640, borderRadius:"999px", background:current.accentGlow, filter:"blur(150px)", pointerEvents:"none", zIndex:0 }}
      />

      <div style={{ width:"min(1200px, calc(100% - 40px))", margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* HEADER */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 0.80fr", gap: isMobile ? 16 : 40, marginBottom: isMobile ? 40 : 72, alignItems:"flex-end" }}>
          <div style={{ position:"relative" }}>
            <span aria-hidden="true" style={{ position:"absolute", top:-50, left:-10, fontFamily:'"Playfair Display", serif', fontSize:"clamp(80px, 9vw, 150px)", lineHeight:1, color:"rgba(255,255,255,0.04)", userSelect:"none", letterSpacing:"-0.06em", pointerEvents:"none" }}>03</span>
            <span style={{ display:"block", fontSize:11, fontWeight:800, letterSpacing:"0.30em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:14 }}>The Interface</span>
            <h2 style={{ fontFamily:'"Playfair Display", serif', fontSize:"clamp(32px, 3.8vw, 60px)", lineHeight:1.0, letterSpacing:"-0.03em", margin:0, color:"#fff" }}>
              Distilling the{" "}<em style={{ color:"rgba(255,255,255,0.36)", fontStyle:"italic" }}>Essence.</em>
            </h2>
          </div>
          {!isMobile && (
            <p style={{ fontSize:16, lineHeight:1.85, color:"rgba(200,200,200,0.55)", margin:0, alignSelf:"flex-end" }}>
              We stripped away the clutter of traditional e-commerce. Just the bottle, the story, and the white space needed to breathe.
            </p>
          )}
        </div>

        {/* MOBILE LAYOUT */}
        {isMobile ? (
          <MobileInterfaceSection active={active} setActive={setActive} current={current} />
        ) : (

          /* DESKTOP — equal columns so MacBook doesn't hug left */
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

            {/* LEFT — clean tabs, no fake scrollbar */}
            <div>
              <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:40 }}>
                {screens.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    style={{
                      all:"unset", cursor:"pointer",
                      display:"flex", alignItems:"flex-start", gap:16,
                      padding:"16px 18px",
                      borderRadius:10,
                      background: active === i ? "rgba(255,255,255,0.055)" : "transparent",
                      border:`1px solid ${active === i ? "rgba(255,255,255,0.09)" : "transparent"}`,
                      transition:"all 260ms ease",
                      position:"relative", overflow:"hidden",
                    }}
                  >
                    {/* Active accent bar — left edge only */}
                    {active === i && (
                      <motion.div
                        layoutId="activeBar"
                        style={{ position:"absolute", left:0, top:0, bottom:0, width:3, borderRadius:"3px 0 0 3px", background:s.accent, boxShadow:`0 0 10px ${s.accent}` }}
                      />
                    )}

                    {/* Dot */}
                    <motion.div
                      animate={{ background: active === i ? s.accent : "rgba(255,255,255,0.20)", scale: active === i ? 1.2 : 1 }}
                      transition={{ duration:0.25 }}
                      style={{ marginTop:5, width:8, height:8, borderRadius:"50%", flexShrink:0, boxShadow: active === i ? `0 0 10px ${s.accent}88` : "none" }}
                    />

                    <div>
                      <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:"0.26em", textTransform:"uppercase", color: active === i ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.22)", marginBottom:4, transition:"color 260ms" }}>{s.label}</div>
                      <div style={{ fontFamily:'"Playfair Display", serif', fontSize:19, lineHeight:1.25, whiteSpace:"pre-line", color: active === i ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.36)", transition:"color 260ms" }}>{s.title}</div>
                    </div>

                    {active === i && (
                      <motion.div initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} style={{ marginLeft:"auto", alignSelf:"center", color:s.accent, fontSize:13 }}>→</motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Body text */}
              <motion.p
                key={active}
                initial={{ opacity:0, y:6 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.32 }}
                style={{ fontSize:14.5, lineHeight:1.9, color:"rgba(200,200,200,0.58)", margin:0, paddingLeft:22, borderLeft:`2px solid ${current.accent}55` }}
              >
                {current.body}
              </motion.p>

              {/* Dots */}
              <div style={{ display:"flex", gap:6, marginTop:28, paddingLeft:22 }}>
                {screens.map((s, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActive(i)}
                    animate={{ width: active === i ? 22 : 6 }}
                    transition={{ duration:0.28, ease:"easeOut" }}
                    style={{ all:"unset", cursor:"pointer", height:6, borderRadius:999, background: active === i ? current.accent : "rgba(255,255,255,0.14)" }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT MacBook — centered in its column */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", paddingTop:10, paddingBottom:30 }}>
              <motion.div
                key={active}
                initial={{ opacity:0, y:18, scale:0.98 }}
                animate={{ opacity:1, y:0, scale:1 }}
                transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
              >
                <RealisticMacbook screen={current} />
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}