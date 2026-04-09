// src/case-studies/KumoStrategy.jsx
import { useState } from "react";

function RadarRing({ r, active, color }) {
  return (
    <circle
      cx="300"
      cy="300"
      r={r}
      fill="none"
      className={`kk-radarRing ${active ? "is-active" : ""}`}
      style={active ? { stroke: color } : undefined}
    />
  );
}

function RadarTag({ icon, title, sub, tone }) {
  return (
    <div className={`kk-radarTag ${tone || ""}`}>
      <div className="kk-radarIcon" aria-hidden="true">
        {icon}
      </div>
      <div className="kk-radarText">
        <div className="kk-radarTitle">{title}</div>
        <div className="kk-radarSub">{sub}</div>
      </div>
    </div>
  );
}

export default function KumoStrategy() {
  const [activeRing, setActiveRing] = useState(null);

  return (
    <section className="kk-strategyRadar">
      {/* Background ambience */}
      <div className="kk-strategyRadarSpot" aria-hidden="true" />

      <div className="kk-strategyRadarWrap">
        <div className="kk-strategyRadarGrid">
          {/* LEFT */}
          <div className="kk-strategyRadarCopy">
            <div className="kk-strategyRadarNum" aria-hidden="true">
              02
            </div>

            <div className="kk-strategyRadarKicker">THE STRATEGY</div>

            <h2 className="kk-strategyRadarTitle">
              Composing the <br />
              <em>Umami.</em>
            </h2>

            <div className="kk-strategyRadarBody">
              <p>
                We replaced a static menu with{" "}
                <span className="kk-strategyRadarUnderline">
                  curated tasting journeys
                </span>
                .
              </p>
              <p>
                Instead of listing ingredients, we let guests discover each
                bowl through sensory language — the same way a sommelier
                describes a wine. Hover over the profiles to feel the
                precision.
              </p>
            </div>
          </div>

          {/* RIGHT — Radar with sensory tags */}
          <div className="kk-radarStage">
            <div className="kk-radarRings" aria-hidden="true">
              <svg viewBox="0 0 600 600" width="100%" height="100%">
                <RadarRing
                  r={140}
                  active={activeRing === 1}
                  color="#c9a96e"
                />
                <RadarRing
                  r={220}
                  active={activeRing === 2}
                  color="#d97706"
                />
                <RadarRing
                  r={300}
                  active={activeRing === 3}
                  color="#ef4444"
                />
              </svg>
            </div>

            <div className="kk-radarPins">
              {/* Ring 1 — inner */}
              <div
                className="kk-radarPin p1"
                onMouseEnter={() => setActiveRing(1)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag
                  icon="🍥"
                  title="Dashi Depth"
                  sub="Rich Umami"
                  tone="tone-gold"
                />
              </div>

              {/* Ring 2 — mid */}
              <div
                className="kk-radarPin p2"
                onMouseEnter={() => setActiveRing(2)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag
                  icon="🔥"
                  title="Charcoal Kiss"
                  sub="Smoky Finish"
                  tone="tone-amber"
                />
              </div>

              {/* Ring 3 — outer */}
              <div
                className="kk-radarPin p3"
                onMouseEnter={() => setActiveRing(3)}
                onMouseLeave={() => setActiveRing(null)}
              >
                <RadarTag
                  icon="🌊"
                  title="Velvet Broth"
                  sub="Smooth Tannins"
                  tone="tone-red"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Curated Bowls ── */}
        <div className="kk-bowlsSection">
          <div className="kk-bowlsHeader">
            <span className="kk-bowlsKicker">Signatures</span>
            <h3 className="kk-bowlsTitle">Curated Bowls</h3>
            <p className="kk-bowlsSubtitle">
              Each bowl is composed with restraint — an expression of depth,
              balance, and intention.
            </p>
          </div>

          <div className="kk-bowlsGrid">
            {[
              {
                /* PLACEHOLDER — replace src with your image */
                img: "/img/kumo-bowl-tonkotsu.jpg",
                name: "Tonkotsu",
                desc: "24-hour pork broth, hand-pulled noodles, chashu, ajitama",
                price: "₹420",
              },
              {
                img: "/img/kumo-bowl-red-miso.jpg",
                name: "Red Miso",
                desc: "Fermented miso, chilli oil, minced pork, spring onion",
                price: "Taka",
              },
              {
                img: "/img/kumo-bowl-shoyu.jpg",
                name: "Shoyu Reserve",
                desc: "Clear soy broth, A5 Wagyu, black truffle, onsen egg",
                price: "Taka",
              },
            ].map((bowl) => (
              <div className="kk-bowlCard" key={bowl.name}>
                <div className="kk-bowlCard__imgWrap">
                  <img
                    src={bowl.img}
                    alt={bowl.name}
                    className="kk-bowlCard__img"
                    loading="lazy"
                  />
                </div>
                <div className="kk-bowlCard__overlay">
                  <div>
                    <div className="kk-bowlCard__name">{bowl.name}</div>
                    <div className="kk-bowlCard__desc">{bowl.desc}</div>
                  </div>
                  <div className="kk-bowlCard__price">{bowl.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}