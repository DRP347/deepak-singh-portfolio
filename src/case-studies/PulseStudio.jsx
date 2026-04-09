// src/case-studies/PulseStudio.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./pulse-studio.css";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ── DAW HERO MOCKUP ── */
function DawMockup() {
  const rows = [
    { label: "KICK", pattern: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0], color: "#00D4FF" },
    { label: "SNR",  pattern: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], color: "#FF3D3D" },
    { label: "HH",   pattern: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], color: "#FFB020" },
    { label: "PERC", pattern: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1], color: "#FF3D8E" },
  ];
  return (
    <div className="ps-dawMockup">
      <div className="ps-dawTitlebar">
        <div className="ps-dawDot" style={{background:"#FF3D3D"}}/><div className="ps-dawDot" style={{background:"#FFD426"}}/><div className="ps-dawDot" style={{background:"#20FF88"}}/>
        <span className="ps-dawTitleText">PULSE STUDIO v3</span>
      </div>
      <div className="ps-dawBody">
        {rows.map((row, ri) => (
          <div className="ps-dawRow" key={ri}>
            <span className="ps-dawRowLabel">{row.label}</span>
            <div className="ps-dawSteps">
              {row.pattern.map((v, ci) => (
                <div key={ci} className={`ps-dawCell ${v ? "on" : ""}`} style={v ? {background:row.color,boxShadow:`0 0 6px ${row.color}40`} : {}} />
              ))}
            </div>
          </div>
        ))}
        <div className="ps-dawBottom">
          <div className="ps-dawKnobs">
            {["-45deg","30deg","90deg"].map((rot, i) => (
              <div className="ps-dawKnob" key={i}><div className="ps-dawKnobLine" style={{transform:`translateX(-50%) rotate(${rot})`}}/></div>
            ))}
          </div>
          <div className="ps-dawMeters">
            {[75,85,60,90,45].map((h, i) => (
              <div key={i} className="ps-dawMeterBar" style={{height:`${h}%`,background:h>80?"rgba(255,212,38,0.5)":"rgba(32,255,136,0.45)"}}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── INTERFACE MOCKUP VIEWS ── */
const interfaceViews = [
  {
    id: "engine", label: "THE ENGINE", title: "One-click genre presets.", color: "#00D4FF",
    desc: "8 genre presets auto-fill every parameter — drums, melody, bass, effects, atmosphere, and mixer levels. Zero configuration, instant results.",
    mockup: (
      <div className="ps-ifMockup">
        <div className="ps-ifMockupHeader">◈ SMART GENRE ENGINE</div>
        <div className="ps-ifGenreGrid">
          {["Trap","Lo-fi","House","Techno","Afrobeat","R&B","EDM","Reggaeton"].map((g,i) => (
            <div key={g} className={`ps-ifGenreItem ${i===0?"active":""}`}>
              <div className="ps-ifGenreName">{g}</div>
              <div className="ps-ifGenreMeta">{[140,85,124,132,108,92,150,96][i]} BPM</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "melody", label: "THE MELODY", title: "Scale-locked note grid.", color: "#9B7AFF",
    desc: "Every note you can place is already in your selected scale. Six one-click generators — ascending, descending, arpeggio, random, sparse, and call-and-response.",
    mockup: (
      <div className="ps-ifMockup">
        <div className="ps-ifMockupHeader" style={{color:"#9B7AFF"}}>♫ NOTE GRID — C Minor</div>
        <div className="ps-ifNoteGrid">
          {["B4","A4","G4","F4","E4","D4","C4"].map((note,ni) => (
            <div key={note} className="ps-ifNoteRow">
              <span className="ps-ifNoteLabel">{note}</span>
              {Array.from({length:16},(_,si) => {
                const on = (ni===0&&[2,10].includes(si))||(ni===2&&[0,6].includes(si))||(ni===3&&[4,12].includes(si))||(ni===5&&[8].includes(si))||(ni===6&&[0,14].includes(si));
                return <div key={si} className={`ps-ifNoteCell ${on?"on":""}`} style={on?{background:"#9B7AFF",boxShadow:"0 0 4px rgba(155,122,255,0.4)"}:{}} />;
              })}
            </div>
          ))}
        </div>
        <div className="ps-ifGenButtons">
          {["↗ Ascending","△ Arpeggio","✦ Random"].map(g => <span key={g} className="ps-ifGenBtn">{g}</span>)}
        </div>
      </div>
    ),
  },
  {
    id: "sound", label: "THE SOUND", title: "Pure Web Audio synthesis.", color: "#1AFFC8",
    desc: "All sounds generated from oscillators, noise buffers, and filters — no sample files needed. Runs entirely in the browser. Zero downloads, zero dependencies.",
    mockup: (
      <div className="ps-ifMockup">
        <div className="ps-ifMockupHeader" style={{color:"#1AFFC8"}}>◎ AUDIO ENGINE</div>
        <div className="ps-ifWaveforms">
          {["Sine","Square","Sawtooth","Triangle"].map((w,i) => (
            <div key={w} className="ps-ifWaveItem">
              <svg viewBox="0 0 80 30" className="ps-ifWaveSvg">
                {i===0&&<path d="M0 15 Q10 0 20 15 Q30 30 40 15 Q50 0 60 15 Q70 30 80 15" fill="none" stroke="#1AFFC8" strokeWidth="1.5"/>}
                {i===1&&<path d="M0 25 L0 5 L20 5 L20 25 L40 25 L40 5 L60 5 L60 25 L80 25" fill="none" stroke="#1AFFC8" strokeWidth="1.5"/>}
                {i===2&&<path d="M0 25 L20 5 L20 25 L40 5 L40 25 L60 5 L60 25 L80 5" fill="none" stroke="#1AFFC8" strokeWidth="1.5"/>}
                {i===3&&<path d="M0 15 L10 5 L30 25 L50 5 L70 25 L80 15" fill="none" stroke="#1AFFC8" strokeWidth="1.5"/>}
              </svg>
              <span className="ps-ifWaveLabel">{w}</span>
            </div>
          ))}
        </div>
        <div className="ps-ifEngineStats">
          <div className="ps-ifStat"><span className="ps-ifStatVal">0 KB</span><span className="ps-ifStatLabel">Samples</span></div>
          <div className="ps-ifStat"><span className="ps-ifStatVal">Web Audio</span><span className="ps-ifStatLabel">Engine</span></div>
          <div className="ps-ifStat"><span className="ps-ifStatVal">&lt;2ms</span><span className="ps-ifStatLabel">Latency</span></div>
        </div>
      </div>
    ),
  },
];

/* ── STRATEGY TAGS ── */
const strategyTags = [
  { icon: "🥁", title: "Drum Patterns", sub: "8-TRACK SEQUENCER" },
  { icon: "♫",  title: "Scale-Locked Melody", sub: "SMART NOTE GRID" },
  { icon: "◎",  title: "Sub-Zero Bass", sub: "808 SYNTHESIZER" },
  { icon: "◈",  title: "Effects Rack", sub: "HARDWARE MODULES" },
  { icon: "☰",  title: "Master Mixer", sub: "CHANNEL STRIPS" },
];

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function PulseStudio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockupOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mockupY  = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const copyOp   = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const copyY    = useTransform(scrollYProgress, [0, 0.45], ["0px", "28px"]);
  const [activeIF, setActiveIF] = useState(0);

  useEffect(() => { document.body.classList.add("ps-no-navbar"); return () => document.body.classList.remove("ps-no-navbar"); }, []);

  return (
    <div className="ps-page">

      {/* ═══ HERO ═══ */}
      <section className="ps-hero" ref={heroRef}>
        <div className="ps-heroBg" aria-hidden="true"><div className="ps-bgBase"/><div className="ps-bgGlow"/><div className="ps-bgNoise"/></div>
        <a href="/" className="ps-anchor"><span className="ps-anchorIcon">←</span><span className="ps-anchorText">Back</span></a>
        <div className="ps-watermark" aria-hidden="true"><span className="ps-wm1">PULSE</span><span className="ps-wm2">STUDIO</span></div>
        <div className="ps-vignette" aria-hidden="true"/>

        <motion.div className="ps-heroImageWrap" initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} transition={{duration:1.8,ease:[0.16,1,0.3,1],delay:0.05}} style={{opacity:mockupOp,y:mockupY}}>
          <div className="ps-imageGlowOuter" aria-hidden="true"/><DawMockup/>
        </motion.div>

        <div className="ps-heroFadeBottom" aria-hidden="true"/><div className="ps-heroFadeLeft" aria-hidden="true"/>

        <motion.div className="ps-heroContent" style={{opacity:copyOp,y:copyY}} initial="hidden" animate="visible" variants={{hidden:{},visible:{transition:{staggerChildren:0.11,delayChildren:0.65}}}}>
          <motion.div className="ps-heroBadge" variants={reveal}><span className="ps-heroBadgeDot"/>Case Study</motion.div>
          <motion.h1 className="ps-heroTitle" variants={reveal}>Pulse<em className="ps-heroTitleAccent">Studio</em></motion.h1>
          <motion.p className="ps-heroSubtitle" variants={reveal}>A browser-based groovebox and beat production DAW — designed to make professional music creation accessible, intuitive, and visually stunning.</motion.p>
          <motion.div className="ps-heroActions" variants={reveal}>
            <a className="ps-heroCta" href="#ps-challenge">Explore the Process <span className="ps-heroCtaArrow">↓</span></a>
            <a className="ps-heroScroll" href="#ps-challenge">Scroll to explore ↓</a>
          </motion.div>
        </motion.div>

        <motion.div className="ps-heroDarkCard" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:1.3,ease:[0.22,1,0.36,1]}}>
          {[{l:"Role",v:"Design & Development"},{l:"Type",v:"Web Application"},{l:"Year",v:"2025"}].map((m,i)=>(<div key={i} className="ps-darkCardItem"><div className="ps-darkCardLabel">{m.l}</div><div className="ps-darkCardValue">{m.v}</div></div>))}
        </motion.div>
      </section>

      {/* ═══ 01 CHALLENGE ═══ */}
      <motion.section className="ps-section ps-sectionAlt" id="ps-challenge" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.15}} variants={stagger}>
        <div className="ps-container">
          <div className="ps-challengeLayout">
            <motion.div className="ps-challengeLeft" variants={reveal}>
              <div className="ps-sectionNumber">01</div>
              <div className="ps-sectionLabel">The Challenge</div>
              <p className="ps-challengeDesc">Understanding the gap between professional music production tools and the people who want to create but don't know where to start.</p>
            </motion.div>
            <motion.div className="ps-challengeRight" variants={reveal}>
              <div className="ps-pullQuote"><span className="ps-quoteOpen">"</span>Music production is deeply creative. <em>The tools felt like engineering software.</em></div>
              <p className="ps-challengeBody">Traditional DAWs like Ableton and FL Studio are powerful — but they're designed for professionals. The learning curve is steep, the interfaces are dense, and a beginner who just wants to make a beat is lost before they start. We wanted to build something that felt like creating, not configuring.</p>
            </motion.div>
          </div>
          <motion.div className="ps-briefWrap" variants={reveal}>
            <div className="ps-briefLabel">The Brief</div>
            <div className="ps-metrics">
              <div className="ps-metricCard">
                <div className="ps-metricCardLabel"><span className="ps-metricArrow">▹</span>The Friction</div>
                <p>Beginner producers abandon DAWs within 48 hours, overwhelmed by complex interfaces and audio routing.</p>
                <div className="ps-metricValue">87%</div><div className="ps-metricUnit">DROP-OFF RATE</div>
              </div>
              <div className="ps-metricCard">
                <div className="ps-metricCardLabel"><span className="ps-metricArrow">▹</span>The Goal</div>
                <p>Build a browser-based groovebox — an experience that guides users from zero to a full beat in under 5 minutes.</p>
                <div className="ps-metricValue">&lt;5min</div><div className="ps-metricUnit">FIRST BEAT TARGET</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ 02 STRATEGY ═══ */}
      <motion.section className="ps-section ps-strategySection" id="ps-strategy" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.15}} variants={stagger}>
        <div className="ps-container">
          <div className="ps-strategyLayout">
            <motion.div className="ps-strategyLeft" variants={reveal}>
              <div className="ps-sectionNumber">02</div>
              <div className="ps-sectionLabel">The Strategy</div>
              <h2 className="ps-sectionHeading">Composing the<br/><em>Groove.</em></h2>
              <p className="ps-bodyText">We replaced the blank canvas with a <strong>Smart Genre Engine</strong> — one click auto-generates matching drums, melody, bass, effects, and mix.</p>
              <p className="ps-bodyText" style={{marginTop:14}}>Instead of asking users to understand time signatures and frequency routing, we let them pick a <strong>vibe</strong> — Trap, Lo-fi, House, Techno, Afrobeat, R&B, EDM, Reggaeton — and the engine does the rest.</p>
            </motion.div>
            <motion.div className="ps-orbitalWrap" variants={reveal}>
              <div className="ps-orbitalRing ps-orbitalRing1"/>
              <div className="ps-orbitalRing ps-orbitalRing2"/>
              {strategyTags.map((tag, i) => {
                const angle = (i / strategyTags.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 155;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return (
                  <div key={i} className="ps-orbitalTag" style={{transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`}}>
                    <div className="ps-orbitalTagIcon">{tag.icon}</div>
                    <div><div className="ps-orbitalTagTitle">{tag.title}</div><div className="ps-orbitalTagSub">{tag.sub}</div></div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══ 03 INTERFACE ═══ */}
      <motion.section className="ps-section ps-sectionAlt" id="ps-interface" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.1}} variants={stagger}>
        <div className="ps-container">
          <motion.div variants={reveal}>
            <div className="ps-sectionNumber">03</div>
            <div className="ps-sectionLabel">The Interface</div>
            <h2 className="ps-sectionHeading">Engineering the<br/><em>Experience.</em></h2>
          </motion.div>
          <div className="ps-interfaceLayout">
            <motion.div className="ps-ifLeft" variants={reveal}>
              <p className="ps-bodyText" style={{marginBottom:24}}>We stripped away the clutter of traditional DAWs. Just the sound, the grid, and the controls needed to breathe.</p>
              <div className="ps-ifAccordion">
                {interfaceViews.map((view, i) => {
                  const active = activeIF === i;
                  return (
                    <div key={view.id} className={`ps-ifAccItem ${active?"active":""}`} onClick={()=>setActiveIF(i)}>
                      <div className="ps-ifAccDot" style={{background:active?view.color:"rgba(255,255,255,0.1)",boxShadow:active?`0 0 8px ${view.color}60`:"none"}}/>
                      <div className="ps-ifAccBody">
                        <div className="ps-ifAccLabel">{view.label}</div>
                        <div className="ps-ifAccTitle">{view.title}</div>
                        <AnimatePresence>
                          {active && <motion.p className="ps-ifAccDesc" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:0.35,ease:[0.16,1,0.3,1]}}>{view.desc}</motion.p>}
                        </AnimatePresence>
                      </div>
                      {active && <span className="ps-ifAccArrow">→</span>}
                    </div>
                  );
                })}
              </div>
              <div className="ps-ifQuoteLine">Sensory tags replace spec sheets. Users describe what they want — dark, bouncy, chill — and the experience responds like a producer.</div>
              <div className="ps-divider"/>
            </motion.div>
            <motion.div className="ps-ifRight" variants={reveal}>
              <div className="ps-ifMockupFrame">
                <div className="ps-ifMockupBar"><div className="ps-ifBarDot"/><div className="ps-ifBarDot"/><div className="ps-ifBarDot"/><span className="ps-ifBarUrl">pulsestudio.app</span></div>
                <div className="ps-ifMockupBody">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeIF} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:0.35,ease:[0.16,1,0.3,1]}}>
                      {interfaceViews[activeIF].mockup}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ═══ MODULES ═══ */}
      <motion.section className="ps-section" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.15}} variants={stagger}>
        <div className="ps-container">
          <motion.div variants={reveal} style={{textAlign:"center",marginBottom:48}}>
            <div className="ps-sectionLabel" style={{justifyContent:"center"}}>The Modules</div>
            <h2 className="ps-sectionHeading">Seven layers.<br/><em>One instrument.</em></h2>
          </motion.div>
          <motion.div className="ps-productCards" variants={stagger}>
            {[
              {icon:"◉",t:"Drum Machine",d:"8-track step sequencer with velocity, swing, and hardware-style performance pads."},
              {icon:"♫",t:"Melody Studio",d:"Scale-locked note grid with 6 one-click generators — ascending, arpeggio, random, and more."},
              {icon:"◎",t:"Sub-Zero Bass",d:"Dedicated bass sequencer with glide, sustain, drive, and sub oscillator controls."},
              {icon:"◈",t:"Effects Rack",d:"Hardware rack modules — RVB-01, DLY-TAP, CRUSH-X — with rotary knobs and LED readouts."},
              {icon:"☰",t:"Master Mixer",d:"Channel strips with tall faders, LED meters, pan knobs, mute/solo, and master output."},
              {icon:"🧠",t:"Genre Engine",d:"8 presets that auto-fill drums, melody, bass, FX, and mixer — Trap, Lo-fi, House, and more."},
            ].map((c,i) => (
              <motion.div key={i} className="ps-productCard" variants={reveal}>
                <div className="ps-pcIcon">{c.icon}</div><h4>{c.t}</h4><p>{c.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ QUOTE ═══ */}
      <motion.section className="ps-section ps-sectionAlt" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.2}} variants={stagger}>
        <div className="ps-container">
          <motion.div variants={reveal} className="ps-bigQuote">
            <blockquote>"We didn't build a simplified DAW. We built a new kind of instrument — one that understands what you want to feel before you play a single note."</blockquote>
            <cite>— Design Philosophy</cite>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ RESULTS ═══ */}
      <motion.section className="ps-section" initial="hidden" whileInView="visible" viewport={{once:true,amount:0.15}} variants={stagger}>
        <div className="ps-container">
          <motion.div variants={reveal} style={{textAlign:"center",marginBottom:48}}>
            <div className="ps-sectionLabel" style={{justifyContent:"center"}}>The Results</div>
            <h2 className="ps-sectionHeading">Measured in<br/><em>Silence.</em></h2>
          </motion.div>
          <motion.div className="ps-resultsGrid" variants={stagger}>
            {[{v:"<5min",l:"FIRST BEAT CREATED"},{v:"7",l:"PRODUCTION MODULES"},{v:"0kb",l:"AUDIO SAMPLES NEEDED"}].map((r,i)=>(
              <motion.div key={i} variants={reveal} style={{textAlign:"center"}}>
                <div className="ps-resultNumber">{r.v}</div><div className="ps-resultLabel">{r.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}