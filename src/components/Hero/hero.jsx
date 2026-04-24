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
    "Movimiento que sana"
  ];

  const [prevText, setPrevText] = useState(slogans[0]);
  const [nextText, setNextText] = useState(slogans[1]);
  const [fadeState, setFadeState] = useState("in");

  // rotación de slogans
  useEffect(() => {
    const interval = setInterval(() => {

      setFadeState("out");

      setTimeout(() => {

        const newIndex = (index + 1) % slogans.length;

        setIndex(newIndex);
        setPrevText(slogans[newIndex]);
        setNextText(slogans[(newIndex + 1) % slogans.length]);

        setFadeState("in");

      }, 700);

    }, 3500);

    return () => clearInterval(interval);
  }, [index]);

  // scroll parallax
  useEffect(() => {

    const handleScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(y * 0.1, 10));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  // mouse parallax
  const handleMouseMove = (e) => {

    const { innerWidth, innerHeight } = window;

    const x = (e.clientX - innerWidth / 2) * 0.05;
    const y = (e.clientY - innerHeight / 2) * 0.05;

    setPos({ x, y });

  };

  const toggleReveal = () => {
    setRevealed(prev => !prev);
  };

  return (

    <section
      className={`stage-hero ${revealed ? "revealed" : ""}`}
      onMouseMove={handleMouseMove}
    >

      {/* HERO IMAGE (optimizado para LCP) */}
      <img
        src={bg}
        alt=""
        className="hero-bg"
        fetchPriority="high"
        loading="eager"
      />

      <div className="hero-overlay">

        <div
          className="brandmark"
          tabIndex={0}
          aria-label="Logo Equilibria"
          onClick={toggleReveal}
          style={{
            transform: `translate(${pos.x}px, ${pos.y + offset}px)`
          }}
        >

          <img
            src={iso}
            alt="Isotipo Equilibria"
            className="isotipo animate-in"
            width="300"
            height="300"
          />

          <img
            src={logo}
            alt="Logotipo Equilibria"
            className="logotipo animate-in"
            width="260"
            height="100"
          />

        </div>

        <div className="slogan-container">

          <h1
            key={`prev-${index}`}
            className="slogan fade-out"
          >
            {prevText}
          </h1>

          <h1
            key={`next-${index}`}
            className="slogan fade-in"
          >
            {nextText}
          </h1>

        </div>

      </div>

    </section>
  );
}