import React, { useState } from "react";
import "./ceoSection.css";
import CEOExperience from "./CEOExperience";
import ceoImg from "../../assets/icon leila1.webp";

export default function CEOSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="ceo-container">
      <h2 className="section-title">
        <span className="title-inner" data-icon="🎉">
          Nuestra CEO
        </span>
      </h2>

      <div className="ceo-content">
        {/* Texto */}
        <div className="ceo-text">
          <h3 className="ceo-name">Lic. Leila Romero</h3>

          <p>
                    Profesional en Fisioterapia y Kinesiología con amplia experiencia en
                    rehabilitación integral, enfocada en mejorar la calidad de vida de
                    sus pacientes mediante tratamientos personalizados y tecnología de
                    vanguardia.
                </p>

                <p>
                    Su liderazgo ha permitido que Equilibria se consolide como un centro
                    de referencia en bienestar físico, destacándose por su enfoque humano,
                    ético y orientado a resultados.
                </p>

          {/* 👇 BOTÓN */}
          <button
            className="ceo-exp-btn"
            onClick={() => setOpen(true)}
          >
            Ver experiencia →
          </button>
        </div>

        {/* Imagen */}
        <div className="ceo-image-wrapper">
          <img src={ceoImg} alt="CEO" className="ceo-image" />
        </div>
      </div>

      {/* 👇 OVERLAY */}
      <div className={`ceo-exp-overlay ${open ? "active" : ""}`}>
        <div className="ceo-exp-panel">
          <button
            className="ceo-exp-close"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <CEOExperience />
        </div>
      </div>
    </section>
  );
};
