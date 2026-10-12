import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

import { halloweenConfig } from "./halloween.config";
import "./halloween.css";

export default function HalloweenTheme() {
  const [heroNode, setHeroNode] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const hero = document.querySelector(".stage-hero");

    setHeroNode(hero);

    if (!hero || !halloweenConfig.interaction.enabled) {
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

        hero.style.setProperty("--halloween-pointer-x", `${x * 100}%`);
        hero.style.setProperty("--halloween-pointer-y", `${y * 100}%`);
        hero.style.setProperty("--halloween-flee-x", `${fleeX}px`);
        hero.style.setProperty("--halloween-flee-y", `${fleeY}px`);
        hero.style.setProperty("--halloween-parallax-x", `${parallaxX}px`);
        hero.style.setProperty("--halloween-parallax-y", `${parallaxY}px`);
      });
    };

    const resetPointer = () => {
      hero.style.setProperty("--halloween-pointer-x", "50%");
      hero.style.setProperty("--halloween-pointer-y", "50%");
      hero.style.setProperty("--halloween-flee-x", "0px");
      hero.style.setProperty("--halloween-flee-y", "0px");
      hero.style.setProperty("--halloween-parallax-x", "0px");
      hero.style.setProperty("--halloween-parallax-y", "0px");
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
    };
  }, [pathname]);

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

      {decorations.bats && (
        <div className="halloween-bats">
          <span className="halloween-bat halloween-bat--1" />
          <span className="halloween-bat halloween-bat--2" />
          <span className="halloween-bat halloween-bat--3" />
        </div>
      )}
    </div>,
    heroNode
  );
}
