// src/components/Hero/Hero.jsx
import { useEffect, useState } from "react";
import "./hero.css";

import iso from "../../assets/isotipo.webp";
import logo from "../../assets/logotipo.webp";
import bg from "../../assets/header-bg.webp";

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);

  const slogans = [
    "Bienestar a tu alcance",
    "Movimiento que sana",
    "Recupera tu equilibrio"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % slogans.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slogans.length]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(y * 0.08, 12));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;

    const x = (e.clientX - innerWidth / 2) * 0.025;
    const y = (e.clientY - innerHeight / 2) * 0.025;

    setPos({ x, y });
  };

  const toggleReveal = () => {
    setRevealed((current) => !current);
  };

  return (
    <section
      className={`stage-hero ${revealed ? "revealed" : ""}`}
      onMouseMove={handleMouseMove}
      aria-label="Sección principal de Equilibria"
    >
      <img
        src={bg}
        alt=""
        className="hero-bg"
        fetchPriority="high"
        loading="eager"
        aria-hidden="true"
      />

      <div className="hero-overlay">
        <button
          type="button"
          className="brandmark"
          aria-label="Mostrar imagen principal de Equilibria"
          onClick={toggleReveal}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y + offset}px, 0)`
          }}
        >
          <img
            src={iso}
            alt="Isotipo Equilibria"
            className="isotipo"
            width="300"
            height="300"
          />

          <img
            src={logo}
            alt="Equilibria"
            className="logotipo"
            width="260"
            height="100"
          />
        </button>

        <div className="hero-copy">
          <div className="slogan-container" aria-live="polite">
            <h1 key={slogans[index]} className="hero-title">
              {slogans[index]}
            </h1>
          </div>

          <p className="hero-description">
            Fisioterapia y kinesiología personalizada con tecnología avanzada para cuidar
            tu movimiento, tu recuperación y tu bienestar diario.
          </p>

          <div className="hero-actions">
            <a
              href="#services"
              className="hero-btn hero-btn-primary"
            >
              Ver servicios
            </a>

            <a
              href="#contact"
              className="hero-btn hero-btn-secondary"
            >
              Reservar cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}