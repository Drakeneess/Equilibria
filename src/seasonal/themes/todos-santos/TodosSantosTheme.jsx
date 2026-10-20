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
  { left: "3%", top: "42%", tone: 1 },
  { left: "11%", top: "18%", tone: 3 },
  { left: "20%", top: "54%", tone: 2 },
  { left: "80%", top: "52%", tone: 3 },
  { left: "89%", top: "18%", tone: 2 },
  { left: "97%", top: "42%", tone: 1 },
];

const TOP_STARS = [
  { left: "7%", top: "68%", size: "7px" },
  { left: "16%", top: "8%", size: "6px" },
  { left: "27%", top: "72%", size: "7px" },
  { left: "73%", top: "70%", size: "6px" },
  { left: "84%", top: "10%", size: "8px" },
  { left: "93%", top: "66%", size: "7px" },
];

const TOP_PASANKALLAS = Array.from({ length: 18 }, (_, index) => ({
  tone: (index % 6) + 1,
  scale: 0.74 + (index % 4) * 0.12,
  offset: (index % 3) * 5,
}));

const LEFT_PASANKALLAS = TOP_PASANKALLAS.slice(0, 9);
const RIGHT_PASANKALLAS = TOP_PASANKALLAS.slice(9);

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

  const renderPasankallas = (items, prefix) =>
    items.map((item, index) => (
      <span
        key={`${prefix}-pasankalla-${index}`}
        className={`todos-santos-pasankalla todos-santos-pasankalla--${item.tone}`}
        style={{
          scale: item.scale,
          translate: `0 ${item.offset}px`,
        }}
      />
    ));

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

      <div className="todos-santos-pasankallas todos-santos-pasankallas--top-left">
        {renderPasankallas(LEFT_PASANKALLAS, "left")}
      </div>

      <div className="todos-santos-pasankallas todos-santos-pasankallas--top-right">
        {renderPasankallas(RIGHT_PASANKALLAS, "right")}
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

      <div className="todos-santos-side-altar todos-santos-side-altar--left">
        <span className="todos-santos-altar-top" />
        <span className="todos-santos-altar-cloth" />
        <span className="todos-santos-altar-leg todos-santos-altar-leg--1" />
        <span className="todos-santos-altar-leg todos-santos-altar-leg--2" />

        <span className="todos-santos-altar-candle todos-santos-altar-candle--left" />
        <span className="todos-santos-altar-candle todos-santos-altar-candle--right" />
        <span className="todos-santos-altar-flower" />

        <span className="todos-santos-bread todos-santos-bread--wawa todos-santos-altar-bread todos-santos-altar-bread--wawa">
          <span className="bread-face" />
        </span>
      </div>

      <div className="todos-santos-side-altar todos-santos-side-altar--right">
        <span className="todos-santos-altar-top" />
        <span className="todos-santos-altar-cloth" />
        <span className="todos-santos-altar-leg todos-santos-altar-leg--1" />
        <span className="todos-santos-altar-leg todos-santos-altar-leg--2" />

        <span className="todos-santos-altar-candle todos-santos-altar-candle--right" />
        <span className="todos-santos-altar-flower" />

        <span className="todos-santos-bread todos-santos-bread--ladder todos-santos-altar-bread todos-santos-altar-bread--ladder">
          <span className="ladder-rung ladder-rung--1" />
          <span className="ladder-rung ladder-rung--2" />
          <span className="ladder-rung ladder-rung--3" />
          <span className="ladder-rung ladder-rung--4" />
        </span>

        <span className="todos-santos-bread todos-santos-bread--horse todos-santos-altar-bread todos-santos-altar-bread--horse">
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
