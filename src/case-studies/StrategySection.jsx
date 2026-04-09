// src/case-studies/StrategySection.jsx  (COMPLETE FILE)
// Radar/Interactive Focus version (no floating)

import { useState } from "react";

function RadarRing({ r, active, color }) {
  return (
    <circle
      cx="300"
      cy="300"
      r={r}
      fill="none"
      className={`arf-radarRing ${active ? "is-active" : ""}`}
      style={active ? { stroke: color } : undefined}
    />
  );
}

function RadarTag({ icon, title, sub, tone }) {
  return (
    <div className={`arf-radarTag ${tone || ""}`}>
      <div className="arf-radarIcon" aria-hidden="true">
        {icon}
      </div>
      <div className="arf-radarText">
        <div className="arf-radarTitle">{title}</div>
        <div className="arf-radarSub">{sub}</div>
      </div>
    </div>
  );
}

export default function StrategySection() {
  const [activeRing, setActiveRing] = useState(null);

  return (
    <section className="arf-strategyRadar">
      {/* Background ambience */}
      <div className="arf-strategyRadarSpot" aria-hidden="true" />

      <div className="arf-strategyRadarWrap">
        <div className="arf-strategyRadarGrid">
          {/* LEFT */}
          <div className="arf-strategyRadarCopy">
            <div className="arf-strategyRadarNum" aria-hidden="true">
              02
            </div>

            <div className="arf-strategyRadarKicker">THE STRATEGY</div>

            <h2 className="arf-strategyRadarTitle">
              Decoding the <br />
              <em>Palate.</em>
            </h2>

            <div className="arf-strategyRadarBody">
              <p>
                We abandoned rigid database filters for{" "}
                <span className="arf-strategyRadarUnderline">sensory tags</span>.
              </p>
              <p>
                By shifting the focus from technical specs to flavor profiles, we turned a search bar into a
                sommelier. Hover over the profiles to see the precision.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="arf-radarStage">
            {/* Rings */}
            <div className="arf-radarRings" aria-hidden="true">
              <svg viewBox="0 0 600 600" width="100%" height="100%">
                <RadarRing r={140} active={activeRing === 1} color="#f59e0b" />
                <RadarRing r={220} active={activeRing === 2} color="#fb7185" />
                <RadarRing r={300} active={activeRing === 3} color="#a855f7" />
              </svg>
            </div>

            {/* Tags pinned on ring points */}
            <div className="arf-radarPins">
              {/* Ring 1 */}
              <div
                className="arf-radarPin p1"
                onMouseEnter={() => setActiveRing(1)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag icon="🍊" title="Crisp Citrus" sub="Light Body" tone="tone-amber" />
              </div>

              {/* Ring 2 */}
              <div
                className="arf-radarPin p2"
                onMouseEnter={() => setActiveRing(2)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag icon="🍷" title="Oaky & Robust" sub="Full Body" tone="tone-rose" />
              </div>

              {/* Ring 3 */}
              <div
                className="arf-radarPin p3"
                onMouseEnter={() => setActiveRing(3)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag icon="🍇" title="Velvet Finish" sub="Smooth Tannins" tone="tone-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
