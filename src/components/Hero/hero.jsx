// src/components/Hero/Hero.jsx

import { useEffect, useState } from "react";
import "./hero.css";

import iso from "../../assets/isotipo.webp";
import logo from "../../assets/logotipo.webp";
import bg from "../../assets/header-bg.webp";

const slogans = [
  "Bienestar a tu alcance",
  "Movimiento que sana",
  "Recupera tu equilibrio"
];

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(
        (current) =>
          (current + 1) % slogans.length
      );
    }, 3500);

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(
        Math.min(
          window.scrollY * 0.06,
          10
        )
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left -
        rect.width / 2) *
      0.012;

    const y =
      (event.clientY -
        rect.top -
        rect.height / 2) *
      0.012;

    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({
      x: 0,
      y: 0
    });
  };

  return (
    <section
      className={`stage-hero ${
        revealed ? "revealed" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

      <div className="hero-atmosphere" />

      <div className="hero-overlay">
        <button
          type="button"
          className="brand-panel"
          onClick={() =>
            setRevealed(
              (current) => !current
            )
          }
          aria-label={
            revealed
              ? "Desenfocar imagen principal"
              : "Mostrar imagen principal"
          }
          aria-pressed={revealed}
          style={{
            transform: `translate3d(
              ${pos.x}px,
              ${pos.y + offset}px,
              0
            )`
          }}
        >
          <img
            src={iso}
            alt=""
            className="isotipo"
            width="300"
            height="300"
            aria-hidden="true"
          />

          <img
            src={logo}
            alt="Equilibria"
            className="logotipo"
            width="260"
            height="100"
          />

          <span className="brand-subtitle">
            Fisioterapia · Kinesiología · Bienestar
          </span>
        </button>

        <div className="hero-copy">
          <div
            className="slogan-container"
            aria-live="polite"
          >
            <h1
              key={slogans[index]}
              className="hero-title"
            >
              {slogans[index]}
            </h1>
          </div>

          <p className="hero-description">
            Fisioterapia y kinesiología
            personalizada con tecnología
            avanzada para cuidar tu movimiento,
            tu recuperación y tu bienestar
            diario.
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

      <div
        className="hero-scroll-indicator"
        aria-hidden="true"
      >
        <span />
      </div>
    </section>
  );
}