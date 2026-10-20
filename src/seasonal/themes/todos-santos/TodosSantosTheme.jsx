import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PETALS = [
  { left: "8%", delay: "-1.2s", duration: "7.2s", scale: 0.8 },
  { left: "18%", delay: "-4.6s", duration: "8.4s", scale: 0.58 },
  { left: "29%", delay: "-2.7s", duration: "7.8s", scale: 0.7 },
  { left: "67%", delay: "-5.3s", duration: "8.8s", scale: 0.62 },
  { left: "78%", delay: "-3.1s", duration: "7.4s", scale: 0.9 },
  { left: "90%", delay: "-6.1s", duration: "9.2s", scale: 0.64 },
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

      <span className="todos-santos-icon todos-santos-icon--bread todos-santos-bread--left" />
      <span className="todos-santos-icon todos-santos-icon--bread todos-santos-bread--right" />

      <div className="todos-santos-candle-row">
        <span className="todos-santos-icon todos-santos-icon--candle" />
        <span className="todos-santos-icon todos-santos-icon--candle" />
        <span className="todos-santos-icon todos-santos-icon--candle" />
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
