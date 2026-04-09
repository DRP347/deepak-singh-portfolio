// src/case-studies/KumoChallenge.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

function useCounter(target, duration = 1400, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.startsWith("+") ? "+" : "";
    const suffix = target.replace(/[^%a-zA-Z]/g, "");
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(prefix + Math.round(num * ease) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value || (target.startsWith("+") ? "+0%" : "0%");
}

function StatCard({ bar, icon, title, text, stat, statLabel, delay, inView }) {
  const count = useCounter(stat, 1600, inView);
  return (
    <motion.article
      className="kk-s1Card"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={rise(delay)}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
    >
      <div className={`kk-s1CardBar ${bar}`} />
      <div className="kk-s1CardBody">
        <div className="kk-s1CardIcon">{icon}</div>
        <h4 className="kk-s1CardTitle">{title}</h4>
        <p className="kk-s1CardText">{text}</p>
        <div className="kk-s1Stat">
          <span className="kk-s1StatNum">{count}</span>
          <span className="kk-s1StatLabel">{statLabel}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function KumoChallenge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="kk-s1" id="kk-challenge" ref={ref}>
      <div className="kk-s1Wrap">
        <div className="kk-s1Grid">
          {/* LEFT sticky */}
          <div className="kk-s1Left">
            <div className="kk-s1Sticky">
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={rise(0)}
              >
                <div className="kk-s1Num">01</div>
                <div className="kk-s1Line" />
                <div className="kk-s1Label">The Challenge</div>
                <p className="kk-s1Desc">
                  Bridging the gap between a chef's 24-hour broth and a
                  24-second attention span.
                </p>
              </motion.div>
            </div>
          </div>

          {/* RIGHT story */}
          <div className="kk-s1Right">
            <motion.div
              className="kk-s1Quote"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={rise(0.1)}
            >
              <div className="kk-s1QuoteMark" aria-hidden="true" />
              <h2 className="kk-s1Title">
                Every bowl takes a day to craft.
                <span className="kk-s1TitleMuted">
                  {" "}
                  The website took three seconds to lose a guest.
                </span>
              </h2>
              <p className="kk-s1Body">
                Kumo Kitchen's ramen is an act of devotion — imported wheat,
                hand-pulled noodles, broths that simmer for a full day. But
                the digital experience told none of that story. The existing
                site was functional but forgettable: a menu list, an address,
                a phone number. It gave guests information. It never gave them
                a feeling.
              </p>
            </motion.div>

            <motion.div
              className="kk-s1Divider"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={rise(0.2)}
            >
              <div className="kk-s1DivLine" />
              <span className="kk-s1DivLabel">The brief</span>
              <div className="kk-s1DivLine" />
            </motion.div>

            <div className="kk-s1Cards">
              <StatCard
                bar="kk-s1CardBarAmber"
                icon="↯"
                title="The Friction"
                text="The restaurant's atmosphere is dark, intimate, intentional. The old site was bright, generic, and indistinguishable from a food delivery page."
                stat="68%"
                statLabel="bounce rate · mobile"
                delay={0.3}
                inView={inView}
              />
              <StatCard
                bar="kk-s1CardBarGold"
                icon="◈"
                title="The Goal"
                text="Make the website feel like the first bite — warm, deliberate, unforgettable. A digital sommelier for ramen, not a menu PDF."
                stat="+280%"
                statLabel="first-visit reservation"
                delay={0.4}
                inView={inView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}