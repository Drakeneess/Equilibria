import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { halloweenConfig } from "./halloween.config";
import "./halloween.css";

const MOTES = [
  { left: "8%", top: "24%", delay: "-1.5s", scale: 0.9 },
  { left: "18%", top: "64%", delay: "-4.2s", scale: 0.65 },
  { left: "31%", top: "42%", delay: "-2.6s", scale: 0.8 },
  { left: "63%", top: "27%", delay: "-5.1s", scale: 0.7 },
  { left: "74%", top: "72%", delay: "-3.4s", scale: 1 },
  { left: "88%", top: "38%", delay: "-6.2s", scale: 0.55 },
  { left: "92%", top: "78%", delay: "-2.1s", scale: 0.75 },
];

export default function HalloweenTheme() {
  const [heroNode, setHeroNode] = useState(null);

  useEffect(() => {
    const hero = document.querySelector(".stage-hero");

    if (!hero) return undefined;

    setHeroNode(hero);

    if (!halloweenConfig.interaction.enabled) {
      return undefined;
    }

    let frameId = null;

    const applyPointer = (event) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
        const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

        const normalizedX = x * 2 - 1;
        const normalizedY = y * 2 - 1;

        const fleeX = -normalizedX * halloweenConfig.interaction.maxFleePx;
        const fleeY = -normalizedY * halloweenConfig.interaction.maxFleePx;
        const parallaxX = normalizedX * halloweenConfig.interaction.maxParallaxPx;
        const parallaxY = normalizedY * halloweenConfig.interaction.maxParallaxPx;
        const spiderDrop = Math.max(
          0,
          Math.min(
            y * halloweenConfig.interaction.maxSpiderDropPx,
            halloweenConfig.interaction.maxSpiderDropPx
          )
        );

        hero.style.setProperty("--halloween-pointer-x", `${x * 100}%`);
        hero.style.setProperty("--halloween-pointer-y", `${y * 100}%`);
        hero.style.setProperty("--halloween-flee-x", `${fleeX}px`);
        hero.style.setProperty("--halloween-flee-y", `${fleeY}px`);
        hero.style.setProperty("--halloween-parallax-x", `${parallaxX}px`);
        hero.style.setProperty("--halloween-parallax-y", `${parallaxY}px`);
        hero.style.setProperty("--halloween-spider-drop", `${spiderDrop}px`);
      });
    };

    const resetPointer = () => {
      hero.style.setProperty("--halloween-pointer-x", "50%");
      hero.style.setProperty("--halloween-pointer-y", "50%");
      hero.style.setProperty("--halloween-flee-x", "0px");
      hero.style.setProperty("--halloween-flee-y", "0px");
      hero.style.setProperty("--halloween-parallax-x", "0px");
      hero.style.setProperty("--halloween-parallax-y", "0px");
      hero.style.setProperty("--halloween-spider-drop", "46px");
    };

    resetPointer();

    hero.addEventListener("pointermove", applyPointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      hero.removeEventListener("pointermove", applyPointer);
      hero.removeEventListener("pointerleave", resetPointer);

      hero.style.removeProperty("--halloween-pointer-x");
      hero.style.removeProperty("--halloween-pointer-y");
      hero.style.removeProperty("--halloween-flee-x");
      hero.style.removeProperty("--halloween-flee-y");
      hero.style.removeProperty("--halloween-parallax-x");
      hero.style.removeProperty("--halloween-parallax-y");
      hero.style.removeProperty("--halloween-spider-drop");
    };
  }, []);

  if (!heroNode) return null;

  const { decorations } = halloweenConfig;

  return createPortal(
    <div className="halloween-interactive-layer" aria-hidden="true">
      {decorations.pointerGlow && (
        <div className="halloween-pointer-glow" />
      )}

      {decorations.fog && (
        <>
          <div className="halloween-fog halloween-fog--left" />
          <div className="halloween-fog halloween-fog--right" />
        </>
      )}

      {decorations.motes && (
        <div className="halloween-motes">
          {MOTES.map((mote, index) => (
            <span
              key={index}
              className="halloween-mote"
              style={{
                left: mote.left,
                top: mote.top,
                animationDelay: mote.delay,
                scale: mote.scale,
              }}
            />
          ))}
        </div>
      )}

      {decorations.bats && (
        <div className="halloween-bats">
          <span className="halloween-bat halloween-bat--1" />
          <span className="halloween-bat halloween-bat--2" />
          <span className="halloween-bat halloween-bat--3" />
        </div>
      )}

      {decorations.spider && (
        <div className="halloween-spider-rig">
          <span className="halloween-spider-thread" />
          <span className="halloween-spider" />
        </div>
      )}
    </div>,
    heroNode
  );
}
