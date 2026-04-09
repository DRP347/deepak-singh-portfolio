// src/case-studies/ProblemInsightSection.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const rise = (delay = 0) => ({
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1], delay } },
});

// Animated counter hook
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
      className="arf-s1Card"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={rise(delay)}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
    >
      <div className={`arf-s1CardBar ${bar}`} />
      <div className="arf-s1CardBody">
        <div className="arf-s1CardIcon">{icon}</div>
        <h4 className="arf-s1CardTitle">{title}</h4>
        <p className="arf-s1CardText">{text}</p>
        <div className="arf-s1Stat">
          <span className="arf-s1StatNum">{count}</span>
          <span className="arf-s1StatLabel">{statLabel}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProblemInsightSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="arf-s1" id="challenge" ref={ref}>
      <div className="arf-s1Wrap">
        <div className="arf-s1Grid">

          {/* LEFT sticky */}
          <div className="arf-s1Left">
            <div className="arf-s1Sticky">
              <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={rise(0)}>
                <div className="arf-s1Num">01</div>
                <div className="arf-s1Line" />
                <div className="arf-s1Label">The Challenge</div>
                <p className="arf-s1Desc">
                  Understanding the gap between a world-class product and a failing digital presence.
                </p>
              </motion.div>
            </div>
          </div>

          {/* RIGHT story */}
          <div className="arf-s1Right">

            <motion.div className="arf-s1Quote" initial="hidden" animate={inView ? "visible" : "hidden"} variants={rise(0.10)}>
              <div className="arf-s1QuoteMark" aria-hidden="true" />
              <h2 className="arf-s1Title">
                Wine is an experience.
                <span className="arf-s1TitleMuted"> The website felt like a database.</span>
              </h2>
              <p className="arf-s1Body">
                Arabian Red Fox had a world-class product, but their digital presence was stuck in
                2010. Users were getting lost in technical specs instead of falling in love with
                the brand story.
              </p>
            </motion.div>

            <motion.div className="arf-s1Divider" initial="hidden" animate={inView ? "visible" : "hidden"} variants={rise(0.20)}>
              <div className="arf-s1DivLine" />
              <span className="arf-s1DivLabel">The brief</span>
              <div className="arf-s1DivLine" />
            </motion.div>

            <div className="arf-s1Cards">
              <StatCard
                bar="arf-s1CardBarRed"
                icon="↯"
                title="The Friction"
                text="High bounce rates on product pages caused by overwhelming technical data and a complete lack of emotional imagery or storytelling."
                stat="73%"
                statLabel="avg. bounce rate"
                delay={0.30}
                inView={inView}
              />
              <StatCard
                bar="arf-s1CardBarGold"
                icon="◈"
                title="The Goal"
                text='Build a "digital sommelier" — an experience that guides users through flavor profiles and brand story rather than just technical filters.'
                stat="+340%"
                statLabel="conversion target"
                delay={0.40}
                inView={inView}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}