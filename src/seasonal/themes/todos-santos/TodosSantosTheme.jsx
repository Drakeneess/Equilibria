import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PETALS = [
  { left: "7%", delay: "-0.8s", duration: "8.4s", scale: 0.88 },
  { left: "15%", delay: "-3.2s", duration: "9.1s", scale: 0.64 },
  { left: "26%", delay: "-1.5s", duration: "10.2s", scale: 1 },
  { left: "38%", delay: "-4.6s", duration: "8.8s", scale: 0.72 },
  { left: "51%", delay: "-2.4s", duration: "9.7s", scale: 0.82 },
  { left: "64%", delay: "-5.1s", duration: "8.1s", scale: 0.62 },
  { left: "78%", delay: "-2.8s", duration: "10.7s", scale: 1.04 },
  { left: "91%", delay: "-6.2s", duration: "9.3s", scale: 0.74 },
];

const TOP_FLOWERS = [
  { left: "9%", top: "24%", tone: 1 },
  { left: "23%", top: "58%", tone: 2 },
  { left: "38%", top: "26%", tone: 3 },
  { left: "58%", top: "60%", tone: 1 },
  { left: "74%", top: "24%", tone: 2 },
  { left: "89%", top: "54%", tone: 3 },
];

const TOP_STARS = [
  { left: "4%", top: "68%", size: "8px" },
  { left: "17%", top: "12%", size: "6px" },
  { left: "31%", top: "72%", size: "7px" },
  { left: "49%", top: "16%", size: "8px" },
  { left: "65%", top: "70%", size: "6px" },
  { left: "81%", top: "14%", size: "8px" },
  { left: "96%", top: "66%", size: "7px" },
];

export default function TodosSantosTheme() {
  const [heroNode, setHeroNode] = useState(null);

  useEffect(() => {
    const resolveHero = () => {
      setHeroNode(document.querySelector(".stage-hero"));
    };

    resolveHero();

    const observer = new MutationObserver(resolveHero);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  if (!heroNode) return null;

  return createPortal(
    <div className="todos-santos-hero-layer" aria-hidden="true">
      <div className="todos-santos-season-badge">
        <span>Todos Santos</span>
        <small>1–2 de noviembre</small>
      </div>

      <div className="todos-santos-top-ornament">
        <span className="todos-santos-top-ribbon todos-santos-top-ribbon--left" />
        <span className="todos-santos-top-ribbon todos-santos-top-ribbon--right" />

        {TOP_FLOWERS.map((flower, index) => (
          <span
            key={`flower-${index}`}
            className={`todos-santos-top-flower todos-santos-top-flower--${flower.tone}`}
            style={{ left: flower.left, top: flower.top }}
          />
        ))}

        {TOP_STARS.map((star, index) => (
          <span
            key={`star-${index}`}
            className="todos-santos-top-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      <span className="todos-santos-cane todos-santos-cane--left" />
      <span className="todos-santos-cane todos-santos-cane--right" />

      <div className="todos-santos-floral todos-santos-floral--left">
        <span className="todos-santos-icon todos-santos-icon--flower" />
        <span className="todos-santos-icon todos-santos-icon--flower" />
        <span className="todos-santos-icon todos-santos-icon--flower" />
      </div>

      <div className="todos-santos-floral todos-santos-floral--right">
        <span className="todos-santos-icon todos-santos-icon--flower" />
        <span className="todos-santos-icon todos-santos-icon--flower" />
        <span className="todos-santos-icon todos-santos-icon--flower" />
      </div>

      <div className="todos-santos-candle-group todos-santos-candle-group--left">
        <span className="todos-santos-candle todos-santos-candle--sm" />
        <span className="todos-santos-candle todos-santos-candle--lg" />
      </div>

      <div className="todos-santos-candle-group todos-santos-candle-group--right">
        <span className="todos-santos-candle todos-santos-candle--lg" />
        <span className="todos-santos-candle todos-santos-candle--sm" />
      </div>

      <div className="todos-santos-bread-altar">
        <span className="todos-santos-bread-shadow" />

        <span className="todos-santos-bread todos-santos-bread--wawa">
          <span className="bread-face" />
        </span>

        <span className="todos-santos-bread todos-santos-bread--ladder">
          <span className="ladder-rung ladder-rung--1" />
          <span className="ladder-rung ladder-rung--2" />
          <span className="ladder-rung ladder-rung--3" />
          <span className="ladder-rung ladder-rung--4" />
        </span>

        <span className="todos-santos-bread todos-santos-bread--horse">
          <span className="horse-head" />
          <span className="horse-ear horse-ear--1" />
          <span className="horse-ear horse-ear--2" />
          <span className="horse-leg horse-leg--1" />
          <span className="horse-leg horse-leg--2" />
          <span className="horse-leg horse-leg--3" />
          <span className="horse-leg horse-leg--4" />
          <span className="horse-tail" />
        </span>
      </div>

      <div className="todos-santos-petals">
        {PETALS.map((petal, index) => (
          <span
            key={index}
            className={`todos-santos-petal todos-santos-petal--${(index % 3) + 1}`}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              scale: petal.scale,
            }}
          />
        ))}
      </div>
    </div>,
    heroNode
  );
}
